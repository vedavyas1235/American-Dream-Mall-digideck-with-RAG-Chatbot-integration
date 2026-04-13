import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import './Nav.css'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'scale', label: 'The Scale' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'attractions', label: 'Attractions' },
  { id: 'events', label: 'Events' },
  { id: 'cta', label: 'Connect' },
]

const PHASE2_ITEMS = [
  { path: '/leasing', label: 'Leasing Opportunities' },
  { path: '/events', label: 'Event Booking' },
  { path: '/sponsors', label: 'Brand Sponsorship' },
  { path: '/venues', label: 'Venue Directory' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (!isHomePage) return
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }))
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i]
        if (s.el && s.el.getBoundingClientRect().top <= 120) {
          setActiveSection(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  // Always scrolled on sub-pages
  useEffect(() => { if (!isHomePage) setScrolled(true) }, [isHomePage])

  const scrollTo = (id: string) => {
    if (!isHomePage) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const goTo = (path: string) => {
    navigate(path)
    setDropdownOpen(false)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentPhase2 = PHASE2_ITEMS.find(i => i.path === location.pathname)

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        {/* Logo */}
        <button className="nav__logo" onClick={() => scrollTo('hero')}>
          <span className="nav__logo-main">AMERICAN DREAM</span>
          <span className="nav__logo-sub">East Rutherford, NJ</span>
        </button>

        {/* Main links — only on home */}
        {isHomePage && (
          <ul className="nav__links">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  className={`nav__link ${activeSection === item.id ? 'nav__link--active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Sub-page breadcrumb */}
        {!isHomePage && currentPhase2 && (
          <div className="nav__breadcrumb">
            <button className="nav__back" onClick={() => navigate('/')}>← Overview</button>
            <span className="nav__breadcrumb-sep">/</span>
            <span className="nav__breadcrumb-cur">{currentPhase2.label}</span>
          </div>
        )}

        {/* Phase 2 explore dropdown */}
        <div
          className="nav__explore"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="nav__explore-btn">
            Explore Modules <span className="nav__explore-arrow">{dropdownOpen ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="nav__dropdown"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >

                {PHASE2_ITEMS.map(item => (
                  <button
                    key={item.path}
                    className={`nav__dropdown-item ${location.pathname === item.path ? 'nav__dropdown-item--active' : ''}`}
                    onClick={() => goTo(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="nav__cta" onClick={() => scrollTo('cta')}>
          Partner With Us
        </button>

        {/* Hamburger */}
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`nav__hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`nav__hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`nav__hamburger-bar ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isHomePage && NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`nav__mobile-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}

            {PHASE2_ITEMS.map(item => (
              <button
                key={item.path}
                className={`nav__mobile-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => goTo(item.path)}
              >
                {item.label}
              </button>
            ))}
            <button className="nav__mobile-cta" onClick={() => scrollTo('cta')}>
              Partner With Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
