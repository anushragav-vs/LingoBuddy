# LingoBuddy — Technical & Functional Instructions

## 1. Project Overview & Vision
**LingoBuddy** is a progressive web application (PWA) designed as a personalized, anxiety-free foreign language conversation partner. It empowers learners to overcome language barrier nervousness through supportive AI roleplay, real-time speech interaction, and the instant, discreet **"Anxiety Shield"** inline translation and grammar breakdown system.

---

## 2. Core Pillars & User Experience Principles

### 2.1 The "Anxiety-Free" Promise
- **Zero Judgment & No Timers:** The learner can speak at their own pace, pause, re-listen, or switch to typing anytime.
- **Pacing Control:** Adjustable audio playback speed (0.75x slow mode, 1.0x normal).
- **One-Click Anxiety Shield (`[?]`):** AI messages can be expanded instantly to reveal:
  - English literal and contextual translation.
  - Highlighted breakdown of key grammar patterns, conjugations, and idioms.
  - 2–3 suggested conversational replies (clickable to auto-fill or speak).
- **Celebratory Feedback:** Positive reinforcement on pronunciation attempts and streak milestones.

---

## 3. Architecture & Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Structure & Layout** | Semantic HTML5 | Clean semantic tags, accessibility attributes (`aria-*`), mobile-first design. |
| **Styling** | Tailwind CSS (CDN) + Custom Vanilla CSS | Glassmorphism styling (`backdrop-blur`, subtle borders, radial gradients, glowing audio waves). |
| **Scripting** | Modern ES6+ JavaScript Modules | Native imports/exports, zero `node_modules` overhead, zero build step required. |
| **Speech-to-Text** | Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) | Automatic language BCP-47 tag switching, live audio status (`listening`, `processing`, `error`). |
| **Text-to-Speech** | Web Speech API (`SpeechSynthesis`) | Native synthetic voice selection matched to target language, rate/pitch modulation. |
| **Local AI Engine** | Local OpenAI-compatible REST API | Default target: `http://localhost:11434/v1/chat/completions` (Ollama running Qwen-2.5, Llama-3, Mistral). |
| **Smart Fallback Engine** | Built-in Autonomous Scenario AI | Rich, context-aware rule & response simulator if Ollama is not running, ensuring 100% testable zero-config run. |
| **Persistence** | Web Storage API (`localStorage`) | Saves user profile, active streaks, fluency score, session history, and custom endpoint settings. |
| **PWA & Offline** | Web App Manifest + Service Worker | Offline asset caching, installable on mobile/desktop devices. |

---

## 4. Key Functional Modules

### 4.1 Glassmorphism Dashboard
- **User Profile Bar:** Avatar, display name, native language, target language (Spanish, French, German, Italian, Japanese, Mandarin, etc.).
- **Scenario Selector:**
  - ☕ *At a Coffee Shop* (ordering, asking for milk alternatives, polite greetings).
  - 🗺️ *Asking for Directions* (landmarks, street names, orientation phrases).
  - ✈️ *Airport Check-in & Customs* (boarding pass, baggage queries, destination).
  - 🏨 *Hotel Reception* (check-in, amenities, room inquiries).
  - 🩺 *Pharmacy / Medical Help* (symptoms, common over-the-counter medicine).
  - 💬 *Casual Friendly Chit-Chat* (hobbies, weather, personal interests).
- **Metrics Widget:**
  - Total Sentences Spoken.
  - Active Streak (days/sessions).
  - Grammar & Confidence Fluency Score (% progression).

### 4.2 Interactive Dual-Modality Chat
- **Voice Controls:** Large pulsing mic button with visual state changes:
  - `IDLE`: Resting glass bubble with mic icon.
  - `LISTENING`: Animated glowing soundwave rings + live transcript preview.
  - `PROCESSING`: Orbiting spinner indicating Ollama/AI inference.
  - `SPEAKING`: Waveform pulsing indicating synthetic voice playback with a Stop button.
- **Text Controls:** Auto-expanding input box with send button, audio toggle, and slow-speech toggle.

### 4.3 The "Anxiety Shield" (Hint & Translation Engine)
- Integrated into every AI speech bubble as a discrete glowing `[?]` button.
- On click, animates an accordion card showing:
  - **Full English Translation**
  - **Key Grammar Breakdown** (tenses, irregular verbs, polite forms)
  - **Vocabulary Insights** (high-frequency words used in the sentence)
  - **Suggested Quick Responses** (clicking copies into input or triggers speech)

### 4.4 Local AI Configuration & Connection Resilience
- Settings modal allowing the user to customize:
  - Endpoint URL (defaults to `http://localhost:11434/v1/chat/completions`).
  - Model Name (defaults to `qwen2.5:latest` / `llama3:latest`).
  - System Temperature & Persona Tone (e.g. "Gentle Tutor", "Friendly Barista", "Patient Local").
  - Test Connection button with live latency ping.
  - Automatic fallback toggle to Smart Embedded Scenario Simulator if Ollama is unreachable.

### 4.5 Error Handling & Fallbacks
- Visual toast notifications & helpful modal alerts for:
  - Mic permission denied / blocked in browser.
  - Web Speech API not supported (prompts Chrome/Edge or provides text-only fallback).
  - Ollama connection timeout / CORS configuration assistance.
  - Unrecognized voice input with gentle "Could you say that again?" guidance.
