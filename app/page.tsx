'use client'

import { useState } from 'react'
import { Preloader } from '@/components/motion/preloader'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { CustomCursor } from '@/components/motion/custom-cursor'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/sections/hero'
import { Intro } from '@/components/sections/intro'
import { Rooms } from '@/components/sections/rooms'
import { Facilities } from '@/components/sections/facilities'
import { Gallery } from '@/components/sections/gallery'
import { Location } from '@/components/sections/location'
import { BookingCta } from '@/components/sections/booking-cta'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  // The hero waits for the preloader to lift before running its intro.
  const [ready, setReady] = useState(false)

  return (
    <div className="grain relative min-h-screen bg-background">
      <Preloader onComplete={() => setReady(true)} />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero start={ready} />
        <Intro />
        <Rooms />
        <Facilities />
        <Gallery />
        <Location />
        <BookingCta />
      </main>

      <Footer />
    </div>
  )
}
