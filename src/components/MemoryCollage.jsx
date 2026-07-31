import { motion } from 'framer-motion'
import nightOut from '../assets/memories/night-out.jpg'
import cozySelfie from '../assets/memories/cozy-selfie.jpg'
import walkingTogether from '../assets/memories/walking-together.jpg'

const memories = [
  {
    className: 'memory-night',
    src: nightOut,
    alt: 'A smiling couple taking a selfie together during a night out',
    caption: 'The nights that turn into stories',
    rotate: -6,
    delay: 0.12,
  },
  {
    className: 'memory-walk',
    src: walkingTogether,
    alt: 'A couple holding hands while walking together down a city street',
    caption: 'Anywhere, as long as it is together',
    rotate: 1.5,
    delay: 0,
  },
  {
    className: 'memory-cozy',
    src: cozySelfie,
    alt: 'A smiling couple sitting close together for a selfie',
    caption: 'The comfort of simply being us',
    rotate: 5,
    delay: 0.22,
  },
]

function MemoryCollage({ reducedMotion }) {
  return (
    <section className="memories" aria-labelledby="memories-title">
      <motion.div
        className="memories-heading"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}
      >
        <span className="memory-kicker">Our little collection</span>
        <h2 id="memories-title">A few moments. A thousand feelings.</h2>
        <p>
          The kind of memories that feel warm even before you look back at them.
        </p>
      </motion.div>

      <div className="collage-canvas">
        <span className="collage-thread thread-one" aria-hidden="true" />
        <span className="collage-thread thread-two" aria-hidden="true" />

        {memories.map((memory, index) => (
          <div className={`memory-slot ${memory.className}`} key={memory.src}>
            <motion.figure
              className="memory-card"
              initial={{
                opacity: 0,
                y: reducedMotion ? 0 : 70,
                scale: reducedMotion ? 1 : 0.88,
                rotate: reducedMotion ? memory.rotate : memory.rotate * 1.7,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: memory.rotate,
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -12,
                      rotate: memory.rotate * 0.35,
                      scale: 1.025,
                    }
              }
              viewport={{ once: true, amount: 0.24 }}
              transition={{
                duration: reducedMotion ? 0 : 0.82,
                delay: reducedMotion ? 0 : memory.delay,
                type: reducedMotion ? 'tween' : 'spring',
                stiffness: 90,
                damping: 15,
              }}
            >
              <div className="memory-image-wrap">
                <img
                  src={memory.src}
                  alt={memory.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <span className="memory-glow" aria-hidden="true" />
              </div>
              <figcaption>{memory.caption}</figcaption>
              <span className="photo-tape" aria-hidden="true" />
            </motion.figure>
          </div>
        ))}

        <motion.p
          className="collage-whisper"
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reducedMotion ? 0 : 0.65, duration: reducedMotion ? 0 : 0.5 }}
        >
          my favorite place is next to you
          <span aria-hidden="true">♥</span>
        </motion.p>
      </div>
    </section>
  )
}

export default MemoryCollage
