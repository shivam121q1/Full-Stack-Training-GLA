import React, { useState } from 'react';
import { Mic, Send, Play, Square, Award } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

export default function VoicePanel({ 
  isRecording, 
  onToggleRecord, 
  timerText, 
  analyser, 
  onSendQuery,
  isInterviewMode,
  interviewStarted,
  onStartInterview,
  onStopInterview,
  questionCount,
  turnState
}) {
  const [textInput, setTextInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    onSendQuery(textInput.trim());
    setTextInput('');
  };

  const samplePrompts = [
    { title: "💻 React & Node.js Stack", prompt: "I specialize in React, Node.js, Express, and PostgreSQL." },
    { title: "🚀 DB Performance Optimization", prompt: "I optimize database queries using indexing, caching with Redis, and pagination." },
    { title: "🤖 AI & Agent Integration", prompt: "I built n8n agentic workflows integrating LangChain, OpenAI Whisper, and REST APIs." }
  ];

  return (
    <section className="panel-card">
      <div className="panel-title">
        <h2>
          {isInterviewMode ? (interviewStarted ? `Interview Round (Question ${questionCount}/5)` : 'AI Technical Interviewer') : 'Voice Control'}
        </h2>
        <div className="status-badge">
          <span className={`status-dot-pulse ${turnState === 'candidate_answering' ? 'recording' : ''}`}></span>
          <span>
            {turnState === 'interviewer_speaking' 
              ? '🔊 Interviewer Asking Question...' 
              : turnState === 'candidate_answering' 
              ? '🎙️ Candidate Answering (Auto-Listening)' 
              : 'Idle'}
          </span>
        </div>
      </div>

      {isInterviewMode && !interviewStarted && (
        <div className="interview-hero-banner" style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(255, 109, 90, 0.15))',
          border: '1px border-dashed rgba(147, 51, 234, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: '#FFF' }}>
            <Award size={20} color="#FF6D5A" />
            <span>Automated AI Interviewer Mode</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: '1.4' }}>
            Click <strong>Start Interview</strong> below. The AI will ask you technical questions out loud, listen to your answers hands-free, and automatically ask follow-up questions!
          </p>
          <button 
            className="btn-blueprint" 
            style={{ background: 'linear-gradient(135deg, #10B981, #059669)', width: 'fit-content', padding: '10px 20px' }}
            onClick={onStartInterview}
          >
            <Play size={18} />
            <span>Start Hands-Free Interview</span>
          </button>
        </div>
      )}

      {interviewStarted && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#10B981', fontFamily: 'var(--font-mono)' }}>
            🟢 Interview In Progress • Question {questionCount} of 5
          </div>
          <button 
            className="btn-blueprint" 
            style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', color: '#EF4444' }}
            onClick={onStopInterview}
          >
            <Square size={16} />
            <span>End Interview</span>
          </button>
        </div>
      )}

      <AudioVisualizer isRecording={isRecording} analyser={analyser} />

      <div className="mic-control-section">
        <button 
          className={`mic-button ${isRecording ? 'is-recording' : ''}`}
          onClick={onToggleRecord}
          title={isRecording ? 'Click to Stop Recording' : 'Click to Speak Answer'}
        >
          <Mic size={32} />
        </button>
        <div className="timer-text">{timerText}</div>
      </div>

      <form className="query-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="query-input"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type your interview answer or click mic to talk..."
        />
        <button type="submit" className="btn-send-icon">
          <Send size={18} />
        </button>
      </form>

      <div className="chips-row">
        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Sample Answers:</span>
        {samplePrompts.map((p, idx) => (
          <button 
            key={idx} 
            className="chip-btn"
            onClick={() => onSendQuery(p.prompt)}
          >
            {p.title}
          </button>
        ))}
      </div>
    </section>
  );
}
