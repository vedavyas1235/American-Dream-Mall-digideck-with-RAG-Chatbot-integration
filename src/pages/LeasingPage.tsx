import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDeckSafe } from '../components/Deck/DeckEngine'
import './LeasingPage.css'

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
      { name: 'Saks Fifth Avenue', sqft: '~120,000 sq ft', court: 'The Avenue, Level 1 & 2', note: 'Luxury department anchor — The Avenue' },
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
      { name: 'Anthropologie', sqft: '~10,000 sq ft', court: 'Court D, Level 1', note: 'Lifestyle retail concept' },
      { name: 'Toys "R" Us', sqft: '~13,000 sq ft', court: 'Court E, Level 1', note: 'Experience-first retail comeback' },
      { name: 'IT\'SUGAR', sqft: '~5,000 sq ft', court: 'Court B, Level 1', note: 'Largest candy store format' },
    ],
  },
  {
    tier: 'Luxury Boutique',
    sqft: '2,000 – 12,000 sq ft',
    desc: 'World-class luxury houses in The Avenue — the dedicated luxury retail wing.',
    color: '#d4af37',
    examples: [
      { name: 'Gucci', sqft: '~8,000 sq ft', court: 'The Avenue, Level 1 & 2', note: 'Full two-level boutique' },
      { name: 'Saint Laurent', sqft: '~6,000 sq ft', court: 'The Avenue, Level 1 & 2', note: 'Full YSL collection' },
      { name: 'Hermès', sqft: '~4,500 sq ft', court: 'The Avenue, Level 1', note: 'Full leather goods & RTW' },
      { name: 'Ferrari', sqft: '~3,500 sq ft', court: 'The Avenue, Level 1', note: 'Lifestyle & fashion boutique' },
      { name: 'Rolex', sqft: '~3,000 sq ft', court: 'The Avenue, Level 1', note: 'Authorized dealer' },
      { name: 'Tiffany & Co.', sqft: '~4,000 sq ft', court: 'The Avenue, Level 1', note: 'Full jewelry & accessories' },
      { name: 'Balenciaga', sqft: '~3,500 sq ft', court: 'The Avenue, Level 1', note: 'RTW & accessories' },
      { name: 'Dolce & Gabbana', sqft: '~4,200 sq ft', court: 'The Avenue, Level 1', note: 'Men\'s & women\'s collections' },
    ],
  },
  {
    tier: 'Food & Beverage',
    sqft: '1,500 – 15,000 sq ft',
    desc: 'From quick service to fine dining — 100+ concepts in food halls and dedicated restaurant courts.',
    color: '#0abab5',
    examples: [
      { name: 'Wagyu House', sqft: '~5,000 sq ft', court: 'The Avenue, Level 1', note: 'Luxury dining concept' },
      { name: 'Carpaccio', sqft: '~4,500 sq ft', court: 'The Avenue, Level 1', note: 'Upscale Italian' },
      { name: 'Shake Shack', sqft: '~3,000 sq ft', court: 'Court B Food Hall', note: 'Premium QSR' },
      { name: 'Don Angie', sqft: '~4,000 sq ft', court: 'Court C, Level 1', note: 'NYC restaurant outpost' },
    ],
  },
  {
    tier: 'Pop-Up & Kiosk',
    sqft: '200 – 2,000 sq ft',
    desc: 'Flexible, high-visibility short-term spaces generating up to 3× the average retail revenue per sq ft.',
    color: '#8B7355',
    examples: [
      { name: 'Seasonal Retail Pods', sqft: '200–400 sq ft', court: 'All Courts, Center Atrium', note: '30–90 day terms available' },
      { name: 'Brand Activation Kiosks', sqft: '400–800 sq ft', court: 'The Avenue Atrium', note: 'Luxury sampling & experiential' },
      { name: 'Digital Pop-Up Studios', sqft: '800–2,000 sq ft', court: 'Court D & Dream Live Lobby', note: 'Social-first content spaces' },
    ],
  },
]

const COURTS = [
  { name: 'The Avenue', focus: 'Ultra-Luxury', level: 'Level 1 & 2', color: '#c9a84c', tenants: '30+ boutiques' },
  { name: 'Court A', focus: 'Entertainment Hub', level: 'All Levels', color: '#b5453a', tenants: 'Nickelodeon Universe, LEGOLAND, SEA LIFE' },
  { name: 'Court B', focus: 'Fast Fashion & Dining', level: 'Level 1', color: '#f26522', tenants: 'H&M, Lululemon, Food Hall' },
  { name: 'Court C', focus: 'Premium Retail', level: 'Level 1 & 2', color: '#0abab5', tenants: 'Uniqlo, Aritzia, Zara, Anthropologie' },
  { name: 'Court D', focus: 'Mid-Market Flagship', level: 'Level 1 & 2', color: '#d4af37', tenants: 'Primark, H&M Flagship, Sports' },
  { name: 'Court E', focus: 'Specialty & Kids', level: 'Level 1', color: '#8B7355', tenants: 'Toys "R" Us, IT\'SUGAR, DreamWorks entry' },
]

