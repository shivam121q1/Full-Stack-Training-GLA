import React, { useState } from 'react';

export default function ToggleSolution() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(true);

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '20px', textAlign: 'center' }}>Toggles Reference Solution</h2>

      {/* Box 1: Expand/Collapse Details with Ternary */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ color: '#f8fafc' }}>Project Details</h4>
          <button 
            style={{ ...btnStyle, background: isExpanded ? '#64748b' : '#00d8ff' }} 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
          </button>
        </div>
        
        {isExpanded && (
          <p style={{ marginTop: '12px', color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', animation: 'fadeIn 0.2s' }}>
            React renders parts of your UI dynamically by evaluating conditions in your JavaScript code,
            often using the logical <code style={{color: '#818cf8'}}>&&</code> operator or the ternary operator 
            <code style={{color: '#818cf8'}}>? :</code>. 
            When state shifts, React performs a virtual diff and updates only the necessary nodes.
          </p>
        )}
      </div>

      {/* Box 2: System Status Toggle with short-circuit and dynamic style */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#f8fafc' }}>System Status</h4>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
              Current Status: 
              <span style={{ 
                color: isActive ? '#34d399' : '#f87171', 
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '4px',
                background: isActive ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)'
              }}>
                {isActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </span>
          </div>

          <button 
            style={{ 
              ...btnStyle, 
              background: isActive ? '#f87171' : '#34d399', 
              color: '#090d16' 
            }} 
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Deactivate System' : 'Activate System'}
          </button>
        </div>

        {/* Warning Banner rendered conditionally via short circuit */}
        {!isActive && (
          <div style={warningStyle}>
            ⚠️ Warning: The server system is offline. Users cannot submit work until activated.
          </div>
        )}
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
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const warningStyle = {
  marginTop: '12px',
  background: 'rgba(248, 113, 113, 0.1)',
  color: '#f87171',
  border: '1px solid rgba(248, 113, 113, 0.2)',
  padding: '10px 12px',
  borderRadius: '4px',
  fontSize: '12px',
};
