export default function FormRadio({ label, required, options, value, onChange, name, error }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        marginBottom: '12px',
        fontSize: '13px',
        fontWeight: '500',
        color: '#b8b8b8',
        letterSpacing: '0.3px'
      }}>
        {label} {required && <span style={{ color: '#c9a55a' }}>*</span>}
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {options.map((option) => (
          <label
            key={option}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '10px 14px',
              background: value === option ? '#1a1a1a' : 'transparent',
              border: value === option ? '1px solid #c9a55a' : '1px solid #2a2a2a',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (value !== option) e.currentTarget.style.background = '#151515';
            }}
            onMouseLeave={(e) => {
              if (value !== option) e.currentTarget.style.background = 'transparent';
            }}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              style={{
                marginRight: '12px',
                accentColor: '#c9a55a',
                width: '16px',
                height: '16px'
              }}
            />
            <span style={{
              fontSize: '14px',
              color: value === option ? '#e8e8e8' : '#a8a8a8',
              fontWeight: value === option ? '500' : '400'
            }}>
              {option}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <span style={{
          display: 'block',
          marginTop: '6px',
          fontSize: '12px',
          color: '#d64545'
        }}>
          {error}
        </span>
      )}
    </div>
  );
}
