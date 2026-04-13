import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDeck } from './DeckEngine'

const variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.28, ease: 'easeIn' as const },
  },
}

interface DeckSlideProps {
  children: React.ReactNode
}

export default function DeckSlide({ children }: DeckSlideProps) {
  const { direction } = useDeck()
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset scroll to top whenever a new slide mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="deck-slide-wrapper"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
