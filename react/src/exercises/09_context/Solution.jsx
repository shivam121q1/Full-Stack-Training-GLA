import React, { createContext, useContext, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

// Deep Nested Consumer Component
function ThemedPanel() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const panelStyle = {
    padding: '20px',
    borderRadius: '8px',
    marginTop: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: theme === 'light' ? '#f8fafc' : '#0b0f19',
    color: theme === 'light' ? '#0f172a' : '#f8fafc',
    border: `1px solid ${theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.06)'}`,
    boxShadow: theme === 'light' ? '0 4px 6px rgba(0,0,0,0.05)' : '0 4px 10px rgba(0,0,0,0.4)',
  };

  return (
    <div style={panelStyle}>
      <h3 style={{ fontFamily: 'Outfit, sans-serif' }}>
        {theme === 'light' ? '☀️ Light Theme Panel' : '🌙 Dark Theme Panel'}
      </h3>
      <p style={{ fontSize: '13px', margin: '10px 0 15px 0', opacity: 0.8, lineHeight: '1.4' }}>
        We are reading this style configuration straight out of the React Context Provider. 
        Note that no props are defined on this component!
      </p>
      
      <button 
        onClick={toggleTheme}
        style={{
          background: theme === 'light' ? '#0f172a' : '#00d8ff',
          color: theme === 'light' ? '#ffffff' : '#090d16',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'transform 0.15s, opacity 0.15s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Toggle theme to {theme === 'light' ? 'Dark 🌙' : 'Light ☀️'}
      </button>
    </div>
  );
}

// Inner nested element demonstrating prop drilling bypass
function MiddleCard() {
  return (
    <div style={{ borderLeft: '3px solid #818cf8', paddingLeft: '12px', margin: '15px 0' }}>
      <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
        &lt;MiddleCard /&gt; (Bypassed prop drilling)
      </span>
      <ThemedPanel />
    </div>
  );
}

// Parent Component Providing Context
export default function ContextSolution() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{
        ...containerStyle,
        background: theme === 'light' ? '#ffffff' : '#1e293b',
        color: theme === 'light' ? '#0f172a' : '#f8fafc',
        borderColor: theme === 'light' ? '#cbd5e1' : 'rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', color: theme === 'light' ? '#0f172a' : '#00d8ff' }}>
            Theme Context Solution
          </h2>
          <span style={{ 
            fontSize: '11px', 
            fontWeight: 'bold', 
            padding: '2px 8px', 
            borderRadius: '4px',
            background: theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.05)',
            color: theme === 'light' ? '#475569' : '#cbd5e1'
          }}>
            Provider Active
          </span>
        </div>

        {/* Child component that calls consumer child */}
        <MiddleCard />
        
        <div style={{ marginTop: '15px', padding: '8px', background: theme === 'light' ? '#f1f5f9' : '#0b0f19', borderRadius: '4px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
          Context State Key: <code style={{ color: '#818cf8' }}>{`{ theme: "${theme}" }`}</code>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

const containerStyle = {
  border: '1px solid',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '450px',
  margin: '0 auto',
  textAlign: 'left',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
};
