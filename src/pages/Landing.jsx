import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

export default function Landing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    bits_id: '',
    email_id: '',
    whatsapp_number: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateSection1 = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.bits_id.trim()) newErrors.bits_id = 'BITS ID is required';
    if (!formData.email_id.trim()) {
      newErrors.email_id = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
      newErrors.email_id = 'Invalid email format';
    }
    if (!formData.whatsapp_number.trim()) newErrors.whatsapp_number = 'WhatsApp number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkUnique = async () => {
    const { data: existingBitsId } = await supabase
      .from('ai_advisor_recruitment_responses')
      .select('bits_id')
      .eq('bits_id', formData.bits_id)
      .maybeSingle();

    if (existingBitsId) {
      setErrors(prev => ({ ...prev, bits_id: 'This BITS ID has already applied' }));
      return false;
    }

    const { data: existingEmail } = await supabase
      .from('ai_advisor_recruitment_responses')
      .select('email_id')
      .eq('email_id', formData.email_id)
      .maybeSingle();

    if (existingEmail) {
      setErrors(prev => ({ ...prev, email_id: 'This email has already applied' }));
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (!validateSection1()) return;

    setIsSubmitting(true);
    const isUnique = await checkUnique();
    setIsSubmitting(false);

    if (isUnique) {
      localStorage.setItem('applicationData', JSON.stringify(formData));
      navigate('/section-2');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      position: 'relative'
    }}>
      <a
        href="/admin"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          fontSize: '11px',
          color: '#666',
          textDecoration: 'none',
          padding: '6px 12px',
          border: '1px solid #2a2a2a',
          borderRadius: '4px',
          background: '#0a0a0a',
          transition: 'all 0.2s ease',
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#c9a55a';
          e.currentTarget.style.borderColor = '#c9a55a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#666';
          e.currentTarget.style.borderColor = '#2a2a2a';
        }}
      >
        Admin
      </a>

      <div style={{
        flex: 1,
        padding: '64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '560px'
      }}>
        <img
          src="https://res.cloudinary.com/dd2syj8aq/image/upload/v1739466054/Asset_4_4x_r36wor.png"
          alt="SOFI"
          style={{
            width: '80px',
            marginBottom: '32px'
          }}
        />

        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#e8e8e8',
          letterSpacing: '-0.5px'
        }}>
          AI Advisor Project
        </h1>

        <p style={{
          fontSize: '14px',
          color: '#888',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Portfolio Analyzer & Recommendation Engine
        </p>

        <div style={{
          padding: '24px',
          background: '#0f0f0f',
          border: '1px solid #1a1a1a',
          borderRadius: '8px',
          marginBottom: '48px'
        }}>
          <p style={{
            fontSize: '13px',
            lineHeight: '1.8',
            color: '#b8b8b8'
          }}>
            We are launching a new project to develop an AI-powered financial advisor.
            The core objective is to create an intelligent system that can assist users
            with their investment journey.
          </p>
          <div style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div>
              <span style={{ color: '#c9a55a', fontSize: '13px', fontWeight: '600' }}>Portfolio Analyzer:</span>
              <span style={{ color: '#888', fontSize: '13px', marginLeft: '8px' }}>
                Ingest and analyze personal investment portfolios
              </span>
            </div>
            <div>
              <span style={{ color: '#c9a55a', fontSize: '13px', fontWeight: '600' }}>Recommendation Engine:</span>
              <span style={{ color: '#888', fontSize: '13px', marginLeft: '8px' }}>
                Generate tailored investment recommendations
              </span>
            </div>
          </div>
        </div>

        <div style={{
          fontSize: '11px',
          color: '#666',
          textAlign: 'center'
        }}>
          Society of Finance and Investment
        </div>
      </div>

      <div style={{
        flex: 1,
        padding: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f0f',
        borderLeft: '1px solid #1a1a1a'
      }}>
        <div style={{ width: '100%', maxWidth: '460px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#e8e8e8'
          }}>
            Begin Application
          </h2>

          <FormInput
            label="Full Name"
            required
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            error={errors.full_name}
          />

          <FormInput
            label="BITS ID"
            required
            type="text"
            placeholder="2021A7PS0001G"
            value={formData.bits_id}
            onChange={(e) => setFormData({ ...formData, bits_id: e.target.value })}
            error={errors.bits_id}
          />

          <FormInput
            label="Email ID"
            required
            type="email"
            value={formData.email_id}
            onChange={(e) => setFormData({ ...formData, email_id: e.target.value })}
            error={errors.email_id}
          />

          <FormInput
            label="WhatsApp Number"
            required
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={formData.whatsapp_number}
            onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
            error={errors.whatsapp_number}
          />

          <Button
            onClick={handleContinue}
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {isSubmitting ? 'Checking...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
