import React, { useState, useEffect, useRef, useCallback, CSSProperties } from 'react'
import { SafeMotionProps } from '../types'
import { useReducedMotion, useMousePosition } from '../hooks'
import { EASING_PRESETS, getInitialTransform, getFinalTransform } from '../utils'

export const SafeMotion: React.FC<SafeMotionProps> = ({ 
  children, 
  className = '', 
  style,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  threshold = 0.1,
  once = true,
  initial = false,
  staggerChildren = 0,
  animationType = 'spring',
  hover = true,
  magnetic = 0,
  depth = false,
  onClick
}) => {
  const [isVisible, setIsVisible] = useState(initial)
  const [isMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)
  
  const prefersReducedMotion = useReducedMotion()
  const { mousePosition, elementRef } = useMousePosition(magnetic)
  
  // Combine refs
  const combinedRef = useCallback((node: HTMLDivElement) => {
    observerRef.current = node
    if (elementRef) {
      (elementRef as React.MutableRefObject<HTMLDivElement>).current = node
    }
  }, [elementRef])

  useEffect(() => {
    setIsMounted(true)
    
    if (initial) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [initial, delay])

  useEffect(() => {
    if (!isMounted || initial) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true)
          }, delay)
          return () => clearTimeout(timer)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -80px 0px'
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [delay, isMounted, threshold, once, initial])

  // Stagger children animation
  useEffect(() => {
    if (!isVisible || staggerChildren === 0) return
    
    const element = observerRef.current
    if (!element) return
    
    const childElements = Array.from(element.children) as HTMLElement[]
    
    childElements.forEach((child, index) => {
      const childDelay = index * staggerChildren
      child.style.opacity = '0'
      child.style.transform = getInitialTransform(direction)
      
      setTimeout(() => {
        child.style.transition = `opacity ${duration}s ${EASING_PRESETS[animationType]}, transform ${duration}s ${EASING_PRESETS[animationType]}`
        child.style.opacity = '1'
        child.style.transform = getFinalTransform()
      }, childDelay)
    })
  }, [isVisible, staggerChildren, duration, animationType, direction])

  const getHoverTransform = () => {
    if (!hover || prefersReducedMotion) return ''
    
    let baseTransform = 'translateY(0px) translateX(0px)'
    
    if (magnetic > 0) {
      baseTransform = `translateY(${mousePosition.y}px) translateX(${mousePosition.x}px)`
    }
    
    if (isHovered) {
      if (depth) {
        return `${baseTransform} translateZ(20px) scale(1.05)`
      } else {
        return `${baseTransform} scale(1.03) translateY(-2px)`
      }
    }
    
    if (isPressed) {
      return `${baseTransform} scale(0.98) translateY(1px)`
    }
    
    return baseTransform
  }

  const animationStyle: CSSProperties = isMounted ? {
    opacity: prefersReducedMotion ? 1 : (isVisible ? 1 : 0),
    transform: prefersReducedMotion 
      ? 'none' 
      : (isVisible ? getHoverTransform() : getInitialTransform(direction)),
    transition: prefersReducedMotion 
      ? 'none' 
      : `opacity ${duration}s ${EASING_PRESETS[animationType]}, transform ${duration}s ${EASING_PRESETS[animationType]}`,
    willChange: prefersReducedMotion ? 'auto' : 'opacity, transform',
    transformStyle: depth ? 'preserve-3d' : 'flat',
    backfaceVisibility: 'hidden',
    ...(depth && isHovered && {
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
    }),
    ...style
  } : style

  const handleClick = () => {
    if (onClick) {
      setIsPressed(true)
      setTimeout(() => setIsPressed(false), 150)
      onClick()
    }
  }

  return (
    <div
      ref={combinedRef}
      className={className}
      style={animationStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </div>
  )
}