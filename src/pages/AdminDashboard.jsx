import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedResponse, setSelectedResponse] = useState(null)

  useEffect(() => {
    checkAuth()
    fetchResponses()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin')
    }
  }

  const fetchResponses = async () => {
    const { data, error } = await supabase
      .from('recruitment_responses')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setResponses(data)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const getAverage = (field) => {
    if (responses.length === 0) return 0
    const sum = responses.reduce((acc, r) => acc + r[field], 0)
    return (sum / responses.length).toFixed(1)
  }

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>SOFI Recruitment Dashboard</h1>
          <p className="admin-subtitle">{responses.length} applications received</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Responses</span>
          <span className="stat-value">{responses.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Python Rating</span>
          <span className="stat-value">{getAverage('python_rating')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg ML/AI Rating</span>
          <span className="stat-value">{getAverage('ml_ai_rating')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Portfolio Mgmt</span>
          <span className="stat-value">{getAverage('portfolio_management_rating')}</span>
        </div>
      </div>

      <div className="responses-list">
        <h2>Applications</h2>
        {responses.map((response) => (
          <div
            key={response.id}
            className="response-item"
            onClick={() => setSelectedResponse(response)}
          >
            <div className="response-header">
              <div>
                <h3>{response.full_name}</h3>
                <p className="response-meta">{response.email} • {response.bits_id}</p>
              </div>
              <span className="response-date">
                {new Date(response.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="response-skills">
              <span className="skill-tag">Python: {response.python_rating}</span>
              <span className="skill-tag">ML/AI: {response.ml_ai_rating}</span>
              <span className="skill-tag">Data: {response.data_analysis_rating}</span>
              <span className="skill-tag">{response.hours_per_week}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedResponse && (
        <div className="modal-overlay" onClick={() => setSelectedResponse(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedResponse(null)}>×</button>

            <h2>{selectedResponse.full_name}</h2>
            <div className="modal-meta">
              <span>{selectedResponse.email}</span>
              <span>{selectedResponse.bits_id}</span>
              <span>{selectedResponse.whatsapp_number}</span>
            </div>

            <div className="modal-section">
              <h3>Skills Overview</h3>
              <div className="skills-grid">
                <div>Portfolio Mgmt: <strong>{selectedResponse.portfolio_management_rating}/5</strong></div>
                <div>Financial Markets: <strong>{selectedResponse.financial_markets_rating}/5</strong></div>
                <div>Python: <strong>{selectedResponse.python_rating}/5</strong></div>
                <div>Data Analysis: <strong>{selectedResponse.data_analysis_rating}/5</strong></div>
                <div>ML/AI: <strong>{selectedResponse.ml_ai_rating}/5</strong></div>
                <div>APIs: <strong>{selectedResponse.api_rating}/5</strong></div>
              </div>
            </div>

            <div className="modal-section">
              <h3>Understanding</h3>
              <p><strong>What is AI Advisor:</strong> {selectedResponse.understanding_advisor}</p>
              <p><strong>Analysis vs Recommendations:</strong> {selectedResponse.analysis_vs_recommendation}</p>
            </div>

            <div className="modal-section">
              <h3>Execution Thinking</h3>
              <p><strong>Build Approach:</strong> {selectedResponse.build_approach_steps}</p>
              <p><strong>2-Week Prototype:</strong> {selectedResponse.two_week_prototype}</p>
            </div>

            <div className="modal-section">
              <h3>Commitment</h3>
              <p><strong>Why work on this:</strong> {selectedResponse.why_work_on_product}</p>
              <p><strong>Portfolio:</strong> {selectedResponse.manages_portfolio}</p>
              <p><strong>Hours/week:</strong> {selectedResponse.hours_per_week}</p>
            </div>

            {selectedResponse.github_portfolio_link && (
              <div className="modal-section">
                <a href={selectedResponse.github_portfolio_link} target="_blank" rel="noopener noreferrer" className="github-link">
                  View GitHub/Portfolio →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
