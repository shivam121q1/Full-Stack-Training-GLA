import React, { useState } from 'react';

// Sibling A: Form to add new item
// TODO: This component needs a callback prop from the parent (e.g. onAddTask)
function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    // TODO: Call parent callback to add the task
    
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>Add</button>
    </form>
  );
}

// Sibling B: List to display items
// TODO: This component needs tasks passed down as a prop
function TaskList({ tasks = [] }) {
  return (
    <div style={listStyle}>
      <h4 style={{ color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>Task List</h4>
      {tasks.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic' }}>No tasks created yet.</p>
      ) : (
        <ul style={{ paddingLeft: '20px', color: '#94a3b8' }}>
          {/* TODO: Iterate tasks list and render each task */}
          {tasks.map((task, idx) => (
            <li key={idx} style={{ marginBottom: '6px', fontSize: '14px', color: '#f8fafc' }}>
              {task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Parent Component
export default function LiftingStateExercise() {
  // TODO: Declare task state here (array of strings)
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    // TODO: Update state by appending newTask to the tasks array
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '15px' }}>Lifting State Up</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px', lineHeight: '1.4' }}>
        TaskInput and TaskList are sibling components. They communicate by lifting state to this parent component.
      </p>

      {/* TODO: Pass handleAddTask callback to TaskInput */}
      <TaskInput onAddTask={() => {}} />

      {/* TODO: Pass tasks array to TaskList */}
      <TaskList tasks={[]} />
      
      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px', textAlign: 'center' }}>
        Open src/exercises/08_lifting_state/Exercise.jsx and hoist the task state!
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

const inputStyle = {
  flex: 1,
  padding: '8px 12px',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#f8fafc',
  fontSize: '14px',
  outline: 'none',
};

const btnStyle = {
  background: '#00d8ff',
  color: '#090d16',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '14px',
};

const listStyle = {
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '16px',
  borderRadius: '8px',
};
