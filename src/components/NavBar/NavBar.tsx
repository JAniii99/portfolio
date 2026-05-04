import { useEffect, useMemo, useState, type MouseEvent } from 'react'
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
    <nav className="navbar" aria-label="Main navigation">
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
