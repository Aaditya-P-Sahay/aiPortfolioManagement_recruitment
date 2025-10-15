import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          margin: '0 auto 32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c9a55a 0%, #8b7342 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#e8e8e8'
        }}>
          Application Submitted
        </h1>

        <p style={{
          fontSize: '14px',
          color: '#888',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          Thank you for your interest in the AI Advisor project. We have received your
          application and will review it carefully. You will hear from us soon via the
          contact information you provided.
        </p>

        <div style={{
          padding: '20px',
          background: '#0f0f0f',
          border: '1px solid #1a1a1a',
          borderRadius: '8px',
          marginBottom: '32px'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#b8b8b8',
            marginBottom: '8px'
          }}>
            What happens next?
          </p>
          <ul style={{
            textAlign: 'left',
            fontSize: '13px',
            color: '#888',
            lineHeight: '1.8',
            paddingLeft: '20px'
          }}>
            <li>Our team will review your application</li>
            <li>Shortlisted candidates will be contacted via WhatsApp</li>
            <li>Final selections will be announced soon</li>
          </ul>
        </div>

        <p style={{
          fontSize: '12px',
          color: '#666'
        }}>
          Redirecting to home page...
        </p>
      </div>
    </div>
  );
}
