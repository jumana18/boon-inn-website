'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { RevealWords } from '@/components/motion/reveal-text'
import { EASE } from '@/lib/motion'

export function Hero({ start }: { start: boolean }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // base delay so the choreography only begins once the preloader has lifted
  const d = start ? 0.15 : 999

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Hero image: clip-path reveal + subtle continuous zoom + scroll parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y }}
        initial={reduced ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
        animate={start && !reduced ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <motion.img
          src="/images/hero.png"
          alt="Boon Inn illuminated at dusk, surrounded by lush greenery and a calm reflecting pool"
          crossOrigin="anonymous"
          className="h-full w-full object-cover"
          style={{ willChange: 'transform' }}
          animate={reduced ? undefined : { scale: [1.08, 1.16] }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/50 via-pine-deep/30 to-pine-deep/95" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-pine-deep/90 to-transparent" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: overlayY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: d }}
          className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-cream/80"
        >
          Est. by the water, for the wanderers
        </motion.p>

        <h1 className="max-w-4xl font-serif text-[3.25rem] font-light leading-[0.98] text-cream text-balance sm:text-7xl lg:text-8xl">
          <RevealWords text="Stay somewhere" delay={d + 0.1} />
          <br />
          <RevealWords text="that feels" delay={d + 0.35} />{' '}
          <span className="italic text-brass">
            <RevealWords text="welcoming." delay={d + 0.6} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: d + 0.9 }}
          className="mt-7 max-w-xl font-sans text-base leading-relaxed text-cream/85 md:text-lg"
        >
          A boutique retreat of quiet rooms, slow mornings and warm hospitality —
          designed for guests who travel to feel at home.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-4"
          initial="hidden"
          animate={start ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: d + 1.1 } } }}
        >
          {[
            { label: 'Book Your Stay', href: '#book', primary: true },
            { label: 'Explore Rooms', href: '#rooms', primary: false },
          ].map((cta) => (
            <motion.a
              key={cta.href}
              href={cta.href}
              data-cursor="arrow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className={
                cta.primary
                  ? 'group inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 font-sans text-sm font-medium text-pine-deep transition-transform duration-300 hover:scale-[1.03]'
                  : 'group inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 font-sans text-sm font-medium text-cream transition-colors duration-300 hover:bg-cream/10'
              }
            >
              {cta.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {'\u2192'}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-2 font-sans text-sm text-cream/70"
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: d + 1.5 }}
        >
          <MapPin className="h-4 w-4 text-brass" />
          Lakeside Quarter, Ubud — Bali, Indonesia
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : undefined}
        transition={{ delay: d + 1.7, duration: 0.8 }}
      >
        <motion.div
          className="h-10 w-px bg-cream/50"
          animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
