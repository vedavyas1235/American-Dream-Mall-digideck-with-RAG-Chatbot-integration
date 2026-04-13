import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import DeckNav from './DeckNav'
import DeckSlide from './DeckSlide'

// ── Section imports (Phase 1) ────────────────────────────────────────────────
import HeroSection from '../../sections/HeroSection'
import ScaleSection from '../../sections/ScaleSection'
import CatchmentSection from '../../sections/CatchmentSection'
import LuxurySection from '../../sections/LuxurySection'
import DiningSection from '../../sections/DiningSection'
import AttractionsSection from '../../sections/AttractionsSection'
import EventsSection from '../../sections/EventsSection'
import VenueDirectorySection from '../../sections/VenueDirectorySection'
import LeasingIntroSection from '../../sections/LeasingIntroSection'
import MallLayoutSection from '../../sections/MallLayoutSection'
import LeasingFormatsSection from '../../sections/LeasingFormatsSection'
import AudienceSection from '../../sections/AudienceSection'
import SponsorshipIntroSection from '../../sections/SponsorshipIntroSection'
import PartnershipTiersSection from '../../sections/PartnershipTiersSection'
import ExistingPartnersSection from '../../sections/ExistingPartnersSection'
import EventHistorySection from '../../sections/EventHistorySection'
import CTASection from '../../sections/CTASection'

// ── Page imports (Phase 2) ───────────────────────────────────────────────────
import LeasingPage from '../../pages/LeasingPage'
import SponsorsPage from '../../pages/SponsorsPage'
import EventsPage from '../../pages/EventsPage'
import VenuesPage from '../../pages/VenuesPage'

import './Deck.css'

// ── Types ────────────────────────────────────────────────────────────────────

export interface SlideConfig {
  id: string
  chapterLabel: string
  slideLabel: string
  component: React.ComponentType<Record<string, unknown>>
}

export interface ChapterGroup {
  label: string
  slideIndices: number[]
}

export interface DeckContextType {
  currentSlide: number
  totalSlides: number
  slides: SlideConfig[]
  chapters: ChapterGroup[]
  direction: number
  goTo: (n: number) => void
  next: () => void
  prev: () => void
  goToSlideById: (id: string) => void
}

// ── Master slide list ────────────────────────────────────────────────────────

export const SLIDES: SlideConfig[] = [
  {
    id: 'intro',
    chapterLabel: 'Opening',
    slideLabel: 'Cinematic Intro',
    component: HeroSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'scale',
    chapterLabel: 'Why American Dream',
    slideLabel: 'The Numbers',
    component: ScaleSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'catchment',
    chapterLabel: 'Why American Dream',
    slideLabel: 'Catchment Area',
    component: CatchmentSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'luxury',
    chapterLabel: 'Luxury',
    slideLabel: 'The Avenue',
    component: LuxurySection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'dining',
    chapterLabel: 'Dining & Lifestyle',
    slideLabel: 'Dining Overview',
    component: DiningSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'attractions',
    chapterLabel: 'Attractions & Entertainment',
    slideLabel: 'Attractions',
    component: AttractionsSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'leasing-intro',
    chapterLabel: 'Leasing Opportunities',
    slideLabel: 'Leasing Overview',
    component: LeasingIntroSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'mall-layout',
    chapterLabel: 'Leasing Opportunities',
    slideLabel: 'Mall Layout',
    component: MallLayoutSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'leasing-formats',
    chapterLabel: 'Leasing Opportunities',
    slideLabel: 'Leasing Formats',
    component: LeasingFormatsSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'sponsorship-intro',
    chapterLabel: 'Brand Partnerships',
    slideLabel: 'Partnership Overview',
    component: SponsorshipIntroSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'audience',
    chapterLabel: 'Brand Partnerships',
    slideLabel: 'Audience Profile',
    component: AudienceSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'partnership-tiers',
    chapterLabel: 'Brand Partnerships',
    slideLabel: 'Partnership Levels',
    component: PartnershipTiersSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'existing-partners',
    chapterLabel: 'Brand Partnerships',
    slideLabel: 'Existing Partners',
    component: ExistingPartnersSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'events',
    chapterLabel: 'Events & Platform',
    slideLabel: 'Events Overview',
    component: EventsSection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'venue-summary',
    chapterLabel: 'Events & Platform',
    slideLabel: 'Venue Directory',
    component: VenueDirectorySection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'venue-detail',
    chapterLabel: 'Events & Platform',
    slideLabel: 'Venue Details',
    component: VenuesPage as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'event-history',
    chapterLabel: 'Events & Platform',
    slideLabel: 'Event History',
    component: EventHistorySection as React.ComponentType<Record<string, unknown>>,
  },
  {
    id: 'cta',
    chapterLabel: 'Get Started',
    slideLabel: 'Partner With Us',
    component: CTASection as React.ComponentType<Record<string, unknown>>,
  },
]

function buildChapters(): ChapterGroup[] {
  const map = new Map<string, number[]>()
  SLIDES.forEach((slide, i) => {
    if (!map.has(slide.chapterLabel)) map.set(slide.chapterLabel, [])
    map.get(slide.chapterLabel)!.push(i)
  })
  return Array.from(map.entries()).map(([label, slideIndices]) => ({
    label,
    slideIndices,
  }))
}

const CHAPTERS = buildChapters()

// ── Context ──────────────────────────────────────────────────────────────────

const DeckContext = createContext<DeckContextType | null>(null)

/** Throws if called outside DeckEngine */
export function useDeck(): DeckContextType {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck must be used within DeckEngine')
  return ctx
}

/** Returns null if called outside DeckEngine (safe for optional usage) */
export function useDeckSafe(): DeckContextType | null {
  return useContext(DeckContext)
}

// ── DeckEngine ───────────────────────────────────────────────────────────────

export default function DeckEngine() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<number>(1)

  const goTo = useCallback(
    (n: number) => {
      const clamped = Math.max(0, Math.min(n, SLIDES.length - 1))
      setDirection(clamped >= currentSlide ? 1 : -1)
      setCurrentSlide(clamped)
    },
    [currentSlide]
  )

  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo])
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo])

  const goToSlideById = useCallback(
    (id: string) => {
      const idx = SLIDES.findIndex(s => s.id === id)
      if (idx !== -1) goTo(idx)
    },
    [goTo]
  )

  // Keyboard navigation (skip when user is typing in inputs)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const ctx: DeckContextType = {
    currentSlide,
    totalSlides: SLIDES.length,
    slides: SLIDES,
    chapters: CHAPTERS,
    direction,
    goTo,
    next,
    prev,
    goToSlideById,
  }

  const ActiveComp = SLIDES[currentSlide].component

  return (
    <DeckContext.Provider value={ctx}>
      <div className="deck">
        {/* Gold progress bar */}
        <div
          className="deck-progress"
          style={{ width: `${(currentSlide / (SLIDES.length - 1)) * 100}%` }}
        />

        {/* Top bar + drawer + arrows */}
        <DeckNav />

        {/* Active slide with fade transition */}
        <AnimatePresence mode="wait" custom={direction}>
          <DeckSlide key={currentSlide}>
            <ActiveComp
              onNext={next}
              onSkipIntro={next}
              goToSlideById={goToSlideById}
            />
          </DeckSlide>
        </AnimatePresence>
      </div>
    </DeckContext.Provider>
  )
}
