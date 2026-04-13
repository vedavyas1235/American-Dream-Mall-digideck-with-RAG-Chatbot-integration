import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeck } from './DeckEngine'
import ChatBot from './ChatBot'

export default function DeckNav() {
  const { currentSlide, totalSlides, chapters, slides, goTo, next, prev } = useDeck()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [glowNext, setGlowNext] = useState(false)

  useEffect(() => {
    setGlowNext(false)
    let t: ReturnType<typeof setTimeout> | null = null

    if (currentSlide === 0) {
      t = setTimeout(() => setGlowNext(true), 90000)
    } else if (currentSlide === 5) {
      // Attractions slide (index 5) - glow after 1 full loop (4 items * 6s = 24s)
      t = setTimeout(() => setGlowNext(true), 24000)
    }

    return () => { if (t) clearTimeout(t) }
  }, [currentSlide])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      {/* ── Top Bar ─────────────────────────────────────────── */}
      {(currentSlide !== 0 || glowNext) && (
        <div className="deck-topbar">
        <button
          className="deck-topbar__hamburger"
          onClick={() => setDrawerOpen(o => !o)}
          aria-label={drawerOpen ? 'Close menu' : 'Open navigation menu'}
        >
          <span
            className={`deck-topbar__bar ${drawerOpen ? 'deck-topbar__bar--open' : ''}`}
          />
          <span
            className={`deck-topbar__bar ${drawerOpen ? 'deck-topbar__bar--open' : ''}`}
          />
          <span
            className={`deck-topbar__bar ${drawerOpen ? 'deck-topbar__bar--open' : ''}`}
          />
        </button>

          <span className="deck-topbar__title">American Dream</span>
        </div>
      )}

      {/* ── Drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="deck-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeDrawer}
            />

            {/* Panel */}
            <motion.div
              className="deck-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Drawer header */}
              <div className="deck-drawer__header">
                <span className="deck-drawer__brand">American Dream</span>
                <button
                  className="deck-drawer__close"
                  onClick={closeDrawer}
                  aria-label="Close navigation"
                >
                  ×
                </button>
              </div>

              {/* Chapter / slide list */}
              <nav className="deck-drawer__nav" aria-label="Deck navigation">
                {chapters.map((chapter, ci) => (
                  <div key={chapter.label} className="deck-chapter">
                    {/* Chapter label — clicking goes to first slide of chapter */}
                    <button
                      className="deck-chapter__label"
                      onClick={() => {
                        goTo(chapter.slideIndices[0])
                        closeDrawer()
                      }}
                    >
                      {chapter.label}
                    </button>

                    {/* Sub-slides */}
                    <div className="deck-chapter__slides">
                      {chapter.slideIndices.map(idx => (
                        <button
                          key={idx}
                          className={`deck-slide-btn ${currentSlide === idx ? 'deck-slide-btn--active' : ''}`}
                          onClick={() => {
                            goTo(idx)
                            closeDrawer()
                          }}
                        >
                          {slides[idx].slideLabel}
                        </button>
                      ))}
                    </div>

                    {/* Divider between chapters (not last) */}
                    {ci < chapters.length - 1 && (
                      <div className="deck-drawer__divider" />
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Arrows ────────────────────────────────────── */}
      <div className="deck-arrows" role="navigation" aria-label="Slide navigation">
        <button
          className="deck-arrow deck-arrow--prev"
          onClick={prev}
          style={{ opacity: currentSlide === 0 ? 0 : 1, pointerEvents: currentSlide === 0 ? 'none' : 'auto' }}
          aria-label="Previous slide"
        >
          ←
        </button>

        {currentSlide !== 1 && currentSlide !== 6 && currentSlide !== 7 && currentSlide !== 9 && currentSlide !== 10 && currentSlide !== 11 && currentSlide !== 13 && currentSlide !== 14 && (
          <button
            className={`deck-arrow deck-arrow--next ${glowNext ? 'deck-arrow--glow' : ''}`}
            onClick={next}
            style={{ opacity: currentSlide === totalSlides - 1 ? 0 : 1, pointerEvents: currentSlide === totalSlides - 1 ? 'none' : 'auto' }}
            aria-label="Next slide"
          >
            →
          </button>
        )}
      </div>

      {/* ── Chatbot (last slide only) ─────────────── */}
      <ChatBot isLastSlide={currentSlide === totalSlides - 1} />
    </>
  )
}
