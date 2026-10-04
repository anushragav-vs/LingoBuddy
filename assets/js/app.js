/**
 * LingoBuddy - Master Application Controller
 * Connects UI, SpeechHandler, AIHandler, and StorageHandler.
 * Powers the hands-free voice loop, Glassmorphism views, and the Anxiety Shield.
 */

import { SCENARIOS, SUPPORTED_LANGUAGES } from './scenarios.js';
import { storage } from './storage-handler.js';
import { speechHandler } from './speech-handler.js';
import { AIHandler } from './ai-handler.js';

class LingoBuddyApp {
  constructor() {
    this.storage = storage;
    this.speech = speechHandler;
    this.ai = new AIHandler(storage);

    this.currentScenario = null;
    this.currentLanguage = this.storage.getProfile().targetLanguage || 'es-ES';
    this.isProcessingAI = false;

    this.initDOMElements();
    this.bindEvents();
    this.setupSpeechCallbacks();
    this.renderDashboard();
    this.syncUIFromStorage();
  }

  initDOMElements() {
    // Views
    this.viewDashboard = document.getElementById('view-dashboard');
    this.viewChat = document.getElementById('view-chat');

    // Header elements
    this.headerLangSelect = document.getElementById('header-lang-select');
    this.toggleSpeechRateBtn = document.getElementById('toggle-speech-rate-btn');
    this.speechRateIcon = document.getElementById('speech-rate-icon');
    this.speechRateLabel = document.getElementById('speech-rate-label');
    this.headerStreakCount = document.getElementById('header-streak-count');
    this.headerAvatar = document.getElementById('header-avatar');
    this.headerUserName = document.getElementById('header-user-name');
    this.heroGreeting = document.getElementById('hero-greeting');
    this.navBrandLogo = document.getElementById('nav-brand-logo');

    // Dashboard metrics
    this.statSentencesCount = document.getElementById('stat-sentences-count');
    this.statStreakCount = document.getElementById('stat-streak-count');
    this.statFluencyScore = document.getElementById('stat-fluency-score');
    this.statFluencyBar = document.getElementById('stat-fluency-bar');
    this.statWordsCount = document.getElementById('stat-words-count');
    this.scenariosGrid = document.getElementById('scenarios-grid');
    this.currentLanguageBadge = document.getElementById('current-language-badge');

    // AI Engine status pill
    this.aiEngineStatusDot = document.getElementById('ai-engine-status-dot');
    this.aiEngineStatusText = document.getElementById('ai-engine-status-text');

    // Chat view elements
    this.btnBackToDashboard = document.getElementById('btn-back-to-dashboard');
    this.btnRestartChat = document.getElementById('btn-restart-chat');
    this.btnShowScenarioGoals = document.getElementById('btn-show-scenario-goals');
    this.chatScenarioIcon = document.getElementById('chat-scenario-icon');
    this.chatScenarioTitle = document.getElementById('chat-scenario-title');
    this.chatPartnerRole = document.getElementById('chat-partner-role');
    this.chatScenarioLocation = document.getElementById('chat-scenario-location');
    this.chatMessagesContainer = document.getElementById('chat-messages-container');

    // Voice & Input dock
    this.voiceStateDot = document.getElementById('voice-state-dot');
    this.voiceStateLabel = document.getElementById('voice-state-label');
    this.speakingWaveBars = document.getElementById('speaking-wave-bars');
    this.btnStopAudio = document.getElementById('btn-stop-audio');
    this.liveTranscriptionPreview = document.getElementById('live-transcription-preview');
    this.liveTranscriptText = document.getElementById('live-transcript-text');
    this.micPulseRing = document.getElementById('mic-pulse-ring');
    this.btnMicToggle = document.getElementById('btn-mic-toggle');
    this.micIconSvg = document.getElementById('mic-icon-svg');
    this.chatTextInput = document.getElementById('chat-text-input');
    this.btnSendMessage = document.getElementById('btn-send-message');

    // Modals
    this.modalSettings = document.getElementById('modal-settings');
    this.btnOpenSettings = document.getElementById('btn-open-settings');
    this.btnCloseSettings = document.getElementById('btn-close-settings');
    this.btnCancelSettings = document.getElementById('btn-cancel-settings');
    this.btnSaveSettings = document.getElementById('btn-save-settings');
    this.btnTestConnection = document.getElementById('btn-test-connection');
    this.testConnectionResult = document.getElementById('test-connection-result');
    this.btnResetAllData = document.getElementById('btn-reset-all-data');
    this.inputOllamaUrl = document.getElementById('input-ollama-url');
    this.inputOllamaModel = document.getElementById('input-ollama-model');
    this.selectPersonaTone = document.getElementById('select-persona-tone');
    this.checkForceFallback = document.getElementById('check-force-fallback');

    this.modalProfile = document.getElementById('modal-profile');
    this.btnOpenProfile = document.getElementById('btn-open-profile');
    this.btnCloseProfile = document.getElementById('btn-close-profile');
    this.btnSaveProfile = document.getElementById('btn-save-profile');
    this.inputProfileName = document.getElementById('input-profile-name');
    this.avatarPickerGrid = document.getElementById('avatar-picker-grid');

    this.modalScenarioGoals = document.getElementById('modal-scenario-goals');
    this.btnCloseScenarioGoals = document.getElementById('btn-close-scenario-goals');
    this.btnAckGoals = document.getElementById('btn-ack-goals');
    this.scenarioGoalsList = document.getElementById('scenario-goals-list');
  }

