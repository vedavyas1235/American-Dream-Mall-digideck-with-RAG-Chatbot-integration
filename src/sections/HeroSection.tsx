import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useDeckSafe } from '../components/Deck/DeckEngine'
import './HeroSection.css'

export default function HeroSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.8 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  const deck = useDeckSafe()

  return (
    <section id="hero" className="hero">
      {/* YouTube Background Video — always visible, no lazy load */}
      <div className="hero__video-wrap hero__video-wrap--ready">
        <iframe
          ref={iframeRef}
          className="hero__video"
          src="https://www.youtube.com/embed/ZsYAdM32MLw?autoplay=1&mute=1&loop=1&playlist=ZsYAdM32MLw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          title="American Dream"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="hero__overlay" />
      <div className="hero__overlay-bottom" />

      {/* Text content */}
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero__headline" variants={itemVariants}>
          Not Just a<br />
          <em>Destination.</em><br />
          A New Standard.
        </motion.h1>

        <div className="gold-line" style={{ marginTop: '32px', marginBottom: '32px' }} />
      </motion.div>

      {/* Skip Intro — only in deck mode */}
      {deck && (
        <button
          className="hero__skip-intro hero__skip-intro--bottom"
          onClick={deck.next}
          aria-label="Skip intro"
        >
          <span>Skip Intro</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </section>
  )
}
