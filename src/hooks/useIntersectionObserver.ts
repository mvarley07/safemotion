import { useEffect, useRef, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  once?: boolean
  delay?: number
}

export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { once = true, delay = 0, ...observerOptions } = options
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<T>(null)
  const hasTriggeredRef = useRef(false)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasTriggeredRef.current)) {
          if (delay > 0) {
            const timer = setTimeout(() => {
              setIsVisible(true)
              hasTriggeredRef.current = true
            }, delay)
            
            return () => clearTimeout(timer)
          } else {
            setIsVisible(true)
            hasTriggeredRef.current = true
          }
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px',
        ...observerOptions
      }
    )
    
    observer.observe(element)
    
    return () => {
      observer.disconnect()
    }
  }, [delay, once, observerOptions])
  
  return [elementRef, isVisible]
}