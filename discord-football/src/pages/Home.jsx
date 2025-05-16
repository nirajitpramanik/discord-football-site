import { useEffect } from 'react'
import '../styles/home.css'

// Import images
import ypptImage from '../assets/img/events/yppt.png'
import gamesImage from '../assets/img/events/Games.png'
import leaguesImage from '../assets/img/events/leagues.png'

const Home = () => {
  useEffect(() => {
    // Animation on scroll functionality
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect().top
        const screenHeight = window.innerHeight
        
        if (position < screenHeight - 100) {
          element.classList.add('animated')
        }
      })
    }
    
    window.addEventListener('scroll', animateElements)
    // Trigger on initial load
    animateElements()
    
    return () => window.removeEventListener('scroll', animateElements)
  }, [])
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-on-scroll">
          <h1>Discord Football</h1>
          <p>The ultimate community for football fans around the world</p>
          <a href="https://discord.gg/NXEQaGWTcg" 
            className="btn-join-server"
            target="_blank" 
            rel="noopener noreferrer">
            Join the server
          </a>
        </div>
      </section>
      
      {/* Your Place to Talk Section */}
      <section className="section your-place-section" id="your-place">
        <div className="container">
          <div className="section-title animate-on-scroll">
            <h2>YOUR PLACE TO TALK!</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="section-content">
            <div className="content-image animate-on-scroll">
              <img src={ypptImage} alt="Your place to talk" />
            </div>
            
            <div className="content-text animate-on-scroll">
              <h3>Connect with fans worldwide</h3>
              <p>
                Organized channels for you to easily discuss your favorite 
                Football/Soccer club, league, international team with other 
                fans from all over the world!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="section-divider"></div>
      
      {/* Games and Events Section */}
      <section className="section games-events-section" id="games-events">
        <div className="container">
          <div className="section-title animate-on-scroll">
            <h2>GAMES AND EVENTS</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="section-content reverse">
            <div className="content-text animate-on-scroll">
              <h3>Show off your skills</h3>
              <p>
                Community driven events for you to show off your football 
                trivia knowledge, video game tactics, and design skills...
                with Server Rewards for the winners!
              </p>
            </div>
            
            <div className="content-image animate-on-scroll">
              <img src={gamesImage} alt="Games and Events" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="section-divider"></div>
      
      {/* League Chats Section */}
      <section className="section league-chats-section" id="league-chats">
        <div className="container">
          <div className="section-title animate-on-scroll">
            <h2>LEAGUE CHATS</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="section-content">
            <div className="content-image animate-on-scroll">
              <img src={leaguesImage} alt="League chats" />
            </div>
            
            <div className="content-text animate-on-scroll">
              <h3>Join the conversation</h3>
              <p>
                Topic focused channels to discuss and debate your favorite 
                top flight leagues with fans around the world!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="section-divider"></div>
      
      {/* Call to Action Section */}
      <section className="cta-section" id="join-cta">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2>Jump into the conversation!</h2>
            <p>All fans of all clubs in all countries welcome!</p>
            <a href="https://discord.gg/NXEQaGWTcg" 
              className="btn-join-cta"
              target="_blank" 
              rel="noopener noreferrer">
              Join Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home