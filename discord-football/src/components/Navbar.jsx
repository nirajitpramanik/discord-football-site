
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar styling on scroll
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      
      // Update active section based on scroll position
      const sections = ['your-place', 'games-events', 'league-chats', 'join-cta']
      
      // If at the top, set home as active
      if (window.scrollY < 300) {
        setActiveSection('home')
        return
      }
      
      // Check which section is currently in view
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          // If the section is in the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false) // Close mobile menu when clicking a link
    
    // If it's the home link and we're on the home page
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      return
    }
    
    // Otherwise scroll to the section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" onClick={() => scrollToSection('home')}>
              <h1>Discord Football</h1>
            </Link>
          </div>
          
          <div className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <a 
                  href="#" 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('home')
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#your-place" 
                  className={`nav-link ${activeSection === 'your-place' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('your-place')
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#games-events" 
                  className={`nav-link ${activeSection === 'games-events' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('games-events')
                  }}
                >
                  Events
                </a>
              </li>
              <li>
                <a 
                  href="#league-chats" 
                  className={`nav-link ${activeSection === 'league-chats' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('league-chats')
                  }}
                >
                  Leagues
                </a>
              </li>
              <li>
                <a 
                  href="#join-cta" 
                  className={`nav-link ${activeSection === 'join-cta' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('join-cta')
                  }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="https://discord.gg/hcNby9zvu8" 
                  className="join-button" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  Join Server
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar