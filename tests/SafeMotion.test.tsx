import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SafeMotion } from '../src/components/SafeMotion'

describe('SafeMotion', () => {
  it('renders children correctly', () => {
    render(
      <SafeMotion>
        <div>Test content</div>
      </SafeMotion>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies initial styles correctly', () => {
    render(
      <SafeMotion direction="up" initial={false}>
        <div data-testid="animated-content">Test content</div>
      </SafeMotion>
    )
    
    const element = screen.getByTestId('animated-content').parentElement
    expect(element).toHaveStyle({ opacity: '0' })
  })

  it('respects reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(
      <SafeMotion direction="up">
        <div data-testid="reduced-motion-content">Test content</div>
      </SafeMotion>
    )
    
    const element = screen.getByTestId('reduced-motion-content').parentElement
    expect(element).toHaveStyle({ opacity: '1' })
  })

  it('handles initial animation correctly', async () => {
    render(
      <SafeMotion initial={true} delay={100}>
        <div data-testid="initial-content">Test content</div>
      </SafeMotion>
    )
    
    const element = screen.getByTestId('initial-content').parentElement
    
    // Should start visible since initial=true
    await waitFor(() => {
      expect(element).toHaveStyle({ opacity: '1' })
    }, { timeout: 200 })
  })

  it('applies custom className and styles', () => {
    const customStyle = { backgroundColor: 'red' }
    
    render(
      <SafeMotion className="custom-class" style={customStyle}>
        <div data-testid="styled-content">Test content</div>
      </SafeMotion>
    )
    
    const element = screen.getByTestId('styled-content').parentElement
    expect(element).toHaveClass('custom-class')
    expect(element).toHaveStyle(customStyle)
  })

  it('handles different animation directions', () => {
    const directions = ['up', 'down', 'left', 'right', 'scale', 'rotate', 'fade'] as const
    
    directions.forEach(direction => {
      const { unmount } = render(
        <SafeMotion direction={direction} initial={false}>
          <div data-testid={`${direction}-content`}>Test content</div>
        </SafeMotion>
      )
      
      const element = screen.getByTestId(`${direction}-content`).parentElement
      expect(element).toBeInTheDocument()
      
      unmount()
    })
  })
})