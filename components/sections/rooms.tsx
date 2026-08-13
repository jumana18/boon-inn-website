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
    name: 'Family Suite Room',
    price: 'from ₹5,600 / night',
    size: 'Spacious Suite · Ideal for Families',
    description: 'Our most expansive accommodation, offering generous living space, plush bedding, air conditioning, and premium amenities tailored for families and extended stays.',
    image: '/images/room-suite.png',
    alt: 'Family Suite Room at Boon Inn Kottakkal with spacious layout and warm lighting',
  },
  {
    name: 'Superior Room – Twin',
    price: 'from ₹1,700 / night',
    size: 'Twin Beds · Air Conditioned',
    description: 'A comfortable, well-appointed room featuring twin beds, climate control, high-speed Wi-Fi, and a modern ensuite bathroom — ideal for friends and business travellers.',
    image: '/images/room-garden.png',
    alt: 'Superior Twin Room at Boon Inn Kottakkal featuring two comfortable single beds',
  },
  {
    name: 'Superior Room – Double',
    price: 'Best Available Rate',
    size: 'Double Bed · Air Conditioned',
    description: 'An inviting haven with a plush double bed, fine linens, air conditioning, and tranquil ambiance for solo travelers or couples visiting Kottakkal.',
    image: '/images/room-deluxe.png',
    alt: 'Superior Double Room at Boon Inn Kottakkal featuring a comfortable double bed',
  },
]

function RoomCard({
  room,
  index,
  onSelect,
}: {
  room: Room
  index: number
  onSelect?: (name: string) => void
}) {
  return (
    <motion.article
      className={cn('group', index === 1 && 'lg:mt-16')}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect?.(room.name)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect?.(room.name)
          }
        }}
        data-cursor="view"
        className="block text-left cursor-pointer focus:outline-none"
      >
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
            <span className="font-sans text-sm tracking-wide">Reserve / Enquire</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              {'\u2192'}
            </span>
          </div>
        </motion.div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl font-light text-foreground">{room.name}</h3>
          <span className="whitespace-nowrap font-sans text-sm font-medium text-brass">
            {room.price}
          </span>
        </div>
        <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {room.size}
        </p>
        <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
          {room.description}
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-medium text-brass group-hover:underline">
          <span>Check Availability &amp; Book</span>
          <span>{'\u2192'}</span>
        </div>
      </div>
    </motion.article>
  )
}

export function Rooms({ onSelectRoom }: { onSelectRoom?: (name: string) => void }) {
  return (
    <section id="rooms" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <FadeIn className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Accommodations in Kottakkal
              </span>
            </FadeIn>
            <RevealText
              as="h2"
              className="font-serif text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl"
              lines={['Thoughtful comfort,', 'crafted for your stay.']}
            />
          </div>
          <FadeIn delay={1} className="max-w-xs">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Air-conditioned rooms and suites designed for deep rest, whether you are visiting
              Arya Vaidya Sala or traveling through Malappuram.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => (
            <RoomCard
              key={room.name}
              room={room}
              index={i}
              onSelect={
                onSelectRoom
                  ? (name) => onSelectRoom(name)
                  : () => {
                      const el = document.getElementById('book')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
