import { useEffect, useMemo, useState, useRef, type MouseEvent } from 'react'
import './NavBar.css'

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
    }, 1500)
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

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const leftEdgeThreshold = 30
      if (e.clientX < leftEdgeThreshold) {
        setIsNavVisible(true)
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleNavMouseEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }
  }

  const handleNavMouseLeave = () => {
    resetHideTimer()
  }

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const scrollRoot = document.querySelector('.page') as HTMLElement | null
    if (!sections.length || !scrollRoot) {
      return
    }

    const updateActiveSection = () => {
      const rootRect = scrollRoot.getBoundingClientRect()
      const targetLine = rootRect.top + rootRect.height * 0.32

      let nearestSectionId = sections[0].id
      let nearestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const distance = Math.abs(rect.top - targetLine)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestSectionId = section.id
        }
      })

      setActiveSection((prev) => (prev === nearestSectionId ? prev : nearestSectionId))
    }

    updateActiveSection()
    scrollRoot.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      scrollRoot.removeEventListener('scroll', updateActiveSection)
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
    <nav
      className={`navbar ${isNavVisible ? 'visible' : 'hidden'}`}
      aria-label="Main navigation"
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
    >
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
