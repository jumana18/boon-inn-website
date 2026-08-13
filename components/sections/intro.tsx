'use client'

import { RevealText } from '@/components/motion/reveal-text'
import { FadeIn } from '@/components/motion/fade-in'
import { Parallax } from '@/components/motion/parallax'
import { ImageReveal } from '@/components/motion/image-reveal'

export function Intro() {
  return (
    <section id="about" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <FadeIn className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                The Boon Inn Philosophy
              </span>
            </FadeIn>

            <RevealText
              as="h2"
              className="font-serif text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl"
              lines={['A small hotel', 'with a generous', 'sense of welcome.']}
            />

            <FadeIn delay={1} className="mt-8 max-w-md">
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                We built Boon Inn around a simple idea: that a place to stay should feel
                personal. Twenty-four rooms, a handful of quiet corners, and a team that
                remembers your name. No sprawling lobbies — just considered spaces and
                warm light.
              </p>
              <p className="mt-5 font-sans text-base leading-relaxed text-muted-foreground">
                Every detail, from the linen to the morning coffee, is chosen to make
                slowing down feel effortless.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-6">
            {/* Image overlaps toward the text column on large screens */}
            <Parallax amount={50} className="rounded-sm lg:-ml-10">
              <ImageReveal
                src="/images/about.png"
                alt="The warm, plant-filled lounge at Boon Inn with a fireplace and soft evening light"
                direction="right"
                className="aspect-[4/5] w-full rounded-sm"
                imgClassName="scale-110"
              />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
