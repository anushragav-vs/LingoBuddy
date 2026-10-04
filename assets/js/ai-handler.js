/**
 * LingoBuddy - AI Logic Layer & Ollama API Connector
 * Integrates local OpenAI-compatible endpoint (Ollama on localhost:11434)
 * with robust JSON schema parsing and an intelligent zero-delay fallback engine.
 */

import { SCENARIOS } from './scenarios.js';

export class AIHandler {
  constructor(storageInstance) {
    this.storage = storageInstance;
  }

  getConfig() {
    const settings = this.storage.getSettings();
    const profile = this.storage.getProfile();
    return {
      endpoint: settings.ollamaUrl || 'http://localhost:11434/v1/chat/completions',
      model: settings.ollamaModel || 'qwen2.5:latest',
      temperature: settings.temperature || 0.7,
      personaTone: settings.personaTone || 'gentle_tutor',
      preferLocalFallback: settings.preferLocalFallback || false,
      targetLanguage: profile.targetLanguage || 'es-ES'
    };
  }

  /**
   * Test connection to the local Ollama instance
   * @returns {Promise<{success: boolean, latencyMs: number, message: string}>}
   */
  async testConnection() {
    const config = this.getConfig();
    const startTime = performance.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      // Probe Ollama tags or model list
      const baseUrl = config.endpoint.replace(/\/v1\/chat\/completions\/?$/, '');
      const testUrl = baseUrl.endsWith('/api') ? `${baseUrl}/tags` : `${baseUrl}/api/tags`;

      const response = await fetch(testUrl, {
        method: 'GET',
        signal: controller.signal
      }).catch(async () => {
        // Fallback probe to root
        return await fetch(baseUrl, { method: 'GET', signal: controller.signal });
      });

      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);

