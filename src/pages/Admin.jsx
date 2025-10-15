import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';

export default function Admin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    avgTechnical: 0,
    commitmentDist: {},
    portfolioDist: {}
  });

  const authenticate = () => {
    if (password === 'sofi2024') {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Incorrect password');
    }
  };

  const loadData = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('ai_advisor_recruitment_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading responses:', error);
      setLoading(false);
      return;
    }

    setResponses(data || []);

    const total = data?.length || 0;
    const avgTech = data?.length > 0
      ? data.reduce((acc, r) => acc + (
          r.rating_portfolio_management +
          r.rating_financial_markets +
          r.rating_python_programming +
          r.rating_data_analysis +
          r.rating_ml_ai_basics
        ) / 5, 0) / data.length
      : 0;

    const commitDist = {};
    const portDist = {};
    data?.forEach(r => {
      commitDist[r.hours_commitment] = (commitDist[r.hours_commitment] || 0) + 1;
      portDist[r.portfolio_status] = (portDist[r.portfolio_status] || 0) + 1;
    });

    setStats({
      total,
      avgTechnical: avgTech.toFixed(2),
      commitmentDist: commitDist,
      portfolioDist: portDist
    });

    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#e8e8e8',
            textAlign: 'center'
          }}>
            Admin Access
          </h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && authenticate()}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#151515',
              border: '1px solid #2a2a2a',
              borderRadius: '6px',
              color: '#e8e8e8',
              fontSize: '14px',
              outline: 'none',
              marginBottom: '16px'
            }}
          />
          <Button onClick={authenticate} style={{ width: '100%' }}>
            Access Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (selectedResponse) {
    return (
      <div style={{ minHeight: '100vh', padding: '64px', maxWidth: '900px', margin: '0 auto' }}>
        <Button
          variant="secondary"
          onClick={() => setSelectedResponse(null)}
          style={{ marginBottom: '32px' }}
        >
          ← Back to List
        </Button>

        <div style={{
          background: '#0f0f0f',
          border: '1px solid #1a1a1a',
          borderRadius: '8px',
          padding: '32px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#c9a55a' }}>
            {selectedResponse.full_name}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>BITS ID</p>
              <p style={{ fontSize: '14px', color: '#e8e8e8' }}>{selectedResponse.bits_id}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Email</p>
              <p style={{ fontSize: '14px', color: '#e8e8e8' }}>{selectedResponse.email_id}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>WhatsApp</p>
              <p style={{ fontSize: '14px', color: '#e8e8e8' }}>{selectedResponse.whatsapp_number}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Commitment</p>
              <p style={{ fontSize: '14px', color: '#e8e8e8' }}>{selectedResponse.hours_commitment}</p>
            </div>
          </div>

          <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #1a1a1a' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#b8b8b8', marginBottom: '16px' }}>
              Technical Ratings
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
              {[
                ['Portfolio Mgmt', selectedResponse.rating_portfolio_management],
                ['Financial Markets', selectedResponse.rating_financial_markets],
                ['Python', selectedResponse.rating_python_programming],
                ['Data Analysis', selectedResponse.rating_data_analysis],
                ['ML/AI', selectedResponse.rating_ml_ai_basics]
              ].map(([label, rating]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>{label}</p>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    margin: '0 auto',
                    background: '#1a1a1a',
                    border: '2px solid #c9a55a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#c9a55a'
                  }}>
                    {rating}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#b8b8b8', marginBottom: '8px' }}>
              Portfolio Analyzer Understanding
            </h4>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>
              {selectedResponse.understanding_portfolio_analyzer}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#b8b8b8', marginBottom: '8px' }}>
              Recommendation Engine Understanding
            </h4>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>
              {selectedResponse.understanding_recommendation_engine}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#b8b8b8', marginBottom: '8px' }}>
              Motivation
            </h4>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>
              {selectedResponse.motivation}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#b8b8b8', marginBottom: '8px' }}>
              Innovative Idea
            </h4>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>
              {selectedResponse.innovative_idea}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#e8e8e8' }}>
            Recruitment Dashboard
          </h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            ← Home
          </Button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div style={{
            background: '#0f0f0f',
            border: '1px solid #1a1a1a',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Total Applications</p>
            <p style={{ fontSize: '32px', fontWeight: '600', color: '#c9a55a' }}>{stats.total}</p>
          </div>

          <div style={{
            background: '#0f0f0f',
            border: '1px solid #1a1a1a',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Avg Technical Rating</p>
            <p style={{ fontSize: '32px', fontWeight: '600', color: '#c9a55a' }}>{stats.avgTechnical}</p>
          </div>
        </div>

        <div style={{
          background: '#0f0f0f',
          border: '1px solid #1a1a1a',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #1a1a1a' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#e8e8e8' }}>
              All Applications
            </h2>
          </div>

          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#666' }}>
              Loading...
            </div>
          ) : responses.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#666' }}>
              No applications yet
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#b8b8b8', fontWeight: '600' }}>Name</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#b8b8b8', fontWeight: '600' }}>BITS ID</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#b8b8b8', fontWeight: '600' }}>Email</th>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#b8b8b8', fontWeight: '600' }}>Commitment</th>
                    <th style={{ padding: '16px', textAlign: 'center', color: '#b8b8b8', fontWeight: '600' }}>Avg Rating</th>
                    <th style={{ padding: '16px', textAlign: 'center', color: '#b8b8b8', fontWeight: '600' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response, idx) => {
                    const avgRating = (
                      response.rating_portfolio_management +
                      response.rating_financial_markets +
                      response.rating_python_programming +
                      response.rating_data_analysis +
                      response.rating_ml_ai_basics
                    ) / 5;

                    return (
                      <tr
                        key={response.id}
                        style={{
                          borderBottom: idx < responses.length - 1 ? '1px solid #1a1a1a' : 'none',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#0f0f0f'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '16px', color: '#e8e8e8' }}>{response.full_name}</td>
                        <td style={{ padding: '16px', color: '#888' }}>{response.bits_id}</td>
                        <td style={{ padding: '16px', color: '#888' }}>{response.email_id}</td>
                        <td style={{ padding: '16px', color: '#888' }}>{response.hours_commitment}</td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#c9a55a', fontWeight: '600' }}>
                          {avgRating.toFixed(1)}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <button
                            onClick={() => setSelectedResponse(response)}
                            style={{
                              padding: '6px 16px',
                              background: 'transparent',
                              border: '1px solid #2a2a2a',
                              borderRadius: '4px',
                              color: '#c9a55a',
                              fontSize: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#c9a55a';
                              e.currentTarget.style.background = '#1a1a1a';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#2a2a2a';
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
