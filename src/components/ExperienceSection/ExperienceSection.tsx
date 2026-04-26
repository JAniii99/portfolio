import './ExperienceSection.css'

const experiences = [
  {
    role: 'Junior QA Engineer',
    place: 'Freelance and Practice Projects',
    period: '2024 - Present',
    details:
      'Created test cases, executed regression tests, and documented bugs with clear reproduction steps.',
  },
  {
    role: 'Manual Testing Trainee',
    place: 'QA Learning Programs',
    period: '2023 - 2024',
    details:
      'Learned test design techniques, defect lifecycle, and API testing basics using Postman.',
  },
]

function ExperienceSection() {
  return (
    <section id="experience" className="experience-section">
      <h2>Experience</h2>
      <div className="timeline">
        {experiences.map((item) => (
          <article key={item.role} className="timeline-item">
            <h3>{item.role}</h3>
            <p className="meta">
              {item.place} | {item.period}
            </p>
            <p>{item.details}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
