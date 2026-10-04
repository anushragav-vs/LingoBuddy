/**
 * LingoBuddy - Scenarios & Language Knowledge Base
 * Defines conversational contexts, supported languages, localized opening dialogues,
 * grammar breakdowns, and suggested replies for the Anxiety Shield.
 */

export const SUPPORTED_LANGUAGES = [
  {
    code: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    defaultVoiceLang: 'es-ES',
    welcomeMessage: '¡Hola! ¿Listo para practicar español sin estrés?'
  },
  {
    code: 'fr-FR',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    defaultVoiceLang: 'fr-FR',
    welcomeMessage: 'Bonjour ! Prêt à pratiquer le français en toute sérénité ?'
  },
  {
    code: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    defaultVoiceLang: 'de-DE',
    welcomeMessage: 'Hallo! Bereit, ganz entspannt Deutsch zu üben?'
  },
  {
    code: 'it-IT',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    defaultVoiceLang: 'it-IT',
    welcomeMessage: 'Ciao! Pronto a fare conversazione in italiano senza ansia?'
  },
  {
    code: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    defaultVoiceLang: 'ja-JP',
    welcomeMessage: 'こんにちは！リラックスして日本語を話してみましょう。'
  },
  {
    code: 'zh-CN',
    name: 'Mandarin',
    nativeName: '中文',
    flag: '🇨🇳',
    defaultVoiceLang: 'zh-CN',
    welcomeMessage: '你好！让我们轻松练习中文对话吧。'
  }
];

