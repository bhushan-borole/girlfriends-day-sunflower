import { useCallback, useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, RotateCcw, Sparkles } from 'lucide-react'
import MemoryCollage from './components/MemoryCollage.jsx'
import SunflowerScene from './components/SunflowerScene.jsx'
import { note } from './content/message.js'
import './App.css'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function readThemeColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function App() {
  const [bloomKey, setBloomKey] = useState(0)
  const [bloomed, setBloomed] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const noteRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const handleBloomComplete = useCallback(() => setBloomed(true), [])

  const openNote = () => {
    setNoteOpen(true)

    if (!reducedMotion) {
      const colors = [
        readThemeColor('--cp-warning'),
        readThemeColor('--cp-accent'),
        readThemeColor('--cp-success'),
        readThemeColor('--cp-text'),
      ]

      confetti({
        particleCount: 80,
        spread: 78,
        startVelocity: 34,
        gravity: 0.8,
        scalar: 0.8,
        origin: { y: 0.68 },
        colors,
        disableForReducedMotion: true,
      })
    }
  }

  const replay = () => {
    setNoteOpen(false)
    setBloomed(false)
    setBloomKey((key) => key + 1)
  }

  return (
    <main className="experience">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <span className="eyebrow">
          <Heart size={14} fill="currentColor" aria-hidden="true" />
          A little bloom for you
        </span>
        <button className="replay-button" type="button" onClick={replay}>
          <RotateCcw size={16} aria-hidden="true" />
          Replay
        </button>
      </header>

      <section className="hero" aria-labelledby="greeting-title">
        <motion.div
          className="copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <p className="date-line">
            <Sparkles size={16} aria-hidden="true" />
            August 1
          </p>
          <h1 id="greeting-title">
            Happy Girlfriend&apos;s Day
            <span>to the one who makes everything brighter.</span>
          </h1>
          <p className="intro">
            Some people bring sunshine with them. You make it feel like home.
          </p>
        </motion.div>

        <div className="flower-stage">
          <SunflowerScene
            key={bloomKey}
            reducedMotion={reducedMotion}
            onBloomComplete={handleBloomComplete}
          />
          <p className={`bloom-caption ${bloomed ? 'is-visible' : ''}`} aria-live="polite">
            {bloomed ? 'This one bloomed just for you.' : 'A little sunshine is growing…'}
          </p>
        </div>
      </section>

      <MemoryCollage reducedMotion={reducedMotion} />

      <section className="note-section" aria-label="A special note">
        <AnimatePresence mode="wait">
          {!noteOpen ? (
            <motion.div
              key="invitation"
              className="note-invitation"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: bloomed ? 1 : 0.36, y: bloomed ? 0 : 18 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reducedMotion ? 0 : 0.55 }}
            >
              <div className="note-petals" aria-hidden="true">
                {Array.from({ length: 12 }, (_, index) => (
                  <span className={`note-petal note-petal-${index + 1}`} key={index} />
                ))}
              </div>
              <span className="note-kicker">One more thing</span>
              <h2>There&apos;s a note tucked beneath the petals.</h2>
              <button
                className="primary-button"
                type="button"
                onClick={openNote}
                disabled={!bloomed}
              >
                <Heart size={18} fill="currentColor" aria-hidden="true" />
                Open your note
              </button>
            </motion.div>
          ) : (
            <motion.article
              key="note"
              ref={noteRef}
              className="note-card"
              tabIndex="-1"
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: reducedMotion ? 'tween' : 'spring', stiffness: 120, damping: 16 }}
              onAnimationComplete={() => noteRef.current?.focus()}
            >
              <span className="note-kicker">{note.kicker}</span>
              <h2>{note.heading}</h2>
              <div className="note-copy">
                {note.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="sign-off">
                {note.signOff}
                <span>{note.signature}</span>
              </p>
              <div className="note-seal" aria-hidden="true">
                <Heart size={18} fill="currentColor" />
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </section>

      <footer>
        Made with sunshine, petals, and a whole lot of heart.
        <span aria-hidden="true">🌻</span>
      </footer>
    </main>
  )
}

export default App
