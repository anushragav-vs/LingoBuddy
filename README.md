*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

# 🗣️ LingoBuddy — Anxiety-Free Language Conversation Partner

> A personalized, zero-judgment foreign language conversation simulator powered by local open-weight AI and the Web Speech API.

![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981?style=for-the-badge&logo=pwa)
![Local AI](https://img.shields.io/badge/AI-100%25%20Local%20Ollama-06b6d4?style=for-the-badge&logo=ollama)
![Web Speech API](https://img.shields.io/badge/Audio-Web%20Speech%20API-8b5cf6?style=for-the-badge)
![Zero Build](https://img.shields.io/badge/Build-Zero%20Node%20Modules-f59e0b?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## What I Built

### Who I Built It For
I built **LingoBuddy** for my close friend who has been eagerly preparing to travel and relocate abroad, but struggles with intense **foreign language conversation anxiety**. Whenever they try to practice with native speakers or conventional language apps, they freeze up. Fear of making grammatical blunders, the pressure of rapid-fire replies, and the awkwardness of asking someone to repeat themselves over and over turn what should be an exciting journey into an intimidating hurdle.

### The Problem It Solves
Traditional language learning platforms rely heavily on gamified countdown timers, flashcards, or punitive scoring systems that actually amplify anxiety. Furthermore, conversational chatbots often generate walls of unbroken text that overwhelm beginners.

**LingoBuddy solves this by creating a 100% judgment-free, private safe haven for vocal immersion:**
1. **The "Anxiety Shield" (`[?] Hint`)**: A one-click rescue system embedded into every single AI speech bubble. If my friend gets stuck or nervous, tapping `[?]` immediately reveals a gentle inline card with:
   - **Plain-English Translation**: Contextual and literal understanding.
   - **Grammar Insight**: Clear, non-academic explanations of verb conjugations, polite forms, and sentence structures.
   - **Vocabulary Spotlight**: Monospace chips highlighting key vocabulary.
   - **3 Suggested Safe Replies**: Instant rescue responses they can tap to auto-fill the chat input or practice speaking aloud.
2. **Hands-Free Voice Conversation**: Powered by the native browser Web Speech API (`SpeechRecognition` & `SpeechSynthesis`), with live audio equalizers and state indicators (`LISTENING`, `PROCESSING`, `SPEAKING`, `IDLE`).
3. **Pacing Control**: An audio pace toggle allowing relaxed `0.75x` 🐢 slow speech or natural `1.0x` ⚡ standard pace.
4. **Authentic Scenarios**: Roleplay environments tailored to everyday real-life challenges:
   - ☕ *At a Coffee Shop*
   - 🗺️ *Asking for Directions*
   - ✈️ *Airport Check-in & Customs*
   - 🏨 *Hotel Reception Check-in*
   - 💬 *Friendly Casual Chit-Chat*
5. **Private Progress Tracking**: Uses the browser's Web Storage API (`localStorage`) to celebrate consistency with daily streaks, total sentences spoken, and a positive fluency confidence meter.

---

## Demo

- **GitHub Repository**: [https://github.com/anushragav-vs/LingoBuddy](https://github.com/anushragav-vs/LingoBuddy)
- **Architecture**: Zero-build Progressive Web App (PWA). You can run it locally with zero dependencies in seconds:

```bash
# Clone the repository
git clone https://github.com/anushragav-vs/LingoBuddy.git
cd LingoBuddy

# Run using any static HTTP server (Python, npx, or Live Server)
python -m http.server 3000
```
Then navigate to **`http://localhost:3000`** in Google Chrome or Microsoft Edge.

### Core Interface Highlights:
- **Glassmorphism Dashboard**: Obsidian dark palette (`#07090e`), frosted glass panels (`backdrop-filter: blur`), dynamic soundwaves, and language flags.
- **Voice Control Dock**: Concentric pulsing microphone animation during active speech recognition, real-time transcription preview, and a synthetic voice audio interrupt button.
- **Multi-Language Selector**: Seamlessly switch between Spanish 🇪🇸, French 🇫🇷, German 🇩🇪, Italian 🇮🇹, Japanese 🇯🇵, and Mandarin 🇨🇳 with automatic BCP-47 speech recognition and synthesis reconfiguration.

---

## Code

The complete source code is available on GitHub:
👉 **[https://github.com/anushragav-vs/LingoBuddy](https://github.com/anushragav-vs/LingoBuddy)**

### Clean Modular Structure (Zero Node Modules Bloat):
```
LingoBuddy/
├── index.html                  # Semantic Glassmorphism single-page UI & PWA shell
├── manifest.json               # Progressive Web App manifest (standalone installable)
├── sw.js                       # Service worker for offline asset caching
├── instructions.md             # Functional requirements & UX specifications
├── rules.md                    # Engineering architecture guidelines
├── .gitignore                  # Git ignore rules
├── README.md                   # Hacktoberfest submission & documentation
└── assets/
    ├── css/
    │   └── styles.css          # Glassmorphism tokens, soundwave bars, glow rings
    └── js/
        ├── app.js              # Master UI controller and state machine
        ├── speech-handler.js   # Web Speech API wrapper (STT & TTS engines)
        ├── ai-handler.js       # Ollama REST connector + autonomous fallback simulator
        ├── storage-handler.js  # LocalStorage CRUD, streaks & fluency metrics
        └── scenarios.js        # Multi-language dialogues & Anxiety Shield metadata
```

---

## How I Built It

### 1. Open-Source AI & Local Inference Layer
LingoBuddy is architected around **open-weight foundation models** via **Ollama** (`http://localhost:11434/v1/chat/completions`):
- **Models**: Optimized for **Qwen 2.5** (`qwen2.5:latest`) and **Llama 3** (`llama3:latest`).
- **Prompt Engineering**: Uses structured JSON schema outputs to enforce conversational brevity (1–2 spoken sentences) paired with rich metadata required by the **Anxiety Shield**:
  ```json
  {
    "reply": "¡Hola! Bienvenido a Café Luz. ¿Qué te gustaría tomar hoy?",
    "translation": "Hello! Welcome to Café Luz. What would you like to have today?",
    "grammarTip": "'¿Qué te gustaría...?' uses the polite conditional form of 'gustar'.",
    "vocabHighlight": ["Bienvenido (welcome)", "Tomar (to drink)"],
    "suggestedReplies": [
      "Un café con leche de avena, por favor.",
      "¿Tienen cruasanes o algo para comer?",
      "Solo un espresso doble, gracias."
    ]
  }
  ```
- **Autonomous Local Fallback Engine**: If Ollama isn't running on the user's machine, the app automatically switches to an embedded contextual dialogue simulator in [`ai-handler.js`](file:///c:/Users/Anush%20Ragav%20VS/dev/assets/js/ai-handler.js), ensuring 100% uptime with zero setup friction.

### 2. Audio & Speech Engineering
- Implemented via the native **Web Speech API**:
  - `SpeechRecognition` / `webkitSpeechRecognition` dynamically adjusts its `lang` attribute to the target language (e.g., `es-ES`, `fr-FR`, `ja-JP`).
  - `SpeechSynthesis` queries system voice catalogues to select high-fidelity native accents with pitch and rate modulation (0.75x slow mode).
  - Built-in audio collision prevention stops speech recognition while the synthetic voice is speaking to prevent self-echo loops.

### 3. Frontend Architecture
- **Vanilla ES6+ Modules**: Built with zero bundlers (no Webpack, Vite, or Babel required).
- **Tailwind CSS via CDN + Custom CSS**: Ultra-smooth Glassmorphism styling with dark obsidian surfaces, cyan/emerald accents, and animated SVG waveforms.
- **PWA Ready**: Includes [`manifest.json`](file:///c:/Users/Anush%20Ragav%20VS/dev/manifest.json) and [`sw.js`](file:///c:/Users/Anush%20Ragav%20VS/dev/sw.js) for desktop and mobile offline installation.

---

## Why Does Open Innovation Matter?

Open innovation is what made **LingoBuddy** possible in ways closed APIs never could:

1. **Uncompromising Privacy for Vulnerable Learning**:
   Learning a language involves making awkward, embarrassing mistakes. When users practice with closed commercial APIs (OpenAI, Google, Anthropic), their intimate voice recordings and transcripts are transmitted over third-party servers and potentially stored or used for training. By running open-weight models (Qwen-2.5, Llama-3) locally via Ollama, **my friend's voice and thoughts never leave their laptop**.
2. **Zero Cost & Infinite Practice**:
   Language fluency requires hundreds of hours of trial and error. Closed cloud APIs charge per-token fees that penalize users who need more repetitions. Open-source local inference is **100% free and unlimited**.
3. **Resilience & Travel Readiness**:
   Learners frequently travel to places with spotty airport Wi-Fi or expensive roaming data. Because LingoBuddy combines local open-source AI with a PWA service worker and an autonomous offline fallback engine, it remains fully usable on airplanes, trains, or in remote cafes without an internet connection.

---

## My Agent Session

This application was engineered collaboratively using **Antigravity AI**:
- Architecture planning and technical specification generation in [`instructions.md`](file:///c:/Users/Anush%20Ragav%20VS/dev/instructions.md) and [`rules.md`](file:///c:/Users/Anush%20Ragav%20VS/dev/rules.md).
- End-to-end development of modular ES6 frontend, Web Speech API integration, and local Ollama REST client.
- Zero-dependency PWA configuration and Git repository deployment.

---

## Prize Categories

- **Build for a Friend** (Primary Challenge Category)
- **Open Innovation / Local AI**
- **Personal Productivity & Learning**
