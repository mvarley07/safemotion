import { useState, useEffect, useRef, RefObject } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(
  magnetic: number,
  disabled: boolean = false
): {
  mousePosition: MousePosition
  elementRef: RefObject<HTMLDivElement>
} {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const elementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (magnetic === 0 || disabled) {
      setMousePosition({ x: 0, y: 0 })
      return
    }
    
    const element = elementRef.current
    if (!element) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * magnetic * 0.1
      const deltaY = (e.clientY - centerY) * magnetic * 0.1
      
      // Limit the magnetic effect to a reasonable distance
      const maxDistance = 30
      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX))
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY))
      
      setMousePosition({ x: clampedX, y: clampedY })
    }
    
    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magnetic, disabled])
  
  return { mousePosition, elementRef }
}