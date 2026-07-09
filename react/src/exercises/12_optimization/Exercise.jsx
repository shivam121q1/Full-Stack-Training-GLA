import React, { useState, useMemo, useCallback } from 'react';

// Generates 1000 items representing mock database records
const ITEMS_DATABASE = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Gadget #${i + 1}`,
  score: Math.floor(Math.random() * 1000),
}));

// Child Component that displays total score sum
// TODO: Wrap this child component inside React.memo() to prevent unnecessary re-renders
const RenderCounter = ({ totalScore, onClear }) => {
  console.log('%c[RenderCounter] Child component rendered!', 'color: #fbbf24');
  
  return (
    <div style={childBoxStyle}>
      <h4 style={{ color: '#cbd5e1', fontSize: '13px' }}>Child Aggregator (Performance Inspected)</h4>
      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
        Sum Score of Filtered items: <strong style={{ color: '#fbbf24' }}>{totalScore}</strong>
      </p>
      <button onClick={onClear} style={childBtnStyle}>
        Clear Filters
      </button>
    </div>
  );
};

// Parent Component
export default function OptimizationExercise() {
  const [search, setSearch] = useState('');
  const [toggleState, setToggleState] = useState(false);

  // TODO: 1. Optimize this filtering search task. Wrap this logic inside useMemo
  // so that we don't recalculate on other unrelated states (like toggleState toggle changes).
  const filteredItems = ITEMS_DATABASE.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // TODO: 2. Optimize totalScore calculation using useMemo.
  const totalScore = filteredItems.reduce((acc, curr) => acc + curr.score, 0);

  // TODO: 3. Optimize this clear callback function using useCallback
  // so that a new function reference is NOT generated on every render.
  const handleClearFilters = () => {
    setSearch('');
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '15px' }}>Performance Optimization</h2>

      {/* Trigger Unrelated Re-render */}
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>Unrelated State Trigger:</span>
        <button 
          onClick={() => setToggleState(!toggleState)}
          style={{ ...btnStyle, background: toggleState ? '#34d399' : '#64748b' }}
        >
          Toggle: {toggleState ? 'TRUE' : 'FALSE'}
        </button>
      </div>

      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type search queries..."
        style={inputStyle}
      />

      {/* Performance Inspected Child */}
      <RenderCounter totalScore={totalScore} onClear={handleClearFilters} />

      {/* Render list count */}
      <div style={{ marginTop: '15px', maxHeight: '150px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '10px' }}>
        <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '8px' }}>Matched database records: {filteredItems.length}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {filteredItems.slice(0, 30).map(item => (
            <span key={item.id} style={itemSpanStyle}>
              {item.name} ({item.score})
            </span>
          ))}
          {filteredItems.length > 30 && <span style={itemSpanStyle}>...</span>}
        </div>
      </div>

      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px', textAlign: 'center' }}>
        Open src/exercises/12_optimization/Exercise.jsx to apply useMemo and useCallback!
      </p>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '460px',
  margin: '0 auto',
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#f8fafc',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  marginBottom: '15px',
};

const btnStyle = {
  background: '#334155',
  color: '#cbd5e1',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
};

const childBoxStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '15px',
};

const childBtnStyle = {
  background: '#a78bfa',
  color: '#090d16',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '8px',
};

const itemSpanStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.04)',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '10px',
  color: '#94a3b8',
};
