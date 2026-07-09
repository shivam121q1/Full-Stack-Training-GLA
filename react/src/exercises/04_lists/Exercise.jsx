import React, { useState } from 'react';

// Static array of courses
const COURSES_DATA = [
  { id: 'c1', title: 'React Fundamentals', duration: '4 weeks', level: 'Beginner' },
  { id: 'c2', title: 'Advanced React Architecture', duration: '6 weeks', level: 'Advanced' },
  { id: 'c3', title: 'Intro to Fullstack Development', duration: '8 weeks', level: 'Intermediate' },
  { id: 'c4', title: 'State Management with Redux Toolkit', duration: '5 weeks', level: 'Advanced' },
  { id: 'c5', title: 'CSS Layouts & Flexbox Masterclass', duration: '3 weeks', level: 'Beginner' },
];

export default function ListsExercise() {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Filter COURSES_DATA based on searchQuery string
  const filteredCourses = COURSES_DATA; // Replace this with filter logic matching course title

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#38bdf8', marginBottom: '15px' }}>Course Directory</h2>
      
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={inputStyle}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
        {/* TODO: Iterate over filteredCourses and render a card for each course */}
        {/* Remember to provide a unique key! */}
        {filteredCourses.length > 0 ? (
          <div>
            {/* Map the courses list here */}
            {/* Inside the map, render elements with title, duration, and level */}
            <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
              Render your mapped list items here...
            </p>
          </div>
        ) : (
          <p style={{ color: '#94a3b8' }}>No courses found matching "{searchQuery}"</p>
        )}
      </div>

      <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', marginTop: '25px' }}>
        Open src/exercises/04_lists/Exercise.jsx and map the array!
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
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#f8fafc',
  outline: 'none',
  fontSize: '14px',
};
