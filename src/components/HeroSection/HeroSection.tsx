import { useState } from 'react'
import './HeroSection.css'

function HeroSection() {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleCoinFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <p className="kicker">QA Engineer Portfolio</p>
        <h1>Hi, I am Janitha</h1>
        <h2>Quality Assurance Engineer</h2>
        <p>
          I help teams deliver reliable, high-quality software through careful testing, clear test
          strategies, and practical automation using Selenium and Java.
        </p>
        <p>
          With hands-on experience in both manual and automation testing, I focus on finding issues
          early, improving product quality, and ensuring a smooth user experience.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Contact Me
          </a>
          <a href="/Janitha-CV.pdf" className="btn btn-secondary" download>
            Download CV
          </a>
        </div>
      </div>

      <button
        type="button"
        className="coin-button"
        onClick={handleCoinFlip}
        aria-label="Flip profile coin"
      >
        <div className={`coin ${isFlipped ? 'coin--flipped' : ''}`}>
          {/* Coin edge ring for 3D depth */}
          <div className="coin__edge" />

          {/* Front face */}
          <div className="coin__face coin__face--front">
            <div className="coin__rim" />
            <div className="coin__image-wrap">
              <img src="/image.jpg" alt="Janitha profile" className="coin__image" />
            </div>
            <div className="coin__shine" />
          </div>

          {/* Back face */}
          <div className="coin__face coin__face--back">
            <div className="coin__rim" />
            <div className="coin__image-wrap">
              <img src="/hello.gif" alt="Janitha profile back" className="coin__image" />
            </div>
            <div className="coin__shine coin__shine--back" />
          </div>
        </div>
      </button>
    </section>
  )
}

export default HeroSection