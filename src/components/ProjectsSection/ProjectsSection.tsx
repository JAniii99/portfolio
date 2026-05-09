import { useEffect, useRef } from 'react'
import './ProjectsSection.css'

type Stat = {
  value: number
  label: string
  color: string
  trackColor: string
  trackOpacity: number
  max: number
}

/*
type Project = {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  title: string
  desc: string
  demo: string
  github: string
}
*/

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS: Stat[] = [
  {
    value: 12,
    label: 'Total projects',
    color: '#7F77DD',
    trackColor: '#AFA9EC',
    trackOpacity: 0.25,
    max: 15,
  },
  {
    value: 5,
    label: 'Automation projects',
    color: '#1D9E75',
    trackColor: '#5DCAA5',
    trackOpacity: 0.25,
    max: 4,
  },
  {
    value: 4,
    label: 'E-commerce sites',
    color: '#D85A30',
    trackColor: '#F0997B',
    trackOpacity: 0.25,
    max: 4,
  },
  {
    value: 3,
    label: 'Web applications',
    color: '#378ADD',
    trackColor: '#85B7EB',
    trackOpacity: 0.25,
    max: 5,
  },
]

/*
const PROJECTS: Project[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    ),
    iconBg: '#0f172a',
    iconColor: '#38bdf8',
    title: 'E-Commerce checkout testing',
    desc: 'Test scenarios & bug reports for cart, payment, and order confirmation flows.',
    demo: 'https://your-demo-link.com',
    github: 'https://github.com/your-repo',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
    ),
    iconBg: '#0f172a',
    iconColor: '#38bdf8',
    title: 'API validation suite',
    desc: 'Postman collections validating status codes, schema, and key response fields.',
    demo: 'https://your-demo-link.com',
    github: 'https://github.com/your-repo',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    iconBg: '#0f172a',
    iconColor: '#38bdf8',
    title: 'Test automation framework',
    desc: 'Selenium-based framework for automated regression testing across web apps.',
    demo: 'https://your-demo-link.com',
    github: 'https://github.com/your-repo',
  },
]

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconDemo = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const IconGithub = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

// ── StatRing ──────────────────────────────────────────────────────────────────
*/

const SIZE = 100
const R = 42
const STROKE = 6
const CIRC = 2 * Math.PI * R

function StatRing({ stat, index }: { stat: Stat; index: number }) {
  const progressRef = useRef<SVGCircleElement | null>(null)
  const numberRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const delay = index * 150
    const duration = 1200 + delay
    const pct = stat.value / stat.max
    const targetDash = CIRC - pct * CIRC

    const timer = setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.style.transition = `stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)`
        progressRef.current.style.strokeDashoffset = String(targetDash)
      }

      let start: number | null = null
      function count(ts: number) {
        if (!start) start = ts
        const prog = Math.min((ts - start) / duration, 1)
        if (numberRef.current) {
          numberRef.current.textContent = String(Math.round(prog * stat.value))
        }
        if (prog < 1) requestAnimationFrame(count)
      }
      requestAnimationFrame(count)
    }, 120)

    return () => clearTimeout(timer)
  }, [stat, index])

  return (
    <div className="stat-ring">
      <div className="stat-ring__svg-wrap">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {/* Track */}
          <circle
            className="stat-ring__track"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={stat.trackColor}
            strokeWidth={STROKE}
            opacity={stat.trackOpacity}
          />
          {/* Progress */}
          <circle
            ref={progressRef}
            className="stat-ring__progress"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={stat.color}
            strokeWidth={STROKE}
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC}
            strokeLinecap="round"
          />
        </svg>
        <div className="stat-ring__inner">
          <span className="stat-ring__number" ref={numberRef}>0</span>
        </div>
      </div>
      <span className="stat-ring__label">{stat.label}</span>
    </div>
  )
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
/*
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="proj-card">
      <div
        className="proj-card__icon"
        style={{ background: project.iconBg, color: project.iconColor }}
      >
        {project.icon}
      </div>
      <h3 className="proj-card__title">{project.title}</h3>
      <p className="proj-card__desc">{project.desc}</p>
      <div className="proj-card__links">
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-card__link"
        >
          <IconDemo /> Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-card__link"
        >
          <IconGithub /> GitHub
        </a>
      </div>
    </article>
  )
}

// ── ProjectsSection ───────────────────────────────────────────────────────────

// Duplicate cards to create seamless infinite loop.
// Kept here for future re-enablement or edits.
const SLIDER_ITEMS = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS]
*/

function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-section__heading">Projects</h2>

      {/* Stat rings */}
      <div className="projects-stats">
        {STATS.map((stat, i) => (
          <StatRing key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Infinite slider hidden for future edits.
      <div className="projects-slider">
        <div className="projects-slider__track">
          {SLIDER_ITEMS.map((project, i) => (
            <ProjectCard key={`${project.title}-${i}`} project={project} />
          ))}
        </div>
      </div>
      */}
    </section>
  )
}

export default ProjectsSection