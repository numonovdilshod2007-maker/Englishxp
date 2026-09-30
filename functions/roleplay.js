const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const { db } = require('./proAccess')

// Set this once with:
//   firebase functions:secrets:set ANTHROPIC_API_KEY
const ANTHROPIC_API_KEY = defineSecret('ANTHROPIC_API_KEY')

// Each scenario becomes the AI's system prompt. Keep replies short and in
// character so it reads like a real conversation practice partner, not an
// assistant. CEFR level is passed from the client so the vocabulary matches
// what the learner has actually studied.
const SCENARIOS = {
  cafe: {
    title: 'Kafeda buyurtma berish',
    prompt: 'You are a friendly barista at a small coffee shop. Stay fully in character. Greet the customer, take their order, ask natural follow-up questions (size, milk, to-go or not), and mention the price at the end. Keep every reply to 1-3 short sentences.'
  },
  interview: {
    title: 'Ish suhbati',
    prompt: 'You are a friendly HR interviewer conducting a first-round job interview in English. Ask one interview question at a time (background, strengths, why this job), react briefly to the answer, then ask the next question. Keep every reply to 1-3 short sentences.'
  },
  hotel: {
    title: 'Mehmonxonada ro\'yxatdan o\'tish',
    prompt: 'You are a hotel receptionist checking in a guest. Ask for their name, reservation, ID, and preferences (floor, breakfast), and give short helpful answers to their questions about the hotel. Keep every reply to 1-3 short sentences.'
  },
  directions: {
    title: 'Yo\'l so\'rash',
    prompt: 'You are a friendly local stranger on the street being asked for directions in a city. Give simple, natural directions and answer follow-up questions about distance or landmarks. Keep every reply to 1-3 short sentences.'
  },
  doctor: {
    title: 'Shifokor qabulida',
    prompt: 'You are a calm, friendly doctor talking to a patient about mild symptoms. Ask about symptoms, give simple non-alarming advice, and keep the tone reassuring. Never give real medical diagnoses, keep it as light roleplay practice only. Keep every reply to 1-3 short sentences.'
  },
  airport: {
    title: 'Aeroportda',
    prompt: 'You are an airline check-in agent at an airport counter. Ask for the passenger\'s passport, ticket, and luggage, mention gate and boarding time, and answer simple travel questions. Keep every reply to 1-3 short sentences.'
  },
  shopping: {
    title: 'Do\'konda xarid qilish',
    prompt: 'You are a helpful shop assistant in a clothing store. Help the customer find sizes, colors, and prices, suggest items, and handle the checkout. Keep every reply to 1-3 short sentences.'
  },
  restaurant: {
    title: 'Restoranda ovqat buyurtma qilish',
    prompt: 'You are a waiter at a restaurant. Greet the guest, describe a couple of menu specials if asked, take the food and drink order, and check in during the meal. Keep every reply to 1-3 short sentences.'
  },
  bank: {
    title: 'Bankda hisob ochish',
    prompt: 'You are a bank clerk helping a customer open a new account. Ask for basic personal details, explain account options simply, and answer questions about cards and fees. Keep every reply to 1-3 short sentences.'
  },
  smalltalk: {
    title: 'Yangi tanish bilan suhbat',
    prompt: 'You are a friendly stranger making small talk with someone at a party or social event. Ask about their life, hobbies, and work, share brief reactions, and keep the conversation warm and casual. Keep every reply to 1-3 short sentences.'
  },
  landlord: {
    title: 'Kvartira ijarasi',
    prompt: 'You are a landlord showing an apartment to a potential tenant. Describe the apartment, answer questions about rent, utilities, and rules, and ask about their needs. Keep every reply to 1-3 short sentences.'
  },
  university: {
    title: 'Universitetda maslahat',
    prompt: 'You are a friendly university academic advisor talking to a new international student. Ask about their intended major, explain how to choose classes in simple terms, and answer questions about campus life. Keep every reply to 1-3 short sentences.'
  },
  phone: {
    title: 'Telefon orqali gaplashish',
    prompt: 'You are answering a phone call as a customer support agent for an internet/phone company. Ask for account details, listen to the issue, and offer simple troubleshooting steps or solutions. Keep every reply to 1-3 short sentences.'
  },
  freetalk: {
    title: 'Erkin suhbat',
    prompt: 'You are a warm, curious conversation partner having a free, open-ended chat in English on whatever topic the learner brings up (hobbies, news, opinions, daily life). React naturally, ask genuine follow-up questions, and keep the conversation flowing like a real friend would. Keep every reply to 1-4 short sentences.'
  }
}

