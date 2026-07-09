import React from 'react';

// TODO: Create a UserCard component that takes props:
// - name (string)
// - role (string)
// - email (string)
// - isOnline (boolean)
// - skills (array of strings)
// - onContactClick (function)
function UserCard(props) {
  return (
    <div style={cardStyle}>
      {/* 1. Render an avatar placeholder or name initials */}
      <div style={avatarStyle}>
        {props.name ? props.name.substring(0, 2).toUpperCase() : "??"}
      </div>

      {/* 2. TODO: Render the user's name and role */}
      <h3 style={{ margin: '10px 0 5px 0' }}>{/* Name here */}</h3>
      <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 15px 0' }}>{/* Role here */}</p>

      {/* 3. TODO: Render Online/Offline badge using conditional rendering */}
      <div style={{ marginBottom: '15px' }}>
        {/* Render a badge that says "Online" (green) or "Offline" (grey) based on isOnline */}
      </div>

      {/* 4. TODO: Render the skills list. Remember to map and use unique keys */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>Skills</h4>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Map skills here into span badges */}
        </div>
      </div>

      {/* 5. TODO: Add click action to the Contact button utilizing the onContactClick prop */}
      <button 
        style={btnStyle}
        onClick={() => {
          // Trigger the contact click callback passing user's name
        }}
      >
        Contact User
      </button>
    </div>
  );
}

// Student template wrapper
export default function PropsExercise() {
  const handleContact = (name) => {
    alert(`Contacting ${name} via props callback!`);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '20px', color: '#38bdf8' }}>Student Profile Workspace</h2>
      
      {/* TODO: Instantiate the UserCard component below with test props */}
      {/* Example:
      <UserCard 
        name="Sarah Connor"
        role="Cybersecurity Engineer"
        email="sarah@resistance.net"
        isOnline={true}
        skills={['React', 'Vite', 'Firewalls', 'Security']}
        onContactClick={handleContact}
      />
      */}
      <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
        Open src/exercises/01_props/Exercise.jsx and complete the TODOs to render the card!
      </p>
    </div>
  );
}

// Some basic local inline styles for layout helper
const cardStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  width: '300px',
  textAlign: 'center',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
};

const avatarStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00d8ff, #818cf8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#090d16',
  margin: '0 auto 12px auto'
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
