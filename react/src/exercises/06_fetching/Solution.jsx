import React, { useState, useEffect } from 'react';

export default function FetchingSolution() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP Error Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (active) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (active) {
          setError(err.message || 'Something went wrong while loading data');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [refreshCount]);

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
        <div>
          <h2 style={{ color: '#00d8ff', margin: 0, fontSize: '20px' }}>User Profiles Reference Solution</h2>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Fetched dynamically via JSONPlaceholder API</span>
        </div>
        <button style={btnStyle} onClick={handleRefresh}>
          🔄 Refresh
        </button>
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '40px 0' }}>
          <div style={spinnerStyle}></div>
          <p style={{ color: '#cbd5e1', fontSize: '14px' }}>Fetching records from API...</p>
        </div>
      )}

      {error && (
        <div style={errorStyle}>
          <strong>Error Encountered:</strong> {error}
          <button onClick={handleRefresh} style={{ display: 'block', background: 'none', border: 'none', color: '#f87171', textDecoration: 'underline', marginTop: '6px', cursor: 'pointer', fontSize: '12px' }}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div style={listStyle}>
          {users.slice(0, 6).map(user => (
            <div key={user.id} style={userCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={smallAvatarStyle}>{user.name.substring(0, 1)}</div>
                <div>
                  <h4 style={{ color: '#f8fafc', fontSize: '14px', margin: 0 }}>{user.name}</h4>
                  <span style={{ color: '#00d8ff', fontSize: '11px' }}>@{user.username}</span>
                </div>
              </div>
              
              <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '8px' }}>
                <div>📧 <span style={{ color: '#cbd5e1' }}>{user.email}</span></div>
                <div>🏢 <span style={{ color: '#cbd5e1' }}>{user.company.name}</span></div>
                <div>📍 <span style={{ color: '#cbd5e1' }}>{user.address.city}</span></div>
              </div>
            </div>
          ))}
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
  width: '100%',
  maxWidth: '650px',
  margin: '0 auto',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
};

const listStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '12px',
  animation: 'fadeIn 0.25s',
};

const userCardStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'left',
};

const smallAvatarStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00d8ff, #818cf8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#090d16',
};

const spinnerStyle = {
  width: '30px',
  height: '30px',
  border: '3px solid rgba(0, 216, 255, 0.1)',
  borderTopColor: '#00d8ff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Add standard keyframe in stylesheet or handle locally
const styleSheet = document.styleSheets[0];
try {
  styleSheet.insertRule(`
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
} catch (e) {}

const errorStyle = {
  background: 'rgba(248, 113, 113, 0.1)',
  color: '#f87171',
  border: '1px solid rgba(248, 113, 113, 0.2)',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'left',
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '13px',
  transition: 'background 0.2s',
};
