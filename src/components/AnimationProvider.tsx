import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { AnimationConfig, AnimationContextType } from '../types'
import { detectDevice, detectConnection, detectBatteryLevel } from '../utils'
import { useReducedMotion } from '../hooks'

const AnimationContext = createContext<AnimationContextType | null>(null)

const ANIMATION_CONFIGS: Record<string, AnimationConfig> = {
  desktop: {
    duration: {
      fast: 0.2,
      normal: 0.6,
      slow: 1.0,
      epic: 2.0
    },
    easing: {
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      linear: 'linear',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.25, 0.46, 0.45, 1.4)'
    },
    particles: {
      low: 15,
      medium: 30,
      high: 50,
      epic: 100
    },
    stagger: {
      fast: 50,
      normal: 150,
      slow: 300
    }
  },
  mobile: {
    duration: {
      fast: 0.1,
      normal: 0.3,
      slow: 0.5,
      epic: 1.0
    },
    easing: {
      spring: 'ease-out',
      ease: 'ease-out',
      linear: 'linear',
      bounce: 'ease-out',
      elastic: 'ease-out'
    },
    particles: {
      low: 5,
      medium: 10,
      high: 15,
      epic: 25
    },
    stagger: {
      fast: 20,
      normal: 50,
      slow: 100
    }
  },
  reduced: {
    duration: {
      fast: 0.01,
      normal: 0.01,
      slow: 0.01,
      epic: 0.01
    },
    easing: {
      spring: 'linear',
      ease: 'linear',
      linear: 'linear',
      bounce: 'linear',
      elastic: 'linear'
    },
    particles: {
      low: 0,
      medium: 0,
      high: 0,
      epic: 0
    },
    stagger: {
      fast: 0,
      normal: 0,
      slow: 0
    }
  }
}

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState('desktop')
  const [fps, setFPS] = useState(60)
  const [shouldReduceComplexity, setShouldReduceComplexity] = useState(false)
  const reducedMotion = useReducedMotion()
  
  const config = useMemo(() => {
    if (reducedMotion) return ANIMATION_CONFIGS.reduced
    return ANIMATION_CONFIGS[device] || ANIMATION_CONFIGS.desktop
  }, [device, reducedMotion])
  
  useEffect(() => {
    const detectedDevice = detectDevice()
    setDevice(detectedDevice)
    
    // Performance monitoring
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFPS = () => {
      const now = performance.now()
      frameCount++
      
      if (now - lastTime >= 1000) {
        setFPS(Math.round((frameCount * 1000) / (now - lastTime)))
        setShouldReduceComplexity(frameCount < 30)
        frameCount = 0
        lastTime = now
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    const rafId = requestAnimationFrame(measureFPS)
    
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  const contextValue = useMemo(() => ({
    config,
    device,
    reducedMotion,
    fps,
    shouldReduceComplexity
  }), [config, device, reducedMotion, fps, shouldReduceComplexity])
  
  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimationContext() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider')
  }
  return context
}