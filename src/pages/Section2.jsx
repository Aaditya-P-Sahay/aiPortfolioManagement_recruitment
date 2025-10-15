import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTextarea from '../components/FormTextarea';
import RatingSlider from '../components/RatingSlider';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

export default function Section2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    understanding_portfolio_analyzer: '',
    understanding_recommendation_engine: '',
    expected_recommendations: '',
    portfolio_analysis_requirements: '',
    first_milestone_idea: '',
    rating_portfolio_management: 3,
    rating_financial_markets: 3,
    rating_python_programming: 3,
    rating_data_analysis: 3,
    rating_ml_ai_basics: 3,
    financial_data_experience: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('applicationData');
    if (!saved) {
      navigate('/');
      return;
    }
    const existing = JSON.parse(saved);
    setFormData(prev => ({ ...prev, ...existing }));
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.understanding_portfolio_analyzer.trim())
      newErrors.understanding_portfolio_analyzer = 'This field is required';
    if (!formData.understanding_recommendation_engine.trim())
      newErrors.understanding_recommendation_engine = 'This field is required';
    if (!formData.expected_recommendations.trim())
      newErrors.expected_recommendations = 'This field is required';
    if (!formData.portfolio_analysis_requirements.trim())
      newErrors.portfolio_analysis_requirements = 'This field is required';
    if (!formData.first_milestone_idea.trim())
      newErrors.first_milestone_idea = 'This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    localStorage.setItem('applicationData', JSON.stringify(formData));
    navigate('/section-3');
  };

  const handleBack = () => {
    localStorage.setItem('applicationData', JSON.stringify(formData));
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '64px', maxWidth: '800px', margin: '0 auto' }}>
      <ProgressBar currentStep={2} totalSteps={4} />

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#e8e8e8'
        }}>
          Understanding the Task
        </h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Help us understand your perspective on the project
        </p>
      </div>

      <FormTextarea
        label="In your own words, what do you understand by Portfolio Analyzer?"
        required
        rows={4}
        value={formData.understanding_portfolio_analyzer}
        onChange={(e) => setFormData({ ...formData, understanding_portfolio_analyzer: e.target.value })}
        error={errors.understanding_portfolio_analyzer}
      />

      <FormTextarea
        label="What do you understand by Recommendation Engine? What should it do?"
        required
        rows={4}
        value={formData.understanding_recommendation_engine}
        onChange={(e) => setFormData({ ...formData, understanding_recommendation_engine: e.target.value })}
        error={errors.understanding_recommendation_engine}
      />

      <FormTextarea
        label="What kind of recommendations would you expect from an investment recommendation engine?"
        required
        rows={4}
        value={formData.expected_recommendations}
        onChange={(e) => setFormData({ ...formData, expected_recommendations: e.target.value })}
        error={errors.expected_recommendations}
      />

      <FormTextarea
        label="What information would you need to analyze a portfolio effectively?"
        required
        rows={4}
        value={formData.portfolio_analysis_requirements}
        onChange={(e) => setFormData({ ...formData, portfolio_analysis_requirements: e.target.value })}
        error={errors.portfolio_analysis_requirements}
      />

      <FormTextarea
        label="What do you think should be the first milestone or deliverable for this project?"
        required
        rows={3}
        value={formData.first_milestone_idea}
        onChange={(e) => setFormData({ ...formData, first_milestone_idea: e.target.value })}
        error={errors.first_milestone_idea}
      />

      <div style={{
        marginTop: '40px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #1a1a1a'
      }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: '600',
          color: '#b8b8b8',
          marginBottom: '4px'
        }}>
          Rate your familiarity with the following
        </h3>
        <p style={{ fontSize: '12px', color: '#666' }}>
          1 = No knowledge, 5 = Very familiar
        </p>
      </div>

      <RatingSlider
        label="Portfolio management concepts"
        value={formData.rating_portfolio_management}
        onChange={(val) => setFormData({ ...formData, rating_portfolio_management: val })}
      />

      <RatingSlider
        label="Financial markets and instruments"
        value={formData.rating_financial_markets}
        onChange={(val) => setFormData({ ...formData, rating_financial_markets: val })}
      />

      <RatingSlider
        label="Python programming"
        value={formData.rating_python_programming}
        onChange={(val) => setFormData({ ...formData, rating_python_programming: val })}
      />

      <RatingSlider
        label="Data analysis"
        value={formData.rating_data_analysis}
        onChange={(val) => setFormData({ ...formData, rating_data_analysis: val })}
      />

      <RatingSlider
        label="Machine Learning/AI basics"
        value={formData.rating_ml_ai_basics}
        onChange={(val) => setFormData({ ...formData, rating_ml_ai_basics: val })}
      />

      <FormTextarea
        label="Have you worked with any financial data or APIs before? If yes, describe briefly."
        rows={3}
        value={formData.financial_data_experience}
        onChange={(e) => setFormData({ ...formData, financial_data_experience: e.target.value })}
      />

      <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
        <Button variant="secondary" onClick={handleBack} style={{ flex: 1 }}>
          Back
        </Button>
        <Button onClick={handleContinue} style={{ flex: 1 }}>
          Continue
        </Button>
      </div>
    </div>
  );
}
