import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDeck } from '../components/Deck/DeckEngine'
import './VenueDirectorySection.css'

const EVENT_SPACES = [
  { name: 'The Grand Hall', capacity: '5,000+', type: 'Concerts · Galas · Expos' },
  { name: 'Retail Activation Zones', capacity: 'Flexible', type: 'Pop-Ups · Product Launches' },
  { name: 'Nickelodeon Universe (Buyout)', capacity: '3,000', type: 'Corporate Events · Parties' },
  { name: 'DreamWorks Water Park (Buyout)', capacity: '2,500', type: 'Private Experiences' },
  { name: 'The Avenue (Evening Events)', capacity: '800', type: 'Luxury Galas · Brand Dinners' },
]

export default function VenueDirectorySection() {
  const { goToSlideById } = useDeck()
  const [inView, setInView] = useState(false)
  const [glowBtn, setGlowBtn] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setInView(true)
          setTimeout(() => setGlowBtn(true), 5000)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="venue-directory" className="venue-dir-section" ref={ref}>
      <div className="venue-dir-section__inner">
        <motion.div
          className="venue-dir-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Venue Directory</span>
          <h2 className="venue-dir-title">Available Spaces & <em>Capacities</em></h2>
          <div className="gold-line gold-line-center" />
        </motion.div>

        <motion.div
          className="venue-dir-table-wrap"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="venue-dir-table">
            {EVENT_SPACES.map((space, i) => (
              <motion.div 
                key={space.name} 
                className="venue-dir-row"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <span className="venue-dir-row__num">0{i + 1}</span>
                <span className="venue-dir-row__name">{space.name}</span>
                <div className="venue-dir-row__divider" />
                <span className="venue-dir-row__cap">{space.capacity} guests</span>
                <span className="venue-dir-row__type">{space.type}</span>
                <button
                  className="venue-dir-row__btn"
                  onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Inquire
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="venue-dir-kpis"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[
            { v: '200+', l: 'Events Hosted Annually' },
            { v: '40M+', l: 'Audience Reach Per Year' },
            { v: '$2.4M', l: 'Avg. Brand Activation ROI' },
            { v: '5K+', l: 'Max Event Capacity' },
          ].map(k => (
            <div key={k.l} className="venue-dir-kpi">
              <span className="venue-dir-kpi__value">{k.v}</span>
              <span className="venue-dir-kpi__label">{k.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        className={`venue-dir-next-btn ${glowBtn ? 'venue-dir-next-btn--glow' : ''}`}
        onClick={() => goToSlideById('venue-detail')}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Venue Details →
      </motion.button>
    </section>
  )
}
