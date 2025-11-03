export default function ConfirmModal({ show, onConfirm, onCancel, title, message }) {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        textAlign: 'center',
        animation: 'slideUp 0.3s ease'
      }}>
        <div style={{ fontSize: '56px', marginBottom: '20px' }}>⚠️</div>
        <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '22px' }}>
          {title}
        </h3>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '16px' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '12px',
              background: '#e2e8f0',
              color: '#333',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '12px',
              background: '#f56565',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}