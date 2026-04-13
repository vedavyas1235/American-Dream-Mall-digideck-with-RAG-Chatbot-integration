import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDeck } from '../components/Deck/DeckEngine'
import './EventsPage.css'

export default function EventsPage() {
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
    <section className="ep" ref={ref} style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Hero */}
      <header className="ep-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0 40px' }}>
        <img
          className="ep-hero__bg"
          src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Concert crowd"
        />
        <div className="ep-hero__overlay" />
        
        <div className="ep-hero__content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <span className="section-label">Event Booking</span>
            <h1 className="ep-hero__title">A Stage Unlike<br /><em>Any Other.</em></h1>
            <div className="gold-line gold-line-center" style={{ marginBottom: 24 }} />
            <p className="ep-hero__desc" style={{ maxWidth: 640 }}>
              From sold-out concerts and brand launches to galas, corporate events, and
              sensory-friendly family programming — American Dream hosts it all. 40 million
              annual visitors. Six distinct venues. One booking team.
            </p>

            {/* Stats centered directly beneath text */}
            <div className="ep-stats-box">
              {[
                { v: '3,000', l: 'Concert Capacity', s: 'Performing arts venue' },
                { v: '900', l: 'Standing — Dream Live', s: '30,000 sq ft flexible space' },
                { v: '6', l: 'Distinct Venues', s: 'From intimate to massive' },
                { v: '40M+', l: 'Annual Visitors', s: 'Built-in event audience' },
                { v: 'Live Nation', l: 'Multi-Year Partner', s: 'Since 2022' },
                { v: '9 mo', l: 'Lead Time Recommended', s: 'For large-scale events' },
              ].map(s => (
                <div key={s.l} className="ep-stat">
                  <span className="ep-stat__value">{s.v}</span>
                  <span className="ep-stat__label">{s.l}</span>
                  <span className="ep-stat__sub">{s.s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.button 
          className={`event-history-btn ${glowBtn ? 'event-history-btn--glow' : ''}`}
          onClick={() => goToSlideById('event-history')}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Event History →
        </motion.button>
      </header>
    </section>
  )
}
