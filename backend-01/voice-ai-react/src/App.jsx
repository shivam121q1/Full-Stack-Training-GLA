import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import VoicePanel from './components/VoicePanel';
import ChatFeed from './components/ChatFeed';
import N8nWorkflowModal from './components/N8nWorkflowModal';

export default function App() {
  const [mockMode, setMockMode] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('http://localhost:5678/webhook/voice-agent');
  const [isRecording, setIsRecording] = useState(false);
  const [timerText, setTimerText] = useState('00:00');
  const [messages, setMessages] = useState([]);
  const [activeTrace, setActiveTrace] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic Interview States
  const [isInterviewMode, setIsInterviewMode] = useState(true);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [turnState, setTurnState] = useState('idle');

  // Persistent Refs
  const currentQuestionRef = useRef(1);
  const persistentStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const recognitionRef = useRef(null);
  const liveTranscriptRef = useRef('');
  const silenceTimerRef = useRef(null);
  const ttsSafetyTimerRef = useRef(null);
  const isInterviewActiveRef = useRef(false);
  const currentUtteranceRef = useRef(null);

  useEffect(() => {
    isInterviewActiveRef.current = interviewStarted;
  }, [interviewStarted]);

  useEffect(() => {
    return () => {
      cleanupAllAudio();
    };
  }, []);

  const cleanupAllAudio = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (ttsSafetyTimerRef.current) clearTimeout(ttsSafetyTimerRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    if (persistentStreamRef.current) {
      persistentStreamRef.current.getTracks().forEach(track => track.stop());
      persistentStreamRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // 1. START DYNAMIC HANDS-FREE INTERVIEW
  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      persistentStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      currentQuestionRef.current = 1;
      setQuestionCount(1);
      setInterviewStarted(true);
      setMessages([]);

      const openingQuestion = "Welcome to your AI Developer Voice Interview! I will conduct a continuous hands-free interview with you. Whenever you want to finish, simply say 'Stop interview' or 'I am done'. To begin, please introduce yourself and tell me about your developer background.";

      setMessages([{
        id: Date.now(),
        sender: 'agent',
        text: `🎙️ [Question 1] ${openingQuestion}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      speakAIQuestion(openingQuestion);

    } catch (err) {
      alert('Microphone access is required for the voice interview.');
      console.error('Mic error:', err);
    }
  };

  const stopInterview = () => {
    setInterviewStarted(false);
    setTurnState('idle');
    setIsRecording(false);
    cleanupAllAudio();

    const summaryText = "🏆 Interview Session Ended! Overall, you demonstrated clear communication and strong technical problem-solving skills. Great job!";
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'agent', text: summaryText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Interview session completed! Great job."));
    }
  };

  // 2. AI Speaks Question Out Loud
  const speakAIQuestion = (text) => {
    setTurnState('interviewer_speaking');
    setIsRecording(false);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (ttsSafetyTimerRef.current) clearTimeout(ttsSafetyTimerRef.current);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.98;
      utterance.pitch = 1.0;
      currentUtteranceRef.current = utterance;

      const onSpeechFinished = () => {
        if (ttsSafetyTimerRef.current) clearTimeout(ttsSafetyTimerRef.current);
        if (isInterviewActiveRef.current) {
          setTimeout(() => startAutoListening(), 400);
        }
      };

      utterance.onend = onSpeechFinished;
      utterance.onerror = onSpeechFinished;

      const estimatedDuration = Math.max(3000, text.length * 75);
      ttsSafetyTimerRef.current = setTimeout(() => {
        onSpeechFinished();
      }, estimatedDuration);

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => startAutoListening(), 2000);
    }
  };

  // 3. Auto-Listen Candidate Answer
  const startAutoListening = () => {
    if (!isInterviewActiveRef.current || !persistentStreamRef.current) return;

    try {
      liveTranscriptRef.current = '';
      audioChunksRef.current = [];

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (e) {}
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let currentText = '';
          for (let i = 0; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          liveTranscriptRef.current = currentText;

          if (currentText.trim().length > 0) {
            setTurnState('candidate_speaking');
          }

          // Auto-submit after 1.5 seconds of silence
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            if (isInterviewActiveRef.current) {
              autoSubmitCandidateAnswer();
            }
          }, 1500);
        };

        recognition.onend = () => {
          if (isInterviewActiveRef.current && isRecording) {
            try { recognition.start(); } catch (e) {}
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      mediaRecorderRef.current = new MediaRecorder(persistentStreamRef.current);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTurnState('candidate_listening');

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      const startTime = Date.now();
      timerIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        setTimerText(`${mins}:${secs}`);
      }, 1000);

    } catch (err) {
      console.error('Auto listening error:', err);
    }
  };

  // 4. Auto-Submit Answer
  const autoSubmitCandidateAnswer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimerText('00:00');

    const candidateAnswer = liveTranscriptRef.current.trim();
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

    processCandidateAnswer(candidateAnswer || null, audioBlob);
  };

  const toggleRecordingManually = () => {
    if (isRecording) {
      autoSubmitCandidateAnswer();
    } else {
      if (!persistentStreamRef.current) {
        startInterview();
      } else {
        startAutoListening();
      }
    }
  };

  // 5. Process Answer & Detect Spoken Stop Commands
  const processCandidateAnswer = async (candidateText, audioBlob) => {
    const userText = candidateText || '🎤 [Candidate Voice Response Captured]';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userText, timestamp }]);
    setActiveTrace('Evaluating response & generating next interview question...');
    setTurnState('interviewer_speaking');

    // CHECK FOR SPOKEN EXIT PHRASES (e.g. "stop", "i am done", "that is all", "finish")
    const lower = (candidateText || '').toLowerCase();
    const exitPhrases = ['stop', 'i am done', "i'm done", 'that is all', "that's all", 'finish', 'end interview', 'complete', 'no okay', 'okay stop'];
    const isSpokenExit = exitPhrases.some((phrase) => lower.includes(phrase));

    if (isSpokenExit) {
      setInterviewStarted(false);
      setTurnState('idle');
      setActiveTrace('');
      
      const summaryText = "🏆 Voice Exit Command Recognized! Thank you for participating in the technical interview. Your answers demonstrated strong technical skills and articulate communication. We will generate your candidate feedback report!";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'agent', text: summaryText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(summaryText));
      }
      return;
    }

    if (mockMode) {
      setTimeout(() => {
        setActiveTrace('');

        currentQuestionRef.current += 1;
        const currentQ = currentQuestionRef.current;
        setQuestionCount(currentQ);

        // Continuous Dynamic Question Bank
        const dynamicQuestions = [
          "Great points! How do you handle state management, performance optimization, and asynchronous requests in React?",
          "How would you approach scaling a database under heavy traffic, and what indexing or caching strategies do you use?",
          "Can you explain how you integrate AI models or automated workflows into full-stack applications?",
          "How do you approach writing clean, maintainable code and testing your applications?",
          "Tell me about a complex technical bug you solved recently and your step-by-step troubleshooting process.",
          "How do you handle security best practices, such as JWT authentication, CORS, and data sanitization?",
          "Describe your experience with CI/CD deployment pipelines and containerization using Docker."
        ];

        // Pick next question or generate dynamically
        const qIndex = (currentQ - 2) % dynamicQuestions.length;
        const nextQuestion = dynamicQuestions[qIndex];
        const formattedMsg = `🎙️ [Question ${currentQ}] ${nextQuestion}`;

        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'agent', text: formattedMsg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);

        speakAIQuestion(nextQuestion);

      }, 1500);

    } else {
      // Live n8n Mode
      try {
        const formData = new FormData();
        if (audioBlob) formData.append('file', audioBlob, 'voice_input.webm');
        if (candidateText) formData.append('text', candidateText);
        formData.append('sessionId', 'dynamic-interview-session');

        setActiveTrace('Sending answer payload to n8n Webhook: ' + webhookUrl);

        const res = await fetch(webhookUrl, {
          method: 'POST',
          body: formData
        });

        setActiveTrace('');

        if (!res.ok) {
          throw new Error(`n8n Webhook Error: ${res.status}`);
        }

        const contentType = res.headers.get('content-type') || '';

        if (contentType.includes('audio') || contentType.includes('application/octet-stream')) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);

          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, sender: 'agent', text: '🔊 Audio interview response received from n8n.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]);
        } else {
          const json = await res.json();
          const agentText = json.output || json.text || json.message || JSON.stringify(json);

          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, sender: 'agent', text: agentText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]);

          speakAIQuestion(agentText);
        }

      } catch (err) {
        setActiveTrace('');
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'agent', text: `❌ Webhook Error: ${err.message}. Switch to Mock Mode or check n8n server.`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }
    }
  };

  return (
    <div className="app-wrapper">
      <Header 
        mockMode={mockMode} 
        setMockMode={setMockMode} 
        webhookUrl={webhookUrl} 
        setWebhookUrl={setWebhookUrl} 
        onOpenModal={() => setIsModalOpen(true)}
        isInterviewMode={isInterviewMode}
        setIsInterviewMode={setIsInterviewMode}
      />

      <main className="main-grid">
        <VoicePanel 
          isRecording={isRecording}
          onToggleRecord={toggleRecordingManually}
          timerText={timerText}
          analyser={analyserRef.current}
          onSendQuery={(text) => processCandidateAnswer(text, null)}
          isInterviewMode={isInterviewMode}
          interviewStarted={interviewStarted}
          onStartInterview={startInterview}
          onStopInterview={stopInterview}
          questionCount={questionCount}
          turnState={turnState}
        />

        <ChatFeed 
          messages={messages}
          activeTrace={activeTrace}
          onClearChat={() => { setMessages([]); setAudioUrl(null); }}
          audioUrl={audioUrl}
        />
      </main>

      <N8nWorkflowModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
