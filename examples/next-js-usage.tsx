// app/layout.tsx - Next.js 15+ App Router
import { AnimationProvider } from 'safemotion'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App with SafeMotion',
  description: 'Beautiful animations without hydration issues',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  )
}

// app/page.tsx - Homepage with animations
import { SafeMotion } from 'safemotion'

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <SafeMotion direction="up" initial={true} delay={300}>
        <section className="hero">
          <h1>Welcome to My App</h1>
          <p>Built with SafeMotion</p>
        </section>
      </SafeMotion>
      
      {/* Features section */}
      <SafeMotion direction="up" staggerChildren={200}>
        <section className="features">
          <div className="feature">Feature 1</div>
          <div className="feature">Feature 2</div>
          <div className="feature">Feature 3</div>
        </section>
      </SafeMotion>
      
      {/* CTA section */}
      <SafeMotion direction="scale" magnetic={0.8} depth={true}>
        <section className="cta">
          <button>Get Started</button>
        </section>
      </SafeMotion>
    </main>
  )
}

// components/FeatureCard.tsx - Reusable animated component
import { SafeMotion } from 'safemotion'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <SafeMotion 
      direction="up" 
      delay={delay}
      hover={true}
      depth={true}
      className="feature-card"
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </SafeMotion>
  )
}

// Usage in a page
export function FeaturesPage() {
  return (
    <div className="features-grid">
      <FeatureCard
        title="Fast"
        description="Lightning fast animations"
        icon="⚡"
        delay={0}
      />
      <FeatureCard
        title="Accessible"
        description="Respects user preferences"
        icon="♿"
        delay={200}
      />
      <FeatureCard
        title="Beautiful"
        description="Smooth spring physics"
        icon="✨"
        delay={400}
      />
    </div>
  )
}