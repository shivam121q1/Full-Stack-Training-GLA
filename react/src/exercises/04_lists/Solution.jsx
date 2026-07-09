import React, { useState } from 'react';

const COURSES_DATA = [
  { id: 'c1', title: 'React Fundamentals', duration: '4 weeks', level: 'Beginner' },
  { id: 'c2', title: 'Advanced React Architecture', duration: '6 weeks', level: 'Advanced' },
  { id: 'c3', title: 'Intro to Fullstack Development', duration: '8 weeks', level: 'Intermediate' },
  { id: 'c4', title: 'State Management with Redux Toolkit', duration: '5 weeks', level: 'Advanced' },
  { id: 'c5', title: 'CSS Layouts & Flexbox Masterclass', duration: '3 weeks', level: 'Beginner' },
];

export default function ListsSolution() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on case-insensitive matches in title or level
  const filteredCourses = COURSES_DATA.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper for rendering badges based on level
  const getBadgeStyle = (level) => {
    switch (level) {
      case 'Beginner': return { background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' };
      case 'Intermediate': return { background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' };
      case 'Advanced': return { background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' };
      default: return {};
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00d8ff', marginBottom: '15px', textAlign: 'center' }}>Completed Lists Solution</h2>
      
      <input 
        type="text" 
        placeholder="Type to filter by name or level (e.g. Beginner)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={inputStyle}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} style={courseCardStyle}>
              <div>
                <h4 style={{ color: '#f8fafc', fontSize: '15px' }}>{course.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>⏱ {course.duration}</p>
              </div>
              <span style={{ ...badgeStyle, ...getBadgeStyle(course.level) }}>
                {course.level}
              </span>
            </div>
          ))
        ) : (
          <p style={{ color: '#94a3b8', textAlign: 'center', margin: '20px 0', fontSize: '14px' }}>
            No courses match your query.
          </p>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '8px 12px', background: '#0b0f19', borderRadius: '4px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
        Rendering {filteredCourses.length} of {COURSES_DATA.length} items
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
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
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
  boxSizing: 'border-box',
};

const courseCardStyle = {
  background: 'rgba(30, 41, 59, 0.5)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '8px',
  padding: '12px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  transition: 'transform 0.15s, background 0.15s',
  cursor: 'default',
};

const badgeStyle = {
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '600',
};
