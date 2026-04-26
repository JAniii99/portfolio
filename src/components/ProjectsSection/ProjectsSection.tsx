import './ProjectsSection.css'

const projects = [
  {
    title: 'E-Commerce Checkout Testing',
    summary:
      'Prepared test scenarios and bug reports for cart, payment, and order confirmation flows.',
  },
  {
    title: 'API Validation Practice',
    summary:
      'Built Postman collections to validate status codes, schema, and key response fields.',
  },
]

function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
