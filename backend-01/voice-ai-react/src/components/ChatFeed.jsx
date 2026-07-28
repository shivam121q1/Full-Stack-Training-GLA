import React, { useRef, useEffect } from 'react';
import { Volume2, Trash2, Zap } from 'lucide-react';

export default function ChatFeed({ 
  messages, 
  activeTrace, 
  onClearChat, 
  audioUrl 
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTrace]);

  return (
    <section className="panel-card">
      <div className="panel-title">
        <h2>Agent Activity & Chat Feed</h2>
        <button className="btn-icon" onClick={onClearChat} title="Clear Chat">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="chat-container">
        {messages.length === 0 && (
          <div className="chat-bubble agent" style={{ maxWidth: '100%' }}>
            <div className="chat-content" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Zap size={20} color="#FF6D5A" />
              <span>Voice AI Agent ready. Speak into mic or type a prompt to test n8n execution!</span>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
            <div className="chat-meta">
              {msg.sender === 'user' ? 'You' : 'Voice Agent (n8n)'} • {msg.timestamp}
            </div>
            <div className="chat-content">{msg.text}</div>
          </div>
        ))}

        {activeTrace && (
          <div className="trace-step">
            <div className="spinner-ring"></div>
            <span>{activeTrace}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {audioUrl && (
        <div className="audio-player-box">
          <div className="audio-label">
            <Volume2 size={16} />
            <span>Playing Agent Voice Output (MP3)</span>
          </div>
          <audio src={audioUrl} controls autoPlay />
        </div>
      )}
    </section>
  );
}
