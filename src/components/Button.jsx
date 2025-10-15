export default function Button({ children, variant = 'primary', disabled, ...props }) {
  const styles = {
    primary: {
      background: 'linear-gradient(135deg, #c9a55a 0%, #8b7342 100%)',
      color: '#0a0a0a',
      border: 'none'
    },
    secondary: {
      background: 'transparent',
      color: '#c9a55a',
      border: '1px solid #c9a55a'
    }
  };

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        padding: '12px 32px',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '0.3px',
        ...styles[variant],
        ...props.style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 165, 90, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {children}
    </button>
  );
}
