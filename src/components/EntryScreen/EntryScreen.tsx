import { motion } from 'framer-motion'
import './EntryScreen.css'

interface EntryScreenProps {
  onEnter: () => void
}

const WORD_1 = 'American'
const WORD_2 = 'Dream'

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  return (
    <motion.div
      className="entry-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient elements */}
      <div className="entry-screen__glow" />
      <div className="entry-screen__grid" />

      {/* Corner accents */}
      <div className="entry-screen__corner entry-screen__corner--tl" />
      <div className="entry-screen__corner entry-screen__corner--tr" />
      <div className="entry-screen__corner entry-screen__corner--bl" />
      <div className="entry-screen__corner entry-screen__corner--br" />

      {/* Main content */}
      <div className="entry-screen__content">
        {/* Location eyebrow */}
        <motion.span
          className="entry-screen__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          East Rutherford, NJ · Est. 2019
        </motion.span>

        {/* Title — letter by letter reveal */}
        <h1 className="entry-screen__title">
          {/* "American" */}
          <span className="entry-screen__title-word">
            {WORD_1.split('').map((char, i) => (
              <motion.span
                key={`w1-${i}`}
                className="entry-screen__letter"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45 + i * 0.045,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>

          {/* "Dream" */}
          <span className="entry-screen__title-word">
            {WORD_2.split('').map((char, i) => (
              <motion.span
                key={`w2-${i}`}
                className="entry-screen__letter"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45 + (WORD_1.length + 1 + i) * 0.045,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Gold divider */}
        <motion.div
          className="entry-screen__divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: 1.3,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Tagline */}
        <motion.p
          className="entry-screen__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
        >
          North America's Largest Entertainment &amp; Retail Complex
          <br />
          3.5 Million Sq Ft · 40 Million Annual Visitors · 14 Miles from
          Manhattan
        </motion.p>

        {/* ENTER button */}
        <motion.button
          className="entry-screen__enter"
          onClick={onEnter}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Enter</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
