import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDeckSafe } from '../components/Deck/DeckEngine'
import './SponsorsPage.css'

const CURRENT_PARTNERS = [
  {
    name: 'Nickelodeon / Paramount',
    category: 'Entertainment IP',
    type: 'Attraction Partner',
    since: '2019',
    color: '#f26522',
    desc: 'Naming rights and IP licensing for Nickelodeon Universe — the largest indoor theme park in the Western Hemisphere. Character appearances, exclusive merchandise, and ongoing content activations.',
    assets: ['Full theme park naming rights', 'Character IP (SpongeBob, PAW Patrol, TMNT)', 'Live Slime Time shows', 'Exclusive in-park merchandise'],
  },
  {
    name: 'DreamWorks / Universal',
    category: 'Entertainment IP',
    type: 'Attraction Partner',
    since: '2020',
    color: '#1c3557',
    desc: 'IP partner for DreamWorks Water Park — the largest indoor water park in North America. Features Shrek, Madagascar, Trolls, and Kung Fu Panda themed water park zones and cabanas.',
    assets: ['Full water park naming rights', 'IP licensing (Shrek, Madagascar, Trolls)', '19 branded cabanas', '28 luxury skyboxes'],
  },
  {
    name: 'LEGO / Merlin Entertainments',
    category: 'Entertainment IP',
    type: 'Attraction Partner',
    since: '2021',
    color: '#e8001a',
    desc: 'LEGOLAND Discovery Center — an indoor LEGO experience featuring the Imagination Express ride, 4D cinema, and a Miniland recreation of the New York and New Jersey skyline.',
    assets: ['Full attraction naming rights', 'LEGO brand integration', '4D cinema & Miniland', 'LEGO Master Builder program'],
  },
  {
    name: 'Merlin Entertainments (SEA LIFE)',
    category: 'Entertainment',
    type: 'Attraction Partner',
    since: '2021',
    color: '#00897b',
    desc: 'SEA LIFE Aquarium — world\'s leading aquarium chain. Features 200+ species and a 360° underwater tunnel. Private events, school field trips, and seasonal branded activations.',
    assets: ['Aquarium naming rights', '200+ marine species display', '360° underwater tunnel', 'Educational field trip programs'],
  },
  {
    name: 'Coca-Cola',
    category: 'FMCG / Beverage',
    type: 'Campus-Wide Sponsor',
    since: '2019',
    color: '#e8001a',
    desc: 'Exclusive 10-year beverage partnership across the entire American Dream campus. Includes branded "Coca-Cola Social Bubble" experiential zone, all-venue pouring rights, and digital branding throughout the mall.',
    assets: ['Exclusive campus pouring rights', 'Coca-Cola Social Bubble activation zone', 'Digital display integrations', '10-year exclusivity through 2029'],
  },
  {
    name: 'Sesame Workshop',
    category: 'Children\'s Education / IP',
    type: 'Educational Partner',
    since: '2024',
    color: '#f9a825',
    desc: 'First-ever Sesame Street Learn & Play educational center — a 2024 partnership bringing STEAM-based learning experiences to families through Sesame Street characters and curriculum.',
    assets: ['First-ever retail Sesame Street center', 'STEAM learning curriculum', 'Character activations (Elmo, Big Bird)', 'K-5 educational programming'],
  },
  {
    name: 'Hasbro',
    category: 'Gaming / Toys',
    type: 'Entertainment Partner',
    since: '2024',
    color: '#1c3557',
    desc: 'The Gameroom by Hasbro — a first-of-its-kind entertainment center featuring G.I. Joe laser tag, Monopoly-themed experiences, and Transformers activations. Opened 2024.',
    assets: ['The Gameroom naming rights', 'G.I. Joe laser tag arena', 'Monopoly-themed gaming zones', 'Transformers activations'],
  },
  {
    name: 'Live Nation',
    category: 'Live Entertainment',
    type: 'Entertainment Partner',
    since: '2022',
    color: '#c9a84c',
    desc: 'Multi-year partnership to anchor American Dream\'s entertainment programming. Live Nation books and produces all major concert events at Dream Live and the performing arts venue.',
    assets: ['Multi-year exclusivity for major concerts', 'Booking & production rights', 'Past artists: Ludacris, Tiësto, Steve Aoki', 'Revenue share model'],
  },
  {
    name: 'Hackensack Meridian Health',
    category: 'Healthcare',
    type: 'Official Health Partner',
    since: '2021',
    color: '#0abab5',
    desc: 'Official healthcare partner of American Dream. The partnership includes in-mall wellness programming, health activation zones, and medical support services for large-scale events.',
    assets: ['Official health partner designation', 'In-mall wellness programming', 'Event medical support services', 'Healthcare activation zones'],
  },
  {
    name: 'Marriott Bonvoy',
    category: 'Hospitality',
    type: 'Hotel & Rewards Partner',
    since: '2021',
    color: '#8B7355',
    desc: 'Hotel partnership offering Marriott Bonvoy members exclusive benefits, points earning opportunities, and packages tied to American Dream visits and events.',
    assets: ['Marriott Bonvoy points integration', 'Exclusive member packages', 'Hotel partnership adjacency', 'Event / hotel bundled offers'],
  },
  {
    name: 'Rovio (Angry Birds)',
    category: 'Gaming / IP',
    type: 'Attraction Partner',
    since: '2021',
    color: '#e8001a',
    desc: 'Angry Birds Mini Golf — 18-hole mini golf attraction fully themed around the Angry Birds franchise. Indoor, year-round attraction benefiting from the 40M annual visitor footprint.',
    assets: ['Full mini golf naming rights', 'Angry Birds IP integration', '18-hole indoor course', 'Character meet-and-greet opportunities'],
  },
]

