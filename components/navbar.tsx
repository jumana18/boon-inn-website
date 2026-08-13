'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
]

export function Navbar() {
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
            <span className="sr-only">Boon Inn home</span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
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
              href="#book"
              data-cursor="arrow"
              className="group inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 font-sans text-sm font-medium text-pine-deep transition-transform duration-300 hover:scale-[1.03]"
            >
              Book Your Stay
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {'\u2192'}
              </span>
            </a>
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
              <Logo className="text-3xl" />
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
              className="flex flex-1 flex-col justify-center gap-3 px-8"
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
                    className="block border-b border-cream/15 py-4 font-serif text-4xl font-light"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="px-8 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            >
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-4 font-sans font-medium text-pine-deep"
              >
                Book Your Stay {'\u2192'}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
