'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

export type CursorVariant = 'default' | 'hover' | 'view' | 'book' | 'explore' | 'arrow' | 'link' | 'input'

export type CursorState = {
  variant: CursorVariant
  label: string
}

/**
 * High-Contrast Luxury Custom Cursor.
 * Features a dual indicator:
 * 1. Precision Center Dot (high-contrast luminous ivory dot with pine/gold contrast borders)
 * 2. Fluid Outer Ring (smooth trailing brass ring that expands on interactive elements)
 * Desktop (fine pointer) only.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>({ variant: 'default', label: '' })
  const [visible, setVisible] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  // Direct fast-tracking coordinates for the center dot (precision pointer)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 45, mass: 0.2 })
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 45, mass: 0.2 })

  // Fluid trailing spring for the outer ring (silky luxury physics)
  const ringX = useSpring(mouseX, { stiffness: 360, damping: 30, mass: 0.45 })
  const ringY = useSpring(mouseY, { stiffness: 360, damping: 30, mass: 0.45 })

  useEffect(() => {
    // Only enable on desktop devices with a fine pointer (mouse / trackpad)
    const fineQuery = window.matchMedia('(pointer: fine) and (hover: hover)')
    if (!fineQuery.matches) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)

      const target = (e.target as HTMLElement | null)?.closest(
        '[data-cursor], button, a, input, select, textarea, [role="button"], label, summary'
      ) as HTMLElement | null

      if (target) {
        const customType = target.dataset.cursor as CursorVariant | undefined
        const customLabel = target.dataset.cursorLabel

        if (customType) {
          let derivedLabel = customLabel || ''
          if (!derivedLabel) {
            if (customType === 'view') derivedLabel = 'View'
            else if (customType === 'book') derivedLabel = 'Book'
            else if (customType === 'explore') derivedLabel = 'Explore'
            else if (customType === 'arrow') derivedLabel = '→'
          }
          setState({ variant: customType, label: derivedLabel })
        } else {
          const tagName = target.tagName.toLowerCase()
          if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
            setState({ variant: 'input', label: '' })
          } else {
            setState({ variant: 'hover', label: '' })
          }
        }
      } else {
        setState({ variant: 'default', label: '' })
      }
    }

    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)
    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [mouseX, mouseY, visible])

  if (!enabled) return null

  const isLabeled = Boolean(state.label)
  const isInput = state.variant === 'input'
  const isHovered = state.variant === 'hover' || state.variant === 'link'

  // Outer ring dynamic dimensions & styling
  let ringSize = 34
  let ringBg = 'rgba(212, 175, 55, 0.06)'
  let ringBorder = 'rgba(212, 175, 55, 0.85)'
  let ringGlow = '0 0 10px rgba(212, 175, 55, 0.4), 0 2px 6px rgba(0, 0, 0, 0.4)'

  if (isLabeled) {
    ringSize = 70
    ringBg = 'oklch(0.78 0.12 78)' // Solid luxury gold disc for readable badge
    ringBorder = 'oklch(0.96 0.03 85)'
    ringGlow = '0 0 16px rgba(212, 175, 55, 0.6), 0 4px 12px rgba(0, 0, 0, 0.5)'
  } else if (isInput) {
    ringSize = 22
    ringBg = 'rgba(212, 175, 55, 0.12)'
    ringBorder = 'rgba(243, 237, 225, 0.9)'
    ringGlow = '0 0 8px rgba(212, 175, 55, 0.5)'
  } else if (isHovered) {
    ringSize = 48
    ringBg = 'rgba(212, 175, 55, 0.18)'
    ringBorder = 'rgba(243, 237, 225, 0.95)'
    ringGlow = '0 0 14px rgba(212, 175, 55, 0.5), 0 2px 8px rgba(0, 0, 0, 0.35)'
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
    >
      {/* 1. Fluid Trailing Outer Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isMouseDown ? 0.9 : 1,
        }}
        transition={{ duration: 0.18 }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full text-pine-deep font-sans font-semibold backdrop-blur-[1px]"
          animate={{
            width: ringSize,
            height: ringSize,
            backgroundColor: ringBg,
            borderColor: ringBorder,
            boxShadow: ringGlow,
          }}
          style={{
            borderWidth: isLabeled ? '1px' : '1.5px',
            borderStyle: 'solid',
          }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 28,
          }}
        >
          <AnimatePresence mode="wait">
            {isLabeled && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className={`font-sans font-bold uppercase tracking-wider text-pine-deep ${
                  state.label === '→' ? 'text-lg leading-none' : 'text-[11px]'
                }`}
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* 2. Precision Center Dot (Always Visible for Pinpoint Aiming) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible && !isLabeled ? 1 : 0,
          scale: isMouseDown ? 0.75 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="h-[7px] w-[7px] rounded-full bg-[#FAF5EB]"
          style={{
            boxShadow:
              '0 0 0 1.5px rgba(22, 42, 34, 0.85), 0 0 6px rgba(212, 175, 55, 0.9), 0 0 12px rgba(250, 245, 235, 0.6)',
          }}
        />
      </motion.div>
    </div>
  )
}
