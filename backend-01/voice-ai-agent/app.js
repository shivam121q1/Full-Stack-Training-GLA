// State Variables
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let startTime = 0;
let timerInterval = null;

// Audio Visualizer Context
let audioCtx = null;
let analyser = null;
let animFrameId = null;

// DOM Elements
const recordBtn = document.getElementById('recordBtn');
const visualizerCanvas = document.getElementById('visualizerCanvas');
const visualizerOverlay = document.getElementById('visualizerOverlay');
const visualizerStatus = document.getElementById('visualizerStatus');
const recordingTimer = document.getElementById('recordingTimer');
const recordingStateBadge = document.getElementById('recordingStateBadge');
const chatFeed = document.getElementById('chatFeed');
const mockModeToggle = document.getElementById('mockModeToggle');
const webhookUrlInput = document.getElementById('webhookUrl');
const textQueryForm = document.getElementById('textQueryForm');
const textInput = document.getElementById('textInput');
const audioPlayerContainer = document.getElementById('audioPlayerContainer');
const audioPlayer = document.getElementById('audioPlayer');
const clearChatBtn = document.getElementById('clearChatBtn');

const canvasCtx = visualizerCanvas.getContext('2d');

// Initialize Canvas
function resizeCanvas() {
    visualizerCanvas.width = visualizerCanvas.parentElement.clientWidth;
    visualizerCanvas.height = visualizerCanvas.parentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawIdleWave();

// Event Listeners
recordBtn.addEventListener('click', toggleRecording);
textQueryForm.addEventListener('submit', handleTextSubmit);
clearChatBtn.addEventListener('click', () => {
    chatFeed.innerHTML = `
        <div class="system-message">
            <div class="system-icon">⚡</div>
            <div class="system-text">Chat cleared. Ready for audio/text input.</div>
        </div>`;
    audioPlayerContainer.style.display = 'none';
});

// Prompt Chips
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const promptText = chip.getAttribute('data-prompt');
        sendQueryToAgent(promptText, null);
    });
});

// Toggle Recording Function
async function toggleRecording() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        // Audio Context for Visualizer
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            stream.getTracks().forEach(track => track.stop());
            cancelAnimationFrame(animFrameId);
            drawIdleWave();
            
            // Process Audio
            sendQueryToAgent(null, audioBlob);
        };

        mediaRecorder.start();
        isRecording = true;
        
        // UI Updates
        recordBtn.classList.add('recording');
        recordingStateBadge.textContent = 'Listening...';
        recordingStateBadge.style.color = '#EF4444';
        visualizerOverlay.style.display = 'none';

        // Start Timer
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);

        // Start Visualizer Loop
        drawActiveVisualizer();

    } catch (err) {
        alert('Microphone access denied or not available in your browser.');
        console.error('Error accessing microphone:', err);
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        recordBtn.classList.remove('recording');
        recordingStateBadge.textContent = 'Processing...';
        recordingStateBadge.style.color = '#F59E0B';
        visualizerOverlay.style.display = 'flex';
        visualizerStatus.textContent = 'Transcribing & executing n8n agent...';

        clearInterval(timerInterval);
        recordingTimer.textContent = '00:00';
    }
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    recordingTimer.textContent = `${mins}:${secs}`;
}

// Audio Visualizer Drawings
function drawIdleWave() {
    canvasCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, visualizerCanvas.height / 2);
    canvasCtx.lineTo(visualizerCanvas.width, visualizerCanvas.height / 2);
    canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    canvasCtx.lineWidth = 2;
    canvasCtx.stroke();
}

function drawActiveVisualizer() {
    if (!isRecording || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * visualizerCanvas.height * 0.8;

        const gradient = canvasCtx.createLinearGradient(0, visualizerCanvas.height, 0, 0);
        gradient.addColorStop(0, '#FF6D5A');
        gradient.addColorStop(1, '#9333EA');

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, (visualizerCanvas.height - barHeight) / 2, barWidth - 2, barHeight);

        x += barWidth + 1;
    }

    animFrameId = requestAnimationFrame(drawActiveVisualizer);
}

// Text Input Submit Handler
function handleTextSubmit(e) {
    e.preventDefault();
    const query = textInput.value.trim();
    if (!query) return;
    textInput.value = '';
    sendQueryToAgent(query, null);
}

