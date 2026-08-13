'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Phone, MessageSquare, Mail } from 'lucide-react'
import { RevealText } from '@/components/motion/reveal-text'
import { EASE } from '@/lib/motion'

export function BookingCta({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const reduced = useReducedMotion()

  return (
    <section id="book" className="relative flex min-h-[80vh] items-center overflow-hidden bg-pine-deep">
      {/* revealing, slowly drifting background */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? undefined : { opacity: 0, scale: 1.15 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1.06 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <motion.img
          src="/images/boon-inn/hotel-front.jpg"
          alt="Boon Inn Kottakkal entrance and welcoming facade"
          aria-hidden
          className="h-full w-full object-cover"
          style={{ willChange: 'transform' }}
          animate={reduced ? undefined : { x: ['-2%', '2%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/70 to-pine-deep/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 text-center text-cream lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-brass"
        >
          Direct Booking &amp; Enquiries
        </motion.p>

        <RevealText
          as="h2"
          className="mx-auto max-w-3xl font-serif text-5xl font-light leading-[1] text-balance md:text-7xl"
          lines={['Plan your stay', 'in Kottakkal.']}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-cream/80 md:text-lg"
        >
          Whether visiting for world-renowned Ayurvedic healing at Arya Vaidya Sala, family travel,
          or business in Kerala, contact us directly for instant confirmations and the best rates.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } } }}
        >
          {onOpenBooking ? (
            <motion.button
              type="button"
              onClick={onOpenBooking}
              data-cursor="arrow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-brass px-8 py-4 font-sans text-sm font-medium text-pine-deep transition-transform duration-300 hover:scale-[1.03]"
            >
              Book / Enquire Room
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                {'\u2192'}
              </span>
            </motion.button>
          ) : (
            <motion.a
              href="https://wa.me/919562461111?text=Hello%20Boon%20Inn%20Kottakkal%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability."
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="arrow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-brass px-8 py-4 font-sans text-sm font-medium text-pine-deep transition-transform duration-300 hover:scale-[1.03]"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Reservation
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                {'\u2192'}
              </span>
            </motion.a>
          )}

          <motion.a
            href="tel:+919562461111"
            data-cursor="link"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-8 py-4 font-sans text-sm font-medium text-cream transition-colors duration-300 hover:bg-cream/10"
          >
            <Phone className="h-4 w-4 text-brass" />
            Call +91 95624 61111
          </motion.a>

          <motion.a
            href="mailto:info@booninn.com"
            data-cursor="link"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-4 font-sans text-sm text-cream/80 transition-colors duration-300 hover:bg-cream/10"
          >
            <Mail className="h-4 w-4 text-brass" />
            info@booninn.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
