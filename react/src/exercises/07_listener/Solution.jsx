import React, { useState, useEffect } from 'react';

export default function WindowListenerSolution() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Attach listener
    window.addEventListener('resize', handleResize);

    // Return cleanup routine
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowSize.width < 768;

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '20px', textAlign: 'center' }}>Resize Tracker Reference Solution</h2>

      <div style={sizeBoxStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', margin: '0 auto' }}>
          <span style={labelStyle}>Viewport Width:</span>
          <span style={valStyle}>{windowSize.width}px</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', margin: '10px auto 0 auto' }}>
          <span style={labelStyle}>Viewport Height:</span>
          <span style={valStyle}>{windowSize.height}px</span>
        </div>
      </div>

      <div style={{ 
        marginTop: '25px', 
        padding: '16px', 
        borderRadius: '8px', 
        background: isMobile ? 'rgba(251, 191, 36, 0.08)' : 'rgba(52, 211, 153, 0.08)',
        border: `1px solid ${isMobile ? 'rgba(251, 191, 36, 0.2)' : 'rgba(52, 211, 153, 0.2)'}`,
        transition: 'all 0.3s ease'
      }}>
        <h4 style={{ color: isMobile ? '#fbbf24' : '#34d399', marginBottom: '6px' }}>
          {isMobile ? '📱 Mobile Layout Active' : '💻 Desktop Layout Active'}
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.4' }}>
          {isMobile 
            ? 'The viewport width is below 768px. Mobile CSS configurations and stacked columns will trigger.'
            : 'The viewport width is at or above 768px. Grid layouts and horizontal rows will trigger.'}
        </p>
      </div>

      <div style={{ marginTop: '15px', fontSize: '11px', color: '#64748b' }}>
        🚀 The cleanup function is working. Try navigating away to verify the listener is detached.
      </div>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '450px',
  margin: '0 auto',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
};

const sizeBoxStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '20px',
  borderRadius: '8px',
  display: 'block',
  textAlign: 'center',
};

const labelStyle = {
  color: '#94a3b8',
  fontWeight: '500',
  fontSize: '14px',
};

const valStyle = {
  color: '#f8fafc',
  fontSize: '18px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
};
