import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './DiningSection.css'

const DINING_SPOTS = [
  {
    name: 'Aiya',
    category: 'Japanese Omakase',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=85&auto=format&fit=crop',
    desc: 'An intimate, curated omakase experience with seasonal Japanese cuisine.',
  },
  {
    name: 'Don Angie',
    category: 'Italian Fine Dining',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=85&auto=format&fit=crop',
    desc: 'Award-winning Italian cooking in a warm, sophisticated setting.',
  },
  {
    name: 'Shake Shack',
    category: 'Modern Burger Bar',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85&auto=format&fit=crop',
    desc: 'The iconic American burger destination with a signature ShackBurger.',
  },
  {
    name: 'The Food Hall',
    category: '40+ Vendors Under One Roof',
    img: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=85&auto=format&fit=crop',
    desc: 'An artisanal marketplace featuring global cuisines, craft beverages, and live cooking.',
  },
]

export default function DiningSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="dining" className="dining-section" ref={ref}>
      <div className="dining-section__inner">
        <motion.div
          className="dining-section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Dining & Lifestyle</span>
          <h2 className="dining-section__title">
            Food is the <em>Destination</em>
          </h2>
          <div className="gold-line gold-line-center" />
          <p className="dining-section__desc">
            With 100+ dining concepts ranging from quick-service to white-tablecloth fine dining,
            American Dream has redefined what food inside a retail destination can be.
            Visitors don't eat here because they have to. They come here specifically to eat.
          </p>
        </motion.div>

        <div className="dining-section__grid">
          {DINING_SPOTS.map((spot, i) => (
            <motion.div
              key={spot.name}
              className="dining-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="dining-card__img-wrap">
                <img src={spot.img} alt={spot.name} loading="lazy" />
                <div className="dining-card__overlay" />
              </div>
              <div className="dining-card__body">
                <span className="dining-card__category">{spot.category}</span>
                <h3 className="dining-card__name">{spot.name}</h3>
                <p className="dining-card__desc">{spot.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight strip */}
        <motion.div
          className="dining-section__highlight"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[
            { value: '$38', label: 'Avg. Dining Spend Per Visit' },
            { value: '4.2×', label: 'F&B Revenue vs. National Average' },
            { value: '18M+', label: 'Dining Visits Annually' },
          ].map(h => (
            <div key={h.label} className="dining-highlight-item">
              <span className="dining-highlight-value">{h.value}</span>
              <span className="dining-highlight-label">{h.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