export const SCENARIOS = [
  {
    id: 'coffee-shop',
    title: 'At a Coffee Shop',
    icon: '☕',
    difficulty: 'Beginner',
    difficultyColor: 'emerald',
    description: 'Order your favorite beverage, request plant-based milk, and ask about pastries.',
    role: 'Friendly Barista (Mateo)',
    location: 'Café Luz, Downtown',
    objectives: [
      'Greet the barista politely',
      'Order a drink with a customization (e.g. oat milk, extra hot)',
      'Ask for the price or a pastry',
      'Say thank you and goodbye'
    ],
    content: {
      'es-ES': {
        opener: '¡Hola! Bienvenido a Café Luz. ¿Qué te gustaría tomar hoy?',
        openerTranslation: 'Hello! Welcome to Café Luz. What would you like to have today?',
        openerGrammar: '"¿Qué te gustaría...?" uses the polite conditional form of "gustar", standard for courteous ordering.',
        openerVocab: ['Bienvenido (welcome)', 'Tomar (to drink / to take)', 'Gustaría (would like)'],
        suggestedReplies: [
          'Un café con leche de avena, por favor.',
          '¿Tienen cruasanes o algo para comer?',
          'Solo un espresso doble, gracias.'
        ],
        knowledgeBase: [
          {
            triggers: ['café', 'leche', 'avena', 'americano', 'espresso', 'cappuccino', 'té'],
            response: '¡Excelente elección! ¿Lo prefieres con azúcar o sin azúcar? ¿Y de qué tamaño: pequeño, mediano o grande?',
            translation: 'Excellent choice! Do you prefer it with sugar or sugar-free? And what size: small, medium, or large?',
            grammar: '"¿Lo prefieres...?" utilizes the direct object pronoun "lo" referencing the coffee.',
            vocab: ['Azúcar (sugar)', 'Tamaño (size)', 'Grande (large)'],
            suggestedReplies: [
              'Mediano y sin azúcar, por favor.',
              'Con un poco de azúcar y tamaño grande.',
              '¿Tienen leche vegetal?'
            ]
          },
          {
            triggers: ['tamaño', 'mediano', 'pequeño', 'grande', 'azúcar', 'sin azúcar'],
            response: 'Perfecto. Ya lo estoy preparando. ¿Te apetece probar nuestro croissant recién horneado hoy?',
            translation: 'Perfect. I am preparing it now. Would you care to try our freshly baked croissant today?',
            grammar: '"¿Te apetece...?" is an idiomatic Spanish phrase meaning "Do you feel like / would you care for...".',
            vocab: ['Recién horneado (freshly baked)', 'Apetecer (to feel like/fancy)'],
            suggestedReplies: [
              'Sí, por favor, suena delicioso.',
              'No gracias, solo el café por hoy.',
              '¿Cuánto cuesta en total?'
            ]
          },
          {
            triggers: ['cuánto', 'cuesta', 'precio', 'cuenta', 'pagar', 'tarjeta'],
            response: 'Son 3 euros con cincuenta en total. Puedes pagar con tarjeta o en efectivo. ¡Muchas gracias por tu visita!',
            translation: 'That is 3.50 euros in total. You can pay with card or cash. Thank you so much for your visit!',
            grammar: '"Puedes pagar..." combines the modal verb "poder" with infinitive "pagar".',
            vocab: ['Tarjeta (card)', 'Efectivo (cash)', 'Visita (visit)'],
            suggestedReplies: [
              'Pago con tarjeta, gracias.',
              'Aquí tiene 5 euros.',
              '¡Muchas gracias, que tengas buen día!'
            ]
          }
        ]
      },
      'fr-FR': {
        opener: 'Bonjour ! Bienvenue au Café Bohème. Que puis-je vous servir aujourd\'hui ?',
        openerTranslation: 'Hello! Welcome to Café Bohème. What may I serve you today?',
        openerGrammar: '"Que puis-je..." is an inverted polite question structure with the formal modal "pouvoir".',
        openerVocab: ['Bienvenue (welcome)', 'Servir (to serve)', 'Aujourd\'hui (today)'],
        suggestedReplies: [
          'Un café crème avec du lait d\'avoine, s\'il vous plaît.',
          'Avez-vous des croissants frais ?',
          'Un simple espresso, merci.'
        ],
        knowledgeBase: [
          {
            triggers: ['café', 'crème', 'lait', 'croissant', 'espresso', 'thé'],
            response: 'Très bon choix ! Quelle taille désirez-vous : petit, moyen ou grand ? Et prenez-vous du sucre ?',
            translation: 'Very good choice! What size do you desire: small, medium, or large? And do you take sugar?',
            grammar: '"Désirez-vous" uses formal vous-inversion for polite service interaction.',
            vocab: ['Taille (size)', 'Moyen (medium)', 'Sucre (sugar)'],
            suggestedReplies: [
              'Moyen sans sucre, s\'il vous plaît.',
              'Grand avec un peu de sucre.',
              'Combien cela coûte-t-il ?'
            ]
          }
        ]
      },
      'de-DE': {
        opener: 'Guten Tag! Willkommen im Café Sonnenschein. Was darf ich Ihnen bringen?',
        openerTranslation: 'Good day! Welcome to Café Sonnenschein. What may I bring you?',
        openerGrammar: '"Was darf ich Ihnen bringen?" uses modal "dürfen" (may/allowed) + dative pronoun "Ihnen".',
        openerVocab: ['Willkommen (welcome)', 'Bringen (to bring)', 'Guten Tag (good day)'],
        suggestedReplies: [
          'Einen Cappuccino mit Hafermilch, bitte.',
          'Haben Sie frische Croissants?',
          'Nur einen doppelten Espresso, danke.'
        ],
        knowledgeBase: [
          {
            triggers: ['cappuccino', 'kaffee', 'hafermilch', 'espresso', 'tee', 'croissant'],
            response: 'Sehr gerne! Welche Größe hätten Sie gern: klein, mittel oder groß?',
            translation: 'With pleasure! Which size would you like: small, medium, or large?',
            grammar: '"Hätten Sie gern" is Konjunktiv II (subjunctive) expressing polite request.',
            vocab: ['Größe (size)', 'Mittel (medium)', 'Sehr gerne (with pleasure)'],
            suggestedReplies: [
              'Mittel, bitte.',
              'Groß ohne Zucker, bitte.',
              'Was kostet das zusammen?'
            ]
          }
        ]
      },
      'it-IT': {
        opener: 'Ciao! Benvenuto al Bar Roma. Cosa posso portarti oggi?',
        openerTranslation: 'Hi! Welcome to Bar Roma. What can I bring you today?',
        openerGrammar: '"Cosa posso portarti" combines modal "posso" with infinitive "portare" and indirect pronoun "ti".',
        openerVocab: ['Benvenuto (welcome)', 'Portare (to bring)', 'Oggi (today)'],
        suggestedReplies: [
          'Un cappuccino con latte di soia, per favore.',
          'Avete cornetti caldi?',
          'Un caffè macchiato, grazie.'
        ],
        knowledgeBase: [
          {
            triggers: ['cappuccino', 'caffè', 'cornetto', 'latte', 'macchiato'],
            response: 'Ottima scelta! Vuoi anche qualcosa da mangiare, come un cornetto al pistacchio?',
            translation: 'Great choice! Do you also want something to eat, like a pistachio croissant?',
            grammar: '"Qualcosa da mangiare" is the standard Italian construction for "something to eat".',
            vocab: ['Scelta (choice)', 'Mangiare (to eat)', 'Cornetto (croissant)'],
            suggestedReplies: [
              'Sì, un cornetto al pistacchio, grazie!',
              'No grazie, solo il caffè.',
              'Quant\'è in totale?'
            ]
          }
        ]
      },
      'ja-JP': {
        opener: 'いらっしゃいませ！カフェ・サクラへようこそ。本日は何になさいますか？',
        openerTranslation: 'Welcome! Welcome to Cafe Sakura. What would you like today?',
        openerGrammar: '"何になさいますか" is polite sonkeigo (honorific speech) commonly used by service staff.',
        openerVocab: ['いらっしゃいませ (welcome)', '本日 (today)', 'なさる (honorific form of する)'],
        suggestedReplies: [
          'アイスカフェラテを一つお願いします。',
          'オーツミルクに変更できますか？',
          'おすすめのコーヒーは何ですか？'
        ],
        knowledgeBase: [
          {
            triggers: ['カフェラテ', 'コーヒー', 'ミルク', 'ホット', 'アイス'],
            response: 'かしこまりました。サイズはS、M、Lのどれになさいますか？',
            translation: 'Certainly. Which size would you like: S, M, or L?',
            grammar: '"かしこまりました" is formal keigo affirming customer order comprehension.',
            vocab: ['かしこまりました (understood/certainly)', 'サイズ (size)'],
            suggestedReplies: [
              'Mサイズでお願いします。',
              'Sサイズで、テイクアウトにします。',
              'いくらですか？'
            ]
          }
        ]
      },
      'zh-CN': {
        opener: '您好！欢迎光临日光咖啡馆。今天想喝点什么？',
        openerTranslation: 'Hello! Welcome to Sunlight Cafe. What would you like to drink today?',
        openerGrammar: '"想喝点什么" uses "点" (a little/some) to soften the question and sound friendly.',
        openerVocab: ['欢迎光临 (welcome)', '喝 (drink)', '咖啡 (coffee)'],
        suggestedReplies: [
          '请给我一杯热燕麦拿铁。',
          '有什么新鲜出炉的甜点吗？',
          '一杯美式咖啡，不加糖，谢谢。'
        ],
        knowledgeBase: [
          {
            triggers: ['拿铁', '咖啡', '美式', '燕麦', '茶'],
            response: '好的！请问您需要大杯还是中杯？是在这里喝还是带走？',
            translation: 'Alright! Do you need large or medium size? For here or to go?',
            grammar: '"还是" is used for selective alternative questions ("A or B?").',
            vocab: ['大杯 (large cup)', '带走 (take out)', '在这里 (for here)'],
            suggestedReplies: [
              '在这里喝，中杯，谢谢。',
              '带走，大杯。',
              '总共多少钱？'
            ]
          }
        ]
      }
    }
  },
  {
    id: 'directions',
    title: 'Asking for Directions',
    icon: '🗺️',
    difficulty: 'Beginner',
    difficultyColor: 'emerald',
    description: 'Find your way to the central train station, museum, or historic district.',
    role: 'Helpful Local Resident (Elena)',
    location: 'Cobblestone Street Corner',
    objectives: [
      'Politely stop a passerby',
      'Ask for a landmark (e.g. train station, metro, pharmacy)',
      'Clarify walking distance or turns (left, right, straight ahead)',
      'Thank them warmly'
    ],
    content: {
      'es-ES': {
        opener: '¡Hola! Perdona, te veo mirando el mapa. ¿Estás buscando algún lugar en particular?',
        openerTranslation: 'Hello! Excuse me, I see you looking at the map. Are you looking for a particular place?',
        openerGrammar: '"Perdona" is the informal imperative of "perdonar", often used to address someone warmly on the street.',
        openerVocab: ['Mapa (map)', 'Buscando (searching)', 'Lugar (place)'],
        suggestedReplies: [
          'Disculpe, ¿dónde está la estación de tren más cercana?',
          'Estoy buscando el museo de arte, ¿queda lejos?',
          '¿Cómo puedo llegar a la plaza central desde aquí?'
        ],
        knowledgeBase: [
          {
            triggers: ['estación', 'tren', 'metro', 'plaza', 'museo', 'lejos', 'llegar'],
            response: '¡Ah, es muy fácil! Sigue todo recto por esta calle unos doscientos metros y gira a la derecha en la farmacia. Está justo enfrente.',
            translation: 'Ah, it is very easy! Go straight down this street for about 200 meters and turn right at the pharmacy. It is right opposite.',
            grammar: '"Sigue todo recto" (go straight ahead) and "gira" are standard street navigation imperatives.',
            vocab: ['Todo recto (straight ahead)', 'Gira a la derecha (turn right)', 'Enfrente (opposite)'],
            suggestedReplies: [
              '¿Cuánto tiempo se tarda caminando?',
              'Muchas gracias, ¿está abierto a esta hora?',
              'Entendido, ¡muy amable por tu ayuda!'
            ]
          }
        ]
      },
      'fr-FR': {
        opener: 'Bonjour ! Vous semblez chercher votre chemin. Est-ce que je peux vous renseigner ?',
        openerTranslation: 'Hello! You seem to be looking for your way. Can I give you directions?',
        openerGrammar: '"Renseigner" means to provide information or directions to someone.',
        openerVocab: ['Chemin (path/way)', 'Renseigner (to inform)', 'Chercher (to seek)'],
        suggestedReplies: [
          'Pardon, où se trouve la gare centrale s\'il vous plaît ?',
          'Je cherche le musée du Louvre, est-ce loin d\'ici ?',
          'Comment puis-je aller à la station de métro ?'
        ],
        knowledgeBase: [
          {
            triggers: ['gare', 'musée', 'métro', 'loin', 'aller', 'trouve'],
            response: 'C\'est tout droit ! Continuez sur cette avenue pendant cinq minutes, puis tournez à gauche au feu. Vous ne pouvez pas la rater.',
            translation: 'It is straight ahead! Continue on this avenue for five minutes, then turn left at the traffic light. You cannot miss it.',
            grammar: '"Tout droit" means straight ahead, contrasting with "à droite" (to the right).',
            vocab: ['Tout droit (straight ahead)', 'À gauche (to the left)', 'Feu (traffic light)'],
            suggestedReplies: [
              'Merci beaucoup ! Est-ce loin à pied ?',
              'C\'est très clair, bonne journée !',
              'Y a-t-il un distributeur près d\'ici ?'
            ]
          }
        ]
      },
      'de-DE': {
        opener: 'Hallo! Kann ich Ihnen vielleicht helfen? Sie sehen etwas orientierungslos aus.',
        openerTranslation: 'Hello! May I perhaps help you? You look a bit disoriented.',
        openerGrammar: '"Kann ich Ihnen helfen?" uses dative pronoun "Ihnen" following the verb "helfen".',
        openerVocab: ['Helfen (to help)', 'Vielleicht (perhaps)', 'Orientierungslos (disoriented)'],
        suggestedReplies: [
          'Entschuldigung, wo ist der Hauptbahnhof?',
          'Ich suche die nächste U-Bahn-Station.',
          'Ist das Museum zu Fuß erreichbar?'
        ],
        knowledgeBase: [
          {
            triggers: ['hauptbahnhof', 'u-bahn', 'museum', 'bahnhof', 'fuß'],
            response: 'Gehen Sie einfach geradeaus bis zur Ampel und biegen Sie dort rechts ab. Es sind nur etwa fünf Minuten zu Fuß.',
            translation: 'Simply walk straight ahead up to the traffic light and turn right there. It is only about five minutes on foot.',
            grammar: '"Biegen Sie... ab" uses the separable verb "abbiegen" (to turn).',
            vocab: ['Geradeaus (straight ahead)', 'Ampel (traffic light)', 'Rechts abbiegen (turn right)'],
            suggestedReplies: [
              'Vielen Dank für Ihre Hilfe!',
              'Gibt es dort auch eine Apotheke?',
              'Schönen Tag noch!'
            ]
          }
        ]
      },
      'it-IT': {
        opener: 'Ciao! Ti serve una mano? Sembri alla ricerca di qualcosa!',
        openerTranslation: 'Hi! Do you need a hand? You look like you\'re searching for something!',
        openerGrammar: '"Ti serve una mano" is a friendly Italian idiom meaning "Do you need help?".',
        openerVocab: ['Mano (hand)', 'Ricerca (search)', 'Qualcosa (something)'],
        suggestedReplies: [
          'Scusi, dov\'è la stazione ferroviaria?',
          'Sto cercando il Colosseo, è lontano a piedi?',
          'Come arrivo al centro storico da qui?'
        ],
        knowledgeBase: [
          {
            triggers: ['stazione', 'colosseo', 'centro', 'lontano', 'arrivo'],
            response: 'Vai dritto per circa trecento metri, poi gira a sinistra dopo la fontana. Ci vorranno cinque minuti a piedi.',
            translation: 'Go straight for about 300 meters, then turn left after the fountain. It will take 5 minutes on foot.',
            grammar: '"Ci vorranno" is the future tense of "volerci", expressing time needed.',
            vocab: ['Dritto (straight)', 'Sinistra (left)', 'Fontana (fountain)'],
            suggestedReplies: [
              'Grazie mille, gentilissimo!',
              'C\'è un bancomat nelle vicinanze?',
              'Buona giornata!'
            ]
          }
        ]
      },
      'ja-JP': {
        opener: 'こんにちは！道に迷われましたか？よろしければご案内しましょうか？',
        openerTranslation: 'Hello! Are you lost? If you like, shall I guide you?',
        openerGrammar: '"迷われましたか" is the polite passive honorific of "迷う" (to get lost).',
        openerVocab: ['道 (road/way)', '案内 (guide)', '迷う (get lost)'],
        suggestedReplies: [
          'すみません、駅はどちらですか？',
          '美術館に行きたいのですが、歩いて行けますか？',
          '一番近い地下鉄の駅を教えてください。'
        ],
        knowledgeBase: [
          {
            triggers: ['駅', '美術館', '地下鉄', '歩いて', 'どこ'],
            response: 'この道をまっすぐ行って、二つ目の交差点を右に曲がってください。駅の看板が見えますよ。',
            translation: 'Go straight along this street, and please turn right at the second intersection. You will see the station sign.',
            grammar: '"まっすぐ行って...曲がってください" chains actions using the te-form (〜て).',
            vocab: ['まっすぐ (straight)', '交差点 (intersection)', '看板 (signboard)'],
            suggestedReplies: [
              'ありがとうございます！とても助かりました。',
              '徒歩で何分くらいかかりますか？',
              '良い一日を！'
            ]
          }
        ]
      },
      'zh-CN': {
        opener: '你好！看你好像在找路，需要帮忙吗？',
        openerTranslation: 'Hello! You look like you\'re finding your way, do you need help?',
        openerGrammar: '"在找路" uses "在" as a progressive aspect indicator ("looking for the road").',
        openerVocab: ['找路 (find route)', '帮忙 (help)', '好像 (seem like)'],
        suggestedReplies: [
          '请问最近的地铁站在哪里？',
          '我想去市中心广场，走路远吗？',
          '打扰一下，请问火车站怎么走？'
        ],
        knowledgeBase: [
          {
            triggers: ['地铁', '广场', '火车站', '走路', '怎么走'],
            response: '沿着这条街一直往前走，过了红绿灯向右拐，就能看到了。大概走五分钟。',
            translation: 'Walk straight ahead along this street, pass the traffic light and turn right, and you will see it. About 5 minutes walk.',
            grammar: '"沿着...一直往前走" is the standard Chinese direction pattern meaning "walk straight along...".',
            vocab: ['沿着 (along)', '红绿灯 (traffic lights)', '向右拐 (turn right)'],
            suggestedReplies: [
              '太感谢你了！',
              '那附近有便利店吗？',
              '祝你今天过得愉快！'
            ]
          }
        ]
      }
    }
  },
  {
    id: 'airport',
    title: 'Airport Check-in & Customs',
    icon: '✈️',
    difficulty: 'Intermediate',
    difficultyColor: 'cyan',
    description: 'Present your passport, check bags, request a window seat, and answer customs queries.',
    role: 'Airline Agent (Sofia)',
    location: 'Terminal 2 Check-in Counter',
    objectives: [
      'State your final destination',
      'Hand over passport and booking reference',
      'Declare checked bags vs hand luggage',
      'Request seat preference (window or aisle)'
    ],
    content: {
      'es-ES': {
        opener: 'Buenos días. Bienvenido a Iberia Express. ¿Podría ver su pasaporte y su reserva, por favor?',
        openerTranslation: 'Good morning. Welcome to Iberia Express. Could I see your passport and your booking, please?',
        openerGrammar: '"¿Podría ver...?" is the courteous conditional form of "poder", ideal for formal transactions.',
        openerVocab: ['Pasaporte (passport)', 'Reserva (booking/reservation)', 'Por favor (please)'],
        suggestedReplies: [
          'Aquí tiene mi pasaporte y el código de reserva.',
          'Viajo a Barcelona hoy. ¿El vuelo sale puntual?',
          'Tengo una maleta para facturar.'
        ],
        knowledgeBase: [
          {
            triggers: ['pasaporte', 'reserva', 'aquí', 'barcelona', 'maleta', 'facturar'],
            response: 'Muchas gracias. Veo su billete. ¿Tiene equipaje para facturar o solo lleva equipaje de mano? Y por cierto, ¿prefiere asiento de ventanilla o de pasillo?',
            translation: 'Thank you very much. I see your ticket. Do you have luggage to check in or only carry-on? And by the way, do you prefer a window or aisle seat?',
            grammar: '"Equipaje de mano" is carry-on luggage, while "facturar" means to check baggage.',
            vocab: ['Equipaje de mano (carry-on)', 'Ventanilla (window)', 'Pasillo (aisle)'],
            suggestedReplies: [
              'Ventanilla, por favor, y tengo una maleta para facturar.',
              'De pasillo por favor, solo llevo esta mochila.',
              '¿A qué hora empieza el embarque?'
            ]
          }
        ]
      },
      'fr-FR': {
        opener: 'Bonjour monsieur/madame. Air France vous souhaite la bienvenue. Puis-je avoir votre passeport et billet ?',
        openerTranslation: 'Hello sir/madam. Air France welcomes you. May I have your passport and ticket?',
        openerGrammar: '"Puis-je avoir..." is formal polite French used in airport customer service.',
        openerVocab: ['Passeport (passport)', 'Billet (ticket)', 'Bienvenue (welcome)'],
        suggestedReplies: [
          'Voici mon passeport et ma confirmation de vol.',
          'J\'ai un bagage à enregistrer.',
          'Est-il possible d\'avoir un siège côté fenêtre ?'
        ],
        knowledgeBase: [
          {
            triggers: ['passeport', 'bagage', 'fenêtre', 'siège', 'enregistrer'],
            response: 'Parfait ! Posez votre valise sur le tapis s\'il vous plaît. Préférez-vous être côté couloir ou côté hublot ?',
            translation: 'Perfect! Place your suitcase on the belt please. Do you prefer aisle or window seat?',
            grammar: '"Côté hublot" specifically refers to an airplane window.',
            vocab: ['Hublot (airplane window)', 'Couloir (aisle)', 'Tapis (baggage belt)'],
            suggestedReplies: [
              'Côté hublot, s\'il vous plaît.',
              'Côté couloir, merci.',
              'À quelle porte se fait l\'embarquement ?'
            ]
          }
        ]
      },
      'de-DE': {
        opener: 'Guten Tag. Willkommen am Lufthansa-Schalter. Darf ich Ihren Reisepass und Ihre Bordkarte sehen?',
        openerTranslation: 'Good day. Welcome to the Lufthansa desk. May I see your passport and boarding pass?',
        openerGrammar: '"Darf ich... sehen?" is the polite standard for requesting official documents.',
        openerVocab: ['Reisepass (passport)', 'Bordkarte (boarding pass)', 'Schalter (counter/desk)'],
        suggestedReplies: [
          'Hier sind mein Pass und meine Buchungsnummer.',
          'Ich habe einen Koffer zum Aufgeben.',
          'Gibt es noch einen Fensterplatz?'
        ],
        knowledgeBase: [
          {
            triggers: ['pass', 'koffer', 'aufgeben', 'fensterplatz', 'gangplatz'],
            response: 'Vielen Dank. Stellen Sie bitte das Gepäckstück auf die Waage. Möchten Sie lieber am Fenster oder am Gang sitzen?',
            translation: 'Thank you. Please put the piece of luggage on the scale. Would you rather sit by the window or the aisle?',
            grammar: '"Stellen Sie... auf die Waage" uses the accusative for placing something onto the scale.',
            vocab: ['Waage (scale)', 'Gepäckstück (piece of luggage)', 'Gang (aisle)'],
            suggestedReplies: [
              'Am Fenster, bitte.',
              'Am Gang, bitte.',
              'Wann beginnt das Boarding?'
            ]
          }
        ]
      },
      'it-IT': {
        opener: 'Buongiorno! Benvenuto al check-in ITA Airways. Posso controllare il suo passaporto e biglietto?',
        openerTranslation: 'Good morning! Welcome to ITA Airways check-in. May I check your passport and ticket?',
        openerGrammar: '"Il suo passaporto" uses the formal third-person possessive for customer respect.',
        openerVocab: ['Passaporto (passport)', 'Biglietto (ticket)', 'Controllare (to check)'],
        suggestedReplies: [
          'Ecco il mio passaporto e la prenotazione.',
          'Ho una valigia da imbarcare.',
          'Preferirei un posto vicino al finestrino.'
        ],
        knowledgeBase: [
          {
            triggers: ['passaporto', 'valigia', 'finestrino', 'imbarcare', 'posto'],
            response: 'Perfetto. Metta la valigia sulla bilancia per favore. Preferisce il finestrino o il corridoio?',
            translation: 'Perfect. Put the suitcase on the scale please. Do you prefer window or aisle?',
            grammar: '"Metta" is the formal polite imperative of "mettere".',
            vocab: ['Bilancia (scale)', 'Finestrino (window)', 'Corridoio (aisle)'],
            suggestedReplies: [
              'Finestrino, grazie!',
              'Corridoio, grazie!',
              'A che gate dobbiamo andare?'
            ]
          }
        ]
      },
      'ja-JP': {
        opener: 'おはようございます。ANAチェックインカウンターへようこそ。パスポートをご提示いただけますか？',
        openerTranslation: 'Good morning. Welcome to the ANA check-in counter. Could you present your passport?',
        openerGrammar: '"ご提示いただけますか" is respectful business keigo asking the passenger to display their ID.',
        openerVocab: ['ご提示 (presentation/display)', 'パスポート (passport)', 'カウンター (counter)'],
        suggestedReplies: [
          'パスポートと予約確認書です。',
          '預け入れのスーツケースが一つあります。',
          '窓側の席をお願いできますか？'
        ],
        knowledgeBase: [
          {
            triggers: ['パスポート', 'スーツケース', '窓側', '預け入れ', '席'],
            response: 'ありがとうございます。お預かりするお荷物を計量器の上に載せていただけますか？お席は窓側と通路側のどちらがよろしいですか？',
            translation: 'Thank you. Could you place your checked baggage on the scale? Would you prefer a window or aisle seat?',
            grammar: '"どちらがよろしいですか" is the high-polite equivalent of "which one is good?".',
            vocab: ['計量器 (scale)', '窓側 (window side)', '通路側 (aisle side)'],
            suggestedReplies: [
              '窓側でお願いします。',
              '通路側でお願いします。',
              '搭乗口は何番ですか？'
            ]
          }
        ]
      },
      'zh-CN': {
        opener: '早上好！欢迎办理国航值机手续。请出示您的护照和机票。',
        openerTranslation: 'Good morning! Welcome to Air China check-in. Please present your passport and ticket.',
        openerGrammar: '"请出示" is courteous formal phrasing for requesting documentation.',
        openerVocab: ['值机 (check-in)', '出示 (present/show)', '护照 (passport)'],
        suggestedReplies: [
          '这是我的护照和预订确认单。',
          '我有一件行李需要托运。',
          '可以选靠窗的座位吗？'
        ],
        knowledgeBase: [
          {
            triggers: ['护照', '行李', '托运', '靠窗', '座位', '过道'],
            response: '好的，请把行李放在传送带上。请问您想要靠窗还是靠过道的座位？',
            translation: 'Alright, please place your luggage on the belt. Would you like a window seat or an aisle seat?',
            grammar: '"靠窗" (by the window) and "靠过道" (by the aisle) are essential flight vocabulary.',
            vocab: ['传送带 (conveyor belt)', '靠窗 (window seat)', '靠过道 (aisle seat)'],
            suggestedReplies: [
              '靠窗的座位，谢谢。',
              '靠过道的座位，谢谢。',
              '请问几点开始登机？'
            ]
          }
        ]
      }
    }
  },
  {
    id: 'hotel',
    title: 'Hotel Reception Check-in',
    icon: '🏨',
    difficulty: 'Intermediate',
    difficultyColor: 'cyan',
    description: 'Check into your hotel room, ask for Wi-Fi credentials, breakfast times, and amenities.',
    role: 'Front Desk Concierge (Lucas)',
    location: 'Boutique Hotel Grand Vista',
    objectives: [
      'Provide reservation name',
      'Ask about Wi-Fi password and breakfast hours',
      'Inquire about checkout time and luggage storage'
    ],
    content: {
      'es-ES': {
        opener: '¡Buenas tardes! Bienvenido al Hotel Gran Vista. ¿Tiene una reserva con nosotros?',
        openerTranslation: 'Good afternoon! Welcome to Hotel Gran Vista. Do you have a reservation with us?',
        openerGrammar: '"Tiene una reserva..." uses polite form "usted" common in high-end hospitality.',
        openerVocab: ['Buenas tardes (good afternoon)', 'Reserva (reservation)', 'Hotel (hotel)'],
        suggestedReplies: [
          'Sí, tengo una reserva a nombre de Alex Smith.',
          '¿A qué hora se sirve el desayuno mañana?',
          '¿Cuál es la contraseña del wifi, por favor?'
        ],
        knowledgeBase: [
          {
            triggers: ['reserva', 'nombre', 'desayuno', 'wifi', 'habitación', 'llave'],
            response: '¡Excelente! Aquí tiene la tarjeta llave para la habitación 402 en la cuarta planta. El desayuno buffet se sirve de 7:00 a 10:30 en el restaurante.',
            translation: 'Excellent! Here is your keycard for room 402 on the fourth floor. The buffet breakfast is served from 7:00 to 10:30 in the restaurant.',
            grammar: '"Aquí tiene..." is the standard courteous formula for handing over items.',
            vocab: ['Tarjeta llave (keycard)', 'Cuarta planta (fourth floor)', 'Desayuno buffet (breakfast buffet)'],
            suggestedReplies: [
              '¿Tienen servicio de consigna para las maletas?',
              '¿A qué hora es el check-out?',
              '¡Muchas gracias por su ayuda!'
            ]
          }
        ]
      },
      'fr-FR': {
        opener: 'Bonsoir ! Bienvenue à l\'Hôtel Étoile. Avez-vous une réservation ?',
        openerTranslation: 'Good evening! Welcome to Hôtel Étoile. Do you have a reservation?',
        openerGrammar: '"Avez-vous..." is inversion question for polite reception greeting.',
        openerVocab: ['Bonsoir (good evening)', 'Réservation (reservation)', 'Étoile (star)'],
        suggestedReplies: [
          'Oui, j\'ai réservé une chambre sous le nom de Smith.',
          'Quel est le mot de passe du wifi ?',
          'À quelle heure commence le petit-déjeuner ?'
        ],
        knowledgeBase: [
          {
            triggers: ['réservé', 'nom', 'wifi', 'petit-déjeuner', 'chambre', 'clé'],
            response: 'Très bien monsieur. Voici votre carte pour la chambre 304. Le petit-déjeuner est servi dès 7h30 au rez-de-chaussée.',
            translation: 'Very well. Here is your card for room 304. Breakfast is served starting at 7:30 on the ground floor.',
            grammar: '"Rez-de-chaussée" is the French term for ground floor (floor 0).',
            vocab: ['Rez-de-chaussée (ground floor)', 'Chambre (room)', 'Servi (served)'],
            suggestedReplies: [
              'Y a-t-il un ascenseur ?',
              'Quelle est l\'heure limite pour libérer la chambre ?',
              'Merci beaucoup !'
            ]
          }
        ]
      },
      'de-DE': {
        opener: 'Guten Abend! Herzlich willkommen im Hotel Alpenblick. Haben Sie bei uns reserviert?',
        openerTranslation: 'Good evening! Warm welcome to Hotel Alpenblick. Have you reserved with us?',
        openerGrammar: '"Haben Sie... reserviert?" uses present perfect tense for polite confirmation.',
        openerVocab: ['Guten Abend (good evening)', 'Herzlich willkommen (warm welcome)', 'Reserviert (booked)'],
        suggestedReplies: [
          'Ja, eine Buchung auf den Namen Smith.',
          'Wie lautet das WLAN-Passwort?',
          'Wann gibt es morgen Frühstück?'
        ],
        knowledgeBase: [
          {
            triggers: ['buchung', 'name', 'wlan', 'frühstück', 'zimmer', 'schlüssel'],
            response: 'Wunderbar! Hier ist Ihre Schlüsselkarte für Zimmer 210 im zweiten Stock. Das Frühstücksbuffet steht ab 7 Uhr bereit.',
            translation: 'Wonderful! Here is your keycard for room 210 on the second floor. The breakfast buffet is ready starting at 7 AM.',
            grammar: '"Zweiter Stock" refers to the 2nd floor above ground in German.',
            vocab: ['Schlüsselkarte (key card)', 'Frühstücksbuffet (breakfast buffet)', 'Stock (floor)'],
            suggestedReplies: [
              'Bis wann müssen wir auschecken?',
              'Gibt es einen Fitnessraum?',
              'Vielen Dank für Ihre Freundlichkeit!'
            ]
          }
        ]
      },
      'it-IT': {
        opener: 'Buonasera! Benvenuto all\'Hotel Bella Vista. Ha una prenotazione a suo nome?',
        openerTranslation: 'Good evening! Welcome to Hotel Bella Vista. Do you have a booking in your name?',
        openerGrammar: '"Ha una prenotazione" uses formal third person "Lei".',
        openerVocab: ['Buonasera (good evening)', 'Prenotazione (booking)', 'Nome (name)'],
        suggestedReplies: [
          'Sì, ho prenotato una camera a nome Smith.',
          'Qual è la password del wifi?',
          'A che ora è la colazione domattina?'
        ],
        knowledgeBase: [
          {
            triggers: ['prenotato', 'camera', 'wifi', 'colazione', 'chiave'],
            response: 'Perfetto! Ecco la chiave della camera 105 al primo piano. La colazione viene servita dalle 7:30 alle 10:00.',
            translation: 'Perfect! Here is the key to room 105 on the first floor. Breakfast is served from 7:30 to 10:00.',
            grammar: '"Viene servita" is passive voice with "venire", very common in Italian.',
            vocab: ['Camera (room)', 'Primo piano (first floor)', 'Colazione (breakfast)'],
            suggestedReplies: [
              'A che ora dobbiamo lasciare la camera?',
              'Posso lasciare i bagagli qui domani?',
              'Grazie mille e buona serata!'
            ]
          }
        ]
      },
      'ja-JP': {
        opener: 'いらっしゃいませ。ホテルグランドへようこそ。ご宿泊のご予約はお持ちでしょうか？',
        openerTranslation: 'Welcome to Hotel Grand. Do you hold a lodging reservation?',
        openerGrammar: '"ご予約はお持ちでしょうか" is high-form hospitality keigo inquiring about booking.',
        openerVocab: ['ご宿泊 (lodging/stay)', 'ご予約 (reservation)', 'お持ち (hold/have)'],
        suggestedReplies: [
          'はい、スミスという名前で予約しています。',
          'Wi-Fiのパスワードを教えていただけますか？',
          '朝食は何時から何時までですか？'
        ],
        knowledgeBase: [
          {
            triggers: ['名前', '予約', 'wifi', '朝食', '部屋', '鍵'],
            response: '確認できました。お部屋は5階の508号室でございます。朝食は2階のレストランにて7時から9時半までご利用いただけます。',
            translation: 'Confirmed. Your room is room 508 on the 5th floor. Breakfast is available at the 2nd floor restaurant from 7:00 to 9:30.',
            grammar: '"ご利用いただけます" is polite potential keigo meaning "you can make use of".',
            vocab: ['号室 (room number)', '階 (floor)', 'ご利用 (usage)'],
            suggestedReplies: [
              'チェックアウトは何時ですか？',
              '荷物を預かってもらえますか？',
              'ありがとうございます。'
            ]
          }
        ]
      },
      'zh-CN': {
        opener: '您好！欢迎入住悦景大酒店。请问您有预订吗？',
        openerTranslation: 'Hello! Welcome to Joyview Hotel. May I ask if you have a reservation?',
        openerGrammar: '"入住" is formal terminology for hotel check-in.',
        openerVocab: ['入住 (check-in)', '预订 (reservation)', '请问 (may I ask)'],
        suggestedReplies: [
          '有的，我以史密斯的名义预订了一间大床房。',
          '请问无线网密码是多少？',
          '明天的早餐几点开始？'
        ],
        knowledgeBase: [
          {
            triggers: ['预订', '名字', '无线网', '早餐', '房间', '房卡'],
            response: '已经查到了。这是您的房卡，在六楼618号房间。早餐早上七点到十点在三楼餐厅提供。',
            translation: 'Found it. Here is your room card, room 618 on the 6th floor. Breakfast is provided on the 3rd floor restaurant from 7:00 to 10:00.',
            grammar: '"在...提供" specifies the location and provision of service.',
            vocab: ['房卡 (room card)', '楼 (floor)', '提供 (provide)'],
            suggestedReplies: [
              '退房时间是几点？',
              '可以帮忙寄存行李吗？',
              '非常感谢您的帮助！'
            ]
          }
        ]
      }
    }
  },
  {
    id: 'casual-chitchat',
    title: 'Friendly Casual Chit-Chat',
    icon: '💬',
    difficulty: 'Beginner',
    difficultyColor: 'emerald',
    description: 'Break the ice with a new acquaintance, talk about hobbies, city life, and the weather.',
    role: 'Warm Language Exchange Partner (Camila)',
    location: 'Cozy Park Bench in the Sunshine',
    objectives: [
      'Introduce yourself warmly',
      'Share a favorite hobby or food',
      'Ask about their weekend plans'
    ],
    content: {
      'es-ES': {
        opener: '¡Hola! Hace un día precioso aquí en el parque, ¿verdad? ¿Qué tal tu fin de semana?',
        openerTranslation: 'Hello! It is a gorgeous day here in the park, isn\'t it? How is your weekend going?',
        openerGrammar: '"¿Qué tal...?" is the friendliest everyday greeting to ask "how is / what about".',
        openerVocab: ['Precioso (gorgeous)', 'Fin de semana (weekend)', 'Parque (park)'],
        suggestedReplies: [
          '¡Muy bien, gracias! Me encanta pasear cuando hace sol.',
          'Todo tranquilo, aprendiendo español poco a poco.',
          '¿Vives por este barrio?'
        ],
        knowledgeBase: [
          {
            triggers: ['bien', 'sol', 'español', 'barrio', 'tranquilo', 'pasear', 'música'],
            response: '¡Qué bien! A mí también me encanta este barrio. ¿Y a qué te dedicas o qué te gusta hacer en tu tiempo libre?',
            translation: 'How nice! I also love this neighborhood. And what do you do for a living or what do you enjoy doing in your free time?',
            grammar: '"¿A qué te dedicas?" is the standard native idiom for asking someone\'s profession.',
            vocab: ['Tiempo libre (free time)', 'Dedicar (to dedicate/work as)', 'Barrio (neighborhood)'],
            suggestedReplies: [
              'Me gusta mucho escuchar música y leer.',
              'Soy ingeniero y me gusta cocinar los fines de semana.',
              '¿Tienes alguna cafetería favorita por aquí?'
            ]
          }
        ]
      },
      'fr-FR': {
        opener: 'Salut ! Il fait un temps magnifique aujourd\'hui, n\'est-ce pas ? Comment vas-tu ?',
        openerTranslation: 'Hi! The weather is magnificent today, isn\'t it? How are you doing?',
        openerGrammar: '"N\'est-ce pas ?" is the standard tag question ("isn\'t it?").',
        openerVocab: ['Magnifique (magnificent)', 'Temps (weather)', 'Comment vas-tu (how are you)'],
        suggestedReplies: [
          'Ça va très bien, merci ! J\'adore me promener sous le soleil.',
          'Tout va bien, j\'apprends le français pas à pas.',
          'Tu habites dans ce quartier ?'
        ],
        knowledgeBase: [
          {
            triggers: ['bien', 'soleil', 'français', 'quartier', 'promener', 'musique'],
            response: 'Génial ! Moi aussi j\'adore me balader ici. Qu\'est-ce que tu aimes faire pendant tes week-ends ?',
            translation: 'Awesome! I also love strolling here. What do you like doing during your weekends?',
            grammar: '"Se balader" is informal for "se promener" (to stroll/walk).',
            vocab: ['Se balader (to stroll)', 'Week-end (weekend)', 'Aimer (to like/love)'],
            suggestedReplies: [
              'J\'aime écouter de la musique et cuisiner.',
              'Je lis des livres et je visite des musées.',
              'As-tu un café préféré dans les environs ?'
            ]
          }
        ]
      },
      'de-DE': {
        opener: 'Hallo! Das Wetter ist heute wirklich herrlich, oder? Wie läuft dein Tag so?',
        openerTranslation: 'Hello! The weather is really marvelous today, right? How is your day going?',
        openerGrammar: '"Wie läuft dein Tag so?" is a warm, casual conversational check-in.',
        openerVocab: ['Herrlich (marvelous)', 'Wetter (weather)', 'Tag (day)'],
        suggestedReplies: [
          'Sehr gut, danke! Ich genieße die Sonne im Park.',
          'Ganz entspannt, ich übe gerade mein Deutsch.',
          'Wohnst du schon lange in dieser Stadt?'
        ],
        knowledgeBase: [
          {
            triggers: ['gut', 'sonne', 'deutsch', 'stadt', 'park', 'musik', 'entspannt'],
            response: 'Klasse! Dein Deutsch klingt schon richtig gut. Was machst du denn am liebsten in deiner Freizeit?',
            translation: 'Great! Your German already sounds really good. What do you like doing most in your free time?',
            grammar: '"Am liebsten" is the superlative of "gern" ("most preferably").',
            vocab: ['Freizeit (free time)', 'Klasse (great)', 'Am liebsten (most of all)'],
            suggestedReplies: [
              'Ich höre gern Podcasts und koche gern.',
              'Ich treibe Sport und treffe Freunde.',
              'Gibt es hier in der Nähe ein schönes Café?'
            ]
          }
        ]
      },
      'it-IT': {
        opener: 'Ciao! C\'è un sole splendido oggi, vero? Come sta andando la tua giornata?',
        openerTranslation: 'Hi! The sun is gorgeous today, right? How is your day going?',
        openerGrammar: '"Sta andando" uses the stare + gerund present progressive.',
        openerVocab: ['Splendido (splendid/gorgeous)', 'Sole (sun)', 'Giornata (day)'],
        suggestedReplies: [
          'Benissimo grazie! Adoro fare passeggiate con questo tempo.',
          'Tutto tranquillo, sto imparando l\'italiano.',
          'Vivi in questa zona?'
        ],
        knowledgeBase: [
          {
            triggers: ['bene', 'sole', 'italiano', 'zona', 'passeggiate', 'tempo'],
            response: 'Che bello! Anche a me piace tantissimo questa zona. Cosa ti piace fare nel tuo tempo libero?',
            translation: 'How lovely! I also really love this area. What do you enjoy doing in your free time?',
            grammar: '"Anche a me piace" is how Italians say "I like it too".',
            vocab: ['Tempo libero (free time)', 'Tantissimo (very much)', 'Zona (area)'],
            suggestedReplies: [
              'Mi piace ascoltare musica e cucinare piatti nuovi.',
              'Vado in bicicletta e leggo libri.',
              'Conosci una buona gelateria da queste parti?'
            ]
          }
        ]
      },
      'ja-JP': {
        opener: 'こんにちは！今日は本当に良いお天気ですね。どんな一日をお過ごしですか？',
        openerTranslation: 'Hello! It\'s really nice weather today, isn\'t it? How are you spending your day?',
        openerGrammar: '"お過ごしですか" is respectful inquiry about someone\'s time or day.',
        openerVocab: ['お天気 (weather)', '良い (good)', '過ごす (spend time)'],
        suggestedReplies: [
          'とても元気です！散歩するのが気持ちいいですね。',
          '日本語を勉強しながらのんびり過ごしています。',
          'この近くにお住まいですか？'
        ],
        knowledgeBase: [
          {
            triggers: ['元気', '散歩', '日本語', '勉強', '天気', 'のんびり'],
            response: '素晴らしいですね！日本語がとてもお上手です。休日は普段どんなことをして過ごしていますか？',
            translation: 'Wonderful! Your Japanese is very skillful. What kind of things do you usually do on holidays?',
            grammar: '"お上手" adds the honorific prefix "お" to compliment someone\'s skill.',
            vocab: ['普段 (usually)', '休日 (holidays/days off)', '上手 (skillful)'],
            suggestedReplies: [
              '音楽を聴いたり、本を読んだりするのが好きです。',
              '料理を作ることにはまっています。',
              'おすすめのカフェはありますか？'
            ]
          }
        ]
      },
      'zh-CN': {
        opener: '嗨！今天天气真好，公园里很舒服呢。你今天过得怎么样？',
        openerTranslation: 'Hi! The weather is really good today, very comfortable in the park. How is your day going?',
        openerGrammar: '"呢" is a sentence-final particle giving a friendly, conversational tone.',
        openerVocab: ['天气 (weather)', '舒服 (comfortable)', '公园 (park)'],
        suggestedReplies: [
          '挺好的！我很喜欢在有阳光的时候散步。',
          '还不错，我正在努力练习中文呢。',
          '你住在这附近吗？'
        ],
        knowledgeBase: [
          {
            triggers: ['好', '阳光', '散步', '中文', '附近', '不错'],
            response: '太棒了！你的中文发音很自然呢。你平时闲暇时间都喜欢做些什么？',
            translation: 'Awesome! Your Chinese pronunciation is very natural. What do you usually like to do in your leisure time?',
            grammar: '"做些什么" means "do some things / what kind of things do you do".',
            vocab: ['发音 (pronunciation)', '平时 (usually)', '闲暇 (leisure)'],
            suggestedReplies: [
              '我喜欢听音乐和做饭。',
              '我喜欢读小说和跑步。',
              '这附近有什么好喝的奶茶店吗？'
            ]
          }
        ]
      }
    }
  }
];

export const GRAMMAR_GLOSSARY = {
  'gustar': 'In Spanish, "gustar" agrees with the thing being liked, not the person: "Me gusta el café" (singular) vs "Me gustan los cafés" (plural).',
  'por favor': 'Courteous marker placed at either the beginning or end of requests.',
  'vous': 'In French, "vous" is used when speaking to strangers, service professionals, or elders for polite respect.',
  'konjunktiv': 'In German, the subjunctive form ("hätte", "würde", "könnte") turns commands into gentle, polite inquiries.',
  'keigo': 'Japanese honorific system divided into Sonkeigo (elevating the listener) and Kenjougo (humbling the speaker).'
};
