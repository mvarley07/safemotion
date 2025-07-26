// Main exports
export { SafeMotion, AnimationProvider, useAnimationContext } from './components'

// Hooks
export { useReducedMotion, useMousePosition, useIntersectionObserver } from './hooks'

// Types
export type { 
  SafeMotionProps, 
  AnimationType, 
  Direction, 
  AnimationConfig,
  AnimationContextType,
  DeviceType,
  ConnectionType
} from './types'

// Utils
export { 
  EASING_PRESETS,
  detectDevice,
  detectConnection,
  detectBatteryLevel,
  getInitialTransform,
  getFinalTransform
} from './utils'