// Coarse difficulty band derived from the learner's in-app vocabulary level,
// used to steer the AI's vocabulary and sentence complexity.
function levelBand(level) {
  const n = Number(level) || 1
  if (n <= 3) return 'Use only very simple, high-frequency words and short present-tense sentences (A1-A2 CEFR level). Avoid idioms and phrasal verbs.'
  if (n <= 7) return 'Use everyday vocabulary and a mix of simple past/present/future tenses (B1 CEFR level). A few common idioms are fine.'
  return 'Use natural, idiomatic English with varied tenses and richer vocabulary (B2-C1 CEFR level), the way a native speaker would talk casually.'
}

exports.roleplayChat = onCall({ secrets: [ANTHROPIC_API_KEY], cors: true }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Bu funksiyadan foydalanish uchun tizimga kiring.')
  }

  const uid = request.auth.uid
  const userSnap = await db.collection('users').doc(uid).get()
  if (!userSnap.exists || !userSnap.data().isPro) {
    throw new HttpsError('permission-denied', 'AI Roleplay faqat Pro foydalanuvchilar uchun mavjud.')
  }

  const { scenario, messages, level, wantCorrection } = request.data || {}
  const scenarioConfig = SCENARIOS[scenario]
  if (!scenarioConfig) {
    throw new HttpsError('invalid-argument', 'Noto\'g\'ri stsenariy.')
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new HttpsError('invalid-argument', 'Xabarlar ro\'yxati bo\'sh bo\'lishi mumkin emas.')
  }
  if (messages.length > 40) {
    throw new HttpsError('invalid-argument', 'Suhbat juda uzun, yangi suhbat boshlang.')
  }

  const cleanMessages = messages
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .slice(-20)
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content.trim().slice(0, 500)
    }))

  const correctionInstruction = wantCorrection
    ? ' Additionally, silently check the learner\'s LAST message for a clear English mistake (grammar, word choice, or word order). If there is one, briefly explain the fix in simple Uzbek (max 1 short sentence) in a "correction" field. If the message was correct or had no clear English text to check, set "correction" to null. Never mention the correction inside "reply" itself — keep "reply" purely in character.'
    : ''

  const systemPrompt = `${scenarioConfig.prompt} ${levelBand(level)}${correctionInstruction} Respond ONLY with a raw JSON object of the form {"reply": "...", "correction": ${wantCorrection ? '"..." or null' : 'null'}} and nothing else — no markdown, no code fences.`

  let response
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY.value(),
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: systemPrompt,
        messages: cleanMessages
      })
    })
  } catch (err) {
    console.error('Anthropic API request failed:', err)
    throw new HttpsError('internal', 'AI xizmatiga ulanib bo\'lmadi. Birozdan keyin urinib ko\'ring.')
  }

  if (!response.ok) {
    const text = await response.text()
    console.error('Anthropic API error:', response.status, text)
    throw new HttpsError('internal', 'AI javob bera olmadi. Birozdan keyin urinib ko\'ring.')
  }

  const data = await response.json()
  const rawText = (data.content || []).find((block) => block.type === 'text')?.text || ''

  let reply = rawText.trim()
  let correction = null
  try {
    const cleaned = rawText.trim().replace(/^```json\s*|^```\s*|```$/g, '')
    const parsed = JSON.parse(cleaned)
    if (parsed && typeof parsed.reply === 'string') {
      reply = parsed.reply
      correction = typeof parsed.correction === 'string' ? parsed.correction : null
    }
  } catch (err) {
    // Model didn't return valid JSON (rare) — fall back to the raw text as the reply.
  }

  return { reply: reply || '...', correction }
})

exports.ROLEPLAY_SCENARIOS = SCENARIOS
