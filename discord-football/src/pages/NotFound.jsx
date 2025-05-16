import { Link } from 'react-router-dom'
import '../styles/notfound.css'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    </div>
  )
}

export default NotFound