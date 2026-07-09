import React, { useState } from 'react';

export default function CounterSolution() {
  const [count, setCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleIncrement = () => {
    if (count < 10) {
      setCount(prev => prev + 1);
      setErrorMsg("");
    } else {
      setErrorMsg("Maximum limit of 10 reached!");
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
      setErrorMsg("");
    } else {
      setErrorMsg("Minimum limit of 0 reached!");
    }
  };

  const handleReset = () => {
    setCount(0);
    setErrorMsg("");
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '15px' }}>Counter Reference Solution</h2>

      <div style={counterDisplayVal}>
        {count}
      </div>

      <div style={{ minHeight: '24px', margin: '8px 0' }}>
        {errorMsg && (
          <span style={warningStyle}>
            ⚠️ {errorMsg}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
        <button 
          style={{ ...btnStyle, opacity: count === 0 ? 0.6 : 1 }} 
          disabled={count === 0} 
          onClick={handleDecrement}
        >
          Decrement (-)
        </button>
        <button 
          style={{ ...btnStyle, background: '#64748b' }} 
          onClick={handleReset}
        >
          Reset
        </button>
        <button 
          style={{ ...btnStyle, opacity: count === 10 ? 0.6 : 1 }} 
          disabled={count === 10} 
          onClick={handleIncrement}
        >
          Increment (+)
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', background: '#0b0f19', borderRadius: '6px', fontSize: '12px', color: '#94a3b8' }}>
        Current State Object: <code style={{ color: '#818cf8' }}>{`{ count: ${count} }`}</code>
      </div>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '30px',
  textAlign: 'center',
  maxWidth: '400px',
  margin: '0 auto',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
};

const counterDisplayVal = {
  fontSize: '72px',
  fontWeight: '800',
  color: '#f8fafc',
  margin: '10px 0',
  fontFamily: 'monospace',
};

const warningStyle = {
  color: '#fbbf24',
  background: 'rgba(251, 191, 36, 0.1)',
  padding: '4px 12px',
  borderRadius: '4px',
  fontSize: '13px',
  border: '1px solid rgba(251, 191, 36, 0.2)',
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '6px',
  padding: '10px 20px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background 0.2s',
};
