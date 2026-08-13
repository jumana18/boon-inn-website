'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Phone, MessageSquare, Mail, Calendar, Users, BedDouble, CheckCircle2 } from 'lucide-react'
import { EASE } from '@/lib/motion'

export type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
  initialRoom?: string
}

export function BookingModal({ isOpen, onClose, initialRoom = 'Family Suite Room' }: BookingModalProps) {
  const [selectedRoom, setSelectedRoom] = useState(initialRoom)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2 Guests')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (initialRoom) {
      setSelectedRoom(initialRoom)
    }
  }, [initialRoom])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setSubmitted(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Prepare WhatsApp Message URL
  const handleWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Hello Boon Inn Kottakkal,\n\nI would like to enquire about a room reservation:\n• Room Type: ${selectedRoom}\n• Check-In: ${checkIn || 'To be decided'}\n• Check-Out: ${checkOut || 'To be decided'}\n• Guests: ${guests}\n• Name: ${name || 'Guest'}\n• Phone: ${phone || 'Not provided'}\n\nPlease let me know the availability and confirmation details.`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/919562461111?text=${encoded}`, '_blank')
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-pine-deep/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-cream/20 bg-pine-deep p-6 text-cream shadow-2xl md:p-8"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close reservation modal"
              className="absolute right-5 top-5 rounded-full border border-cream/20 p-2 text-cream/70 transition-colors hover:border-cream hover:bg-cream/10 hover:text-cream"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-brass">
                Direct Reservation &amp; Enquiry
              </span>
              <h3 className="mt-1 font-serif text-2xl font-light text-cream md:text-3xl">
                Stay at Boon Inn Kottakkal
              </h3>
              <p className="mt-1 font-sans text-xs text-cream/70 md:text-sm">
                Reserve directly with our front desk for instant confirmation and the best rate.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brass/20 text-brass">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h4 className="font-serif text-2xl font-light text-cream">Enquiry Redirected</h4>
                <p className="mx-auto mt-2 max-w-md font-sans text-sm text-cream/80">
                  Thank you! Your enquiry details have been opened in WhatsApp to connect directly with the Boon Inn front desk team.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="tel:+919562461111"
                    className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-2.5 font-sans text-sm font-medium text-pine-deep"
                  >
                    <Phone className="h-4 w-4" /> Call +91 95624 61111
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-cream/30 px-6 py-2.5 font-sans text-sm text-cream hover:bg-cream/10"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleWhatsAppEnquiry} className="space-y-4">
                {/* Room Selection */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-cream/80">
                    <BedDouble className="h-3.5 w-3.5 text-brass" /> Select Room Category
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {[
                      { name: 'Family Suite Room', rate: 'from ₹5,600/night' },
                      { name: 'Superior Room – Twin', rate: 'from ₹1,700/night' },
                      { name: 'Superior Room – Double', rate: 'Best Available Rate' },
                    ].map((room) => (
                      <button
                        type="button"
                        key={room.name}
                        onClick={() => setSelectedRoom(room.name)}
                        className={`flex flex-col items-start justify-between rounded-lg border p-3 text-left transition-all ${
                          selectedRoom === room.name
                            ? 'border-brass bg-brass/15 text-cream ring-1 ring-brass'
                            : 'border-cream/15 bg-white/5 text-cream/80 hover:border-cream/40'
                        }`}
                      >
                        <span className="font-sans text-xs font-semibold text-cream">{room.name}</span>
                        <span className="mt-1 font-sans text-[11px] text-brass">{room.rate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block font-sans text-xs text-cream/70">Check-in Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full rounded-md border border-cream/20 bg-pine px-3 py-2 font-sans text-sm text-cream placeholder-cream/40 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block font-sans text-xs text-cream/70">Check-out Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full rounded-md border border-cream/20 bg-pine px-3 py-2 font-sans text-sm text-cream placeholder-cream/40 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block font-sans text-xs text-cream/70">Guests / Occupancy</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded-md border border-cream/20 bg-pine px-3 py-2 font-sans text-sm text-cream focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4+ Family">4+ Family</option>
                    </select>
                  </div>
                </div>

                {/* Contact inputs */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-sans text-xs text-cream/70">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Menon"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-cream/20 bg-pine px-3 py-2 font-sans text-sm text-cream placeholder-cream/40 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-sans text-xs text-cream/70">Contact Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-md border border-cream/20 bg-pine px-3 py-2 font-sans text-sm text-cream placeholder-cream/40 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                    />
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brass px-6 py-3.5 font-sans text-sm font-semibold text-pine-deep transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
                  >
                    <MessageSquare className="h-4 w-4" /> Send Instant Reservation via WhatsApp
                  </button>
                </div>

                {/* Direct Quick Contact options */}
                <div className="mt-4 border-t border-cream/15 pt-4">
                  <p className="text-center font-sans text-xs text-cream/60">Or connect with the front desk directly:</p>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <a
                      href="tel:+919562461111"
                      className="flex items-center justify-center gap-2 rounded-lg border border-cream/20 bg-white/5 py-2 px-3 font-sans text-xs text-cream transition-colors hover:border-brass hover:bg-brass/10"
                    >
                      <Phone className="h-3.5 w-3.5 text-brass" /> +91 95624 61111
                    </a>
                    <a
                      href="tel:+914832641111"
                      className="flex items-center justify-center gap-2 rounded-lg border border-cream/20 bg-white/5 py-2 px-3 font-sans text-xs text-cream transition-colors hover:border-brass hover:bg-brass/10"
                    >
                      <Phone className="h-3.5 w-3.5 text-brass" /> +91 483 264 1111
                    </a>
                    <a
                      href="mailto:info@booninn.com"
                      className="flex items-center justify-center gap-2 rounded-lg border border-cream/20 bg-white/5 py-2 px-3 font-sans text-xs text-cream transition-colors hover:border-brass hover:bg-brass/10"
                    >
                      <Mail className="h-3.5 w-3.5 text-brass" /> info@booninn.com
                    </a>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
