# SafeMotion 🎭

A hydration-safe animation library for Next.js 15+ that eliminates client/server mismatches while providing beautiful, performant animations with spring physics, magnetic effects, and built-in accessibility.

[![npm version](https://img.shields.io/npm/v/safemotion.svg)](https://www.npmjs.com/package/safemotion)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/safemotion)](https://bundlephobia.com/package/safemotion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🚀 **Zero Hydration Issues** - Built specifically for Next.js 15+ SSR/SSG
- 🎨 **Spring Physics** - Natural animations with bounce, elastic, and spring easing
- 🧲 **Magnetic Effects** - Interactive cursor attraction on hover
- 📱 **Mobile First** - Automatically adapts to device capabilities
- ♿ **Accessibility** - Respects prefers-reduced-motion by default
- 🔋 **Performance Aware** - FPS monitoring and battery level detection
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 🪶 **Lightweight** - ~8KB gzipped with zero dependencies

## 🚀 Quick Start

### Installation

```bash
npm install safemotion
# or
yarn add safemotion
# or
pnpm add safemotion
```

### Basic Usage

```jsx
import { SafeMotion } from 'safemotion'

function Hero() {
  return (
    <SafeMotion direction="up" delay={300}>
      <h1>Welcome to SafeMotion</h1>
    </SafeMotion>
  )
}
```

### Advanced Example

```jsx
import { SafeMotion, AnimationProvider } from 'safemotion'

function App() {
  return (
    <AnimationProvider>
      <SafeMotion 
        direction="scale"
        animationType="spring"
        delay={300}
        staggerChildren={100}
        magnetic={0.8}
        depth={true}
      >
        <div className="feature-card">
          <h2>Amazing Feature</h2>
          <p>This will animate with spring physics!</p>
        </div>
      </SafeMotion>
    </AnimationProvider>
  )
}
```

## 📖 API Reference

### SafeMotion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'scale' \| 'rotate' \| 'fade'` | `'up'` | Animation direction |
| `delay` | `number` | `0` | Delay before animation starts (ms) |
| `duration` | `number` | `600` | Animation duration (ms) |
| `animationType` | `'spring' \| 'ease' \| 'bounce' \| 'elastic'` | `'spring'` | Easing function |
| `staggerChildren` | `number` | `0` | Delay between child animations (ms) |
| `magnetic` | `number` | `0` | Magnetic cursor effect strength (0-1) |
| `depth` | `boolean` | `false` | Enable 3D depth effects |
| `hover` | `boolean` | `true` | Enable hover animations |
| `threshold` | `number` | `0.1` | Intersection observer threshold |
| `once` | `boolean` | `true` | Animate only once |
| `initial` | `boolean` | `false` | Animate on mount instead of scroll |

### AnimationProvider

Wrap your app with `AnimationProvider` for global performance optimization:

```jsx
import { AnimationProvider } from 'safemotion'

export default function RootLayout({ children }) {
  return (
    <AnimationProvider>
      {children}
    </AnimationProvider>
  )
}
```

## 🎯 Use Cases

### Hero Sections
```jsx
<SafeMotion direction="up" delay={0} initial={true}>
  <h1>Build Amazing Products</h1>
</SafeMotion>
```

### Feature Cards
```jsx
<SafeMotion direction="scale" staggerChildren={100}>
  <div className="grid">
    <Card>Feature 1</Card>
    <Card>Feature 2</Card>
    <Card>Feature 3</Card>
  </div>
</SafeMotion>
```

### Interactive Elements
```jsx
<SafeMotion magnetic={1} depth={true}>
  <button>Hover Me!</button>
</SafeMotion>
```

### Sequential Reveals
```jsx
<SafeMotion direction="left" delay={300}>
  <section>Content that slides in from left</section>
</SafeMotion>
```

## 🎨 Animation Types

### Spring Physics
Natural, playful animations that feel alive:
```jsx
<SafeMotion animationType="spring">
```

### Bounce
Animations that overshoot and settle:
```jsx
<SafeMotion animationType="bounce">
```

### Elastic
Stretchy animations with momentum:
```jsx
<SafeMotion animationType="elastic">
```

### Ease
Smooth, professional transitions:
```jsx
<SafeMotion animationType="ease">
```

## ⚡ Performance

SafeMotion automatically optimizes for:

- **Device Type** - Reduced complexity on mobile
- **Battery Level** - Simpler animations when battery is low
- **Connection Speed** - Adapts to network conditions
- **FPS** - Reduces complexity if frame rate drops
- **Reduced Motion** - Respects user preferences

## 🔧 Advanced Features

### Staggered Children
Animate child elements in sequence:
```jsx
<SafeMotion staggerChildren={150}>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</SafeMotion>
```

### Magnetic Cursor Effects
Add interactive magnetic attraction:
```jsx
<SafeMotion magnetic={0.8}>
  <button>I'm magnetic!</button>
</SafeMotion>
```

### 3D Depth
Add perspective and shadows:
```jsx
<SafeMotion depth={true}>
  <div className="card">3D Card</div>
</SafeMotion>
```

## 🛠️ Next.js Configuration

SafeMotion works out of the box with Next.js 15+. No configuration needed!

```jsx
// app/layout.tsx
import { AnimationProvider } from 'safemotion'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  )
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

```bash
# Clone the repo
git clone https://github.com/yourusername/safemotion.git

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## 📄 License

MIT © [SafeMotion Contributors](LICENSE)

## 🔗 Links

- [Documentation](https://safemotion.dev)
- [Examples](https://safemotion.dev/examples)
- [GitHub](https://github.com/yourusername/safemotion)
- [npm](https://www.npmjs.com/package/safemotion)

---

Made with ❤️ for the Next.js community