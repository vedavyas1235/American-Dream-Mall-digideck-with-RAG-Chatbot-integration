import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './CTASection.css'

type FormType = 'leasing' | 'sponsorship' | 'events'

const PATHS: { id: FormType; title: string; sub: string; icon: string }[] = [
  {
    id: 'leasing',
    title: 'Leasing Opportunities',
    sub: 'Luxury · Flagship · Pop-Up · F&B',
    icon: '🏢',
  },
  {
    id: 'sponsorship',
    title: 'Brand Partnerships',
    sub: 'Sponsorship · Activation · Co-Marketing',
    icon: '🤝',
  },
  {
    id: 'events',
    title: 'Event Bookings',
    sub: 'Concerts · Corporate · Galas · Launches',
    icon: '🎯',
  },
]

export default function CTASection() {
  const [active, setActive] = useState<FormType>('leasing')
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="cta" className="cta-section" ref={ref}>
      {/* Background */}
      <div className="cta-section__bg">
        <img
          src="https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=1600&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden
          loading="lazy"
        />
        <div className="cta-section__bg-overlay" />
      </div>

      <div className="cta-section__inner">
        {/* Header + Body side by side */}
        <motion.div
          className="cta-top-row"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left: Header */}
          <div className="cta-section__header">
            <span className="section-label">Take the Next Step</span>
            <h2 className="cta-section__title">
              Your Audience is<br />
              <em>Already Here.</em>
            </h2>
            <div className="gold-line" />
            <p className="cta-section__desc">
              40 million people walk through these doors every year.
              The only question is: are you here when they do?
            </p>

            {/* Path cards — compact */}
            <div className="cta-paths">
              {PATHS.map(path => (
                <button
                  key={path.id}
                  className={`cta-path ${active === path.id ? 'cta-path--active' : ''}`}
                  onClick={() => { setActive(path.id); setSubmitted(false) }}
                >
                  <span className="cta-path__icon">{path.icon}</span>
                  <div>
                    <span className="cta-path__title">{path.title}</span>
                    <span className="cta-path__sub">{path.sub}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="cta-form-wrap">
            {!submitted ? (
              <form className="cta-form" onSubmit={handleSubmit}>
                <div className="cta-form__label">
                  Inquiring about: <strong>{PATHS.find(p => p.id === active)?.title}</strong>
                </div>

                <div className="cta-form__row">
                  <div className="cta-field">
                    <label htmlFor="cta-name">Full Name</label>
                    <input id="cta-name" type="text" required placeholder="Jane Smith" />
                  </div>
                  <div className="cta-field">
                    <label htmlFor="cta-company">Company / Brand</label>
                    <input id="cta-company" type="text" required placeholder="Company Inc." />
                  </div>
                </div>

                <div className="cta-form__row">
                  <div className="cta-field">
                    <label htmlFor="cta-email">Business Email</label>
                    <input id="cta-email" type="email" required placeholder="jane@company.com" />
                  </div>
                  <div className="cta-field">
                    <label htmlFor="cta-phone">Phone Number</label>
                    <input id="cta-phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="cta-field">
                  <label htmlFor="cta-message">Tell Us About Your Vision</label>
                  <textarea
                    id="cta-message"
                    rows={3}
                    placeholder={
                      active === 'leasing'
                        ? 'E.g. We are looking for a 3,000 sq ft flagship in the luxury wing...'
                        : active === 'sponsorship'
                        ? 'E.g. We want to activate a 2-week brand experience...'
                        : 'E.g. We are planning a 500-person gala for Q4...'
                    }
                  />
                </div>

                <button className="cta-form__submit" type="submit">
                  Submit Inquiry →
                </button>
              </form>
            ) : (
              <div className="cta-success">
                <div className="cta-success__icon">✓</div>
                <h3>Thank You</h3>
                <p>
                  Our commercial team will be in touch within 24 hours to discuss your{' '}
                  {PATHS.find(p => p.id === active)?.title.toLowerCase()} inquiry.
                </p>
                <button className="cta-success__reset" onClick={() => setSubmitted(false)}>
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer strip */}
        <motion.div
          className="cta-section__footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="cta-footer-info">
            <span className="cta-footer-label">Address</span>
            <span>1 American Dream Way, East Rutherford, NJ 07073</span>
          </div>
          <div className="cta-footer-info">
            <span className="cta-footer-label">Commercial Leasing</span>
            <span>leasing@americandream.com</span>
          </div>
          <div className="cta-footer-info">
            <span className="cta-footer-label">Partnerships & Events</span>
            <span>partnerships@americandream.com</span>
          </div>
          <div className="cta-footer-credit">
            <span className="cta-footer-brand">AMERICAN DREAM</span>
            <span className="cta-footer-sub">East Rutherford, NJ · Est. 2019</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
