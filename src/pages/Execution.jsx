import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import './FormPage.css'

export default function Execution() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    build_approach_steps: '',
    two_week_prototype: '',
    llm_understanding: '',
    ai_risks_limitations: '',
    portfolio_data_needed: '',
    testing_recommendations: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const saved = sessionStorage.getItem('applicationData')
    if (!saved) {
      navigate('/')
      return
    }
    const existing = JSON.parse(saved)
    if (!existing.understanding_advisor) {
      navigate('/apply/understanding')
      return
    }
    if (existing.build_approach_steps) {
      setFormData({ ...formData, ...existing })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) newErrors[key] = 'Required'
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const existing = JSON.parse(sessionStorage.getItem('applicationData'))
      sessionStorage.setItem('applicationData', JSON.stringify({ ...existing, ...formData }))
      navigate('/apply/interest')
    }
  }

  return (
    <>
      <ProgressBar step={3} />
      <div className="form-page">
        <div className="form-container">
          <h1>Execution Thinking</h1>
          <p className="page-subtitle">Share your approach to building this product</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>If you were building this from scratch, what would you build first and why?</label>
              <textarea
                name="build_approach_steps"
                value={formData.build_approach_steps}
                onChange={handleChange}
                placeholder="Describe your step-by-step approach..."
                rows="5"
              />
              {errors.build_approach_steps && <span className="error">{errors.build_approach_steps}</span>}
            </div>

            <div className="form-group">
              <label>If you had 2 weeks to show a working prototype, what would you build?</label>
              <textarea
                name="two_week_prototype"
                value={formData.two_week_prototype}
                onChange={handleChange}
                placeholder="Be specific about data, logic, or UI..."
                rows="5"
              />
              {errors.two_week_prototype && <span className="error">{errors.two_week_prototype}</span>}
            </div>

            <div className="form-group">
              <label>How do LLMs work? How do they have context to give financial advice?</label>
              <textarea
                name="llm_understanding"
                value={formData.llm_understanding}
                onChange={handleChange}
                placeholder="Explain your understanding..."
                rows="4"
              />
              {errors.llm_understanding && <span className="error">{errors.llm_understanding}</span>}
            </div>

            <div className="form-group">
              <label>What are potential risks or limitations in letting an AI handle portfolio advice?</label>
              <textarea
                name="ai_risks_limitations"
                value={formData.ai_risks_limitations}
                onChange={handleChange}
                placeholder="List the risks and limitations..."
                rows="3"
              />
              {errors.ai_risks_limitations && <span className="error">{errors.ai_risks_limitations}</span>}
            </div>

            <div className="form-group">
              <label>What kind of data would be needed to analyze a portfolio effectively?</label>
              <textarea
                name="portfolio_data_needed"
                value={formData.portfolio_data_needed}
                onChange={handleChange}
                placeholder="Describe the data requirements..."
                rows="4"
              />
              {errors.portfolio_data_needed && <span className="error">{errors.portfolio_data_needed}</span>}
            </div>

            <div className="form-group">
              <label>How would you test whether your recommendations are actually useful or profitable?</label>
              <textarea
                name="testing_recommendations"
                value={formData.testing_recommendations}
                onChange={handleChange}
                placeholder="Describe your testing approach..."
                rows="4"
              />
              {errors.testing_recommendations && <span className="error">{errors.testing_recommendations}</span>}
            </div>

            <button type="submit" className="submit-btn">Continue</button>
          </form>
        </div>
      </div>
    </>
  )
}
