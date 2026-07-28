# 🎙️ Voice AI Assistant - n8n Teaching Kit

This project is a complete **Multi-Modal Voice AI Agent** created for teaching students how to build real-world AI agents using **n8n**.

It includes:
1. **Interactive Web UI**: Futuristic glassmorphism web client with live audio waveform visualizer, voice recorder (browser Web Audio API), mock mode demo, and n8n webhook connector.
2. **n8n Workflow Blueprint (`n8n_voice_agent_workflow.json`)**: Pre-configured JSON file to import directly into n8n.

---

## 🚀 Quick Start for Teachers & Students

### Option A: Immediate Demo (Mock Mode)
1. Double click or open `index.html` in any web browser.
2. Ensure **Mock Mode (Demo)** is checked in the header.
3. Click the glowing **microphone button**, speak a query (e.g. *"Schedule a meeting tomorrow at 10 AM"*), and click again to stop.
4. The Web UI will simulate speech-to-text, tool execution, and voice output!

---

## 🛠️ Setting Up the n8n Workflow

### Step 1: Import the Workflow into n8n
1. Open your **n8n Canvas**.
2. Click **Workflow Settings (top right) ➔ Import from File**.
3. Select `n8n_voice_agent_workflow.json` located in this directory.

### Step 2: Configure Nodes & Credentials

```
 [1. Webhook] ➔ [2. OpenAI Whisper] ➔ [3. n8n AI Agent] ➔ [4. OpenAI TTS] ➔ [5. Respond to Webhook]
                                            │
                                ┌───────────┴───────────┐
                         [Chat Model] [Buffer Memory] [Tools]
```

1. **Node 1: Webhook**
   - Set method to `POST`.
   - Set Path to `voice-agent`.
   - Set Response Mode to `Using 'Respond to Webhook' Node`.
   - Copy the Webhook URL (e.g., `http://localhost:5678/webhook/voice-agent`).

2. **Node 2: OpenAI Whisper (Speech to Text)**
   - Select your **OpenAI API Key** credential.
   - Resource: `Audio`, Operation: `Transcribe`.

3. **Node 3: n8n AI Agent Node**
   - Connect **OpenAI Chat Model** (`gpt-4o` or `gpt-4o-mini`).
   - Connect **Window Buffer Memory** (so the agent remembers chat history).
   - Connect **Tools** (e.g. Google Calendar API tool, Web Search tool, Code tool).

4. **Node 4: OpenAI TTS (Text to Speech)**
   - Model: `tts-1`, Voice: `alloy` or `nova`.
   - Text input: `={{ $json.output }}`.

5. **Node 5: Respond to Webhook**
   - Response Mode: `Binary`.
   - Headers: Add `Access-Control-Allow-Origin: *` and `Content-Type: audio/mp3`.

### Step 3: Connect Web UI to n8n
1. Uncheck **Mock Mode** in the Web UI header.
2. Paste your active n8n Production or Test Webhook URL into the **n8n Webhook URL** field.
3. Start speaking to your agent!

---

## 📚 Student Learning Checklist

- [x] **Speech-to-Text (STT)**: How raw audio blobs are ingested via HTTP Webhooks and transcribed by Whisper.
- [x] **Agent Reasoning**: How the `AI Agent` node decides whether to speak directly or trigger an external API tool.
- [x] **State & Memory**: How Window Buffer Memory keeps conversation context across voice messages.
- [x] **Text-to-Speech (TTS)**: Synthesizing natural AI speech dynamically from LLM outputs.
- [x] **Multi-Modal Flow**: Seamless transition from Audio $\rightarrow$ Text $\rightarrow$ Agent Decision $\rightarrow$ Action $\rightarrow$ Audio Output.