  bindEvents() {
    // Navigation
    this.navBrandLogo.addEventListener('click', () => this.showDashboardView());
    this.btnBackToDashboard.addEventListener('click', () => this.showDashboardView());

    // Language change
    this.headerLangSelect.addEventListener('change', (e) => {
      this.switchLanguage(e.target.value);
    });

    // Speech rate speed toggle
    this.toggleSpeechRateBtn.addEventListener('click', () => {
      this.cycleSpeechRate();
    });

    // Mic Button
    this.btnMicToggle.addEventListener('click', () => {
      this.toggleMic();
    });

    // Stop audio playback
    this.btnStopAudio.addEventListener('click', () => {
      this.speech.stopSpeaking();
      this.updateVoiceStatus('IDLE');
    });

    // Send text message
    this.btnSendMessage.addEventListener('click', () => {
      this.handleUserTextSubmit();
    });
    this.chatTextInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleUserTextSubmit();
      }
    });

    // Restart conversation
    this.btnRestartChat.addEventListener('click', () => {
      if (this.currentScenario) {
        if (confirm('Start a fresh conversation for this scenario?')) {
          this.storage.clearScenarioHistory(this.currentScenario.id);
          this.startScenario(this.currentScenario.id);
        }
      }
    });

    // Scenario objectives modal
    this.btnShowScenarioGoals.addEventListener('click', () => this.openScenarioGoalsModal());
    this.btnCloseScenarioGoals.addEventListener('click', () => this.closeScenarioGoalsModal());
    this.btnAckGoals.addEventListener('click', () => this.closeScenarioGoalsModal());

    // Settings Modal
    this.btnOpenSettings.addEventListener('click', () => this.openSettingsModal());
    this.btnCloseSettings.addEventListener('click', () => this.closeSettingsModal());
    this.btnCancelSettings.addEventListener('click', () => this.closeSettingsModal());
    this.btnSaveSettings.addEventListener('click', () => this.saveSettingsModal());
    this.btnTestConnection.addEventListener('click', () => this.testOllamaConnection());
    this.btnResetAllData.addEventListener('click', () => this.handleResetData());

    // Profile Modal
    this.btnOpenProfile.addEventListener('click', () => this.openProfileModal());
    this.btnCloseProfile.addEventListener('click', () => this.closeProfileModal());
    this.btnSaveProfile.addEventListener('click', () => this.saveProfileModal());
    this.avatarPickerGrid.querySelectorAll('.avatar-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.avatarPickerGrid.querySelectorAll('.avatar-option').forEach(b => {
          b.classList.remove('border-cyan-400', 'bg-slate-800');
          b.classList.add('bg-slate-900', 'border-white/10');
        });
        const selected = e.currentTarget;
        selected.classList.remove('bg-slate-900', 'border-white/10');
        selected.classList.add('border-cyan-400', 'bg-slate-800');
        this.selectedAvatarEmoji = selected.dataset.avatar;
      });
    });

    // Global keyboard listener for modal dismissal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSettingsModal();
        this.closeProfileModal();
        this.closeScenarioGoalsModal();
      }
    });
  }

  setupSpeechCallbacks() {
    this.speech.onStateChange = (state, meta) => {
      this.updateVoiceStatus(state, meta);
    };

    this.speech.onInterimTranscript = (text) => {
      this.liveTranscriptionPreview.classList.remove('hidden');
      this.liveTranscriptText.textContent = text;
    };

    this.speech.onFinalTranscript = (finalText) => {
      this.liveTranscriptionPreview.classList.add('hidden');
      if (finalText && finalText.trim().length > 0) {
        this.chatTextInput.value = finalText.trim();
        this.handleUserTextSubmit(true);
      }
    };

    this.speech.onError = (errorKey, friendlyMsg) => {
      this.showToast(friendlyMsg, 'warning');
    };
  }

  // --- Voice Status UI Controllers ---
  updateVoiceStatus(state, meta = {}) {
    // Reset base styles
    this.micPulseRing.classList.add('hidden');
    this.btnMicToggle.classList.remove('from-amber-500', 'to-rose-500', 'from-cyan-500', 'to-blue-500');
    this.btnMicToggle.classList.add('from-emerald-500', 'to-cyan-500');
    this.speakingWaveBars.classList.add('hidden');
    this.speakingWaveBars.classList.remove('flex');
    this.btnStopAudio.classList.add('hidden');

    switch (state) {
      case 'LISTENING':
        this.voiceStateDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse';
        this.voiceStateLabel.textContent = 'Listening... Speak in ' + this.getLanguageObj().name;
        this.voiceStateLabel.className = 'font-semibold text-emerald-400';
        this.micPulseRing.classList.remove('hidden');
        break;

      case 'PROCESSING':
        this.voiceStateDot.className = 'w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping';
        this.voiceStateLabel.textContent = 'Thinking / Generating response...';
        this.voiceStateLabel.className = 'font-semibold text-cyan-300';
        break;

      case 'SPEAKING':
        this.voiceStateDot.className = 'w-2.5 h-2.5 rounded-full bg-cyan-400';
        this.voiceStateLabel.textContent = 'Speaking audio...';
        this.voiceStateLabel.className = 'font-medium text-cyan-300';
        this.speakingWaveBars.classList.remove('hidden');
        this.speakingWaveBars.classList.add('flex');
        this.btnStopAudio.classList.remove('hidden');
        break;

      case 'ERROR':
        this.voiceStateDot.className = 'w-2.5 h-2.5 rounded-full bg-rose-500';
        this.voiceStateLabel.textContent = meta.message || 'Microphone error';
        this.voiceStateLabel.className = 'font-medium text-rose-400';
        break;

      case 'IDLE':
      default:
        this.voiceStateDot.className = 'w-2.5 h-2.5 rounded-full bg-slate-500';
        this.voiceStateLabel.textContent = 'Microphone Ready — Tap to speak';
        this.voiceStateLabel.className = 'font-medium text-slate-400';
        this.liveTranscriptionPreview.classList.add('hidden');
        break;
    }
  }

  toggleMic() {
    if (this.speech.isListening) {
      this.speech.stopListening();
      this.updateVoiceStatus('IDLE');
    } else {
      this.speech.startListening();
    }
  }

  cycleSpeechRate() {
    const rates = [0.75, 0.85, 1.0];
    const current = this.speech.speechRate;
    let nextIndex = rates.findIndex(r => Math.abs(r - current) < 0.05) + 1;
    if (nextIndex >= rates.length) nextIndex = 0;
    const nextRate = rates[nextIndex];

    this.speech.setSpeechRate(nextRate);
    this.storage.updateProfile({ speechRate: nextRate });

    this.speechRateLabel.textContent = `${nextRate}x`;
    if (nextRate <= 0.75) {
      this.speechRateIcon.textContent = '🐢';
      this.showToast('Audio speed set to 0.75x (Gentle slow mode)', 'info');
    } else if (nextRate <= 0.85) {
      this.speechRateIcon.textContent = '🚶';
      this.showToast('Audio speed set to 0.85x (Relaxed pace)', 'info');
    } else {
      this.speechRateIcon.textContent = '⚡';
      this.showToast('Audio speed set to 1.0x (Normal pace)', 'info');
    }
  }

  // --- Language Switching ---
  switchLanguage(langCode) {
    this.currentLanguage = langCode;
    this.storage.updateProfile({ targetLanguage: langCode });
    this.speech.setLanguage(langCode);

    const langObj = this.getLanguageObj();
    this.currentLanguageBadge.textContent = `${langObj.flag} ${langObj.name} Mode`;
    this.chatTextInput.placeholder = `Speak or type in ${langObj.name}...`;

    this.renderDashboard();
    this.showToast(`Switched conversation to ${langObj.name} ${langObj.flag}`, 'success');

    // If chat is open, restart with opening line in new language
    if (this.currentScenario && !this.viewChat.classList.contains('hidden')) {
      this.startScenario(this.currentScenario.id);
    }
  }

  getLanguageObj() {
    return SUPPORTED_LANGUAGES.find(l => l.code === this.currentLanguage) || SUPPORTED_LANGUAGES[0];
  }

  // --- Dashboard Rendering ---
  renderDashboard() {
    const langObj = this.getLanguageObj();
    this.scenariosGrid.innerHTML = '';

    SCENARIOS.forEach(scenario => {
      const langContent = scenario.content[this.currentLanguage] || scenario.content['es-ES'];
      const card = document.createElement('div');
      card.className = 'rounded-3xl glass-card p-6 border border-white/10 flex flex-col justify-between group cursor-pointer hover:border-cyan-400/40';

      const diffColorClass = scenario.difficultyColor === 'emerald' 
        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
        : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-3xl p-2.5 rounded-2xl bg-slate-800/80 border border-white/10 group-hover:scale-110 transition-transform">${scenario.icon}</span>
            <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${diffColorClass}">
              ${scenario.difficulty}
            </span>
          </div>

          <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
            ${scenario.title}
          </h3>
          
          <p class="text-xs text-slate-300 mb-3 leading-relaxed">
            ${scenario.description}
          </p>

          <div class="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
            <span class="text-cyan-400">👤 Role:</span>
            <span class="text-slate-200 font-medium">${scenario.role}</span>
          </div>

          <!-- Opener Preview -->
          <div class="p-3 rounded-2xl bg-slate-900/70 border border-white/5 text-xs text-slate-300 italic mb-4">
            "${langContent ? langContent.opener.slice(0, 75) + '...' : ''}"
          </div>
        </div>

        <button class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-emerald-500/15 flex items-center justify-center gap-2 group-hover:shadow-cyan-500/25 transition">
          <span>Start Conversation</span>
          <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      `;

      card.addEventListener('click', () => {
        this.startScenario(scenario.id);
      });

      this.scenariosGrid.appendChild(card);
    });
  }

  // --- Scenario Execution & Chat Flow ---
  startScenario(scenarioId) {
    const scenario = SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    this.currentScenario = scenario;
    this.speech.setLanguage(this.currentLanguage);

    // Update Chat Header
    this.chatScenarioIcon.textContent = scenario.icon;
    this.chatScenarioTitle.textContent = scenario.title;
    this.chatPartnerRole.textContent = scenario.role;
    this.chatScenarioLocation.textContent = scenario.location;
    this.chatTextInput.placeholder = `Speak or reply in ${this.getLanguageObj().name}...`;

    // Switch view
    this.showChatView();

    // Check existing history
    const history = this.storage.getScenarioHistory(scenario.id);
    this.chatMessagesContainer.innerHTML = '';

    if (history.length > 0) {
      history.forEach(msg => this.renderMessageBubble(msg));
      this.scrollToBottom();
    } else {
      // Seed with Opening AI message
      const langContent = scenario.content[this.currentLanguage] || scenario.content['es-ES'];
      const initialAIMsg = {
        sender: 'ai',
        role: scenario.role,
        text: langContent.opener,
        translation: langContent.openerTranslation,
        grammarTip: langContent.openerGrammar,
        vocabHighlight: langContent.openerVocab || [],
        suggestedReplies: langContent.suggestedReplies || []
      };

      const record = this.storage.appendMessage(scenario.id, initialAIMsg);
      this.renderMessageBubble(record);

      // Play introductory audio
      setTimeout(() => {
        this.speech.speak(langContent.opener);
      }, 400);
    }
  }

  showChatView() {
    this.viewDashboard.classList.add('hidden');
    this.viewChat.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showDashboardView() {
    this.speech.stopSpeaking();
    this.speech.stopListening();
    this.viewChat.classList.add('hidden');
    this.viewDashboard.classList.remove('hidden');
    this.syncUIFromStorage();
  }

  // --- Message Bubble Rendering ---
  renderMessageBubble(msg) {
    const isUser = msg.sender === 'user';
    const bubbleWrapper = document.createElement('div');
    bubbleWrapper.className = `flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full sm:max-w-[85%]`;

    if (isUser) {
      // User Bubble
      const profile = this.storage.getProfile();
      bubbleWrapper.innerHTML = `
        <div class="flex items-center gap-1.5 text-xs text-slate-400 mb-1 mr-1">
          <span class="font-semibold text-slate-300">${profile.name}</span>
          <span>${profile.avatar}</span>
          <span class="text-[10px] text-slate-500">${this.formatTimestamp(msg.timestamp)}</span>
        </div>
        <div class="rounded-2xl rounded-tr-none px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs sm:text-sm font-medium shadow-md shadow-emerald-950/40 relative group">
          <p class="leading-relaxed">${this.escapeHTML(msg.text)}</p>
          <button class="btn-replay-audio absolute -left-8 top-2 p-1 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition" title="Listen to pronunciation">
            🔊
          </button>
        </div>
      `;

      // Audio replay
      const replayBtn = bubbleWrapper.querySelector('.btn-replay-audio');
      if (replayBtn) {
        replayBtn.addEventListener('click', () => this.speech.speak(msg.text));
      }

    } else {
      // AI Bubble with Anxiety Shield
      const uniqueId = 'shield_' + (msg.id || Math.random().toString(36).substr(2, 6));

      bubbleWrapper.innerHTML = `
        <div class="flex items-center gap-1.5 text-xs text-slate-400 mb-1 ml-1">
          <span class="text-base">${this.currentScenario.icon}</span>
          <span class="font-semibold text-cyan-300">${msg.role || this.currentScenario.role}</span>
          <span class="text-[10px] text-slate-500">${this.formatTimestamp(msg.timestamp)}</span>
        </div>

        <div class="rounded-2xl rounded-tl-none p-4 glass-panel border border-white/10 text-slate-100 text-xs sm:text-sm shadow-md relative w-full">
          
          <div class="flex items-start justify-between gap-3">
            <p class="leading-relaxed font-normal text-slate-100">${this.escapeHTML(msg.text)}</p>
            
            <div class="flex items-center gap-1 shrink-0">
              <!-- Replay voice button -->
              <button class="btn-replay-audio p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition" title="Listen to natural pronunciation">
                🔊
              </button>
              
              <!-- Anxiety Shield [?] Button -->
              <button class="btn-toggle-shield px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs transition flex items-center gap-1 shadow-sm" title="Anxiety Shield: Reveal translation and grammar tips">
                <span>[?]</span>
                <span class="text-[10px] hidden sm:inline font-semibold">Hint</span>
              </button>
            </div>
          </div>

          <!-- Inline Anxiety Shield Card (Hidden by default) -->
          <div id="${uniqueId}" class="anxiety-shield-drawer mt-3 pt-3 border-t border-white/10 text-xs">
            <div class="rounded-xl p-3.5 bg-slate-950/70 border border-cyan-500/25 space-y-2.5">
              
              <!-- English Translation -->
              <div>
                <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">English Translation</span>
                <p class="text-slate-200 text-xs italic font-medium leading-relaxed">
                  "${this.escapeHTML(msg.translation || 'Natural translation unavailable')}"
                </p>
              </div>

              <!-- Grammar Tip -->
              ${msg.grammarTip ? `
              <div>
                <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">Grammar Insight</span>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  💡 ${this.escapeHTML(msg.grammarTip)}
                </p>
              </div>
              ` : ''}

              <!-- Vocabulary Breakdown -->
              ${msg.vocabHighlight && msg.vocabHighlight.length > 0 ? `
              <div>
                <span class="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Vocabulary Spotlight</span>
                <div class="flex flex-wrap gap-1.5">
                  ${msg.vocabHighlight.map(v => `<span class="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-mono">${this.escapeHTML(v)}</span>`).join('')}
                </div>
              </div>
              ` : ''}

              <!-- Suggested Safe Replies -->
              ${msg.suggestedReplies && msg.suggestedReplies.length > 0 ? `
              <div>
                <span class="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">Suggested Quick Replies</span>
                <div class="flex flex-col gap-1.5">
                  ${msg.suggestedReplies.map(reply => `
                    <button class="suggested-reply-btn text-left px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/50 hover:border-cyan-400/50 border border-white/10 text-slate-200 text-xs font-medium transition flex items-center justify-between group">
                      <span>${this.escapeHTML(reply)}</span>
                      <span class="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition">Tap to use ↵</span>
                    </button>
                  `).join('')}
                </div>
              </div>
              ` : ''}

            </div>
          </div>

        </div>
      `;

      // Wire replay button
      const replayBtn = bubbleWrapper.querySelector('.btn-replay-audio');
      replayBtn.addEventListener('click', () => this.speech.speak(msg.text));

      // Wire Anxiety Shield toggle
      const shieldDrawer = bubbleWrapper.querySelector(`#${uniqueId}`);
      const toggleShieldBtn = bubbleWrapper.querySelector('.btn-toggle-shield');
      toggleShieldBtn.addEventListener('click', () => {
        const isOpen = shieldDrawer.classList.contains('open');
        if (isOpen) {
          shieldDrawer.classList.remove('open');
          toggleShieldBtn.classList.remove('bg-cyan-500', 'text-white');
          toggleShieldBtn.classList.add('bg-cyan-500/20', 'text-cyan-300');
        } else {
          shieldDrawer.classList.add('open');
          toggleShieldBtn.classList.remove('bg-cyan-500/20', 'text-cyan-300');
          toggleShieldBtn.classList.add('bg-cyan-500', 'text-white');
          this.scrollToBottom();
        }
      });

      // Wire suggested reply buttons
      const replyButtons = bubbleWrapper.querySelectorAll('.suggested-reply-btn');
      replyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const text = btn.querySelector('span').textContent;
          this.chatTextInput.value = text;
          this.chatTextInput.focus();
        });
      });
    }

    this.chatMessagesContainer.appendChild(bubbleWrapper);
  }

  // --- Submitting User Speech / Text ---
  async handleUserTextSubmit(wasSpoken = false) {
    if (this.isProcessingAI || !this.currentScenario) return;

    const text = this.chatTextInput.value.trim();
    if (!text) return;

    this.chatTextInput.value = '';
    this.speech.stopListening();

    // 1. Append user message to storage & UI
    const userMsg = {
      sender: 'user',
      text: text,
      wasSpoken: wasSpoken
    };
    const record = this.storage.appendMessage(this.currentScenario.id, userMsg);
    this.renderMessageBubble(record);
    this.scrollToBottom();

    // 2. Update stats
    this.storage.recordSentenceSpoken(this.currentScenario.id, text);
    this.syncUIFromStorage();

    // 3. Trigger AI inference
    this.isProcessingAI = true;
    this.updateVoiceStatus('PROCESSING');

    // Visual placeholder while thinking
    const thinkingBubble = this.createThinkingBubble();
    this.chatMessagesContainer.appendChild(thinkingBubble);
    this.scrollToBottom();

    try {
      const history = this.storage.getScenarioHistory(this.currentScenario.id);
      const aiResponse = await this.ai.generateResponse(this.currentScenario.id, text, history);

      thinkingBubble.remove();

      const aiRecord = this.storage.appendMessage(this.currentScenario.id, {
        sender: 'ai',
        role: this.currentScenario.role,
        text: aiResponse.reply,
        translation: aiResponse.translation,
        grammarTip: aiResponse.grammarTip,
        vocabHighlight: aiResponse.vocabHighlight,
        suggestedReplies: aiResponse.suggestedReplies
      });

      this.renderMessageBubble(aiRecord);
      this.scrollToBottom();

      // Play audio response
      this.speech.speak(aiResponse.reply, () => {
        // If sound finishes and auto-mic is enabled, can restart listening
      });

    } catch (err) {
      console.error('[LingoBuddy] AI processing error:', err);
      thinkingBubble.remove();
      this.showToast('Could not generate AI reply. Please check your connection.', 'error');
      this.updateVoiceStatus('IDLE');
    } finally {
      this.isProcessingAI = false;
    }
  }

  createThinkingBubble() {
    const div = document.createElement('div');
    div.className = 'flex items-center gap-2 p-3 rounded-2xl glass-panel border border-white/10 text-xs text-cyan-300 w-fit animate-pulse';
    div.innerHTML = `
      <div class="w-3 h-3 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
      <span>${this.currentScenario.role} is thinking...</span>
    `;
    return div;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
    }, 50);
  }

  // --- Synchronization with LocalStorage ---
  syncUIFromStorage() {
    const profile = this.storage.getProfile();
    const stats = this.storage.getStats();

    // Profile & Header
    this.headerUserName.textContent = profile.name;
    this.headerAvatar.textContent = profile.avatar;
    this.heroGreeting.textContent = `Welcome back, ${profile.name}!`;
    this.headerStreakCount.textContent = stats.currentStreak || 1;
    this.headerLangSelect.value = profile.targetLanguage || 'es-ES';
    this.currentLanguage = profile.targetLanguage || 'es-ES';

    // Stats board
    this.statSentencesCount.textContent = stats.totalSentencesSpoken;
    this.statStreakCount.textContent = `${stats.currentStreak} Day${stats.currentStreak > 1 ? 's' : ''}`;
    this.statFluencyScore.textContent = `${stats.fluencyScore}%`;
    this.statFluencyBar.style.width = `${stats.fluencyScore}%`;
    this.statWordsCount.textContent = stats.wordsLearned ? stats.wordsLearned.length : 0;

    // Speech rate
    const currentRate = profile.speechRate || 0.85;
    this.speech.setSpeechRate(currentRate);
    this.speechRateLabel.textContent = `${currentRate}x`;
    this.speechRateIcon.textContent = currentRate <= 0.75 ? '🐢' : (currentRate <= 0.85 ? '🚶' : '⚡');

    // Language badge
    const langObj = this.getLanguageObj();
    this.currentLanguageBadge.textContent = `${langObj.flag} ${langObj.name} Mode`;
  }

  // --- Modals Management ---
  openSettingsModal() {
    const settings = this.storage.getSettings();
    this.inputOllamaUrl.value = settings.ollamaUrl;
    this.inputOllamaModel.value = settings.ollamaModel;
    this.selectPersonaTone.value = settings.personaTone;
    this.checkForceFallback.checked = !!settings.preferLocalFallback;
    this.testConnectionResult.textContent = 'Click test to verify localhost:11434 status.';
    this.testConnectionResult.className = 'text-xs text-slate-400 italic';
    this.modalSettings.classList.remove('hidden');
  }

  closeSettingsModal() {
    this.modalSettings.classList.add('hidden');
  }

  saveSettingsModal() {
    this.storage.updateSettings({
      ollamaUrl: this.inputOllamaUrl.value.trim(),
      ollamaModel: this.inputOllamaModel.value.trim(),
      personaTone: this.selectPersonaTone.value,
      preferLocalFallback: this.checkForceFallback.checked
    });
    this.closeSettingsModal();
    this.showToast('Settings saved successfully!', 'success');
  }

  async testOllamaConnection() {
    this.testConnectionResult.textContent = 'Pinging Ollama endpoint...';
    this.testConnectionResult.className = 'text-xs text-cyan-300 font-semibold';
    const result = await this.ai.testConnection();
    if (result.success) {
      this.testConnectionResult.textContent = `🟢 ${result.message}`;
      this.testConnectionResult.className = 'text-xs text-emerald-400 font-bold';
      this.aiEngineStatusDot.className = 'w-2 h-2 rounded-full bg-emerald-400';
      this.aiEngineStatusText.textContent = 'Local Ollama Connected';
    } else {
      this.testConnectionResult.textContent = `🟠 ${result.message}`;
      this.testConnectionResult.className = 'text-xs text-amber-300';
      this.aiEngineStatusDot.className = 'w-2 h-2 rounded-full bg-amber-400';
      this.aiEngineStatusText.textContent = 'Autonomous Fallback Active';
    }
  }

  handleResetData() {
    if (confirm('Are you sure you want to reset all progress, streaks, and conversation history? This cannot be undone.')) {
      this.storage.resetAllData();
      this.syncUIFromStorage();
      this.closeSettingsModal();
      this.showToast('All progress reset to zero.', 'info');
      this.showDashboardView();
    }
  }

  openProfileModal() {
    const profile = this.storage.getProfile();
    this.inputProfileName.value = profile.name;
    this.selectedAvatarEmoji = profile.avatar;
    this.modalProfile.classList.remove('hidden');
  }

  closeProfileModal() {
    this.modalProfile.classList.add('hidden');
  }

  saveProfileModal() {
    const name = this.inputProfileName.value.trim() || 'Alex';
    this.storage.updateProfile({
      name: name,
      avatar: this.selectedAvatarEmoji || '🌱'
    });
    this.closeProfileModal();
    this.syncUIFromStorage();
    this.showToast('Profile updated!', 'success');
  }

  openScenarioGoalsModal() {
    if (!this.currentScenario) return;
    this.scenarioGoalsList.innerHTML = '';
    this.currentScenario.objectives.forEach(obj => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-white/5';
      li.innerHTML = `<span class="text-emerald-400">✓</span> <span>${this.escapeHTML(obj)}</span>`;
      this.scenarioGoalsList.appendChild(li);
    });
    this.modalScenarioGoals.classList.remove('hidden');
  }

  closeScenarioGoalsModal() {
    this.modalScenarioGoals.classList.add('hidden');
  }

  // --- Utilities ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-item px-4 py-3 rounded-2xl glass-panel border shadow-xl flex items-center gap-3 text-xs sm:text-sm max-w-sm';

    let icon = 'ℹ️';
    let borderColor = 'border-white/10';

    if (type === 'success') {
      icon = '✅';
      borderColor = 'border-emerald-500/40 text-emerald-300';
    } else if (type === 'warning') {
      icon = '⚠️';
      borderColor = 'border-amber-500/40 text-amber-300';
    } else if (type === 'error') {
      icon = '❌';
      borderColor = 'border-rose-500/40 text-rose-300';
    }

    toast.classList.add(...borderColor.split(' '));
    toast.innerHTML = `
      <span class="text-base">${icon}</span>
      <span class="font-medium text-slate-100 flex-1">${this.escapeHTML(message)}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  formatTimestamp(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.lingoBuddyApp = new LingoBuddyApp();
});
