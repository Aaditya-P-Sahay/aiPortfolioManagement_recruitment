import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProgressBar from '../components/ProgressBar'
import './FormPage.css'

export default function Interest() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    why_work_on_product: '',
    manages_portfolio: '',
    portfolio_description: '',
    hours_per_week: '',
    additional_comments: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('applicationData')
    if (!saved) {
      navigate('/')
      return
    }
    const existing = JSON.parse(saved)
    if (!existing.build_approach_steps) {
      navigate('/apply/execution')
      return
    }
    if (existing.why_work_on_product) {
      setFormData({ ...formData, ...existing })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.why_work_on_product.trim()) newErrors.why_work_on_product = 'Required'
    if (!formData.manages_portfolio) newErrors.manages_portfolio = 'Required'
    if (!formData.hours_per_week) newErrors.hours_per_week = 'Required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError('')

    const allData = {
      ...JSON.parse(sessionStorage.getItem('applicationData')),
      ...formData
    }

    const { error } = await supabase
      .from('recruitment_responses')
      .insert([allData])

    setSubmitting(false)

    if (error) {
      if (error.code === '23505') {
        setSubmitError('This email or BITS ID is already registered. Please contact admin if this is a mistake.')
      } else {
        setSubmitError('Submission failed. Please try again.')
      }
    } else {
      sessionStorage.removeItem('applicationData')
      navigate('/success')
    }
  }

  return (
    <>
      <ProgressBar step={4} />
      <div className="form-page">
        <div className="form-container">
          <h1>Interest & Commitment</h1>
          <p className="page-subtitle">Final step - tell us about your motivation</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Why do you want to work on this product?</label>
              <textarea
                name="why_work_on_product"
                value={formData.why_work_on_product}
                onChange={handleChange}
                placeholder="Share your motivation..."
                rows="4"
              />
              {errors.why_work_on_product && <span className="error">{errors.why_work_on_product}</span>}
            </div>

            <div className="form-group">
              <label>Do you currently manage any investment portfolio?</label>
              <select
                name="manages_portfolio"
                value={formData.manages_portfolio}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Yes, actively manage my own portfolio">Yes, actively manage my own portfolio</option>
                <option value="Yes, but not actively">Yes, but not actively</option>
                <option value="No, but interested in learning">No, but interested in learning</option>
                <option value="No">No</option>
              </select>
              {errors.manages_portfolio && <span className="error">{errors.manages_portfolio}</span>}
            </div>

            {formData.manages_portfolio.startsWith('Yes') && (
              <div className="form-group">
                <label>Briefly describe your portfolio and challenges (Optional)</label>
                <textarea
                  name="portfolio_description"
                  value={formData.portfolio_description}
                  onChange={handleChange}
                  placeholder="Describe your portfolio..."
                  rows="3"
                />
              </div>
            )}

            <div className="form-group">
              <label>How many hours per week can you commit?</label>
              <select
                name="hours_per_week"
                value={formData.hours_per_week}
                onChange={handleChange}
              >
                <option value="">Select hours</option>
                <option value="2-4 hours">2-4 hours</option>
                <option value="5-7 hours">5-7 hours</option>
                <option value="8-10 hours">8-10 hours</option>
                <option value="10+ hours">10+ hours</option>
              </select>
              {errors.hours_per_week && <span className="error">{errors.hours_per_week}</span>}
            </div>

            <div className="form-group">
              <label>Anything else you'd like to add? (Optional)</label>
              <textarea
                name="additional_comments"
                value={formData.additional_comments}
                onChange={handleChange}
                placeholder="Additional comments..."
                rows="3"
              />
            </div>

            {submitError && (
              <div style={{ color: '#ff4444', padding: '12px', background: 'rgba(255,68,68,0.1)', borderRadius: '8px', marginBottom: '16px' }}>
                {submitError}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