const SPONSORSHIP_TIERS = [
  {
    tier: 'Presenting Sponsor',
    investment: '$5M – $15M / year',
    color: '#c9a84c',
    desc: 'Your brand as the defining named partner of a major attraction or the full campus. Maximum visibility, exclusivity, and category ownership.',
    benefits: [
      'Attraction or campus naming rights',
      'Full category exclusivity',
      'Premium digital display network (100+ screens)',
      'All event co-presenting rights',
      'Dedicated executive relationship manager',
      'Custom 360° activation integration',
    ],
  },
  {
    tier: 'Category Sponsor',
    investment: '$1M – $5M / year',
    color: '#b5453a',
    desc: 'Own your product category across the property. Exclusive rights to your vertical — no competing brands.',
    benefits: [
      'Category exclusivity (beverage, tech, finance, etc.)',
      'Prominent signage across 3M+ sq ft',
      'Priority event activation at Dream Live',
      'Social & digital content co-creation',
      'Retailer cross-promotional rights',
    ],
  },
  {
    tier: 'Activation Partner',
    investment: '$250K – $1M / year',
    color: '#f26522',
    desc: 'A defined experiential zone, seasonal activation, or themed pop-up with high ROI foot-traffic exposure.',
    benefits: [
      'Dedicated activation space (1,000–5,000 sq ft)',
      'Seasonal or year-round programming',
      'PR support and press access',
      'Social media amplification',
      'Dwell-time reporting & foot-traffic analytics',
    ],
  },
  {
    tier: 'Digital & Media Partner',
    investment: '$50K – $250K / year',
    color: '#0abab5',
    desc: 'Targeted digital advertising across American Dream\'s owned digital surfaces — screens, website, app, and social channels.',
    benefits: [
      'Rotating digital display network',
      'Email & app push notification slots',
      'Social media integrations',
      'Event-specific campaign placements',
      'Monthly analytics reporting',
    ],
  },
]

