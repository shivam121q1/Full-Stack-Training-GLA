import React from 'react';
// TODO: Import useState

export default function ToggleExercise() {
  // TODO: Set up state for toggling information panel (boolean)
  // const [isExpanded, setIsExpanded] = useState(false);

  // TODO: Set up state for toggle switch (boolean: e.g. system active status)

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>Conditional Rendering</h2>

      {/* Box 1: Expand/Collapse Details */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>Project Details</h4>
          {/* TODO: Add onClick toggle */}
          <button style={btnStyle}>
            {/* Show 'Hide' or 'Show' based on expanded state */}
            Show Details
          </button>
        </div>
        
        {/* TODO: Conditionally render the paragraph below based on isExpanded */}
        <p style={{ marginTop: '12px', color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>
          React renders parts of your UI dynamically by evaluating conditions in your JavaScript code,
          often using the logical && operator or the ternary operator.
        </p>
      </div>

      {/* Box 2: System Status Toggle */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4>System Status</h4>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>
              Current Status: {/* Render 'ACTIVE' (green) or 'OFFLINE' (red) */}
            </span>
          </div>

          {/* TODO: Create toggle action */}
          <button style={{ ...btnStyle, background: '#f87171' }}>
            {/* Toggle button text: e.g. 'Deactivate' or 'Activate' */}
            Deactivate
          </button>
        </div>

        {/* TODO: Use short-circuit evaluation (&&) to show a warning banner if system is OFFLINE */}
        <div style={warningStyle}>
          ⚠️ Warning: System is offline. Users cannot submit work.
        </div>
      </div>
      
      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '20px' }}>
        Open src/exercises/03_toggles/Exercise.jsx and complete the TODOs!
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
};

const sectionStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.04)',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '15px',
  textAlign: 'left',
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
};

const warningStyle = {
  marginTop: '12px',
  background: 'rgba(248, 113, 113, 0.1)',
  color: '#f87171',
  border: '1px solid rgba(248, 113, 113, 0.2)',
  padding: '8px 12px',
  borderRadius: '4px',
  fontSize: '12px',
};
