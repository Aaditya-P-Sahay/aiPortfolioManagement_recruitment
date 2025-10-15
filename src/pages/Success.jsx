import { useNavigate } from 'react-router-dom'
import './Success.css'

export default function Success() {
  const navigate = useNavigate()

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Application Submitted</h1>
        <p>Thank you for your interest in the AI Advisor project. We've received your application and will review it shortly.</p>
        <p className="next-steps">You'll hear from us via email within the next few days.</p>
        <button onClick={() => navigate('/')} className="home-btn">
          Back to Home
        </button>
      </div>
    </div>
  )
}
