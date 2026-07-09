import React, { useState } from 'react';
import { exercises } from './data/exercisesData';
import { exerciseComponents } from './exercises/registry';
import { 
  BookOpen, 
  Award, 
  Sparkles, 
  Code, 
  Eye, 
  Info, 
  Lightbulb, 
  Terminal, 
  FileCode,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [selectedExId, setSelectedExId] = useState(exercises[0].id);
  const [viewMode, setViewMode] = useState('student'); // 'student' or 'solution'
  const [activeTab, setActiveTab] = useState('objectives'); // 'objectives' or 'tips'

  const activeExercise = exercises.find(ex => ex.id === selectedExId) || exercises[0];
  const activeComponents = exerciseComponents[selectedExId];
  
  // Render active component depending on student vs solution view mode
  const ActiveComponent = viewMode === 'student' 
    ? activeComponents.Student 
    : activeComponents.Solution;

  // Group exercises by level for structured sidebar navigation
  const groupedExercises = {
    Basic: exercises.filter(ex => ex.level === 'Basic'),
    Intermediate: exercises.filter(ex => ex.level === 'Intermediate'),
    Advanced: exercises.filter(ex => ex.level === 'Advanced')
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Basic': return '#34d399';
      case 'Intermediate': return '#fbbf24';
      case 'Advanced': return '#f87171';
      default: return '#38bdf8';
    }
  };

  return (
    <div style={layoutStyle}>
      {/* 1. Sidebar Navigation Panel */}
      <aside style={sidebarStyle} className="glass-panel">
        <div style={logoContainer}>
          <div style={reactLogoContainer}>
            <span style={reactLogoSpin}>⚛️</span>
          </div>
          <div>
            <h1 style={logoTitle}>React Arena</h1>
            <span style={logoSubtitle}>Learning Hub</span>
          </div>
        </div>

        <nav style={navStyle}>
          {Object.entries(groupedExercises).map(([level, items]) => (
            <div key={level} style={{ marginBottom: '22px' }}>
              <div style={levelHeaderStyle}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: getLevelColor(level),
                  marginRight: '8px'
                }}></span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em', color: '#94a3b8' }}>
                  {level} Level
                </span>
              </div>
              
              <ul style={{ listStyle: 'none' }}>
                {items.map(item => {
                  const isSelected = item.id === selectedExId;
                  return (
                    <li key={item.id} style={{ marginBottom: '4px' }}>
                      <button
                        onClick={() => {
                          setSelectedExId(item.id);
                          setViewMode('student'); // Reset to student view on swap
                        }}
                        style={{
                          ...navBtnStyle,
                          background: isSelected ? 'rgba(0, 216, 255, 0.08)' : 'transparent',
                          borderColor: isSelected ? 'rgba(0, 216, 255, 0.2)' : 'transparent',
                          color: isSelected ? '#00d8ff' : '#94a3b8',
                          fontWeight: isSelected ? '600' : '400',
                        }}
                      >
                        <span style={{ marginRight: '6px', fontSize: '13px' }}>
                          {isSelected ? '⚡' : '▪'}
                        </span>
                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {item.title.substring(5)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div style={sidebarFooter}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} color="#00d8ff" />
            <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Class Syllabus Tracker</span>
          </div>
          <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', lineHeight: '1.3' }}>
            Work through tasks 1-12 to master state, side-effects, contexts, and optimization.
          </p>
        </div>
      </aside>

      {/* 2. Main Content Board */}
      <main style={mainContentStyle}>
        
        {/* Header Ribbon */}
        <header style={headerRibbonStyle} className="glass-panel">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                ...badgeStyle,
                background: `rgba(${activeExercise.level === 'Basic' ? '52, 211, 153' : activeExercise.level === 'Intermediate' ? '251, 191, 36' : '248, 113, 113'}, 0.08)`,
                color: getLevelColor(activeExercise.level),
                borderColor: `rgba(${activeExercise.level === 'Basic' ? '52, 211, 153' : activeExercise.level === 'Intermediate' ? '251, 191, 36' : '248, 113, 113'}, 0.15)`,
              }}>
                {activeExercise.level} Track
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Exercise {activeExercise.title.substring(0, 2)}</span>
            </div>
            <h2 style={{ fontSize: '24px', color: '#f8fafc', marginTop: '6px', fontFamily: 'Outfit' }}>
              {activeExercise.title.substring(5)}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              {activeExercise.description}
            </p>
          </div>
          
          <div style={quickStats}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>TARGET FILE TO EDIT:</span>
              <code style={{ fontSize: '12px', color: '#00d8ff', background: '#0b0f19', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                react/src/exercises/{activeExercise.id}/Exercise.jsx
              </code>
            </div>
          </div>
        </header>

        {/* Dual Split Working Panels */}
        <div style={panelSplitGrid}>
          
          {/* Panel A: Documentation, Instructions & Cheat Sheets */}
          <section style={instructionPanelStyle} className="glass-panel">
            <div style={tabHeader}>
              <button 
                onClick={() => setActiveTab('objectives')}
                style={{
                  ...tabBtnStyle,
                  color: activeTab === 'objectives' ? '#00d8ff' : '#94a3b8',
                  borderBottomColor: activeTab === 'objectives' ? '#00d8ff' : 'transparent',
                }}
              >
                <BookOpen size={14} style={{ marginRight: '6px' }} />
                Tasks & Objectives
              </button>
              <button 
                onClick={() => setActiveTab('tips')}
                style={{
                  ...tabBtnStyle,
                  color: activeTab === 'tips' ? '#00d8ff' : '#94a3b8',
                  borderBottomColor: activeTab === 'tips' ? '#00d8ff' : 'transparent',
                }}
              >
                <Lightbulb size={14} style={{ marginRight: '6px' }} />
                Helper Hints & Tips
              </button>
            </div>

            <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
              {activeTab === 'objectives' ? (
                <div>
                  <h3 style={sectionHeadingStyle}>Instructions for Students</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '15px', lineHeight: '1.4' }}>
                    Open the exercise file in your editor, follow the step-by-step TODO guidelines, and build out the target behavior:
                  </p>
                  <ol style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7' }}>
                    {activeExercise.objectives.map((obj, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>{obj}</li>
                    ))}
                  </ol>
                  
                  <div style={codeBoilerplateBox}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Terminal size={14} color="#818cf8" />
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>Code Syntax Blueprint</span>
                    </div>
                    <pre style={{ margin: 0, padding: '10px', fontSize: '11px', lineHeight: '1.4' }}>
                      {activeExercise.boilerplateHint}
                    </pre>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={sectionHeadingStyle}>Key React Concepts</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {activeExercise.tips.map((tip, idx) => (
                      <div key={idx} style={tipCardStyle}>
                        <div style={{ color: '#00d8ff', fontSize: '13px', fontWeight: '600' }}>Tip #{idx + 1}</div>
                        <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '4px', lineHeight: '1.4' }}>
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={alertBoxStyle}>
                    <h4 style={{ color: '#fbbf24', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <HelpCircle size={14} /> Need to check the final code?
                    </h4>
                    <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px', lineHeight: '1.3' }}>
                      Use the top tab on the right workspace to toggle **"Reference Solution View"**. This allows you to inspect the working UI components side-by-side with your code.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Panel B: Sandbox Viewer */}
          <section style={sandboxPanelStyle} className="glass-panel">
            <div style={sandboxHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={14} color="#00d8ff" />
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f8fafc' }}>WORKSPACE PREVIEW</span>
              </div>
              
              {/* Workspace Toggle Tabs */}
              <div style={toggleContainerStyle}>
                <button
                  onClick={() => setViewMode('student')}
                  style={{
                    ...toggleBtnStyle,
                    background: viewMode === 'student' ? 'rgba(0, 216, 255, 0.12)' : 'transparent',
                    color: viewMode === 'student' ? '#00d8ff' : '#94a3b8',
                    fontWeight: viewMode === 'student' ? '600' : '400',
                  }}
                >
                  <FileCode size={12} style={{ marginRight: '4px' }} />
                  Student Sandbox
                </button>
                <button
                  onClick={() => setViewMode('solution')}
                  style={{
                    ...toggleBtnStyle,
                    background: viewMode === 'solution' ? 'rgba(52, 211, 153, 0.12)' : 'transparent',
                    color: viewMode === 'solution' ? '#34d399' : '#94a3b8',
                    fontWeight: viewMode === 'solution' ? '600' : '400',
                  }}
                >
                  <Eye size={12} style={{ marginRight: '4px' }} />
                  Reference Solution
                </button>
              </div>
            </div>

            {/* Sandbox Render Box */}
            <div style={sandboxContentBox}>
              
              {/* Workspace View Information Alert */}
              <div style={{ 
                padding: '8px 12px', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)', 
                background: viewMode === 'student' ? 'rgba(0, 216, 255, 0.03)' : 'rgba(52, 211, 153, 0.03)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#94a3b8'
              }}>
                <span>
                  {viewMode === 'student' 
                    ? '💻 Rendering component: src/exercises/' + activeExercise.id + '/Exercise.jsx' 
                    : '🟢 Rendering finished reference solution'}
                </span>
                <span style={{ color: viewMode === 'student' ? '#00d8ff' : '#34d399', fontWeight: 'bold' }}>
                  {viewMode.toUpperCase()} VIEW
                </span>
              </div>

              {/* Dynamic Component Sandbox Container */}
              <div style={componentRenderContainer}>
                {ActiveComponent ? (
                  <ActiveComponent />
                ) : (
                  <div style={{ color: '#f87171', padding: '20px' }}>
                    Error: Component could not be resolved in registry.
                  </div>
                )}
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

/* Local Styles Object */
const layoutStyle = {
  display: 'flex',
  height: '100vh',
  width: '100vw',
  background: '#090d16',
};

const sidebarStyle = {
  width: '300px',
  borderRight: '1px solid rgba(255,255,255,0.06)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flexShrink: 0,
};

const logoContainer = {
  padding: '24px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
};

const reactLogoContainer = {
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  background: 'rgba(0, 216, 255, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
};

const reactLogoSpin = {
  display: 'inline-block',
  animation: 'spin 15s linear infinite',
};

const logoTitle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#f8fafc',
  lineHeight: '1.2',
  letterSpacing: '-0.02em',
};

const logoSubtitle = {
  fontSize: '11px',
  color: '#00d8ff',
  fontWeight: '600',
};

const navStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '20px 14px',
};

const levelHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  marginBottom: '10px',
};

const navBtnStyle = {
  width: '100%',
  textAlign: 'left',
  border: '1px solid transparent',
  borderRadius: '6px',
  padding: '8px 12px',
  fontSize: '13px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.15s ease',
  boxSizing: 'border-box',
};

const sidebarFooter = {
  padding: '16px 20px',
  borderTop: '1px solid rgba(255,255,255,0.04)',
  background: 'rgba(0,0,0,0.1)',
};

const mainContentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
};

const headerRibbonStyle = {
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const badgeStyle = {
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '600',
  border: '1px solid',
};

const quickStats = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
};

const panelSplitGrid = {
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1.2fr',
  gap: '1px', // Clean line separating panels
  background: 'rgba(255,255,255,0.04)',
  overflow: 'hidden',
};

const instructionPanelStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: 'rgba(15, 23, 42, 0.4)',
  overflow: 'hidden',
};

const tabHeader = {
  display: 'flex',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  background: 'rgba(0, 0, 0, 0.1)',
};

const tabBtnStyle = {
  flex: 1,
  padding: '14px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '600',
  borderBottom: '2px solid transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',
};

const sectionHeadingStyle = {
  fontSize: '15px',
  color: '#cbd5e1',
  marginBottom: '10px',
  fontFamily: 'Outfit',
};

const codeBoilerplateBox = {
  marginTop: '20px',
  background: '#0b0f19',
  border: '1px solid rgba(255,255,255,0.04)',
  borderRadius: '8px',
  padding: '14px',
};

const tipCardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.04)',
  padding: '12px 14px',
  borderRadius: '6px',
};

const alertBoxStyle = {
  background: 'rgba(251, 191, 36, 0.05)',
  border: '1px solid rgba(251, 191, 36, 0.12)',
  borderRadius: '8px',
  padding: '14px',
  marginTop: '20px',
};

const sandboxPanelStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: 'rgba(15, 23, 42, 0.2)',
  overflow: 'hidden',
};

const sandboxHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  background: 'rgba(0, 0, 0, 0.15)',
};

const toggleContainerStyle = {
  display: 'flex',
  background: '#0b0f19',
  padding: '3px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.06)',
};

const toggleBtnStyle = {
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  fontSize: '11px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.15s ease',
};

const sandboxContentBox = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const componentRenderContainer = {
  flex: 1,
  padding: '24px',
  overflowY: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#070a11',
};
