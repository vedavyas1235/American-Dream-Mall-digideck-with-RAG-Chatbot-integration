import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeck } from '../components/Deck/DeckEngine'
import './VenuesPage.css'

const VENUES = [
  {
    id: 'dream-live',
    name: 'Dream Live',
    tagline: 'The Premier Event Space',
    type: 'Flexible Event Hall',
    capacity: '900 standing',
    sqft: '30,000 sq ft',
    location: 'Level 1 — East Wing',
    img: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#c9a84c',
    specs: [
      { label: 'Main Hall', value: '30,000 sq ft' },
      { label: 'Art Deco Lobby', value: '4,500 sq ft' },
      { label: 'AV', value: 'Video wall (9×55" LCD) + 75" vertical LCDs' },
      { label: 'Bar', value: 'Built-in Concessions' },
    ],
    useCases: ['Galas & Award Shows', 'Concerts', 'Corporate Conferences', 'Product Launches'],
    lead: '3–9 months',
  },
  {
    id: 'concert-venue',
    name: 'Concert Venue',
    tagline: 'Live Nation-Powered Performing Arts',
    type: 'Concert / Arts',
    capacity: '3,000 seated',
    sqft: '~50,000 sq ft',
    location: 'Level 2 — West Atrium',
    img: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#b5453a',
    specs: [
      { label: 'Stage Size', value: 'Full production stage' },
      { label: 'Booking', value: 'Live Nation exclusive' },
      { label: 'AV', value: 'Full concert production rig' },
      { label: 'Backstage', value: 'Dressing rooms, green rooms' },
    ],
    useCases: ['Major Concerts', 'Award Shows', 'Comedy Shows'],
    lead: '6–12 months',
  },
  {
    id: 'nickelodeon',
    name: 'Nickelodeon Universe',
    tagline: 'Private Park Buyout Available',
    type: 'Theme Park',
    capacity: 'Up to 5,000+',
    sqft: '8 acres',
    location: 'Level 1 & 2',
    img: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#f26522',
    specs: [
      { label: 'Total Space', value: '8 acres indoor' },
      { label: 'Attractions', value: '35+ Rides' },
      { label: 'Stage', value: 'Yes — for live shows & DJ' },
      { label: 'Buyout', value: 'Full park or partial zones' },
    ],
    useCases: ['Corporate Team Building', 'Brand Activations', 'Private Buyouts'],
    lead: '6+ months',
  },
  {
    id: 'dreamworks-waterpark',
    name: 'DreamWorks Water Park',
    tagline: 'Luxury Skyboxes & Full Buyout',
    type: 'Indoor Water Park',
    capacity: 'Up to 2,000+',
    sqft: '532,000 sq ft',
    location: 'Level 1 — North Wing',
    img: 'https://images.pexels.com/photos/1449934/pexels-photo-1449934.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#00b4d8',
    specs: [
      { label: 'Water Attractions', value: '40+' },
      { label: 'Cabanas', value: '19 cabanas, 28 skyboxes' },
      { label: 'Wave Pool', value: 'Largest indoor wave pool' },
      { label: 'Open', value: 'Year-round climate-controlled' },
    ],
    useCases: ['Summer Events', 'Charity Galas', 'TV / Film Production'],
    lead: '3–6 months',
  },
  {
    id: 'big-snow',
    name: 'Big SNOW',
    tagline: 'North America\'s Only Indoor Ski Slope',
    type: 'Indoor Ski Resort',
    capacity: 'Private slope booking',
    sqft: '180,000 sq ft',
    location: 'Level 1 — West Wing',
    img: 'https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#4a9eff',
    specs: [
      { label: 'Ski Runs', value: '12 runs (real snow)' },
      { label: 'Temperature', value: '28°F (−2°C) year-round' },
      { label: 'Activities', value: 'Ski, snowboard, tube' },
      { label: 'Lodge', value: 'Alpine-themed lodge & café' },
    ],
    useCases: ['Team Building', 'Film Production', 'Après-Ski Activations'],
    lead: '2–4 months',
  },
  {
    id: 'the-rink',
    name: 'The Rink',
    tagline: 'Year-Round Indoor Ice Skating',
    type: 'Ice Skating Rink',
    capacity: '200 skaters',
    sqft: '~18,000 sq ft',
    location: 'Level 1 — Central Atrium',
    img: 'https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#d4af37',
    specs: [
      { label: 'Ice Surface', value: '~18,000 sq ft' },
      { label: 'Viewing', value: 'Atrium with seating' },
      { label: 'Rental', value: 'Skate rental built-in' },
      { label: 'Shows', value: 'Ice shows possible' },
    ],
    useCases: ['Private Ice Parties', 'Skating Performances', 'Holiday Events'],
    lead: '1–3 months',
  },
  {
    id: 'sealife',
    name: 'SEA LIFE Aquarium',
    tagline: 'Unique Private Event Backdrop',
    type: 'Aquarium',
    capacity: 'Up to 500',
    sqft: '~25,000 sq ft',
    location: 'Level 1 — East Wing',
    img: 'https://images.pexels.com/photos/3894157/pexels-photo-3894157.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#00897b',
    specs: [
      { label: 'Marine Species', value: '200+' },
      { label: 'Tunnel', value: '360° walkthrough tunnel' },
      { label: 'Operator', value: 'Merlin Entertainments' },
      { label: 'Private Capacity', value: '500 guests' },
    ],
    useCases: ['Premium Dinners', 'Charity Galas', 'Photography Shoots'],
    lead: '2–4 months',
  },
]

