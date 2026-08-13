'use client'

import { motion } from 'motion/react'
import { RevealText } from '@/components/motion/reveal-text'
import { FadeIn } from '@/components/motion/fade-in'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Room = {
  name: string
  price: string
  size: string
  description: string
  image: string
  alt: string
}

const ROOMS: Room[] = [
  {
    name: 'The Signature Suite',
    price: 'from $280 / night',
    size: '48 m² · Pool view',
    description: 'Our largest room, with a king bed, a deep soaking tub and a private balcony over the water.',
    image: '/images/room-suite.png',
    alt: 'The Signature Suite with a king bed, cream linens and brass accents',
  },
  {
    name: 'Deluxe Retreat',
    price: 'from $190 / night',
    size: '32 m² · Reading nook',
    description: 'A warm, layered room with a window seat made for slow mornings and long books.',
    image: '/images/room-deluxe.png',
    alt: 'The Deluxe Retreat room with a cozy reading nook and warm lamp light',
  },
  {
    name: 'Garden Room',
    price: 'from $150 / night',
    size: '28 m² · Private terrace',
    description: 'Ground-floor calm opening straight onto a private terrace framed by tropical planting.',
    image: '/images/room-garden.png',
    alt: 'The Garden Room opening onto a private planted terrace',
  },
]

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.article
      className={cn('group', index === 1 && 'lg:mt-16')}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
    >
      <a href="#book" data-cursor="view" className="block">
        <motion.div
          className="relative overflow-hidden rounded-sm"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="aspect-[3/4] w-full overflow-hidden">
            <img
              src={room.image || '/placeholder.svg'}
              alt={room.alt}
              loading="lazy"
              decoding="async"
              crossOrigin="anonymous"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
          </div>

          {/* darkening overlay on hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-deep/70 via-pine-deep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* view room affordance */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2 text-cream opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span className="font-sans text-sm tracking-wide">View Room</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              {'\u2192'}
            </span>
          </div>
        </motion.div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl font-light text-foreground">{room.name}</h3>
          <span className="whitespace-nowrap font-sans text-sm text-brass">{room.price}</span>
        </div>
        <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {room.size}
        </p>
        <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
          {room.description}
        </p>
      </a>
    </motion.article>
  )
}

export function Rooms() {
  return (
    <section id="rooms" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <FadeIn className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Rooms &amp; Suites
              </span>
            </FadeIn>
            <RevealText
              as="h2"
              className="font-serif text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl"
              lines={['Twenty-four rooms.', 'No two quite alike.']}
            />
          </div>
          <FadeIn delay={1} className="max-w-xs">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Each room is styled individually, so you always arrive somewhere with a
              little character of its own.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
