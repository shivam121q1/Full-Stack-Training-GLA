import React, { useState, useEffect } from 'react';

export default function FetchingExercise() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement useEffect hook that triggers fetch to:
  // https://jsonplaceholder.typicode.com/users
  // Handle states correctly (loading, success, error)
  useEffect(() => {
    // 1. Fetch JSON placeholder data
    // 2. setUsers(data)
    // 3. Catch errors
    // 4. Set loading false
  }, []);

  const handleRefresh = () => {
    // TODO: Re-fetch user lists
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#38bdf8', margin: 0 }}>User Directory</h2>
        <button style={btnStyle} onClick={handleRefresh}>Refresh Data</button>
      </div>

      {/* TODO: Handle loading state */}
      {loading && (
        <div style={{ color: '#cbd5e1', textAlign: 'center', padding: '20px' }}>
          Loading users...
        </div>
      )}

      {/* TODO: Handle error state */}
      {error && (
        <div style={errorStyle}>
          Failed to fetch users: {error}
        </div>
      )}

      {/* TODO: Map and render user records in a grid/list */}
      {!loading && !error && (
        <div style={listStyle}>
          {users.map(user => (
            <div key={user.id} style={userCardStyle}>
              {/* Display user.name, user.email, and user.company.name */}
              <h4 style={{ color: '#f8fafc' }}>{user.name}</h4>
              <p style={{ color: '#94a3b8', fontSize: '13px' }}>{user.email}</p>
            </div>
          ))}
        </div>
      )}

      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px', textAlign: 'center' }}>
        Open src/exercises/06_fetching/Exercise.jsx and complete the fetch hook!
      </p>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
};

const listStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: '12px',
};

const userCardStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'left',
};

const errorStyle = {
  background: 'rgba(248, 113, 113, 0.1)',
  color: '#f87171',
  border: '1px solid rgba(248, 113, 113, 0.2)',
  padding: '12px',
  borderRadius: '6px',
  marginBottom: '15px',
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
};
