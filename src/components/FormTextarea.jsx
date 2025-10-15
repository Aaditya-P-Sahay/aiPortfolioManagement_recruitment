export default function FormTextarea({ label, required, error, rows = 5, ...props }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '13px',
        fontWeight: '500',
        color: '#b8b8b8',
        letterSpacing: '0.3px'
      }}>
        {label} {required && <span style={{ color: '#c9a55a' }}>*</span>}
      </label>
      <textarea
        {...props}
        rows={rows}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: '#151515',
          border: error ? '1px solid #d64545' : '1px solid #2a2a2a',
          borderRadius: '6px',
          color: '#e8e8e8',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease',
          resize: 'vertical',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.6',
          ...props.style
        }}
        onFocus={(e) => {
          if (!error) e.target.style.borderColor = '#c9a55a';
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = '#2a2a2a';
        }}
      />
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
