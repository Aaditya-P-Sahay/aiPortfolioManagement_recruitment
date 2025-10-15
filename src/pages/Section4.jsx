import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTextarea from '../components/FormTextarea';
import FormRadio from '../components/FormRadio';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { supabase } from '../lib/supabase';

export default function Section4() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hours_commitment: '',
    additional_comments: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!formData.hours_commitment)
      newErrors.hours_commitment = 'Please select your time commitment';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    const finalData = { ...formData };
    delete finalData.additional_comments;
    if (formData.additional_comments && formData.additional_comments.trim()) {
      finalData.additional_comments = formData.additional_comments;
    }
    delete finalData.financial_data_experience;
    if (formData.financial_data_experience && formData.financial_data_experience.trim()) {
      finalData.financial_data_experience = formData.financial_data_experience;
    }
    delete finalData.portfolio_description;
    if (formData.portfolio_description && formData.portfolio_description.trim()) {
      finalData.portfolio_description = formData.portfolio_description;
    }

    const { error } = await supabase
      .from('ai_advisor_recruitment_responses')
      .insert([finalData]);

    if (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
      setIsSubmitting(false);
      return;
    }

    localStorage.removeItem('applicationData');
    navigate('/success');
  };

  const handleBack = () => {
    localStorage.setItem('applicationData', JSON.stringify(formData));
    navigate('/section-3');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '64px', maxWidth: '800px', margin: '0 auto' }}>
      <ProgressBar currentStep={4} totalSteps={4} />

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#e8e8e8'
        }}>
          Commitment
        </h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Final step - let us know your availability
        </p>
      </div>

      <FormRadio
        label="How many hours per week can you commit to this project?"
        required
        name="hours_commitment"
        options={[
          '2-4 hours',
          '5-7 hours',
          '8-10 hours',
          '10+ hours'
        ]}
        value={formData.hours_commitment}
        onChange={(val) => setFormData({ ...formData, hours_commitment: val })}
        error={errors.hours_commitment}
      />

      <FormTextarea
        label="Anything else you'd like to add about your interest in this project?"
        rows={4}
        value={formData.additional_comments}
        onChange={(e) => setFormData({ ...formData, additional_comments: e.target.value })}
      />

      <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
        <Button variant="secondary" onClick={handleBack} style={{ flex: 1 }} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleSubmit} style={{ flex: 1 }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
}
