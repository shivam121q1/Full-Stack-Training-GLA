import React, { useState, useEffect } from 'react';

export default function WindowListenerExercise() {
  // TODO: Set up state for window width and height
  // const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    // TODO: 1. Create event handler to update state with current window size
    const handleResize = () => {
      // Update state
    };

    // TODO: 2. Add resize event listener to window
    // window.addEventListener('resize', handleResize);

    // TODO: 3. Return cleanup function to remove listener when component unmounts
    return () => {
      // Clean up event listener
    };
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>Global Window Resize Tracker</h2>

      <div style={sizeBoxStyle}>
        <div>
          <span style={labelStyle}>Width:</span>
          <span style={valStyle}>{/* Render width state */} px</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <span style={labelStyle}>Height:</span>
          <span style={valStyle}>{/* Render height state */} px</span>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '12px', borderRadius: '6px', background: '#0b0f19' }}>
        {/* TODO: Display a message based on whether width is less than 768px (Mobile Mode) or not */}
        <p style={{ color: '#94a3b8', fontSize: '13px' }}>
          Resize your browser window to see values update in real-time.
        </p>
      </div>

      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px' }}>
        Open src/exercises/07_listener/Exercise.jsx and implement the event cleanup!
      </p>
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
  textAlign: 'center',
};

const sizeBoxStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '20px',
  borderRadius: '8px',
  display: 'inline-block',
  minWidth: '200px',
};

const labelStyle = {
  color: '#94a3b8',
  marginRight: '10px',
  fontWeight: '500',
};

const valStyle = {
  color: '#f8fafc',
  fontSize: '24px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
};
