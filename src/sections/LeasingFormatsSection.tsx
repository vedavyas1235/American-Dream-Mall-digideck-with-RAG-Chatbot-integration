import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './LeasingFormatsSection.css'

const LEASING_TIERS = [
  {
    tier: 'Anchor',
    sqft: '80,000 – 200,000 sq ft',
    desc: 'Dominant category-leading retailers that anchor an entire court or wing.',
    color: '#c9a84c',
    examples: [
      { name: 'Primark', sqft: '~100,000 sq ft', court: 'Court E, Level 1 & 2', note: 'One of Primark\'s largest US stores' },
      { name: 'H&M', sqft: '~80,000 sq ft', court: 'Court C, Level 1 & 2', note: 'Full flagship format' },
    ],
  },
  {
    tier: 'Large Format',
    sqft: '20,000 – 80,000 sq ft',
    desc: 'Major national and international retailers operating full multi-level flagships.',
    color: '#b5453a',
    examples: [
      { name: 'Zara', sqft: '~60,000 sq ft', court: 'Court D, Level 1 & 2', note: 'Largest in-mall Zara in North America' },
      { name: 'Uniqlo', sqft: '~40,000 sq ft', court: 'Court C, Level 1', note: 'Full US lifestyle concept' },
    ],
  },
  {
    tier: 'Standard Retail',
    sqft: '4,000 – 20,000 sq ft',
    desc: 'National brands, specialty retailers, and premium in-line concepts.',
    color: '#f26522',
    examples: [
      { name: 'Aritzia', sqft: '~8,000 sq ft', court: 'Court C, Level 1', note: 'Canadian premium fashion' },
      { name: 'Lululemon', sqft: '~6,000 sq ft', court: 'Court B, Level 1', note: 'Flagship performance format' },
    ],
  },
  {
    tier: 'Luxury Boutique',
    sqft: '2,000 – 12,000 sq ft',
    desc: 'World-class luxury houses in The Avenue — the dedicated luxury wing.',
    color: '#d4af37',
    examples: [
      { name: 'Gucci', sqft: '~8,000 sq ft', court: 'The Avenue, L1 & L2', note: 'Two-level boutique' },
      { name: 'Hermès', sqft: '~4,500 sq ft', court: 'The Avenue, L1', note: 'Full leather goods' },
    ],
  },
  {
    tier: 'Pop-Up & Kiosk',
    sqft: '200 – 2,000 sq ft',
    desc: 'Flexible, high-visibility short-term spaces generating up to 3× average retail revenue.',
    color: '#8B7355',
    examples: [
      { name: 'Seasonal Pods', sqft: '200–400 sq ft', court: 'All Courts', note: '30–90 day terms' },
      { name: 'Brand Kiosks', sqft: '400–800 sq ft', court: 'The Avenue', note: 'Luxury sampling' },
    ],
  },
]

export default function LeasingFormatsSection() {
  const [activeTier, setActiveTier] = useState(0)
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

  const t = LEASING_TIERS[activeTier]

  return (
    <section className="leasing-formats" ref={ref}>
      <div className="leasing-formats__inner">
        <motion.div 
          className="leasing-formats__header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Leasing Formats</span>
          <h2 className="leasing-formats__title">Every Format. <em>Every Ambition.</em></h2>
        </motion.div>

        <div className="leasing-formats__layout">
          <div className="leasing-formats__tabs">
            {LEASING_TIERS.map((tier, i) => (
              <button
                key={tier.tier}
                className={`leasing-tier-tab ${i === activeTier ? 'leasing-tier-tab--active' : ''}`}
                style={{ '--tab-color': tier.color } as React.CSSProperties}
                onClick={() => setActiveTier(i)}
              >
                <span className="leasing-tier-tab__name">{tier.tier}</span>
                <span className="leasing-tier-tab__sqft">{tier.sqft}</span>
              </button>
            ))}
          </div>

          <div className="leasing-formats__panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="leasing-panel__header" style={{ '--panel-color': t.color } as React.CSSProperties}>
                  <div className="leasing-panel__accent" />
                  <h3 className="leasing-panel__tier">{t.tier}</h3>
                  <span className="leasing-panel__range">{t.sqft}</span>
                </div>
                <p className="leasing-panel__desc">{t.desc}</p>

                <div className="leasing-panel__table">
                  <div className="leasing-panel__table-head">
                    <span>Tenant</span>
                    <span>Size</span>
                    <span>Location</span>
                    <span>Note</span>
                  </div>
                  {t.examples.map(e => (
                    <div key={e.name} className="leasing-panel__table-row">
                      <span className="leasing-panel__tenant-name">{e.name}</span>
                      <span className="leasing-panel__sqft">{e.sqft}</span>
                      <span className="leasing-panel__court">{e.court}</span>
                      <span className="leasing-panel__note">{e.note}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
