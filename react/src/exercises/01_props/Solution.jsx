import React from 'react';

// Completed UserCard component receiving and utilizing props
function UserCard({ name, role, email, isOnline, skills = [], onContactClick }) {
  return (
    <div style={cardStyle}>
      <div style={avatarStyle}>
        {name ? name.substring(0, 2).toUpperCase() : "??"}
      </div>

      <h3 style={{ margin: '10px 0 5px 0', fontSize: '18px', color: '#f8fafc' }}>{name}</h3>
      <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>{role}</p>
      <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 15px 0' }}>{email}</p>

      {/* Conditional rendering for isOnline status badge */}
      <div style={{ marginBottom: '15px' }}>
        {isOnline ? (
          <span style={{ ...badgeStyle, background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
            🟢 Online
          </span>
        ) : (
          <span style={{ ...badgeStyle, background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
            ⚫ Offline
          </span>
        )}
      </div>

      {/* Render skills array mapped with keys */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>Skills</h4>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
          {skills.map((skill, index) => (
            <span key={index} style={{ ...skillBadgeStyle }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Invoke the callback passed from parent on button click */}
      <button 
        style={btnStyle}
        onClick={() => onContactClick?.(name)}
      >
        Contact User
      </button>
    </div>
  );
}

export default function PropsSolution() {
  const handleContact = (name) => {
    alert(`[Solution Mode] Sending message to ${name}!`);
  };

  const users = [
    {
      name: "Sarah Connor",
      role: "Cybersecurity Analyst",
      email: "sarah.c@cyberdyne.org",
      isOnline: true,
      skills: ["React", "Vite", "Network Security", "Cryptography"],
    },
    {
      name: "Marcus Wright",
      role: "Lead DevOps Specialist",
      email: "marcus.w@sky.net",
      isOnline: false,
      skills: ["Docker", "Kubernetes", "Linux Shell", "CI/CD Pipelines"],
    }
  ];

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ marginBottom: '20px', color: '#00d8ff', textAlign: 'center' }}>Completed Solution Output</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {users.map((user, idx) => (
          <UserCard 
            key={idx}
            name={user.name}
            role={user.role}
            email={user.email}
            isOnline={user.isOnline}
            skills={user.skills}
            onContactClick={handleContact}
          />
        ))}
      </div>
    </div>
  );
}

// Styling definitions
const cardStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  width: '280px',
  textAlign: 'center',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s, border-color 0.2s',
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

const badgeStyle = {
  padding: '4px 10px',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '500',
};

const skillBadgeStyle = {
  background: '#334155',
  color: '#cbd5e1',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  border: '1px solid rgba(255,255,255,0.05)',
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '6px',
  width: '100%',
  padding: '10px 16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
