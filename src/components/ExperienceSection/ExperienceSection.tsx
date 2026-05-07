import { useState } from 'react'
import './ExperienceSection.css'

const mainExperience = {
  company: 'TSA Media Group',
  duration: '1 yr 5 mos',
  type: 'Hybrid',
  initials: 'TSA',
  roles: [
    {
  title: 'Junior Quality Assurance Analyst',
  company: 'The Social Agency',
  type: 'Full-time',
  period: 'Jun 2025 – Apr 2026 · 11 mos',
  location: 'Colombo 07, Sri Lanka',
  bullets: [
    'Performed manual testing for web applications and responsive platforms',
    'Created and executed structured test cases based on project requirements',
    'Identified, documented, and tracked software defects to resolution',
    'Collaborated with developers, designers, and project teams to improve product quality',
    'Conducted regression, smoke, and usability testing before production releases',
    'Contributed to automation testing using Selenium WebDriver with Java',
  ],
  note:
    'Focused on delivering reliable, user-friendly software while improving testing efficiency and overall product quality.',
},

{
  title: 'Quality Assurance Intern',
  company: 'The Social Agency',
  type: 'Internship',
  period: 'Dec 2024 – Jun 2025 · 7 mos',
  location: 'Colombo, Sri Lanka',
  bullets: [
    'Supported QA activities for multiple client web projects',
    'Learned and applied software testing fundamentals in real-world environments',
    'Assisted in writing test cases and executing manual test scenarios',
    'Worked with senior QA engineers to identify bugs and verify fixes',
    'Participated in Agile workflows and daily project coordination',
  ],
  skills: [
    ' Manual Testing,',
    ' Selenium,',
    ' Java,',
    ' Bug Reporting',
    ' Regression Testing',
    ' Agile/Scrum',
  ],
  note:
    'Built a strong foundation in software quality assurance, testing workflows, and team collaboration during the internship period.',
}
  ],
}

const olderExperiences = [
  {
    title: 'QA Testing Trainee',
    type: 'Internship',
    period: '2023 – 2024',
    location: 'Colombo, Sri Lanka',
    note: 'Learned test design techniques, defect lifecycle management, and API testing basics using Postman.',
  },
]

function ExperienceSection() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section id="experience" className="experience-section">
      <h2 className="section-heading">Experience</h2>

      {/* Main company block */}
      <div className="company-block">
        <div className="company-row">
          <div>
            <p className="company-name">{mainExperience.company}</p>
            <p className="company-meta">
              {mainExperience.duration} · {mainExperience.type}
            </p>
          </div>
        </div>

        <div className="timeline">
          {mainExperience.roles.map((role, i) => (
            <div key={role.title} className="timeline-item">
              <div className="timeline-dot" />
              {i < mainExperience.roles.length - 1 && (
                <div className="timeline-line" />
              )}
              <div className="timeline-content">
                <p className="role-title">{role.title}</p>
                <p className="role-meta">
                  {role.type} · {role.period}
                </p>
                <p className="role-location">{role.location}</p>
                {role.bullets && (
                  <ul className="role-bullets">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {role.note && <p className="role-note">{role.note}</p>}
                {role.skills && (
                  <span className="skills-tag">🛠 {role.skills}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show more toggle */}
      {/* {olderExperiences.length > 0 && (
        <>
          <div className="divider" />
          <button
            className={`show-more-btn ${showMore ? 'open' : ''}`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show less' : 'Show more experience'}
            <span className="chevron">{showMore ? '▲' : '▼'}</span>
          </button>

          <div className={`older-entries ${showMore ? 'open' : ''}`}>
            {olderExperiences.map((exp) => (
              <div key={exp.title} className="older-item">
                <p className="role-title">{exp.title}</p>
                <p className="role-meta">
                  {exp.type} · {exp.period}
                </p>
                <p className="role-location">{exp.location}</p>
                <p className="role-note">{exp.note}</p>
              </div>
            ))}
          </div>
        </>
      )} */}
    </section>
  )
}

export default ExperienceSection