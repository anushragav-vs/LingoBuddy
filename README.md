# 🗣️ LingoBuddy — Anxiety-Free Language Partner

> **A personalized, anxiety-free foreign language conversation simulator powered by local AI and the Web Speech API.**

![LingoBuddy UI Preview](https://img.shields.io/badge/PWA-Ready-10b981?style=for-the-badge&logo=pwa)
![Local AI](https://img.shields.io/badge/AI-100%25%20Local%20Ollama-06b6d4?style=for-the-badge&logo=ollama)
![Web Speech API](https://img.shields.io/badge/Audio-Web%20Speech%20API-8b5cf6?style=for-the-badge)
![Zero Build](https://img.shields.io/badge/Build-Zero%20Node%20Modules-f59e0b?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🌟 Overview

Speaking a new language can trigger social anxiety, fear of judgment, and freezing up under time pressure. **LingoBuddy** is specifically designed to eliminate conversation anxiety through:

- **Zero-Pressure Environment**: Practice at your own pace with no timers and no judgment.
- **The "Anxiety Shield" (`[?] Hint`)**: An inline rescue system next to every AI response providing instant English translations, grammar concept breakdowns, vocabulary spotlights, and suggested replies.
- **Hands-Free Voice Interaction**: Real-time voice conversation using the native browser Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
- **100% Local & Cost-Free AI**: Connects directly to local Ollama (`localhost:11434`) running lightweight models like **Qwen-2.5**, **Llama-3**, or **Mistral**.
- **Smart Autonomous Fallback**: If Ollama isn't running, an embedded contextual simulator takes over automatically so you can practice anywhere, completely offline.
- **Zero Node Bloat**: Built purely with HTML5, Tailwind CSS (CDN), and modern modular ES6 JavaScript.

---

## 🛠️ Tech Stack & Architecture

```mermaid
graph TD
    User([Learner]) -->|Voice / Mic| STT[Web Speech API: SpeechRecognition]
    User -->|Text Input| UI[Glassmorphism Chat UI]
    
    STT -->|Transcribed Text| Controller[App Controller]
    UI -->|Sent Text| Controller
    
    Controller --> LocalStorage[(Web Storage API / localStorage)]
    Controller --> AIHandler[AI Connector]
    
    subgraph AI Inference Layer
        AIHandler -->|POST localhost:11434| Ollama[Local Ollama: Qwen-2.5 / Llama-3]
        AIHandler -.->|Offline Fallback| FallbackEngine[Smart Autonomous Simulator]
    end
    
    Ollama -->|Structured JSON| Controller
    FallbackEngine -->|Structured JSON| Controller
    
    Controller -->|Voice Synthesis| TTS[Web Speech API: SpeechSynthesis]
    Controller -->|Render AI Bubble & [?]| UI
    
    User -->|Click [?] Anxiety Shield| ShieldCard[Inline Translation, Grammar & Suggested Replies]
```

- **Frontend**: HTML5, Vanilla CSS, Tailwind CSS (CDN), Vanilla ES6 Modules.
- **Speech Engine**: Native Web Speech API (`webkitSpeechRecognition` / `SpeechSynthesis`).
- **Persistence**: Web Storage API (`localStorage`) for profiles, streaks, and metrics.
- **PWA**: Web App Manifest (`manifest.json`) and Service Worker (`sw.js`) for full offline installability.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/lingobuddy.git
cd lingobuddy
```

### 2. Launch Local Server
No `npm install` or compilation needed! Run using any local HTTP server:

**Using Python:**
```bash
python -m http.server 3000
```

**Using Node.js (npx):**
```bash
npx serve -l 3000 .
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser (Google Chrome or Microsoft Edge recommended for native Web Speech API support).

---

## 🤖 Configuring Local Ollama (Optional)

LingoBuddy can connect directly to your local Ollama instance for limitless, unmetered AI roleplay:

1. **Install Ollama**: Download from [ollama.com](https://ollama.com).
2. **Pull a Model**:
   ```bash
   ollama run qwen2.5:latest
   # or
   ollama run llama3:latest
   ```
3. **Allow Browser CORS (if connecting directly from web app)**:
   - On Windows (PowerShell):
     ```powershell
     $env:OLLAMA_ORIGINS="*"
     ollama serve
     ```
   - On macOS / Linux:
     ```bash
     OLLAMA_ORIGINS="*" ollama serve
     ```
4. **Test in App**:
   - Click the ⚙️ **Settings** button in LingoBuddy.
   - Click **"⚡ Test Connection"** to verify connection to `http://localhost:11434`.

> **Note**: If Ollama is not running, LingoBuddy automatically activates the **Smart Autonomous Fallback Engine**, ensuring complete conversational play with zero setup!

---

## ☕ Conversational Scenarios & Languages

### Supported Languages
- 🇪🇸 **Spanish** (`es-ES`)
- 🇫🇷 **French** (`fr-FR`)
- 🇩🇪 **German** (`de-DE`)
- 🇮🇹 **Italian** (`it-IT`)
- 🇯🇵 **Japanese** (`ja-JP`)
- 🇨🇳 **Mandarin** (`zh-CN`)

### Built-in Scenarios
1. **☕ At a Coffee Shop**: Practice polite ordering, asking for milk alternatives, and paying.
2. **🗺️ Asking for Directions**: Find your way around landmarks, subways, and street corners.
3. **✈️ Airport Check-in & Customs**: Handle baggage drop, seat selection, and boarding passes.
4. **🏨 Hotel Reception Check-in**: Inquire about Wi-Fi, breakfast hours, and room keys.
5. **💬 Friendly Casual Chit-Chat**: Warm small talk about hobbies, the weather, and weekend plans.

---

## 🛡️ The Anxiety Shield (`[?]`)

Whenever an AI partner speaks, learners can tap the **`[?] Hint`** button to reveal:
- **English Translation**: Plain-English contextual meaning.
- **Grammar Insight**: Clear explanation of verb tenses, polite forms, or sentence patterns.
- **Vocabulary Spotlight**: Monospace chips highlighting key words.
- **Suggested Quick Replies**: 3 safe, native responses you can tap to auto-fill the chat input or practice speaking aloud.

---

## 📂 Project Structure

```
lingobuddy/
├── index.html                  # Main semantic Glassmorphism single-page UI
├── manifest.json               # Progressive Web App manifest
├── sw.js                       # Service worker for offline caching
├── instructions.md             # Functional specifications
├── rules.md                    # Engineering architecture guidelines
├── .gitignore                  # Git ignore rules
└── assets/
    ├── css/
    │   └── styles.css          # Glassmorphism tokens, soundwaves, animations
    └── js/
        ├── app.js              # Central UI controller and state machine
        ├── speech-handler.js   # Web Speech API wrapper (STT & TTS)
        ├── ai-handler.js       # Ollama REST client & fallback engine
        ├── storage-handler.js  # LocalStorage CRUD, streaks & fluency stats
        └── scenarios.js        # Multi-language dialogues & knowledge bases
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
