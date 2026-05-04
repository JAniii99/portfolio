import { useEffect, useMemo, useState, useRef, type MouseEvent } from 'react'
import './NavBar.css'
import { FaArrowLeft } from "react-icons/fa6";

function NavBar() {
  const navItems = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'tools', label: 'Tools' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  )

  const [activeSection, setActiveSection] = useState('home')
  const [isNavVisible, setIsNavVisible] = useState(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }
    hideTimerRef.current = setTimeout(() => {
      setIsNavVisible(false)
    }, 5000)
  }

  useEffect(() => {
    const scrollRoot = document.querySelector('.page')
    if (!scrollRoot) return

    const handleScroll = () => {
      setIsNavVisible(true)
      resetHideTimer()
    }

    scrollRoot.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      scrollRoot.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleArrowClick = () => {
    setIsNavVisible(!isNavVisible)
    if (!isNavVisible) {
      resetHideTimer()
    }
  }

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const scrollRoot = document.querySelector('.page')
    if (!sections.length || !scrollRoot) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        root: scrollRoot,
        threshold: [0.35, 0.55, 0.75],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [navItems])

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className={`navbar ${isNavVisible ? 'visible' : 'hidden'}`} aria-label="Main navigation">
      <button
        className="nav-toggle"
        onClick={handleArrowClick}
        aria-label="Toggle navigation"
        aria-expanded={isNavVisible}
      >
        <span className="arrow"><FaArrowLeft /></span>
      </button>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              className={activeSection === item.id ? 'active' : ''}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
