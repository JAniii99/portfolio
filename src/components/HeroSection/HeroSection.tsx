import { useState } from 'react'
import './HeroSection.css'

function HeroSection() {
  const [flipCount, setFlipCount] = useState(0)

  const handleImageFlip = () => {
    setFlipCount((prev) => prev + 1)
  }

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <p className="kicker">QA Engineer Portfolio</p>
        <h1>Hi, I am Janitha</h1>
        <h2>Quality Assurance Engineer</h2>
        <p>
          I help teams deliver reliable, high-quality software through careful testing, clear test strategies, and practical automation using Selenium and Java.
        </p>
        <p>
          With hands-on experience in both manual and automation testing, I focus on finding issues early, improving product quality, and ensuring a smooth user experience.
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
        className="hero-image-button"
        onClick={handleImageFlip}
        aria-label="Flip profile image"
      >
        <div
          className="hero-image-wrap"
          style={{ transform: `rotateY(${flipCount * 180}deg)` }}
        >
          <img src="/favicon.svg" alt="Janitha profile" className="hero-image" />
        </div>
      </button>
    </section>
  )
}

export default HeroSection
