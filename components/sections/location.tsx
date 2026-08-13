'use client'

import { MapPin, Train, Plane, Landmark, Compass, Navigation } from 'lucide-react'
import { RevealText } from '@/components/motion/reveal-text'
import { FadeIn } from '@/components/motion/fade-in'
import { Parallax } from '@/components/motion/parallax'

const TRAVEL_DETAILS = [
  {
    icon: Landmark,
    label: 'Arya Vaidya Sala Museum',
    value: 'Approximately 1 km — quick 3-minute drive or short walk',
  },
  {
    icon: Compass,
    label: 'Sree Kadampuzha Bhagavathy Temple',
    value: 'Approximately 20 minutes by car',
  },
  {
    icon: Train,
    label: 'Tirur Railway Station',
    value: 'Approximately 25 minutes',
  },
  {
    icon: Plane,
    label: 'Calicut International Airport (CCJ)',
    value: 'Approximately 45 minutes',
  },
]

export function Location() {
  return (
    <>
      {/* full-width parallax image break for visual continuity */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <Parallax amount={70} className="h-full w-full">
          <img
            src="/images/boon-inn/kottakkal-heritage.jpg"
            alt="Scenic Kottakkal surroundings and heritage of the city of Ayurveda"
            loading="lazy"
            decoding="async"
            className="h-[120%] w-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-pine-deep/30" />
      </section>

      <section id="location" className="relative bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <FadeIn className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-brass" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Location &amp; Travel
                </span>
              </FadeIn>
              <RevealText
                as="h2"
                className="font-serif text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl"
                lines={['Easily accessible', 'on NH-17 in', 'Kottakkal.']}
              />
              <FadeIn delay={1} className="mt-8">
                <p className="max-w-md font-sans text-base leading-relaxed text-muted-foreground">
                  Located along NH-17 at Parambilangadi, Boon Inn offers seamless road access
                  to Kottakkal&apos;s renowned Ayurvedic centers, cultural landmarks, and Malappuram
                  transit hubs.
                </p>

                {/* Main Address Card */}
                <div className="mt-6 rounded-lg border border-border/80 bg-card p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                        Hotel Address
                      </p>
                      <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                        NH-17, Parambilangadi, Kottakkal, Malappuram, Kerala – 676501, India
                      </p>
                    </div>
                  </div>
                  <div className="mt-3.5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-3">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Boon+Inn+Parambilangadi+Kottakkal+Kerala"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-2 font-sans text-xs font-semibold text-pine-deep transition-transform duration-200 hover:scale-105"
                    >
                      <Navigation className="h-3.5 w-3.5" /> Get Directions
                    </a>
                    <a
                      href="tel:+919562461111"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-sans text-xs font-medium text-foreground transition-colors hover:border-brass hover:text-brass"
                    >
                      Call Front Desk: +91 95624 61111
                    </a>
                  </div>
                </div>

                <ul className="mt-8 space-y-5">
                  {TRAVEL_DETAILS.map((d) => {
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

            <FadeIn delay={1} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm lg:min-h-[500px]">
              <div className="border-b border-border/70 bg-muted/40 px-5 py-3.5">
                <p className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Google Maps — Boon Inn Kottakkal, Kerala
                </p>
              </div>
              <div className="relative min-h-[380px] flex-1 w-full">
                <iframe
                  title="Map showing Boon Inn in Kottakkal, Kerala"
                  src="https://maps.google.com/maps?q=Boon%20Inn%20Parambilangadi%20Kottakkal%20Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center justify-between bg-card px-5 py-3 text-xs text-muted-foreground">
                <span>NH-17, Parambilangadi, Kottakkal</span>
                <a
                  href="https://maps.google.com/?q=Boon+Inn+NH-17+Parambilangadi+Kottakkal+Malappuram+Kerala+676501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brass hover:underline"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
