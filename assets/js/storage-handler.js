/**
 * LingoBuddy - Local Storage & State Persistence Engine
 * Manages user profile, active streak calculations, fluency scores,
 * conversation transcripts, and Ollama connection parameters.
 */

const STORAGE_KEYS = {
  PROFILE: 'lingobuddy_user_profile',
  STATS: 'lingobuddy_stats',
  SETTINGS: 'lingobuddy_settings',
  CHAT_HISTORY: 'lingobuddy_chat_history'
};

const DEFAULT_PROFILE = {
  name: 'Alex',
  avatar: '🌱',
  nativeLanguage: 'en-US',
  targetLanguage: 'es-ES',
  speechRate: 0.85, // Friendly slower default for anxiety-free listening
  soundEnabled: true,
  autoMicContinue: false
};

const DEFAULT_STATS = {
  totalSentencesSpoken: 0,
  currentStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  fluencyScore: 42, // Starting confidence metric
  scenariosCompleted: {},
  wordsLearned: ['hola', 'gracias', 'por favor', 'bienvenido']
};

const DEFAULT_SETTINGS = {
  ollamaUrl: 'http://localhost:11434/v1/chat/completions',
  ollamaModel: 'qwen2.5:latest',
  temperature: 0.7,
  personaTone: 'gentle_tutor', // gentle_tutor, friendly_native, lively_local
  preferLocalFallback: false
};

export class StorageHandler {
  constructor() {
    this.profile = this.load(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    this.stats = this.load(STORAGE_KEYS.STATS, DEFAULT_STATS);
    this.settings = this.load(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    this.chatHistory = this.load(STORAGE_KEYS.CHAT_HISTORY, {});
    this.checkAndUpdateStreak();
  }

  load(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return { ...fallback, ...JSON.parse(item) };
    } catch (e) {
      console.warn(`[StorageHandler] Failed to read ${key} from localStorage, using fallback:`, e);
      return fallback;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('lingobuddy:storage-updated', { detail: { key, data } }));
    } catch (e) {
      console.error(`[StorageHandler] Failed to write ${key} to localStorage:`, e);
    }
  }

  // --- Profile Methods ---
  getProfile() {
    return { ...this.profile };
  }

  updateProfile(updates) {
    this.profile = { ...this.profile, ...updates };
    this.save(STORAGE_KEYS.PROFILE, this.profile);
    return this.profile;
  }

  // --- Streak & Progress Methods ---
  checkAndUpdateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.stats.lastActiveDate;

    if (!lastActive) {
      this.stats.lastActiveDate = today;
      this.stats.currentStreak = 1;
      this.save(STORAGE_KEYS.STATS, this.stats);
      return;
    }

    if (lastActive === today) {
      // Already marked today
      return;
    }

    const lastDate = new Date(lastActive);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      this.stats.currentStreak += 1;
    } else if (diffDays > 1) {
      // Streak broken, reset to 1
      this.stats.currentStreak = 1;
    }
    this.stats.lastActiveDate = today;
    this.save(STORAGE_KEYS.STATS, this.stats);
  }

  recordSentenceSpoken(scenarioId, userText) {
    this.stats.totalSentencesSpoken += 1;
    
    // Add new vocabulary tokens
    if (userText && typeof userText === 'string') {
      const words = userText
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'¡¿]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2);
      
      const set = new Set(this.stats.wordsLearned || []);
      words.forEach(w => set.add(w));
      this.stats.wordsLearned = Array.from(set);
    }

    // Fluency score calculation: curve that gracefully climbs with practice
    const baseScore = 40;
    const progressBonus = Math.min(50, Math.floor(this.stats.totalSentencesSpoken * 1.5));
    const streakBonus = Math.min(10, this.stats.currentStreak * 2);
    this.stats.fluencyScore = Math.min(99, baseScore + progressBonus + streakBonus);

    // Track scenario completion counts
    if (scenarioId) {
      this.stats.scenariosCompleted[scenarioId] = (this.stats.scenariosCompleted[scenarioId] || 0) + 1;
    }

    this.checkAndUpdateStreak();
    this.save(STORAGE_KEYS.STATS, this.stats);
    return this.stats;
  }

  getStats() {
    return { ...this.stats };
  }

  // --- Settings Methods ---
  getSettings() {
    return { ...this.settings };
  }

  updateSettings(updates) {
    this.settings = { ...this.settings, ...updates };
    this.save(STORAGE_KEYS.SETTINGS, this.settings);
    return this.settings;
  }

  // --- Chat History Methods ---
  getScenarioHistory(scenarioId) {
    return this.chatHistory[scenarioId] || [];
  }

  appendMessage(scenarioId, messageObj) {
    if (!this.chatHistory[scenarioId]) {
      this.chatHistory[scenarioId] = [];
    }
    const record = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toISOString(),
      ...messageObj
    };
    this.chatHistory[scenarioId].push(record);
    // Keep max 50 recent messages per scenario
    if (this.chatHistory[scenarioId].length > 50) {
      this.chatHistory[scenarioId].shift();
    }
    this.save(STORAGE_KEYS.CHAT_HISTORY, this.chatHistory);
    return record;
  }

  clearScenarioHistory(scenarioId) {
    if (this.chatHistory[scenarioId]) {
      delete this.chatHistory[scenarioId];
      this.save(STORAGE_KEYS.CHAT_HISTORY, this.chatHistory);
    }
  }

  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    this.profile = { ...DEFAULT_PROFILE };
    this.stats = { ...DEFAULT_STATS };
    this.settings = { ...DEFAULT_SETTINGS };
    this.chatHistory = {};
    window.dispatchEvent(new CustomEvent('lingobuddy:storage-updated', { detail: { key: 'ALL' } }));
  }
}

export const storage = new StorageHandler();
