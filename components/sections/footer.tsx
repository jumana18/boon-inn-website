'use client'

import { motion } from 'motion/react'
import { Phone, Mail, MessageSquare, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'
import { EASE } from '@/lib/motion'

const NAV = [
  { label: 'Rooms & Suites', href: '#rooms' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Visual Gallery', href: '#gallery' },
  { label: 'Location & Map', href: '#location' },
  { label: 'Book Your Stay', href: '#book' },
]

const CONTACT_LINKS = [
  {
    icon: Phone,
    label: 'Call Us',
    href: 'tel:+919562461111',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    href: 'https://wa.me/919562461111?text=Hello%20Boon%20Inn%20Kottakkal%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability.',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:info@booninn.com',
  },
  {
    icon: MapPin,
    label: 'Google Maps',
    href: 'https://maps.google.com/?q=Boon+Inn+NH-17+Parambilangadi+Kottakkal+Malappuram+Kerala+676501',
  },
]

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export function Footer() {
  return (
    <footer className="bg-pine-deep text-cream">
      <motion.div
        className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <motion.div variants={item}>
            <Logo className="text-3xl" />
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-brass">
              Kottakkal, Kerala
            </p>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-cream/70">
              Refined comfort, modern facilities, and warm Kerala hospitality on NH-17,
              Parambilangadi, Kottakkal — the city of Ayurveda.
            </p>
          </motion.div>

          <motion.nav variants={item} aria-label="Footer Navigation">
            <p className="mb-5 font-sans text-xs uppercase tracking-[0.3em] text-cream/50">
              Explore
            </p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    data-cursor="link"
                    className="link-underline font-sans text-sm text-cream/80 transition-colors hover:text-cream"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={item}>
            <p className="mb-5 font-sans text-xs uppercase tracking-[0.3em] text-cream/50">
              Contact &amp; Location
            </p>
            <address className="space-y-2 font-sans text-sm not-italic text-cream/80">
              <p className="text-cream">
                NH-17, Parambilangadi, Kottakkal,
                <br />
                Malappuram, Kerala – 676501, India
              </p>
              <p className="pt-2">
                <a
                  href="mailto:info@booninn.com"
                  className="link-underline text-brass hover:text-cream"
                  data-cursor="link"
                >
                  info@booninn.com
                </a>
              </p>
              <p className="space-x-2">
                <a href="tel:+919562461111" className="hover:text-brass">
                  +91 95624 61111
                </a>
                <span>·</span>
                <a href="tel:+914832641111" className="hover:text-brass">
                  +91 483 264 1111
                </a>
              </p>
            </address>

            <div className="mt-6 flex gap-3">
              {CONTACT_LINKS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    title={s.label}
                    data-cursor="link"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-pine-deep"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-8 font-sans text-xs text-cream/50 sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} Boon Inn Kottakkal. All rights reserved.</p>
          <p>Kottakkal, Kerala — The City of Ayurveda.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
