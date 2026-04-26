import './App.css'
import ContactSection from './components/ContactSection/ContactSection'
import ExperienceSection from './components/ExperienceSection/ExperienceSection'
import HeroSection from './components/HeroSection/HeroSection'
import NavBar from './components/NavBar/NavBar'
import ProjectsSection from './components/ProjectsSection/ProjectsSection'
import ToolsSection from './components/ToolsSection/ToolsSection'

function App() {
  return (
    <div className="page">
      <NavBar />

      <main className="container">
        <HeroSection />
        <ToolsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* <footer className="footer">Copyright 2026 Janitha QA Portfolio | Built for testing</footer> */}
    </div>
  )
}

export default App
