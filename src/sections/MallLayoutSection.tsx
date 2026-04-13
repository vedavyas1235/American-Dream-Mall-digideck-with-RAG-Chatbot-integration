import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDeck } from '../components/Deck/DeckEngine'
import './MallLayoutSection.css'

const COURTS = [
  { name: 'The Avenue', focus: 'Ultra-Luxury', level: 'Level 1 & 2', color: '#c9a84c', tenants: '30+ boutiques' },
  { name: 'Court A', focus: 'Entertainment Hub', level: 'All Levels', color: '#b5453a', tenants: 'Nickelodeon, SEA LIFE' },
  { name: 'Court B', focus: 'Fashion & Dining', level: 'Level 1', color: '#f26522', tenants: 'H&M, Lululemon, Food Hall' },
  { name: 'Court C', focus: 'Premium Retail', level: 'Level 1 & 2', color: '#0abab5', tenants: 'Uniqlo, Aritzia, Zara' },
  { name: 'Court D', focus: 'Mid-Market Flagship', level: 'Level 1 & 2', color: '#d4af37', tenants: 'Primark, Sports' },
  { name: 'Court E', focus: 'Specialty & Kids', level: 'Level 1', color: '#8B7355', tenants: 'Toys "R" Us, IT\'SUGAR' },
]

export default function MallLayoutSection() {
  const { goToSlideById } = useDeck()
  const [inView, setInView] = useState(false)
  const [glowBtn, setGlowBtn] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
            setInView(true) 
            setTimeout(() => setGlowBtn(true), 6000)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="mall-layout" ref={ref}>
      <div className="mall-layout__inner">
        <motion.div 
          className="mall-layout__header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Mall Layout</span>
          <h2 className="mall-layout__title mall-layout__title--large">Six Courts. <em>One Address.</em></h2>
          <div className="gold-line gold-line-center" />
        </motion.div>

        <motion.button
          className={`mall-layout-btn ${glowBtn ? 'mall-layout-btn--glow' : ''}`}
          onClick={() => goToSlideById('leasing-formats')}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Leasing Formats →
        </motion.button>

        <div className="mall-layout__grid">
          {COURTS.map((c, i) => (
            <motion.div 
              key={c.name} 
              className="court-card" 
              style={{ '--court-color': c.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
            >
              <div className="court-card__accent" />
              <span className="court-card__level">{c.level}</span>
              <h3 className="court-card__name">{c.name}</h3>
              <span className="court-card__focus">{c.focus}</span>
              <p className="court-card__tenants">{c.tenants}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