// Core Agent Dispatcher
async function sendQueryToAgent(textQuery, audioBlob) {
    const isMock = mockModeToggle.checked;
    const webhookUrl = webhookUrlInput.value.trim();

    // 1. Add User Message / Audio Indicator to Chat
    const userMsgText = textQuery || '🎤 [Audio Voice Message Recorded]';
    appendChatBubble('user', userMsgText);

    // 2. Show Trace Step Card
    const traceId = 'trace-' + Date.now();
    appendTraceCard(traceId, 'Transcribing audio & analyzing intent...');

    if (isMock) {
        // MOCK DEMO MODE
        setTimeout(() => {
            updateTraceCard(traceId, 'Executing tools: [Google Calendar API & Tavily Search]...');
        }, 1200);

        setTimeout(() => {
            removeTraceCard(traceId);
            const mockResponse = getMockResponse(textQuery || 'voice query');
            appendChatBubble('agent', mockResponse.text);
            
            // Speak mock voice using Web Speech API
            speakTextWebSpeech(mockResponse.text);

            recordingStateBadge.textContent = 'Idle';
            recordingStateBadge.style.color = '#94A3B8';
            visualizerStatus.textContent = 'Click microphone to start talking';
        }, 2600);

    } else {
        // LIVE N8N WEBHOOK CALL
        try {
            const formData = new FormData();
            if (audioBlob) {
                formData.append('file', audioBlob, 'voice_input.webm');
            } else {
                formData.append('text', textQuery);
            }

            updateTraceCard(traceId, 'Sending payload to n8n Webhook: ' + webhookUrl);

            const response = await fetch(webhookUrl, {
                method: 'POST',
                body: formData
            });

            removeTraceCard(traceId);

            if (!response.ok) {
                throw new Error(`n8n webhook error: Status ${response.status}`);
            }

            // Check if response is audio (MP3/WAV) or JSON
            const contentType = response.headers.get('content-type') || '';
            
            if (contentType.includes('audio') || contentType.includes('application/octet-stream')) {
                const responseAudioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(responseAudioBlob);
                audioPlayer.src = audioUrl;
                audioPlayerContainer.style.display = 'block';
                audioPlayer.play();
                
                appendChatBubble('agent', '🔊 Audio response received and playing.');
            } else {
                const jsonResult = await response.json();
                const responseText = jsonResult.output || jsonResult.text || jsonResult.message || JSON.stringify(jsonResult);
                
                appendChatBubble('agent', responseText);

                if (jsonResult.audioBase64) {
                    audioPlayer.src = 'data:audio/mp3;base64,' + jsonResult.audioBase64;
                    audioPlayerContainer.style.display = 'block';
                    audioPlayer.play();
                } else {
                    speakTextWebSpeech(responseText);
                }
            }

        } catch (err) {
            removeTraceCard(traceId);
            appendChatBubble('agent', '❌ Connection Failed: ' + err.message + '. Make sure your n8n workflow is active or enable Mock Mode for testing.');
        } finally {
            recordingStateBadge.textContent = 'Idle';
            recordingStateBadge.style.color = '#94A3B8';
            visualizerStatus.textContent = 'Click microphone to start talking';
        }
    }
}

// UI Helper Functions
function appendChatBubble(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const senderName = sender === 'user' ? 'You' : 'Voice Agent (n8n)';

    bubble.innerHTML = `
        <div class="bubble-meta">${senderName} • ${timeStr}</div>
        <div class="bubble-content">${escapeHtml(text)}</div>
    `;

    chatFeed.appendChild(bubble);
    chatFeed.scrollTop = chatFeed.scrollHeight;
}

function appendTraceCard(id, initialStep) {
    const trace = document.createElement('div');
    trace.className = 'trace-card';
    trace.id = id;
    trace.innerHTML = `
        <div class="spinner"></div>
        <span class="trace-text">${initialStep}</span>
    `;
    chatFeed.appendChild(trace);
    chatFeed.scrollTop = chatFeed.scrollHeight;
}

function updateTraceCard(id, newStep) {
    const trace = document.getElementById(id);
    if (trace) {
        trace.querySelector('.trace-text').textContent = newStep;
    }
}

function removeTraceCard(id) {
    const trace = document.getElementById(id);
    if (trace) trace.remove();
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function speakTextWebSpeech(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

// Mock Responses for Instant Classroom Testing
function getMockResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('meeting') || q.includes('schedule')) {
        return { text: "📅 Done! I have scheduled a meeting for tomorrow at 10:00 AM in your Google Calendar and sent an invite to Alex." };
    } else if (q.includes('news') || q.includes('ai')) {
        return { text: "🌐 I searched the live web: Top story today is OpenAI's latest model updates and breakthrough agentic automation frameworks." };
    } else if (q.includes('task') || q.includes('notion')) {
        return { text: "📝 I've created a new high-priority task 'Review project budget' in your Notion workspace." };
    } else {
        return { text: "🔊 I heard your voice prompt: '" + query + "'. I processed this using OpenAI Whisper speech-to-text, executed reasoning via the n8n AI Agent node, and triggered voice output." };
    }
}
