'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { RevealText } from '@/components/motion/reveal-text'
import { FadeIn } from '@/components/motion/fade-in'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Shot = { src: string; title: string; span: string }

const SHOTS: Shot[] = [
  { src: '/images/boon-inn/gallery-facade.jpg', title: 'Hotel Architecture & Exterior', span: 'lg:col-span-7 lg:row-span-2' },
  { src: '/images/boon-inn/gallery-lobby-1.jpg', title: 'Lobby & Reception Lounge', span: 'lg:col-span-5' },
  { src: '/images/boon-inn/gallery-dining-1.jpg', title: 'Multi-Cuisine Restaurant', span: 'lg:col-span-5' },
  { src: '/images/boon-inn/gallery-suite-living.jpg', title: 'Family Suite Living Area', span: 'lg:col-span-5' },
  { src: '/images/boon-inn/conference-hall.jpg', title: 'Conference & Banquet Facilities', span: 'lg:col-span-3' },
  { src: '/images/boon-inn/gallery-twin-interior.jpg', title: 'Superior Room Interior', span: 'lg:col-span-4' },
]

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null

  const close = useCallback(() => setIndex(null), [])
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % SHOTS.length)),
    [],
  )
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + SHOTS.length) % SHOTS.length)),
    [],
  )

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, next, prev])

  return (
    <section id="gallery" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <FadeIn className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Visual Tour
              </span>
            </FadeIn>
            <RevealText
              as="h2"
              className="font-serif text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl"
              lines={['A glimpse inside', 'Boon Inn Kottakkal.']}
            />
          </div>
          <FadeIn delay={1} className="max-w-xs">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Tap any image to view in full detail. Authentic photographs of Boon Inn Kottakkal.
            </p>
          </FadeIn>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-12">
          {SHOTS.map((shot, i) => (
            <motion.button
              type="button"
              key={shot.src}
              onClick={() => setIndex(i)}
              data-cursor="view"
              className={cn('group relative overflow-hidden rounded-sm bg-pine-deep/10', shot.span)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <img
                src={shot.src}
                alt={shot.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-pine-deep/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 translate-y-2 font-serif text-lg text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {shot.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-pine-deep/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-10 text-cream/80 transition-colors hover:text-cream"
            >
              <X className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous image"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10 md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next image"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10 md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                className="mx-auto flex max-h-[85vh] w-[90vw] max-w-4xl flex-col items-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) next()
                  else if (info.offset.x > 80) prev()
                }}
              >
                <img
                  src={SHOTS[index].src}
                  alt={SHOTS[index].title}
                  className="max-h-[78vh] w-auto rounded-sm object-contain"
                  draggable={false}
                />
                <figcaption className="mt-4 font-sans text-sm tracking-wide text-cream/70">
                  {SHOTS[index].title} — {index + 1} / {SHOTS.length}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
