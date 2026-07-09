import React from 'react';
// TODO: Import the useState hook from 'react'

export default function CounterExercise() {
  // TODO: Declare a state variable for 'count' initialized to 0
  // const [count, setCount] = useState(0);

  // TODO: Add logic to increment the counter but NOT above 10.
  const handleIncrement = () => {
    // Increment logic
  };

  // TODO: Add logic to decrement the counter but NOT below 0.
  const handleDecrement = () => {
    // Decrement logic
  };

  // TODO: Add logic to reset the counter to 0.
  const handleReset = () => {
    // Reset logic
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>Interactive Counter</h2>

      {/* TODO: Display current state value */}
      <div style={counterDisplayVal}>
        0 {/* Replace with count state */}
      </div>

      {/* TODO: If count reaches 10 or 0, display a warning message */}
      {/* Example: <p style={{ color: '#fbbf24' }}>Maximum limit of 10 reached!</p> */}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {/* TODO: Bind action handlers to buttons */}
        <button style={btnStyle} onClick={handleDecrement}>Decrement (-)</button>
        <button style={{ ...btnStyle, background: '#64748b' }} onClick={handleReset}>Reset</button>
        <button style={btnStyle} onClick={handleIncrement}>Increment (+)</button>
      </div>
      
      <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '25px', fontStyle: 'italic' }}>
        Open src/exercises/02_counter/Exercise.jsx and implement useState!
      </p>
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
};

const counterDisplayVal = {
  fontSize: '64px',
  fontWeight: '800',
  color: '#f8fafc',
  margin: '15px 0',
  fontFamily: 'monospace',
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
};
