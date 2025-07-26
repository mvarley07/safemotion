import { CSSProperties, ReactNode } from 'react'

export type AnimationType = 'spring' | 'ease' | 'linear' | 'bounce' | 'elastic'
export type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'up-30' | 'scale' | 'rotate'

export interface SafeMotionProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  direction?: Direction
  duration?: number
  threshold?: number
  once?: boolean
  initial?: boolean
  staggerChildren?: number
  animationType?: AnimationType
  springConfig?: {
    tension?: number
    friction?: number
    mass?: number
  }
  hover?: boolean
  magnetic?: number
  depth?: boolean
  onClick?: () => void
}

export interface AnimationConfig {
  duration: {
    fast: number
    normal: number
    slow: number
    epic: number
  }
  easing: {
    spring: string
    ease: string
    linear: string
    bounce: string
    elastic: string
  }
  particles: {
    low: number
    medium: number
    high: number
    epic: number
  }
  stagger: {
    fast: number
    normal: number
    slow: number
  }
}

export interface AnimationContextType {
  config: AnimationConfig
  device: string
  reducedMotion: boolean
  fps: number
  shouldReduceComplexity: boolean
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile' | 'low-end'
export type ConnectionType = 'slow' | 'medium' | 'fast' | 'unknown'