const STATS = [
  { value: '3M+', label: 'Total Sq Ft', sub: 'Gross leasable area' },
  { value: '45%', label: 'Retail Mix', sub: '55% entertainment' },
  { value: '450+', label: 'Total Tenants', sub: 'Retail, dining & specialty' },
  { value: '40M+', label: 'Annual Visitors', sub: 'Built-in foot traffic' },
  { value: '$104K+', label: 'Avg HHI', sub: 'Median household income' },
  { value: '3.2×', label: 'Conversion Rate', sub: 'vs. avg US mall' },
]

export default function LeasingPage() {
  const [activeTier, setActiveTier] = useState(0)
  const navigate = useNavigate()
  const deck = useDeckSafe()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="lp">
      {/* Hero */}
      <header className="lp-hero">
        <img
          className="lp-hero__bg"
          src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Retail interior"
        />
        <div className="lp-hero__overlay" />
        <div className="lp-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label">Leasing Opportunities</span>
            <h1 className="lp-hero__title">Your Brand.<br /><em>40 Million Customers.</em></h1>
            <div className="gold-line" />
            <p className="lp-hero__desc">
              American Dream is not a tenant relationship — it's a traffic partnership.
              With 3 million square feet, six distinct courts, and The Avenue luxury wing,
              we offer formats from 200 sq ft kiosks to 200,000 sq ft anchors.
            </p>
            <div className="lp-hero__actions">
              <button className="btn-gold" onClick={() => document.getElementById('lp-tiers')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Formats →
              </button>
              <button className="btn-outline" onClick={() => deck ? deck.goToSlideById('intro') : navigate('/')}>← Overview</button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="lp-stats">
        {STATS.map(s => (
          <div key={s.label} className="lp-stat">
            <span className="lp-stat__value">{s.value}</span>
            <span className="lp-stat__label">{s.label}</span>
            <span className="lp-stat__sub">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Courts map */}
      <section className="lp-courts">
        <div className="lp-courts__inner">
          <div className="lp-courts__header">
            <span className="section-label">Mall Layout</span>
            <h2 className="lp-section-title">Six Courts. One Address.</h2>
            <p className="lp-section-desc">
              American Dream is organized into six distinct courts, each with its own
              tenant mix, foot-traffic profile, and leasing personality.
            </p>
          </div>
          <div className="lp-courts__grid">
            {COURTS.map(c => (
              <div key={c.name} className="lp-court-card" style={{ '--court-color': c.color } as React.CSSProperties}>
                <div className="lp-court-card__accent" />
                <span className="lp-court-card__level">{c.level}</span>
                <h3 className="lp-court-card__name">{c.name}</h3>
                <span className="lp-court-card__focus">{c.focus}</span>
                <p className="lp-court-card__tenants">{c.tenants}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leasing Tiers */}
      <section id="lp-tiers" className="lp-tiers">
        <div className="lp-tiers__inner">
          <div className="lp-tiers__header">
            <span className="section-label">Leasing Formats</span>
            <h2 className="lp-section-title">Every Format. Every Ambition.</h2>
          </div>

          <div className="lp-tiers__layout">
            {/* Sidebar tabs */}
            <div className="lp-tiers__tabs">
              {LEASING_TIERS.map((t, i) => (
                <button
                  key={t.tier}
                  className={`lp-tier-tab ${i === activeTier ? 'lp-tier-tab--active' : ''}`}
                  style={{ '--tab-color': t.color } as React.CSSProperties}
                  onClick={() => setActiveTier(i)}
                >
                  <span className="lp-tier-tab__name">{t.tier}</span>
                  <span className="lp-tier-tab__sqft">{t.sqft}</span>
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className="lp-tiers__panel">
              {(() => {
                const t = LEASING_TIERS[activeTier]
                return (
                  <motion.div
                    key={activeTier}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="lp-panel__header" style={{ '--panel-color': t.color } as React.CSSProperties}>
                      <div className="lp-panel__accent" />
                      <h3 className="lp-panel__tier">{t.tier}</h3>
                      <span className="lp-panel__range">{t.sqft}</span>
                    </div>
                    <p className="lp-panel__desc">{t.desc}</p>

                    <div className="lp-panel__table">
                      <div className="lp-panel__table-head">
                        <span>Tenant</span>
                        <span>Est. Size</span>
                        <span>Court / Location</span>
                        <span>Note</span>
                      </div>
                      {t.examples.map(e => (
                        <div key={e.name} className="lp-panel__table-row">
                          <span className="lp-panel__tenant-name">{e.name}</span>
                          <span className="lp-panel__sqft">{e.sqft}</span>
                          <span className="lp-panel__court">{e.court}</span>
                          <span className="lp-panel__note">{e.note}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-cta__inner">
          <h2 className="lp-cta__title">Ready to Find Your Space?</h2>
          <p className="lp-cta__desc">
            Our commercial leasing team can put you in front of 40 million shoppers.
            Let's talk about what format fits your brand.
          </p>
          <div className="lp-cta__actions">
            <button className="btn-gold" onClick={() => deck ? deck.goToSlideById('cta') : (navigate('/'), setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 300))}>
              Submit Leasing Inquiry →
            </button>
          </div>
          <div className="lp-cta__contact">
            <span>leasing@americandream.com</span>
            <span>1 American Dream Way, East Rutherford, NJ 07073</span>
          </div>
        </div>
      </section>
    </div>
  )
}
