'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
]

export function Navbar({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 40)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled
            ? 'border-b border-border/60 bg-background/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 lg:px-10',
            scrolled ? 'py-3' : 'py-5',
          )}
        >
          <a
            href="#top"
            data-cursor="link"
            className={cn(
              'transition-all duration-500',
              scrolled ? 'text-2xl text-foreground' : 'text-3xl text-cream',
            )}
          >
            <Logo />
            <span className="sr-only">Boon Inn Kottakkal</span>
          </a>

          <div className="hidden items-center gap-7 lg:gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="link"
                className={cn(
                  'link-underline font-sans text-sm tracking-wide transition-colors',
                  scrolled ? 'text-foreground/80 hover:text-foreground' : 'text-cream/85 hover:text-cream',
                )}
              >
                {l.label}
              </a>
            ))}

            <a
              href="tel:+919562461111"
              data-cursor="link"
              className={cn(
                'inline-flex items-center gap-1.5 font-sans text-xs tracking-wider transition-colors',
                scrolled ? 'text-foreground/70 hover:text-foreground' : 'text-cream/70 hover:text-cream',
              )}
            >
              <Phone className="h-3.5 w-3.5 text-brass" />
              +91 95624 61111
            </a>

            {onOpenBooking ? (
              <button
                type="button"
                onClick={onOpenBooking}
                data-cursor="arrow"
                className="group inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 font-sans text-sm font-medium text-pine-deep transition-transform duration-300 hover:scale-[1.03]"
              >
                Book Your Stay
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {'\u2192'}
                </span>
              </button>
            ) : (
              <a
                href="#book"
                data-cursor="arrow"
                className="group inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 font-sans text-sm font-medium text-pine-deep transition-transform duration-300 hover:scale-[1.03]"
              >
                Book Your Stay
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {'\u2192'}
                </span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            data-cursor="link"
            className={cn(
              'md:hidden',
              scrolled ? 'text-foreground' : 'text-cream',
            )}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-pine-deep text-cream md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <Logo className="text-3xl" />
                <span className="block font-sans text-[11px] uppercase tracking-[0.2em] text-brass">
                  Kottakkal, Kerala
                </span>
              </div>
              <motion.button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-cream"
              >
                <X className="h-7 w-7" />
              </motion.button>
            </div>

            <motion.ul
              className="flex flex-1 flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-cream/15 py-3 font-serif text-3xl font-light"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="space-y-3 px-8 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            >
              {onOpenBooking ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onOpenBooking()
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brass px-6 py-3.5 font-sans font-medium text-pine-deep"
                >
                  Book Your Stay {'\u2192'}
                </button>
              ) : (
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-3.5 font-sans font-medium text-pine-deep"
                >
                  Book Your Stay {'\u2192'}
                </a>
              )}

              <div className="flex flex-col gap-2 pt-2 text-xs text-cream/70">
                <a href="tel:+919562461111" className="flex items-center gap-2 text-cream/90 hover:text-brass">
                  <Phone className="h-3.5 w-3.5 text-brass" /> +91 95624 61111 / +91 483 264 1111
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-brass shrink-0" /> NH-17, Parambilangadi, Kottakkal
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
