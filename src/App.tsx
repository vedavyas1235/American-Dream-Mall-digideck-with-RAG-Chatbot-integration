import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import EntryScreen from './components/EntryScreen/EntryScreen'
import DeckEngine from './components/Deck/DeckEngine'
import './App.css'

// Chatbot is kept aside — position will be confirmed by the user
// import Chatbot from './components/Chatbot/Chatbot'

function App() {
  // Persist entry state through HMR in dev; reset on hard reload
  const [entered, setEntered] = useState(false)

  // Lock body scroll once deck is active
  useEffect(() => {
    if (entered) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!entered ? (
          <EntryScreen key="entry" onEnter={() => setEntered(true)} />
        ) : (
          <DeckEngine key="deck" />
        )}
      </AnimatePresence>
      {/* <Chatbot /> */}
    </div>
  )
}

export default App
