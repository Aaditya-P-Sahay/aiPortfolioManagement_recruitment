import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    bits_id: '',
    email: '',
    whatsapp_number: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.full_name.trim()) newErrors.full_name = 'Required'
    if (!formData.bits_id.trim()) newErrors.bits_id = 'Required'
    if (!formData.email.trim()) newErrors.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.whatsapp_number.trim()) newErrors.whatsapp_number = 'Required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      sessionStorage.setItem('applicationData', JSON.stringify(formData))
      navigate('/apply/understanding')
    }
  }

  return (
    <div className="landing">
      <div className="landing-container">
        <div className="landing-left">
          <img
            src="https://res.cloudinary.com/dd2syj8aq/image/upload/v1739466054/Asset_4_4x_r36wor.png"
            alt="SOFI"
            className="logo"
          />

          <div className="project-desc">
            <h1>AI Advisor</h1>
            <p className="subtitle">Portfolio Analyzer & Recommendation Engine</p>

            <div className="desc-content">
              <p>We are launching a new project to develop an AI-powered financial advisor. This is a <strong>client product for an external partner</strong>.</p>

              <p>The core objective is to create an intelligent system that can assist users with their investment journey. This platform will be built around two primary functions:</p>

              <div className="feature">
                <h3>Portfolio Analyzer</h3>
                <p>The system will be capable of ingesting and analyzing a user's personal investment portfolio to provide a clear overview of their current standing.</p>
              </div>

              <div className="feature">
                <h3>Recommendation Engine</h3>
                <p>Based on the analysis, the AI will generate tailored investment recommendations and actionable ideas.</p>
              </div>

              <p>A key architectural principle of this product is to give priority to the user's self-portfolio, ensuring that all advice is personalized and relevant to their specific holdings.</p>

              <p>The system will also provide automated weekly and/or monthly updates to keep the user informed about their portfolio's performance and new opportunities.</p>
            </div>
          </div>
        </div>

        <div className="landing-right">
          <div className="form-card">
            <h2>Apply Now</h2>
            <p className="form-subtitle">Join us in building this innovative tool</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.full_name && <span className="error">{errors.full_name}</span>}
              </div>

              <div className="form-group">
                <label>BITS ID</label>
                <input
                  type="text"
                  name="bits_id"
                  value={formData.bits_id}
                  onChange={handleChange}
                  placeholder="e.g., 2021A7PS1234G"
                />
                {errors.bits_id && <span className="error">{errors.bits_id}</span>}
              </div>

              <div className="form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@pilani.bits-pilani.ac.in"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.whatsapp_number && <span className="error">{errors.whatsapp_number}</span>}
              </div>

              <button type="submit" className="submit-btn">
                Continue Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
