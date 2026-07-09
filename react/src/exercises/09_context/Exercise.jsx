import React, { createContext, useContext, useState } from 'react';

// TODO: 1. Create a ThemeContext using createContext()
// const ThemeContext = createContext();

// Nested Child Component (Consumes Context)
function ThemedPanel() {
  // TODO: 3. Consume the theme and toggle function from ThemeContext using useContext
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const theme = 'dark'; // Dummy fallback
  const toggleTheme = () => {}; // Dummy fallback

  // Apply conditional styling based on active theme
  const panelStyle = {
    padding: '20px',
    borderRadius: '8px',
    marginTop: '15px',
    transition: 'all 0.25s ease',
    // Apply styling: if light theme, white background and dark text.
    // If dark theme, dark background (#0b0f19) and light text.
    background: theme === 'light' ? '#f1f5f9' : '#0b0f19',
    color: theme === 'light' ? '#0f172a' : '#f8fafc',
    border: `1px solid ${theme === 'light' ? '#cbd5e1' : 'rgba(255,255,255,0.08)'}`,
  };

  return (
    <div style={panelStyle}>
      <h3>Themed Box Component</h3>
      <p style={{ fontSize: '14px', margin: '10px 0 15px 0', opacity: 0.8 }}>
        This component dynamically adjusts its colors based on the React Theme Context value without receiving props directly!
      </p>
      
      <button 
        onClick={toggleTheme}
        style={{
          background: theme === 'light' ? '#0f172a' : '#00d8ff',
          color: theme === 'light' ? '#ffffff' : '#090d16',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Toggle Global Theme
      </button>
    </div>
  );
}

// Parent Component providing Context
export default function ContextExercise() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    // TODO: 2. Wrap components in ThemeContext.Provider passing theme and toggleTheme values
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8' }}>Theme Context Arena</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '5px' }}>
        Current Theme Status: <strong style={{ color: '#f8fafc' }}>{theme.toUpperCase()}</strong>
      </p>

      {/* Put Provider and child elements here */}
      <ThemedPanel />

      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px', textAlign: 'center' }}>
        Open src/exercises/09_context/Exercise.jsx and declare the Context Provider!
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
  textAlign: 'left',
};
