import React, { useState } from 'react';

// Sibling A: Form to add new item
function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Type a new task (e.g. Learn Context API)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>
        ✚ Add Task
      </button>
    </form>
  );
}

// Sibling B: List to display and manage items
function TaskList({ tasks = [], onDeleteTask }) {
  return (
    <div style={listStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
        <h4 style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>Active Board</h4>
        <span style={{ fontSize: '11px', color: '#00d8ff', background: 'rgba(0, 216, 255, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic', padding: '10px 0', textAlign: 'center' }}>
          No active tasks. Add tasks above to sync!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tasks.map((task) => (
            <div key={task.id} style={taskItemStyle}>
              <span style={{ fontSize: '14px', color: '#f8fafc' }}>{task.text}</span>
              <button 
                onClick={() => onDeleteTask(task.id)}
                style={deleteBtnStyle}
                title="Delete task"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Parent Component hoisting state
export default function LiftingStateSolution() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Deconstruct requirements' },
    { id: 2, text: 'Draft React props skeleton' }
  ]);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '10px', textAlign: 'center' }}>Lifting State Solution</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px', lineHeight: '1.4', textAlign: 'center' }}>
        Observe how updates flow from Input sibling → Parent State → List sibling.
      </p>

      {/* Sibling A */}
      <TaskInput onAddTask={handleAddTask} />

      {/* Sibling B */}
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      
      <div style={{ marginTop: '20px', padding: '8px 12px', background: '#0b0f19', borderRadius: '6px', fontSize: '11px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
        <span>State Owner: <code style={{ color: '#818cf8' }}>&lt;LiftingStateSolution /&gt;</code></span>
        <span>Flow: <code style={{ color: '#34d399' }}>Props Callback</code></span>
      </div>
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
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
};

const inputStyle = {
  flex: 1,
  padding: '10px 14px',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#f8fafc',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '6px',
  padding: '10px 16px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background 0.2s',
};

const listStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '16px',
  borderRadius: '8px',
};

const taskItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255,255,255,0.04)',
  padding: '8px 12px',
  borderRadius: '6px',
  animation: 'fadeIn 0.2s',
};

const deleteBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#64748b',
  fontSize: '12px',
  cursor: 'pointer',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s',
  ':hover': {
    background: 'rgba(248, 113, 113, 0.1)',
    color: '#f87171',
  }
};
// Quick style insert for pseudo hover fallback in style element
try {
  const sheet = document.styleSheets[0];
  sheet.insertRule(`
    button[title="Delete task"]:hover {
      background: rgba(248, 113, 113, 0.1) !important;
      color: #f87171 !important;
    }
  `, sheet.cssRules.length);
} catch (e) {}