      if (response && (response.ok || response.status === 200 || response.status === 404)) {
        return {
          success: true,
          latencyMs,
          message: `Ollama is active! Responded in ${latencyMs}ms.`
        };
      } else {
        return {
          success: false,
          latencyMs,
          message: `Endpoint returned HTTP ${response.status}. Verify that Ollama is running.`
        };
      }
    } catch (e) {
      const latencyMs = Math.round(performance.now() - startTime);
      return {
        success: false,
        latencyMs,
        message: 'Could not connect to Ollama on localhost:11434. (Autonomous fallback is active).'
      };
    }
  }

  /**
   * Generates conversation reply with Anxiety Shield metadata
   */
  async generateResponse(scenarioId, userMessage, conversationHistory = []) {
    const config = this.getConfig();

    if (config.preferLocalFallback) {
      return this.generateAutonomousFallback(scenarioId, userMessage, conversationHistory);
    }

    try {
      const response = await this.callOllamaApi(scenarioId, userMessage, conversationHistory, config);
      return {
        ...response,
        source: 'ollama'
      };
    } catch (err) {
      console.warn('[AIHandler] Ollama unavailable or encountered error, switching to smart fallback:', err.message);
      const fallbackResult = this.generateAutonomousFallback(scenarioId, userMessage, conversationHistory);
      return {
        ...fallbackResult,
        source: 'fallback',
        notice: 'Using built-in autonomous simulation (Ollama offline)'
      };
    }
  }

  async callOllamaApi(scenarioId, userMessage, conversationHistory, config) {
    const scenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
    const systemPrompt = this.buildSystemPrompt(scenario, config);

    // Format chat messages
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    // Include recent turns for contextual continuity
    const recentHistory = conversationHistory.slice(-6);
    recentHistory.forEach(msg => {
      messages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    });

    messages.push({ role: 'user', content: userMessage });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9-second timeout

    const res = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        messages: messages,
        temperature: config.temperature,
        stream: false,
        response_format: { type: 'json_object' }
      })
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Ollama returned status ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content || '{}';
    return this.parseStructuredAIResponse(rawContent, scenario, config);
  }

  buildSystemPrompt(scenario, config) {
    return `You are "${scenario.role}" in an anxiety-free foreign language conversation simulator for a learner.
Scenario: ${scenario.title}.
Setting: ${scenario.location}.
Target Language: ${config.targetLanguage}.
Tone: ${config.personaTone.replace('_', ' ')}. Be warm, supportive, patient, and speak naturally like a native speaker.

RULES FOR OUTPUT:
1. Always respond in ${config.targetLanguage}.
2. Keep your spoken reply conversational, friendly, and brief (1-2 sentences maximum).
3. Do not overwhelm the user.
4. Output MUST BE strictly valid JSON matching this schema:
{
  "reply": "Spoken sentence in ${config.targetLanguage}",
  "translation": "Natural English translation of your reply",
  "grammarTip": "1 concise sentence explaining a useful grammar pattern, verb conjugation, or polite phrase used",
  "vocabHighlight": ["keyword 1 (English)", "keyword 2 (English)"],
  "suggestedReplies": [
    "Suggested reply option 1 in ${config.targetLanguage}",
    "Suggested reply option 2 in ${config.targetLanguage}",
    "Suggested reply option 3 in ${config.targetLanguage}"
  ]
}`;
  }

  parseStructuredAIResponse(rawContent, scenario, config) {
    let parsed = null;
    try {
      // Clean possible markdown code fences
      const cleaned = rawContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.warn('[AIHandler] Could not parse raw JSON from Ollama, extracting regex matches:', e);
      parsed = {
        reply: rawContent.slice(0, 160),
        translation: 'Understanding in progress...',
        grammarTip: 'Focus on clear pronunciation and key phrases.',
        suggestedReplies: ['Gracias', 'Por favor', 'De acuerdo']
      };
    }

    if (!parsed.reply) {
      throw new Error('Empty reply in AI response');
    }

    return {
      reply: parsed.reply,
      translation: parsed.translation || 'Natural English translation available.',
      grammarTip: parsed.grammarTip || 'Everyday conversational phrase structure.',
      vocabHighlight: parsed.vocabHighlight || [],
      suggestedReplies: (parsed.suggestedReplies && parsed.suggestedReplies.length >= 2)
        ? parsed.suggestedReplies.slice(0, 3)
        : ['De acuerdo', 'Muchas gracias', '¿Puedes repetir?']
    };
  }

  /**
   * Autonomous smart fallback when Ollama is offline.
   * Matches keywords in user's prompt or picks logical scenario progression.
   */
  generateAutonomousFallback(scenarioId, userMessage, conversationHistory = []) {
    const config = this.getConfig();
    const scenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
    const langContent = scenario.content[config.targetLanguage] || scenario.content['es-ES'];
    const userLower = (userMessage || '').toLowerCase();

    // 1. Check knowledge base triggers
    if (langContent && langContent.knowledgeBase) {
      for (const item of langContent.knowledgeBase) {
        const matches = item.triggers.some(t => userLower.includes(t.toLowerCase()));
        if (matches) {
          return {
            reply: item.response,
            translation: item.translation,
            grammarTip: item.grammar,
            vocabHighlight: item.vocab || [],
            suggestedReplies: item.suggestedReplies
          };
        }
      }
    }

    // 2. Adaptive fallback if no exact trigger matched
    const fallbacksByLang = {
      'es-ES': {
        reply: '¡Te entiendo perfectamente! Me parece una excelente idea. ¿Quieres continuar con esto o te gustaría preguntar algo más?',
        translation: 'I understand you perfectly! Sounds like an excellent idea to me. Do you want to continue with this or would you like to ask something else?',
        grammarTip: '"Me parece..." is an idiomatic construction used to express personal perspective or agreement.',
        vocabHighlight: ['Perfectamente (perfectfully)', 'Continuar (to continue)', 'Preguntar (to ask)'],
        suggestedReplies: [
          'Me gustaría saber más sobre esto.',
          '¿Podrías recomendarme algo?',
          'Sí, está muy bien. ¡Muchas gracias!'
        ]
      },
      'fr-FR': {
        reply: 'C\'est très bien dit ! Je vous comprends tout à fait. Souhaitez-vous continuer ou avez-vous une autre question ?',
        translation: 'That is very well said! I understand you completely. Would you like to continue or do you have another question?',
        grammarTip: '"Souhaitez-vous..." is a courteous inversion polite question using "souhaiter" (to wish/desire).',
        vocabHighlight: ['Tout à fait (completely)', 'Continuer (to continue)', 'Autre (other)'],
        suggestedReplies: [
          'J\'aimerais en savoir plus, s\'il vous plaît.',
          'Avez-vous une recommandation ?',
          'Merci beaucoup pour votre aide !'
        ]
      },
      'de-DE': {
        reply: 'Das klingt wunderbar und ich verstehe Sie gut! Möchten Sie so weitermachen oder haben Sie noch eine Frage?',
        translation: 'That sounds wonderful and I understand you well! Would you like to proceed like this or do you have another question?',
        grammarTip: '"Weitermachen" is a separable verb meaning "to carry on / continue".',
        vocabHighlight: ['Wunderbar (wonderful)', 'Frage (question)', 'Weitermachen (to continue)'],
        suggestedReplies: [
          'Ich möchte gern mehr darüber erfahren.',
          'Können Sie mir etwas empfehlen?',
          'Vielen Dank, das reicht mir schon.'
        ]
      },
      'it-IT': {
        reply: 'Perfetto, ho capito benissimo! Vuoi andare avanti con questo o preferisci passare a un altro argomento?',
        translation: 'Perfect, I understood very well! Do you want to proceed with this or do you prefer moving to another topic?',
        grammarTip: '"Andare avanti" is an Italian phrasal verb meaning "to move forward / continue".',
        vocabHighlight: ['Capito (understood)', 'Avanti (forward)', 'Argomento (topic)'],
        suggestedReplies: [
          'Vorrei saperne di più, per favore.',
          'Cosa mi consigli tu?',
          'Grazie mille, gentilissimo!'
        ]
      },
      'ja-JP': {
        reply: 'とてもよく分かりました！素晴らしいですね。このまま続けますか、それとも他に質問がありますか？',
        translation: 'I understood very well! Wonderful. Shall we continue like this, or do you have other questions?',
        grammarTip: '"〜てもいいですか" and polite "〜ますか" ensure natural, non-pressuring communication.',
        vocabHighlight: ['分かる (understand)', '続ける (continue)', '質問 (question)'],
        suggestedReplies: [
          'もう少し詳しく教えてください。',
          'おすすめは何ですか？',
          'ありがとうございます！'
        ]
      },
      'zh-CN': {
        reply: '说得非常好，我完全理解你的意思！你想继续这个话题，还是问些别的呢？',
        translation: 'Very well said, I completely understand what you mean! Would you like to continue this topic, or ask about something else?',
        grammarTip: '"说得非常好" uses the structural particle "得" to connect the verb with its descriptive compliment.',
        vocabHighlight: ['完全 (completely)', '话题 (topic)', '理解 (understand)'],
        suggestedReplies: [
          '我想多了解一些细节。',
          '你有什么好的建议吗？',
          '非常感谢你的帮助！'
        ]
      }
    };

    const targetLang = config.targetLanguage;
    return fallbacksByLang[targetLang] || fallbacksByLang['es-ES'];
  }
}
