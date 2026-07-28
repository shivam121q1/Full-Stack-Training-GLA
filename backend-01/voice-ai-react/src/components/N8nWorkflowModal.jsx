import React, { useState, useEffect } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';

export default function N8nWorkflowModal({ isOpen, onClose }) {
  const [workflowJson, setWorkflowJson] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/n8n_voice_agent_workflow.json')
        .then((res) => res.text())
        .then((data) => setWorkflowJson(data))
        .catch(() => setWorkflowJson('// Unable to load workflow file'));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(workflowJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([workflowJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'n8n_voice_agent_workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>n8n Workflow Blueprint (JSON)</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <pre>{workflowJson}</pre>
        </div>

        <div className="header-controls" style={{ justifyContent: 'flex-end' }}>
          <button className="btn-blueprint" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={handleCopy}>
            {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
          </button>
          <button className="btn-blueprint" onClick={handleDownload}>
            <Download size={16} />
            <span>Download Workflow File</span>
          </button>
        </div>
      </div>
    </div>
  );
}
