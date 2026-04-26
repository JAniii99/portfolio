import './ToolsSection.css'

const tools = [
  'Selenium',
  'Postman',
  'Jira',
  'TestRail',
  'Chrome DevTools',
  'Git and GitHub',
]

function ToolsSection() {
  return (
    <section id="tools" className="tools-section">
      <h2>Tools</h2>
      <p>Technologies I use for QA planning, execution, and reporting.</p>
      <div className="chip-grid">
        {tools.map((tool) => (
          <span key={tool} className="chip">
            {tool}
          </span>
        ))}
      </div>
    </section>
  )
}

export default ToolsSection
