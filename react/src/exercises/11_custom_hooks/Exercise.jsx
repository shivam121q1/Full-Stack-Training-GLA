import React, { useState, useEffect } from 'react';

// TODO: 1. Complete the custom hook useLocalStorage to load & save state automatically
function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Load value from local storage by key
      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      // Save state and persist to localStorage
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// TODO: 2. Complete the custom hook useFetch to fetch api data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Perform fetch and set states
  }, [url]);

  return { data, loading, error };
}

// Component utilizing custom hooks
export default function CustomHooksExercise() {
  // TODO: 3. Use useLocalStorage to persist the user's nickname preference
  // const [nickname, setNickname] = useLocalStorage('nickname-pref', 'Guest');
  const nickname = 'Guest';
  const setNickname = () => {};

  // TODO: 4. Use useFetch to load a random joke or post from an API
  // const { data: post, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = null;
  const loading = false;
  const error = null;

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>Custom Hooks Playground</h2>

      {/* Persistence Box */}
      <div style={boxStyle}>
        <h4>useLocalStorage Persistence</h4>
        <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
          <input 
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Change nickname"
            style={inputStyle}
          />
        </div>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
          Greetings, <strong>{nickname}</strong>! Refresh the app to verify this text persists.
        </p>
      </div>

      {/* Fetching Box */}
      <div style={boxStyle}>
        <h4>useFetch API Consumer</h4>
        {loading && <p style={{ fontSize: '13px', color: '#94a3b8' }}>Loading hook details...</p>}
        {error && <p style={{ color: '#f87171', fontSize: '13px' }}>Error: {error}</p>}
        {post && (
          <div style={{ marginTop: '10px' }}>
            <h5 style={{ color: '#f8fafc' }}>{post.title}</h5>
            <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px', lineHeight: '1.4' }}>
              {post.body}
            </p>
          </div>
        )}
      </div>

      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px', textAlign: 'center' }}>
        Open src/exercises/11_custom_hooks/Exercise.jsx and complete the hook definitions!
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

const boxStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.04)',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#f8fafc',
  fontSize: '14px',
  outline: 'none',
};
