/**
 * LingoBuddy - Speech Engineering & Hands-Free Audio Engine
 * Encapsulates Web Speech API (SpeechRecognition and SpeechSynthesis)
 * with robust error handling, language BCP-47 switching, and voice state management.
 */

export class SpeechHandler {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis || null;
    this.voices = [];
    this.currentLanguage = 'es-ES';
    this.speechRate = 0.85;
    this.isListening = false;
    this.isSpeaking = false;
    this.silenceTimer = null;
    this.silenceDurationMs = 2800; // Auto-finish when speaker pauses
    
    // Callbacks
    this.onStateChange = null; // (state: 'IDLE' | 'LISTENING' | 'PROCESSING' | 'SPEAKING' | 'ERROR', meta?: object) => void
    this.onInterimTranscript = null; // (text: string) => void
    this.onFinalTranscript = null; // (text: string) => void
    this.onError = null; // (errorKey: string, friendlyMsg: string) => void

    this.initRecognition();
    this.initSynthesis();
  }

  isSpeechSupported() {
    const hasRec = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    const hasSynth = !!window.speechSynthesis;
    return { hasRecognition: hasRec, hasSynthesis: hasSynth };
  }

  initRecognition() {
    const SpeechRecConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecConstructor) {
      console.warn('[SpeechHandler] SpeechRecognition is not natively supported in this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRecConstructor();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = this.currentLanguage;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.dispatchState('LISTENING');
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (interimTranscript && this.onInterimTranscript) {
          this.onInterimTranscript(interimTranscript);
        }

        if (finalTranscript) {
          this.clearSilenceTimer();
          if (this.onFinalTranscript) {
            this.onFinalTranscript(finalTranscript.trim());
          }
          this.stopListening();
        } else if (interimTranscript) {
          // Reset silence detection timer to auto-send when user finishes
          this.resetSilenceTimer(interimTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        this.clearSilenceTimer();
        this.isListening = false;
        console.warn('[SpeechHandler] SpeechRecognition Error:', event.error);

        let userMsg = 'Audio input encountered an issue.';
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          userMsg = 'Microphone access was blocked. Please grant microphone permission in your browser address bar.';
          this.dispatchState('ERROR', { code: 'MIC_BLOCKED', message: userMsg });
        } else if (event.error === 'no-speech') {
          userMsg = 'No speech was detected. Tap the mic and try again whenever you are ready!';
          this.dispatchState('IDLE');
        } else if (event.error === 'network') {
          userMsg = 'Speech network connectivity problem. Check your internet connection or use text input.';
          this.dispatchState('ERROR', { code: 'NETWORK_ERROR', message: userMsg });
        } else {
          this.dispatchState('IDLE');
        }

        if (this.onError) {
          this.onError(event.error, userMsg);
        }
      };

      this.recognition.onend = () => {
        this.clearSilenceTimer();
        this.isListening = false;
        if (!this.isSpeaking) {
          this.dispatchState('IDLE');
        }
      };
    } catch (e) {
      console.error('[SpeechHandler] Error initializing SpeechRecognition:', e);
    }
  }

  initSynthesis() {
    if (!this.synthesis) return;

    const populateVoices = () => {
      this.voices = this.synthesis.getVoices();
    };

    populateVoices();
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = populateVoices;
    }
  }

  resetSilenceTimer(accumulatedText) {
    this.clearSilenceTimer();
    this.silenceTimer = setTimeout(() => {
      if (accumulatedText && accumulatedText.trim().length > 0) {
        if (this.onFinalTranscript) {
          this.onFinalTranscript(accumulatedText.trim());
        }
        this.stopListening();
      }
    }, this.silenceDurationMs);
  }

  clearSilenceTimer() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  }

  setSpeechRate(rate) {
    this.speechRate = Math.max(0.5, Math.min(1.5, rate));
  }

  startListening() {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    if (!this.recognition) {
      this.initRecognition();
      if (!this.recognition) {
        if (this.onError) {
          this.onError('UNSUPPORTED', 'Speech Recognition is not supported on this browser. You can still type in the chat box!');
        }
        return;
      }
    }

    try {
      this.recognition.lang = this.currentLanguage;
      this.recognition.start();
    } catch (e) {
      // If already started, restart
      console.warn('[SpeechHandler] Recognition start notice:', e);
      try {
        this.recognition.stop();
        setTimeout(() => this.recognition.start(), 200);
      } catch (err) {
        console.error('[SpeechHandler] Could not restart recognition:', err);
      }
    }
  }

  stopListening() {
    this.clearSilenceTimer();
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('[SpeechHandler] Stop listening notice:', e);
      }
    }
    this.isListening = false;
  }

  speak(text, onComplete = null) {
    if (!this.synthesis) {
      if (onComplete) onComplete();
      return;
    }

    // Stop previous utterance and cancel recognition during speech to avoid self-echo
    this.stopListening();
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.currentLanguage;
    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    // Pick best native voice for this language
    const voice = this.getBestVoice(this.currentLanguage);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.dispatchState('SPEAKING');
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.dispatchState('IDLE');
      if (onComplete) onComplete();
    };

    utterance.onerror = (e) => {
      console.warn('[SpeechHandler] SpeechSynthesis error:', e);
      this.isSpeaking = false;
      this.dispatchState('IDLE');
      if (onComplete) onComplete();
    };

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis) {
      try {
        this.synthesis.cancel();
      } catch (e) {
        console.warn('[SpeechHandler] Error stopping synthesis:', e);
      }
    }
    this.isSpeaking = false;
  }

  getBestVoice(targetLangCode) {
    if (!this.voices || this.voices.length === 0) {
      if (this.synthesis) {
        this.voices = this.synthesis.getVoices();
      }
    }
    const shortCode = targetLangCode.split('-')[0].toLowerCase();
    
    // Look for exact match first
    let match = this.voices.find(v => v.lang.toLowerCase() === targetLangCode.toLowerCase());
    // Next, look for language prefix match
    if (!match) {
      match = this.voices.find(v => v.lang.toLowerCase().startsWith(shortCode));
    }
    return match || null;
  }

  dispatchState(state, meta = {}) {
    if (this.onStateChange) {
      this.onStateChange(state, meta);
    }
  }
}

export const speechHandler = new SpeechHandler();
