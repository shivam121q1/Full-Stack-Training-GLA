import React, { useState } from 'react';

export default function ControlledFormExercise() {
  // TODO: Create state variables for:
  // - username (string)
  // - email (string)
  // - course (string: e.g. 'React', 'Node', 'Python')
  // - agree (boolean)
  // - errors (object to store fields error validation messages)

  const handleSubmit = (e) => {
    // TODO: Prevent browser page reload
    // e.preventDefault();

    // TODO: Perform basic validations:
    // 1. Username length must be greater than 3.
    // 2. Email must contain '@'.
    // 3. Must agree to terms.
    
    // TODO: If invalid, populate errors object. Otherwise, alert Success!
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>Student Registration Form</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        
        {/* Username Input */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Username</label>
          <input 
            type="text" 
            style={inputStyle}
            placeholder="Enter username"
            // TODO: bind state value and onChange handler
          />
          {/* TODO: Display username error if exists */}
        </div>

        {/* Email Input */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Email Address</label>
          <input 
            type="text" 
            style={inputStyle}
            placeholder="Enter email"
            // TODO: bind state value and onChange handler
          />
          {/* TODO: Display email error if exists */}
        </div>

        {/* Course Select Dropdown */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Selected Course</label>
          <select 
            style={selectStyle}
            // TODO: bind state value and onChange handler
          >
            <option value="">-- Choose Course --</option>
            <option value="react">React Foundations</option>
            <option value="node">Backend with NodeJS</option>
            <option value="fullstack">Full-Stack Bootcamp</option>
          </select>
        </div>

        {/* Agree Checkbox */}
        <div style={{ ...fieldGroupStyle, flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox"
            id="agreeCheckbox"
            // TODO: bind checked status and onChange handler (e.target.checked)
          />
          <label htmlFor="agreeCheckbox" style={{ ...labelStyle, marginBottom: 0 }}>
            I agree to the Terms & Conditions
          </label>
        </div>
        {/* TODO: Display checkbox error if exists */}

        {/* Submit Button */}
        <button type="submit" style={btnStyle}>
          Submit Registration
        </button>

      </form>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'left',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const fieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const labelStyle = {
  fontSize: '13px',
  color: '#cbd5e1',
  fontWeight: '500',
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#f8fafc',
  fontSize: '14px',
  outline: 'none',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '6px',
  padding: '10px',
  fontWeight: '600',
  cursor: 'pointer',
  marginTop: '10px',
  fontSize: '14px',
};
