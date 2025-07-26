import { Direction } from '../types'

export function getInitialTransform(direction: Direction): string {
  switch (direction) {
    case 'up': 
      return 'translateY(30px)'
    case 'up-30': 
      return 'translateY(40px)'
    case 'down': 
      return 'translateY(-30px)'
    case 'left': 
      return 'translateX(-40px)'
    case 'right': 
      return 'translateX(40px)'
    case 'scale': 
      return 'scale(0.8)'
    case 'rotate': 
      return 'rotate(-5deg) scale(0.9)'
    case 'fade': 
      return 'scale(1)'
    default: 
      return 'translateY(30px)'
  }
}

export function getFinalTransform(): string {
  return 'translateY(0px) translateX(0px) scale(1) rotate(0deg)'
}