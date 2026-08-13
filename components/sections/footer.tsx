'use client'

import { motion } from 'motion/react'
import { AtSign, Send, Mail } from 'lucide-react'
import { Logo } from '@/components/logo'
import { EASE } from '@/lib/motion'

const NAV = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Book', href: '#book' },
]

const SOCIALS = [
  { icon: AtSign, label: 'Instagram', href: '#' },
  { icon: Send, label: 'Telegram', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:stay@booninn.com' },
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
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
              A boutique retreat of quiet rooms and warm hospitality, on the edge of the
              lake in Ubud, Bali.
            </p>
          </motion.div>

          <motion.nav variants={item} aria-label="Footer">
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
              Get in touch
            </p>
            <address className="space-y-2 font-sans text-sm not-italic text-cream/80">
              <p>Jalan Danau, Lakeside Quarter</p>
              <p>Ubud, Bali 80571</p>
              <p>
                <a href="mailto:stay@booninn.com" className="link-underline" data-cursor="link">
                  stay@booninn.com
                </a>
              </p>
              <p>+62 000 000 000</p>
            </address>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
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
          <p>&copy; {new Date().getFullYear()} Boon Inn. All rights reserved.</p>
          <p>Designed for guests who travel to feel at home.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
