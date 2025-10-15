import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTextarea from '../components/FormTextarea';
import FormRadio from '../components/FormRadio';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

export default function Section3() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    motivation: '',
    portfolio_status: '',
    portfolio_description: '',
    innovative_idea: ''
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
    if (!formData.motivation.trim())
      newErrors.motivation = 'This field is required';
    if (!formData.portfolio_status)
      newErrors.portfolio_status = 'Please select an option';
    if (!formData.innovative_idea.trim())
      newErrors.innovative_idea = 'This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    localStorage.setItem('applicationData', JSON.stringify(formData));
    navigate('/section-4');
  };

  const handleBack = () => {
    localStorage.setItem('applicationData', JSON.stringify(formData));
    navigate('/section-2');
  };

  const showPortfolioDescription = formData.portfolio_status === 'Yes, actively manage my own portfolio' ||
                                    formData.portfolio_status === 'Yes, but not actively';

  return (
    <div style={{ minHeight: '100vh', padding: '64px', maxWidth: '800px', margin: '0 auto' }}>
      <ProgressBar currentStep={3} totalSteps={4} />

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#e8e8e8'
        }}>
          Interest & Motivation
        </h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Tell us about your interest in this project
        </p>
      </div>

      <FormTextarea
        label="Why do you want to work on this AI Advisor project?"
        required
        rows={5}
        value={formData.motivation}
        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
        error={errors.motivation}
      />

      <FormRadio
        label="Do you currently manage any investment portfolio?"
        required
        name="portfolio_status"
        options={[
          'Yes, actively manage my own portfolio',
          'Yes, but not actively',
          'No, but interested in learning',
          'No'
        ]}
        value={formData.portfolio_status}
        onChange={(val) => setFormData({ ...formData, portfolio_status: val })}
        error={errors.portfolio_status}
      />

      {showPortfolioDescription && (
        <FormTextarea
          label="Briefly describe your portfolio and what challenges you face in managing it"
          rows={4}
          value={formData.portfolio_description}
          onChange={(e) => setFormData({ ...formData, portfolio_description: e.target.value })}
        />
      )}

      <FormTextarea
        label="Suggest one innovative idea/feature for the recommendation engine that would make it useful for students/young investors"
        required
        rows={5}
        value={formData.innovative_idea}
        onChange={(e) => setFormData({ ...formData, innovative_idea: e.target.value })}
        error={errors.innovative_idea}
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
