import { useState, useEffect, useRef } from 'react'
import './HeroSection.css'
import { GoDownload } from "react-icons/go";

function HeroSection() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const handleCoinFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      <div className="hero-content">
        <h1>Hi, I am Janitha</h1>
        <h2>Software Quality Assurance Engineer</h2>
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
          <a href="/Janitha's_CV.pdf" className="btn btn-secondary" download>
            <GoDownload size={15} /> Download CV 
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

      {isVisible && (
        <div className="scroll-indicator">
          <span className="scroll-indicator__text">Scroll to explore</span>
          <div className="scroll-indicator__arrow" />
        </div>
      )}
    </section>
  )
}

export default HeroSection