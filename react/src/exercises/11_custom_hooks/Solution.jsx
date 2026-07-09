import React, { useState, useEffect } from 'react';

// Completed Custom Hook useLocalStorage
function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      // Handle function updater if passed
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Completed Custom Hook useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = () => setTrigger(prev => prev + 1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Fetch status error: ${res.status}`);
        return res.json();
      })
      .then(fetchedData => {
        if (active) {
          setData(fetchedData);
          setLoading(false);
        }
      })
      .catch(err => {
        if (active) {
          setError(err.message || 'Error loading api details');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [url, trigger]);

  return { data, loading, error, refetch };
}

// Component using both Custom Hooks
export default function CustomHooksSolution() {
  const [nickname, setNickname] = useLocalStorage('arena-student-name', 'Neo Dev');
  const [postId, setPostId] = useState(1);
  
  const { 
    data: post, 
    loading, 
    error, 
    refetch 
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  const handleNextPost = () => {
    setPostId(prev => prev === 10 ? 1 : prev + 1);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '15px', textAlign: 'center' }}>Custom Hooks Reference Solution</h2>

      {/* Persistence Box */}
      <div style={boxStyle}>
        <h4 style={{ color: '#818cf8', fontSize: '14px', marginBottom: '8px' }}>💾 Custom useLocalStorage Hook</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', color: '#94a3b8' }}>Edit Nickname Preference:</label>
          <input 
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={inputStyle}
            placeholder="e.g. Master React"
          />
        </div>
        <p style={{ fontSize: '12px', color: '#34d399', marginTop: '10px', background: 'rgba(52, 211, 153, 0.05)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(52, 211, 153, 0.1)' }}>
          Welcome back, <strong>{nickname || 'Guest'}</strong>! 
        </p>
      </div>

      {/* Fetching Box */}
      <div style={boxStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ color: '#818cf8', fontSize: '14px' }}>📡 Custom useFetch Hook (Post #{postId})</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={smallBtn} onClick={refetch} title="Refetch data">🔄</button>
            <button style={smallBtn} onClick={handleNextPost}>Next ➔</button>
          </div>
        </div>

        {loading && (
          <div style={{ padding: '20px 0', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
            Querying post data...
          </div>
        )}
        
        {error && (
          <p style={{ color: '#f87171', fontSize: '13px', background: 'rgba(248,113,113,0.1)', padding: '8px', borderRadius: '4px' }}>
            Error: {error}
          </p>
        )}
        
        {!loading && !error && post && (
          <div style={postPanel} className="animate-fade-in">
            <h5 style={{ color: '#f8fafc', fontSize: '13px', marginBottom: '4px' }}>{post.title}</h5>
            <p style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.4' }}>
              {post.body}
            </p>
          </div>
        )}
      </div>

      <div style={{ padding: '8px', background: '#0b0f19', borderRadius: '6px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
        LocalStorage Key: <code style={{ color: '#818cf8' }}>arena-student-name</code>
      </div>
    </div>
  );
}

const containerStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '460px',
  margin: '0 auto',
  textAlign: 'left',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
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
  boxSizing: 'border-box',
};

const smallBtn = {
  background: '#334155',
  border: 'none',
  color: '#f8fafc',
  padding: '4px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '600',
};

const postPanel = {
  background: 'rgba(255, 255, 255, 0.02)',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.04)',
};
