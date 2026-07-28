import React from 'react';
import { Mic, FileJson, Link2, UserCheck } from 'lucide-react';

export default function Header({ 
  mockMode, 
  setMockMode, 
  webhookUrl, 
  setWebhookUrl, 
  onOpenModal,
  isInterviewMode,
  setIsInterviewMode
}) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="logo-badge">
          <Mic size={24} />
        </div>
        <div>
          <h1 className="brand-title">n8n AI Voice Interviewer</h1>
          <p className="brand-subtitle">Hands-Free Autonomous Candidate Interviewer</p>
        </div>
      </div>

      <div className="header-controls">
        <label className="toggle-container" title="Hands-free interview mode with automated turn-taking">
          <UserCheck size={16} color={isInterviewMode ? '#10B981' : '#94A3B8'} />
          <span>Interview Mode</span>
          <input 
            type="checkbox" 
            checked={isInterviewMode} 
            onChange={(e) => setIsInterviewMode(e.target.checked)} 
          />
        </label>

        <label className="toggle-container">
          <span>Mock Mode</span>
          <input 
            type="checkbox" 
            checked={mockMode} 
            onChange={(e) => setMockMode(e.target.checked)} 
          />
        </label>

        <div className="webhook-box">
          <Link2 size={16} color="#94A3B8" />
          <input 
            type="url" 
            value={webhookUrl} 
            onChange={(e) => setWebhookUrl(e.target.value)} 
            placeholder="http://localhost:5678/webhook/voice-agent" 
          />
        </div>

        <button className="btn-blueprint" onClick={onOpenModal}>
          <FileJson size={16} />
          <span>n8n Blueprint</span>
        </button>
      </div>
    </header>
  );
}
