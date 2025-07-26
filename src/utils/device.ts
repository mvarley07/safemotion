import { DeviceType, ConnectionType } from '../types'

export function detectDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  const isTablet = /ipad|android(?=.*mobile)/i.test(userAgent)
  const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2
  
  if (isMobile && !isTablet) return 'mobile'
  if (isTablet) return 'tablet'
  if (isLowEndDevice) return 'low-end'
  return 'desktop'
}

export function detectConnection(): ConnectionType {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) return 'unknown'
  
  const connection = (navigator as any).connection
  if (!connection) return 'unknown'
  
  const { effectiveType, downlink } = connection
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'slow'
  if (effectiveType === '3g' || downlink < 1.5) return 'medium'
  return 'fast'
}

export async function detectBatteryLevel(): Promise<number> {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) return 1
  
  try {
    const battery = await (navigator as any).getBattery()
    return battery.level
  } catch {
    return 1 // Assume full battery if we can't detect
  }
}