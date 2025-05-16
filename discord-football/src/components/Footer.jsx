import { Link } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Discord Football</h3>
            <p>Connect with football fans across the globe</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/leagues">Leagues</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="https://discord.gg/NXEQaGWTcg" target="_blank" rel="noopener noreferrer" className="social-icon discord">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-cta">
            <h4>Join Our Community</h4>
            <a href="https://discord.gg/NXEQaGWTcg" className="footer-cta-button" target="_blank" rel="noopener noreferrer">
              Join Server
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Discord Football. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <a href="#" className="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </a>
    </footer>
  )
}

export default Footer