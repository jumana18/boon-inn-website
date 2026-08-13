'use client'

import { motion } from 'motion/react'
import { Utensils, Flower2, Sunset, BellRing, Wifi, Compass } from 'lucide-react'
import { RevealText } from '@/components/motion/reveal-text'
import { FadeIn } from '@/components/motion/fade-in'
import { EASE } from '@/lib/motion'

const FACILITIES = [
  { icon: Utensils, title: 'Restaurant & Bar', text: 'Seasonal small plates and slow cocktails in an intimate candlelit room.' },
  { icon: Flower2, title: 'Spa & Wellness', text: 'Stone soaking tubs, treatments and a quiet space to unwind completely.' },
  { icon: Sunset, title: 'Rooftop Terrace', text: 'Lounge seating and string lights for golden-hour drinks above the trees.' },
  { icon: BellRing, title: '24/7 Concierge', text: 'A real person, any hour — for reservations, directions or a late arrival.' },
  { icon: Wifi, title: 'Fast Wi-Fi', text: 'Reliable connectivity throughout, for the days you can’t fully switch off.' },
  { icon: Compass, title: 'Curated Experiences', text: 'Hand-picked walks, markets and hidden spots, arranged just for you.' },
]

export function Facilities() {
  return (
    <section id="facilities" className="relative overflow-hidden bg-pine text-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <FadeIn className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-brass" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-cream/60">
              Facilities
            </span>
          </FadeIn>
          <RevealText
            as="h2"
            className="font-serif text-4xl font-light leading-[1.05] text-balance md:text-6xl"
            lines={['Everything you need,', 'nothing you don’t.']}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-cream/15 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {FACILITIES.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                data-cursor="link"
                className="group bg-pine p-8 transition-colors duration-500 hover:bg-pine-deep md:p-10"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 text-brass transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-2xl font-light">{f.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-cream/70">{f.text}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
