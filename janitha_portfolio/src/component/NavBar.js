import { useStatqte, useEffect } from 'react';
import { Navbar, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState } from 'react';
import { HashLink as Hashlink } from 'react-router-hash-link';

export const NavBar = () => {
  const [activelink, setActivelink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);

  }, [])
  const onUpdateActivelink = (value) => {
    setActivelink(value);

  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled " : ""}>
        <Container>
          <Navbar.Brand href="#home">
            <img src={''} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className={activelink === 'home' ? 'active navbar=Link' : 'navebar-Link'} onClick={() => onUpdateActivelink('home')}>Home</Nav.Link>
              <Nav.Link href="#skills" className={activelink === 'skills' ? 'active navbar=Link' : 'navebar-Link'} onClick={() => onUpdateActivelink('skills')}>Skills</Nav.Link>
              <Nav.Link href="projects" className={activelink === 'projects' ? 'active navbar=Link' : 'navebar-Link'} onClick={() => onUpdateActivelink('projects')}>Projects</Nav.Link>
            </Nav>
            <span className="navbar-text">className={activelink === 'home' ? 'active navbar=Link' : 'navebar-Link'}
              <div className='social-icons'>
                <a href="#"><img src={''} alt='' /></a>
                <a href="#"><img src={''} alt='' /></a>
                <a href="#"><img src={''} alt='' /></a>
              </div>
              <Hashlink>
                <button className='vvd' onClick={() => console.log('connect')}><span>Let's Connect</span></button>
              </Hashlink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>

  )
}