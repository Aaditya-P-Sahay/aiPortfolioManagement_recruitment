export default function RatingSlider({ label, value, onChange, error }) {
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
        {label} <span style={{ color: '#c9a55a' }}>*</span>
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          style={{
            flex: 1,
            height: '4px',
            background: `linear-gradient(to right, #c9a55a 0%, #c9a55a ${((value - 1) / 4) * 100}%, #2a2a2a ${((value - 1) / 4) * 100}%, #2a2a2a 100%)`,
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer',
            accentColor: '#c9a55a'
          }}
        />
        <div style={{
          minWidth: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          border: '1px solid #c9a55a',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#c9a55a'
        }}>
          {value}
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        paddingRight: '48px'
      }}>
        <span style={{ fontSize: '11px', color: '#666' }}>No knowledge</span>
        <span style={{ fontSize: '11px', color: '#666' }}>Very familiar</span>
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