export default function VenuesPage() {
  const [activeVenue, setActiveVenue] = useState(VENUES[0].id)
  const { goToSlideById } = useDeck()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const venue = VENUES.find(v => v.id === activeVenue) || VENUES[0]

  return (
    <div className="vp-split-container">
      {/* LEFT HALF: Fixed Hero Content */}
      <div className="vp-split-left">
        <img
          className="vp-left-bg"
          src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Venue interior"
        />
        <div className="vp-left-overlay" />
        <div className="vp-left-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label">Venue Directory</span>
            <h1 className="vp-left-title">Seven Venues.<br /><em>One Destination.</em></h1>
            <div className="gold-line" />
            <p className="vp-left-desc">
              From a 3,000-seat concert hall to the world's only indoor ski resort, 
              American Dream has a venue for every spectacular event. All enclosed, 
              all climate-controlled, and backed by a built-in audience of 40 million visitors.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT HALF: Interactive Directory & Specs */}
      <div className="vp-split-right">
        {/* Venue Navigation Tabs */}
        <div className="vp-tabs">
          {VENUES.map(v => (
             <button
                key={v.id}
                className={`vp-tab ${activeVenue === v.id ? 'vp-tab--active' : ''}`}
                style={{ '--v-color': v.accent } as React.CSSProperties}
                onClick={() => setActiveVenue(v.id)}
             >
                {v.name}
             </button>
          ))}
        </div>

        {/* Selected Venue Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={venue.id}
            className="vp-detail-card"
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <div className="vp-detail-header">
               <span className="vp-detail-type" style={{ color: venue.accent }}>{venue.type}</span>
               <span className="vp-detail-location">📍 {venue.location}</span>
            </div>
            
            <h2 className="vp-detail-name">{venue.name}</h2>
            <p className="vp-detail-tagline">{venue.tagline}</p>
            
            <div className="vp-detail-kpis">
              <div className="vp-kpi">
                <span className="vp-kpi-val">{venue.sqft}</span>
                <span className="vp-kpi-lbl">Total Space</span>
              </div>
              <div className="vp-kpi">
                <span className="vp-kpi-val">{venue.capacity}</span>
                <span className="vp-kpi-lbl">Capacity</span>
              </div>
            </div>

            <div className="vp-detail-grid">
               <div className="vp-specs-col">
                 <h3 className="vp-grid-title">Technical Specs</h3>
                 <ul className="vp-specs-list">
                    {venue.specs.map(s => (
                       <li key={s.label}>
                          <span className="spec-lbl" style={{ color: venue.accent }}>{s.label}:</span> 
                          <span className="spec-val">{s.value}</span>
                       </li>
                    ))}
                 </ul>
               </div>

               <div className="vp-uses-col">
                 <h3 className="vp-grid-title">Ideal For</h3>
                 <div className="vp-uses-tags">
                   {venue.useCases.map(u => (
                      <span key={u} className="vp-use-tag">{u}</span>
                   ))}
                 </div>
               </div>
            </div>

            <div className="vp-detail-footer">
               <span className="vp-lead-time">Lead Time: {venue.lead}</span>
               <button 
                  className="btn-gold" 
                  style={{ background: venue.accent, color: '#fff', border: 'none' }}
                  onClick={() => goToSlideById('cta')}
               >
                  Book {venue.name} →
               </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
