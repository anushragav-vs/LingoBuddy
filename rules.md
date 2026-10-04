# LingoBuddy — Architecture & Implementation Rules

## 1. Technical Constraints & Code Standards
1. **Zero External Build Tooling**:
   - Do NOT introduce Webpack, Vite, Parcel, or npm dependencies unless explicitly instructed.
   - Utilize standard ES6 module syntax (`import`/`export`) natively supported by modern browsers.
   - External libraries (Tailwind CSS, FontAwesome/Lucide, Canvas confetti) must load via reliable CDNs.

2. **No Placeholders or Truncations**:
   - Every file must be complete with full business logic, edge-case checks, and styling.
   - No `// TODO: implement later` or placeholder responses.
   - All scenario dictionaries, vocabulary lists, grammar breakdown heuristics, and speech synthesis handlers must be fully authored.

3. **Separation of Concerns & Modular Architecture**:
   - `index.html`: Clean semantic DOM layout with Glassmorphism container hierarchy.
   - `assets/css/styles.css`: Custom design tokens, glassmorphism utilities, micro-interactions, voice wave animations, scrollbar styles.
   - `assets/js/storage-handler.js`: Persistence layer managing profile, statistics, streak calculation, custom LLM configurations, and session memory.
   - `assets/js/speech-handler.js`: Web Speech API abstraction managing `SpeechRecognition`, `SpeechSynthesis`, voice picker by BCP-47 tag, error states, and event hooks.
   - `assets/js/scenarios.js`: Scenarios database with personas, default openers, vocabulary lists, and offline conversational dialogues.
   - `assets/js/ai-handler.js`: Local OpenAI-compatible REST API client with prompt engineering, structured response generation, and intelligent local fallback engine.
   - `assets/js/app.js`: Master application controller connecting the UI, speech events, LLM calls, and state management.
   - `manifest.json` & `sw.js`: PWA service worker and manifest for offline caching and desktop/mobile installation.

4. **Speech & Audio UX Rules**:
   - Always verify if `webkitSpeechRecognition` or `SpeechRecognition` is supported before binding mic events.
   - Provide clear, accessible UI states: `IDLE`, `LISTENING`, `PROCESSING`, `SPEAKING`.
   - Prevent speech recognition and synthesis collisions (i.e., do not record the AI's synthetic speech through the microphone).
   - Support manual cancellation / speech mute at any time.

5. **Anxiety-Free UX Standards**:
   - Color Palette: Soothing, deep dark indigo/slate backgrounds (`#090d16`, `#0f172a`), emerald/teal accents (`#10b981`, `#06b6d4`), and warm violet highlights (`#8b5cf6`).
   - High Contrast & Readability: Clean typography using Inter / Outfit font, high-contrast text against translucent glass panels.
   - Visual Feedback: Subtle ripple pulses, smooth transition transforms (150ms-300ms), and friendly emoji cues.
   - Error Notifications: Gentle, constructive toast notifications instead of jarring alert dialogues.

6. **PWA Compliance**:
   - Valid `manifest.json` with theme color, icons, display mode `standalone`.
   - Service worker registering safely on `window.load` with cache-first strategy for static assets.
