import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import './FormPage.css'

export default function Understanding() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    understanding_advisor: '',
    analysis_vs_recommendation: '',
    core_features_suggestion: '',
    weekly_summary_format: '',
    portfolio_management_rating: 3,
    financial_markets_rating: 3,
    python_rating: 3,
    data_analysis_rating: 3,
    ml_ai_rating: 3,
    api_rating: 3,
    financial_data_experience: '',
    github_portfolio_link: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const saved = sessionStorage.getItem('applicationData')
    if (!saved) {
      navigate('/')
      return
    }
    const existing = JSON.parse(saved)
    if (existing.understanding_advisor) {
      setFormData({ ...formData, ...existing })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: name.includes('_rating') ? parseInt(value) : value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.understanding_advisor.trim()) newErrors.understanding_advisor = 'Required'
    if (!formData.analysis_vs_recommendation.trim()) newErrors.analysis_vs_recommendation = 'Required'
    if (!formData.core_features_suggestion.trim()) newErrors.core_features_suggestion = 'Required'
    if (!formData.weekly_summary_format.trim()) newErrors.weekly_summary_format = 'Required'
    if (!formData.financial_data_experience.trim()) newErrors.financial_data_experience = 'Required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const existing = JSON.parse(sessionStorage.getItem('applicationData'))
      sessionStorage.setItem('applicationData', JSON.stringify({ ...existing, ...formData }))
      navigate('/apply/execution')
    }
  }

  return (
    <>
      <ProgressBar step={2} />
      <div className="form-page">
        <div className="form-container">
          <h1>Understanding the Task</h1>
          <p className="page-subtitle">Help us understand your perspective on the project</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>What do you understand this AI Advisor is supposed to do?</label>
              <textarea
                name="understanding_advisor"
                value={formData.understanding_advisor}
                onChange={handleChange}
                placeholder="Share your understanding..."
                rows="3"
              />
              {errors.understanding_advisor && <span className="error">{errors.understanding_advisor}</span>}
            </div>

            <div className="form-group">
              <label>Explain the difference between analyzing a portfolio vs. giving recommendations</label>
              <textarea
                name="analysis_vs_recommendation"
                value={formData.analysis_vs_recommendation}
                onChange={handleChange}
                placeholder="Describe the technical differences..."
                rows="4"
              />
              {errors.analysis_vs_recommendation && <span className="error">{errors.analysis_vs_recommendation}</span>}
            </div>

            <div className="form-group">
              <label>Suggest 3 core features such a product should have</label>
              <textarea
                name="core_features_suggestion"
                value={formData.core_features_suggestion}
                onChange={handleChange}
                placeholder="List and describe 3 features..."
                rows="4"
              />
              {errors.core_features_suggestion && <span className="error">{errors.core_features_suggestion}</span>}
            </div>

            <div className="form-group">
              <label>What format or insights would you want in a weekly portfolio summary?</label>
              <textarea
                name="weekly_summary_format"
                value={formData.weekly_summary_format}
                onChange={handleChange}
                placeholder="Describe the format and insights..."
                rows="4"
              />
              {errors.weekly_summary_format && <span className="error">{errors.weekly_summary_format}</span>}
            </div>

            <div className="ratings-section">
              <h3>Rate your familiarity (1 = No knowledge, 5 = Very familiar)</h3>

              {[
                { name: 'portfolio_management_rating', label: 'Portfolio management concepts' },
                { name: 'financial_markets_rating', label: 'Financial markets and instruments' },
                { name: 'python_rating', label: 'Python' },
                { name: 'data_analysis_rating', label: 'Data analysis' },
                { name: 'ml_ai_rating', label: 'Machine Learning/AI basics' },
                { name: 'api_rating', label: 'Working with APIs' }
              ].map(({ name, label }) => (
                <div key={name} className="rating-group">
                  <label>{label}</label>
                  <div className="rating-slider">
                    <input
                      type="range"
                      name={name}
                      min="1"
                      max="5"
                      value={formData[name]}
                      onChange={handleChange}
                    />
                    <span className="rating-value">{formData[name]}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label>Have you worked with financial data/APIs or built anything with LLMs/AI?</label>
              <textarea
                name="financial_data_experience"
                value={formData.financial_data_experience}
                onChange={handleChange}
                placeholder="Share your experience or what you'd want to build..."
                rows="4"
              />
              {errors.financial_data_experience && <span className="error">{errors.financial_data_experience}</span>}
            </div>

            <div className="form-group">
              <label>GitHub/Portfolio Link (Optional)</label>
              <input
                type="url"
                name="github_portfolio_link"
                value={formData.github_portfolio_link}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
              />
            </div>

            <button type="submit" className="submit-btn">Continue</button>
          </form>
        </div>
      </div>
    </>
  )
}