export default function SponsorsPage() {
  const navigate = useNavigate()
  const deck = useDeckSafe()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="sp">
      {/* Hero */}
      <header className="sp-hero">
        <img
          className="sp-hero__bg"
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Brand partnership"
        />
        <div className="sp-hero__overlay" />
        <div className="sp-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label">Brand Sponsorship</span>
            <h1 className="sp-hero__title">40 Million People.<br /><em>Your Brand.</em></h1>
            <div className="gold-line" />
            <p className="sp-hero__desc">
              American Dream offers the most unique sponsorship canvas in North America.
              Brands don't just advertise here — they become part of the destination.
              From 10-year naming rights to seasonal activations, we build partnerships that perform.
            </p>
            <div className="sp-hero__actions">
              <button className="btn-gold" onClick={() => document.getElementById('sp-tiers')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Tiers →
              </button>
              <button className="btn-outline" onClick={() => deck ? deck.goToSlideById('intro') : navigate('/')}>← Overview</button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Audience Data */}
      <div className="sp-audience">
        <div className="sp-audience__inner">
          <span className="section-label">Audience Profile</span>
          <h2 className="lp-section-title">Who You're Reaching</h2>
          <div className="sp-audience__grid">
            {[
              { metric: '40M+', label: 'Annual Visitors', icon: '👥' },
              { metric: '$104K+', label: 'Avg Household Income', icon: '💰' },
              { metric: '68%', label: 'Female Shoppers 25–54', icon: '👩' },
              { metric: '50+', label: 'Countries Represented', icon: '🌍' },
              { metric: '3.5h', label: 'Avg Dwell Time', icon: '⏱' },
              { metric: '2.8×', label: 'Repeat Visit Rate', icon: '🔄' },
              { metric: '78%', label: 'Visitors Dine On-Site', icon: '🍽' },
              { metric: '$245', label: 'Avg Spend Per Visit', icon: '💳' },
            ].map(m => (
              <div key={m.label} className="sp-metric">
                <span className="sp-metric__icon">{m.icon}</span>
                <span className="sp-metric__value">{m.metric}</span>
                <span className="sp-metric__label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsorship Tiers */}
      <section id="sp-tiers" className="sp-tiers">
        <div className="sp-tiers__inner">
          <span className="section-label">Partnership Levels</span>
          <h2 className="lp-section-title">Four Ways to Own the Room</h2>
          <div className="sp-tiers__grid">
            {SPONSORSHIP_TIERS.map((t, i) => (
              <motion.div
                key={t.tier}
                className="sp-tier-card"
                style={{ '--tier-color': t.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="sp-tier-card__accent" />
                <h3 className="sp-tier-card__name">{t.tier}</h3>
                <span className="sp-tier-card__investment">{t.investment}</span>
                <p className="sp-tier-card__desc">{t.desc}</p>
                <ul className="sp-tier-card__benefits">
                  {t.benefits.map(b => (
                    <li key={b}>
                      <span className="sp-tier-card__check">✓</span> {b}
                    </li>
                  ))}
                </ul>
                <button
                  className="sp-tier-card__btn"
                  style={{ background: t.color }}
                  onClick={() => deck ? deck.goToSlideById('cta') : (navigate('/'), setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 300))}
                >
                  Enquire →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="sp-partners">
        <div className="sp-partners__inner">
          <span className="section-label">Existing Partnerships</span>
          <h2 className="lp-section-title">Who's Already Here</h2>
          <p className="lp-section-desc">
            From Coca-Cola's 10-year exclusive partnership to Sesame Workshop's
            first-ever retail education center — American Dream attracts category leaders.
          </p>
          <div className="sp-partners__grid">
            {CURRENT_PARTNERS.map((p, i) => (
              <motion.div
                key={p.name}
                className="sp-partner-card"
                style={{ '--partner-color': p.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="sp-partner-card__top">
                  <div>
                    <span className="sp-partner-card__category">{p.category}</span>
                    <h3 className="sp-partner-card__name">{p.name}</h3>
                  </div>
                  <span className="sp-partner-card__since">Since {p.since}</span>
                </div>
                <span className="sp-partner-card__type">{p.type}</span>
                <p className="sp-partner-card__desc">{p.desc}</p>
                <ul className="sp-partner-card__assets">
                  {p.assets.slice(0, 3).map(a => (
                    <li key={a}>· {a}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-cta__inner">
          <h2 className="lp-cta__title">Build a Partnership That Performs</h2>
          <p className="lp-cta__desc">
            Category exclusivity · Custom activations · 40 million annual touchpoints.
            Let's talk about what your brand can own at American Dream.
          </p>
          <div className="lp-cta__actions">
            <button className="btn-gold" onClick={() => deck ? deck.goToSlideById('cta') : (navigate('/'), setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 300))}>
              Submit Partnership Inquiry →
            </button>
          </div>
          <div className="lp-cta__contact">
            <span>partnerships@americandream.com</span>
          </div>
        </div>
      </section>
    </div>
  )
}
