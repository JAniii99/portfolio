import { useEffect, useRef, useState } from 'react'
import './ToolsSection.css'

interface Tool {
  name: string
  years: number
  img?: string
}

const tools: Tool[] = [
  { name: 'Selenium', years: 1, img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
  { name: 'Java', years: 2, img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'React', years: 1, img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Figma', years: 2, img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'WordPress', years: 2, img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
  { name: 'SQL', years: 2, img: 'https://res.cloudinary.com/dco8r8cki/image/upload/v1778175797/sql-database-generic-svgrepo-com_vy7rbu.svg' },
  { name: 'Git', years: 2, img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', years: 2, img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Postman', years: 1, img: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
  { name: 'Manual Testing', years: 2, img: 'https://res.cloudinary.com/dco8r8cki/image/upload/v1778176340/codescan-svgrepo-com_kwjzid.svg' },
]

function getInitials(name: string) {
  return name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

interface FlipCardProps {
  tool: Tool
  isFlipped: boolean
  onClick: () => void
}

function FlipCard({ tool, isFlipped, onClick }: FlipCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flip-card" onClick={onClick}>
      <div className={`flip-inner${isFlipped ? ' flipped' : ''}`}>
        <div className="flip-front">
          <div className="tool-icon">
            {tool.img && !imgError ? (
              <img src={tool.img} alt={tool.name} onError={() => setImgError(true)} />
            ) : (
              <span className="initials">{getInitials(tool.name)}</span>
            )}
          </div>
          <div className="tool-name">{tool.name}</div>
        </div>
        <div className="flip-back">
          <div className="back-label">{tool.name}</div>
          <div className="back-years">{tool.years}<span style={{ fontSize: '20px' }}>+</span></div>
          <div className="back-tag">{tool.years === 1 ? 'year' : 'years'}</div>
        </div>
      </div>
    </div>
  )
}

export default function ToolsSection() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})
  const [mobilePage, setMobilePage] = useState(0)
  const flipTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({})
  const autoFlipRef = useRef(0)

  const totalItems = tools.length
  const perPage = 3
  const pages = Math.ceil(totalItems / perPage)

  const handleFlip = (idx: number) => {
    setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }))
    clearTimeout(flipTimers.current[idx])
    flipTimers.current[idx] = setTimeout(() => {
      setFlipped(prev => ({ ...prev, [idx]: false }))
    }, 5000)
  }

  // Auto-flip cycling
  useEffect(() => {
    const interval = setInterval(() => {
      const idx = autoFlipRef.current % tools.length
      autoFlipRef.current++
      setFlipped(prev => ({ ...prev, [idx]: true }))
      clearTimeout(flipTimers.current[idx])
      flipTimers.current[idx] = setTimeout(() => {
        setFlipped(prev => ({ ...prev, [idx]: false }))
      }, 5000)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  // Mobile carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setMobilePage(p => (p + 1) % pages)
    }, 4000)
    return () => clearInterval(interval)
  }, [pages])

  const row1 = tools.slice(0, 4)
  const row2 = tools.slice(4, 7)
  const row3 = tools.slice(7, 10)

  const mobileItems = tools

  return (
    <section id="tools" className="tools-section">
      <h2>Tools</h2>

      {/* Desktop grid: 4-3-3 */}
      <div className="desktop-grid">
        <div className="grid-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {row1.map((tool, i) => (
            <div key={tool.name} className="circle-cell">
              <FlipCard tool={tool} isFlipped={!!flipped[i]} onClick={() => handleFlip(i)} />
            </div>
          ))}
        </div>
        <div className="grid-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {row2.map((tool, i) => (
            <div key={tool.name} className="circle-cell">
              <FlipCard tool={tool} isFlipped={!!flipped[i + 4]} onClick={() => handleFlip(i + 4)} />
            </div>
          ))}
        </div>
        <div className="grid-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {row3.map((tool, i) => (
            <div key={tool.name} className="circle-cell">
              <FlipCard tool={tool} isFlipped={!!flipped[i + 7]} onClick={() => handleFlip(i + 7)} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile carousel: 3 at a time */}
      <div className="mobile-carousel">
        <div className="carousel-track-wrap">
          <div
            className="carousel-track"
            style={{ transform: `translateX(calc(-${mobilePage * 100}% - ${mobilePage * 16}px))` }}
          >
            {mobileItems.map((tool, i) => (
              <div key={i} className="carousel-slide">
                <FlipCard tool={tool} isFlipped={!!flipped[i]} onClick={() => handleFlip(i)} />
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={`dot${mobilePage === i ? ' active' : ''}`}
              onClick={() => setMobilePage(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}