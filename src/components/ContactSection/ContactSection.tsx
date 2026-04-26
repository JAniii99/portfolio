import './ContactSection.css'

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact</h2>
      <p>Open to QA internship and junior QA opportunities.</p>
      <div className="contact-links">
        <a href="mailto:janitha.qa@example.com">janitha.qa@example.com</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export default ContactSection
