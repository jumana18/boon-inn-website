'use client'

import { motion } from 'motion/react'
import { Wifi, Wind, Car, Utensils, BellRing, Coffee, Clock, Users } from 'lucide-react'
import { RevealText } from '@/components/motion/reveal-text'
import { FadeIn } from '@/components/motion/fade-in'
import { EASE } from '@/lib/motion'

const FACILITIES = [
  {
    icon: Wifi,
    title: 'Free Wi-Fi',
    text: 'High-speed wireless internet accessible seamlessly throughout all guest rooms and public areas.',
  },
  {
    icon: Wind,
    title: 'Air Conditioning',
    text: 'Individually controlled cooling in all rooms, keeping your environment comfortably relaxed.',
  },
  {
    icon: Car,
    title: 'Free Parking',
    text: 'Spacious on-site parking facilities available free of charge for all staying guests.',
  },
  {
    icon: Utensils,
    title: 'Restaurant',
    text: 'Multi-cuisine dining offering authentic Kerala delicacies alongside popular Indian favourites.',
  },
  {
    icon: BellRing,
    title: 'Room Service',
    text: 'Prompt in-room dining delivering fresh dishes and beverages directly to your comfort.',
  },
  {
    icon: Coffee,
    title: 'Breakfast',
    text: 'Fresh morning breakfast served daily to energise your day exploring Kottakkal.',
  },
  {
    icon: Clock,
    title: '24-Hour Front Desk',
    text: 'Continuous reception and guest assistance for seamless check-ins, departures, and queries.',
  },
  {
    icon: Users,
    title: 'Meeting & Event Facilities',
    text: 'Well-appointed spaces suitable for corporate meetings, conferences, and intimate gatherings.',
  },
]

export function Facilities() {
  return (
    <section id="facilities" className="relative overflow-hidden bg-pine text-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <FadeIn className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-brass" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-cream/60">
              Hotel Amenities
            </span>
          </FadeIn>
          <RevealText
            as="h2"
            className="font-serif text-4xl font-light leading-[1.05] text-balance md:text-6xl"
            lines={['Verified facilities', 'for a restful stay.']}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-cream/15 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {FACILITIES.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                data-cursor="link"
                className="group bg-pine p-7 transition-colors duration-500 hover:bg-pine-deep lg:p-8"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 text-brass transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl font-light">{f.title}</h3>
                <p className="mt-2.5 font-sans text-xs leading-relaxed text-cream/70 md:text-sm">{f.text}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
