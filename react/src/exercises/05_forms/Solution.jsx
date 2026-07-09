import React, { useState } from 'react';

export default function ControlledFormSolution() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    course: '',
    agree: false
  });
  const [errors, setErrors] = useState({});
  const [successData, setSuccessData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error instantly on user edit
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    
    if (!formData.username.trim()) {
      tempErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      tempErrors.username = "Username must be at least 4 characters long";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address (e.g. test@example.com)";
    }

    if (!formData.course) {
      tempErrors.course = "Please choose a course";
    }

    if (!formData.agree) {
      tempErrors.agree = "You must accept the terms & conditions to register";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessData(null);

    if (validateForm()) {
      setSuccessData(formData);
      // Reset form fields
      setFormData({
        username: '',
        email: '',
        course: '',
        agree: false
      });
      setErrors({});
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '20px', textAlign: 'center' }}>Form Reference Solution</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        
        {/* Username */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Username</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{ 
              ...inputStyle, 
              borderColor: errors.username ? '#f87171' : 'rgba(255,255,255,0.1)' 
            }}
            placeholder="e.g. NeoCoder"
          />
          {errors.username && <span style={errorLabelStyle}>{errors.username}</span>}
        </div>

        {/* Email */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Email Address</label>
          <input 
            type="text" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ 
              ...inputStyle, 
              borderColor: errors.email ? '#f87171' : 'rgba(255,255,255,0.1)' 
            }}
            placeholder="e.g. neo@matrix.io"
          />
          {errors.email && <span style={errorLabelStyle}>{errors.email}</span>}
        </div>

        {/* Course */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Selected Course</label>
          <select 
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            style={{ 
              ...selectStyle, 
              borderColor: errors.course ? '#f87171' : 'rgba(255,255,255,0.1)' 
            }}
          >
            <option value="">-- Choose Course --</option>
            <option value="React Foundations">React Foundations</option>
            <option value="Backend with NodeJS">Backend with NodeJS</option>
            <option value="Full-Stack Bootcamp">Full-Stack Bootcamp</option>
          </select>
          {errors.course && <span style={errorLabelStyle}>{errors.course}</span>}
        </div>

        {/* Agree */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox"
              id="agreeCheck"
              name="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="agreeCheck" style={{ ...labelStyle, cursor: 'pointer', marginBottom: 0 }}>
              I agree to the Terms & Conditions
            </label>
          </div>
          {errors.agree && <span style={errorLabelStyle}>{errors.agree}</span>}
        </div>

        <button type="submit" style={btnStyle}>
          Submit Registration
        </button>
      </form>

      {/* Success banner display */}
      {successData && (
        <div style={successBoxStyle}>
          <h4 style={{ color: '#34d399', marginBottom: '8px' }}>✓ Registration Successful!</h4>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Submitted Data:</p>
          <pre style={{ fontSize: '11px', padding: '6px', marginTop: '4px', background: '#0b0f19', color: '#818cf8', border: 'none' }}>
            {JSON.stringify(successData, null, 2)}
          </pre>
        </div>
      )}
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
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
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
  marginBottom: '2px',
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
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
};

const errorLabelStyle = {
  color: '#f87171',
  fontSize: '11px',
  marginTop: '2px',
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

const successBoxStyle = {
  marginTop: '20px',
  background: 'rgba(52, 211, 153, 0.08)',
  border: '1px solid rgba(52, 211, 153, 0.2)',
  padding: '12px',
  borderRadius: '6px',
  animation: 'fadeIn 0.2s',
};
