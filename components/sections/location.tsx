'use client'

import { MapPin, Clock, Plane } from 'lucide-react'
import { RevealText } from '@/components/motion/reveal-text'
import { FadeIn } from '@/components/motion/fade-in'
import { Parallax } from '@/components/motion/parallax'

const DETAILS = [
  { icon: MapPin, label: 'Address', value: 'Jalan Danau, Lakeside Quarter, Ubud, Bali 80571' },
  { icon: Clock, label: 'Check-in', value: 'From 2:00 PM · Check-out by 11:00 AM' },
  { icon: Plane, label: 'Getting here', value: '55 minutes from Ngurah Rai International Airport' },
]

export function Location() {
  return (
    <>
      {/* full-width parallax image break for visual continuity */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <Parallax amount={70} className="h-full w-full">
          <img
            src="/images/cta.png"
            alt="Boon Inn's pool terrace glowing at dusk"
            loading="lazy"
            decoding="async"
            crossOrigin="anonymous"
            className="h-[120%] w-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-pine-deep/25" />
      </section>

      <section id="location" className="relative bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <FadeIn className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-brass" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Location
                </span>
              </FadeIn>
              <RevealText
                as="h2"
                className="font-serif text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl"
                lines={['Tucked beside', 'the lake, close', 'to everything.']}
              />
              <FadeIn delay={1} className="mt-8">
                <p className="max-w-md font-sans text-base leading-relaxed text-muted-foreground">
                  Boon Inn sits on a quiet lane at the edge of the water — minutes from
                  the market, the temples and the rice terraces, yet far enough to feel
                  like a retreat.
                </p>
                <ul className="mt-8 space-y-6">
                  {DETAILS.map((d) => {
                    const Icon = d.icon
                    return (
                      <li key={d.label} className="flex items-start gap-4">
                        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {d.label}
                          </p>
                          <p className="mt-1 font-sans text-base text-foreground">{d.value}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </FadeIn>
            </div>

            <FadeIn delay={1} className="min-h-[360px] overflow-hidden rounded-sm border border-border lg:min-h-full">
              <iframe
                title="Map showing Boon Inn in Ubud, Bali"
                src="https://maps.google.com/maps?q=Ubud%2C%20Bali&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-full min-h-[360px] w-full grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
