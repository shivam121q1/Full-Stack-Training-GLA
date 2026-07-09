import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';

// Generates 1500 items representing mock database records
const ITEMS_DATABASE = Array.from({ length: 1500 }, (_, i) => ({
  id: i + 1,
  name: `Gadget #${i + 1}`,
  score: Math.floor(Math.random() * 500),
}));

// Child Component that displays total score sum
// React.memo protects the child from rendering unless props change
const RenderCounter = React.memo(({ totalScore, onClear }) => {
  const renderCountRef = useRef(0);
  
  useEffect(() => {
    renderCountRef.current += 1;
  });

  return (
    <div style={childBoxStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#818cf8', fontSize: '13px', margin: 0 }}>📊 Optimized Aggregator (React.memo)</h4>
        <span style={{ 
          fontSize: '11px', 
          background: 'rgba(251,191,36,0.1)', 
          color: '#fbbf24', 
          padding: '2px 8px', 
          borderRadius: '4px',
          border: '1px solid rgba(251,191,36,0.2)'
        }}>
          Renders: {renderCountRef.current}
        </span>
      </div>
      
      <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '10px' }}>
        Sum Score of Filtered Gadgets: <strong style={{ color: '#fbbf24', fontSize: '14px' }}>{totalScore}</strong>
      </p>
      
      <button onClick={onClear} style={childBtnStyle}>
        🧹 Reset Filter Query
      </button>
    </div>
  );
});

// Parent Component
export default function OptimizationSolution() {
  const [search, setSearch] = useState('');
  const [toggleState, setToggleState] = useState(false);

  // 1. Optimize filtering using useMemo
  const filteredItems = useMemo(() => {
    // console.log('[OptimizationSolution] Running heavy list filter...');
    return ITEMS_DATABASE.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 2. Optimize totalScore calculation using useMemo
  const totalScore = useMemo(() => {
    return filteredItems.reduce((acc, curr) => acc + curr.score, 0);
  }, [filteredItems]);

  // 3. Optimize the clear callback using useCallback (maintains function reference)
  const handleClearFilters = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '10px', textAlign: 'center' }}>Performance Reference Solution</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '15px', lineHeight: '1.4', textAlign: 'center' }}>
        Click the unrelated Toggle state button: observe that the Renders counter does NOT increment.
      </p>

      {/* Trigger Unrelated Re-render */}
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0b0f19', padding: '10px 12px', borderRadius: '6px' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Unrelated State Trigger (Causes App re-render):</span>
        <button 
          onClick={() => setToggleState(!toggleState)}
          style={{ 
            ...btnStyle, 
            background: toggleState ? 'rgba(52, 211, 153, 0.2)' : 'rgba(100, 116, 139, 0.2)',
            color: toggleState ? '#34d399' : '#cbd5e1',
            border: `1px solid ${toggleState ? 'rgba(52, 211, 153, 0.2)' : 'rgba(100, 116, 139, 0.2)'}`
          }}
        >
          Toggle state: {toggleState ? 'ACTIVE' : 'OFFLINE'}
        </button>
      </div>

      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type number (e.g. 100) or 'Gadget' to search..."
        style={inputStyle}
      />

      {/* Memoized Child Component */}
      <RenderCounter totalScore={totalScore} onClear={handleClearFilters} />

      {/* Render list count */}
      <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', background: '#0b0f19' }}>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
          Displaying first 20 matches of {filteredItems.length} records:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {filteredItems.slice(0, 20).map(item => (
            <span key={item.id} style={itemSpanStyle}>
              #{item.id} (★{item.score})
            </span>
          ))}
          {filteredItems.length > 20 && <span style={itemSpanStyle}>...</span>}
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '480px',
  margin: '0 auto',
  textAlign: 'left',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
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
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
  borderRadius: '4px',
};

const childBoxStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '15px',
};

const childBtnStyle = {
  background: '#00d8ff',
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
  padding: '3px 6px',
  borderRadius: '4px',
  fontSize: '10px',
  color: '#cbd5e1',
};
