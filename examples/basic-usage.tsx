import React from 'react'
import { SafeMotion, AnimationProvider } from 'safemotion'

// Basic animation example
export function BasicUsage() {
  return (
    <div className="container">
      <SafeMotion direction="up" delay={300}>
        <h1>Welcome to SafeMotion</h1>
      </SafeMotion>
      
      <SafeMotion direction="left" delay={600}>
        <p>This text slides in from the left</p>
      </SafeMotion>
      
      <SafeMotion direction="scale" delay={900}>
        <button>Animated Button</button>
      </SafeMotion>
    </div>
  )
}

// Staggered children example
export function StaggeredExample() {
  return (
    <SafeMotion staggerChildren={200}>
      <div className="grid">
        <div className="card">Card 1</div>
        <div className="card">Card 2</div>
        <div className="card">Card 3</div>
        <div className="card">Card 4</div>
      </div>
    </SafeMotion>
  )
}

// With AnimationProvider
export function WithProvider() {
  return (
    <AnimationProvider>
      <div className="app">
        <SafeMotion direction="up" animationType="spring">
          <header>Header with spring animation</header>
        </SafeMotion>
        
        <SafeMotion direction="fade" delay={500}>
          <main>Main content fades in</main>
        </SafeMotion>
      </div>
    </AnimationProvider>
  )
}