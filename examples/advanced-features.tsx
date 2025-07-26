import React from 'react'
import { SafeMotion, AnimationProvider } from 'safemotion'

// Magnetic effect example
export function MagneticExample() {
  return (
    <div className="magnetic-demo">
      <SafeMotion magnetic={0.8} depth={true}>
        <button className="magnetic-button">
          Hover me for magnetic effect!
        </button>
      </SafeMotion>
    </div>
  )
}

// 3D depth effects
export function DepthExample() {
  return (
    <SafeMotion depth={true} hover={true}>
      <div className="card-3d">
        <h3>3D Card</h3>
        <p>This card has depth and perspective on hover</p>
      </div>
    </SafeMotion>
  )
}

// Animation types showcase
export function AnimationTypes() {
  return (
    <div className="animation-types">
      <SafeMotion direction="up" animationType="spring" delay={0}>
        <div className="demo-card">Spring Animation</div>
      </SafeMotion>
      
      <SafeMotion direction="up" animationType="bounce" delay={200}>
        <div className="demo-card">Bounce Animation</div>
      </SafeMotion>
      
      <SafeMotion direction="up" animationType="elastic" delay={400}>
        <div className="demo-card">Elastic Animation</div>
      </SafeMotion>
      
      <SafeMotion direction="up" animationType="ease" delay={600}>
        <div className="demo-card">Ease Animation</div>
      </SafeMotion>
    </div>
  )
}

// Complex interactive example
export function InteractiveExample() {
  const [count, setCount] = React.useState(0)
  
  return (
    <AnimationProvider>
      <div className="interactive-demo">
        <SafeMotion 
          direction="scale" 
          magnetic={1}
          depth={true}
          onClick={() => setCount(c => c + 1)}
        >
          <button className="counter-button">
            Clicked {count} times
          </button>
        </SafeMotion>
        
        <SafeMotion 
          direction="up" 
          delay={count * 100}
          key={count}
        >
          <div className="counter-display">
            Count: {count}
          </div>
        </SafeMotion>
      </div>
    </AnimationProvider>
  )
}

// Performance-aware example
export function PerformanceExample() {
  return (
    <AnimationProvider>
      <div className="performance-demo">
        {/* High-performance cards that adapt to device */}
        {Array.from({ length: 12 }, (_, i) => (
          <SafeMotion
            key={i}
            direction="up"
            delay={i * 50}
            staggerChildren={50}
            // These will automatically reduce on mobile/low-end devices
            magnetic={0.5}
            depth={true}
            animationType="spring"
          >
            <div className="performance-card">
              <h4>Card {i + 1}</h4>
              <p>Automatically optimized for your device</p>
            </div>
          </SafeMotion>
        ))}
      </div>
    </AnimationProvider>
  )
}