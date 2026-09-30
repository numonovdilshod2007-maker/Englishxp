const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')

const ANTHROPIC_API_KEY = defineSecret('ANTHROPIC_API_KEY')

// Coarse difficulty band derived from the learner's in-app vocabulary level,
// mirrors the logic in roleplay.js so tone/vocabulary stay consistent
// across AI features.
function levelBand(level) {
  const n = Number(level) || 1
  if (n <= 3) return 'The learner is A1-A2 level. Use very simple English and explain everything in Uzbek in short, plain sentences.'
  if (n <= 7) return 'The learner is B1 level. Use everyday English and clear Uzbek explanations.'
  return 'The learner is B2-C1 level. You can use richer English, but keep Uzbek explanations concise.'
}

const SYSTEM_PROMPT_TEMPLATE = (level) => `You are a patient, encouraging English teacher for Uzbek-speaking learners on the EnglishXP app. ${levelBand(level)}
A learner will ask you a question about English (grammar, vocabulary, a sentence they don't understand, etc).
Respond ONLY with a raw JSON object, no markdown, no code fences, in this exact shape:
{
  "explanation": "Simple explanation in Uzbek, 2-4 short sentences, no jargon.",
  "examples": ["An English example sentence.", "A second English example sentence."],
  "practice": {
    "question": "A short English fill-in-the-blank or multiple-choice question testing what was just explained, written in English.",
    "options": ["option A", "option B", "option C"],
    "correctIndex": 0,
    "correctExplanationUz": "One short sentence in Uzbek explaining why that option is correct."
  }
}
Keep it focused on exactly one topic — the one the learner asked about. If the question isn't about English language learning, gently redirect them back to English topics in the "explanation" field and leave "examples" empty and "practice" null.`

exports.aiTeacherAsk = onCall({ secrets: [ANTHROPIC_API_KEY], cors: true }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Bu funksiyadan foydalanish uchun tizimga kiring.')
  }

  const { question, level, history } = request.data || {}
  if (typeof question !== 'string' || !question.trim()) {
    throw new HttpsError('invalid-argument', 'Savol bo\'sh bo\'lishi mumkin emas.')
  }
  if (question.length > 500) {
    throw new HttpsError('invalid-argument', 'Savol juda uzun.')
  }

  const cleanHistory = Array.isArray(history)
    ? history
        .filter((m) => m && typeof m.content === 'string' && m.content.trim())
        .slice(-6)
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content.trim().slice(0, 800)
        }))
    : []

  const messages = [...cleanHistory, { role: 'user', content: question.trim() }]

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
        max_tokens: 500,
        system: SYSTEM_PROMPT_TEMPLATE(level),
        messages
      })
    })
  } catch (err) {
    console.error('AI Teacher: Anthropic API request failed:', err)
    throw new HttpsError('internal', 'AI xizmatiga ulanib bo\'lmadi. Birozdan keyin urinib ko\'ring.')
  }

  if (!response.ok) {
    const text = await response.text()
    console.error('AI Teacher: Anthropic API error:', response.status, text)
    throw new HttpsError('internal', 'AI javob bera olmadi. Birozdan keyin urinib ko\'ring.')
  }

  const data = await response.json()
  const rawText = (data.content || []).find((block) => block.type === 'text')?.text || ''

  try {
    const cleaned = rawText.trim().replace(/^```json\s*|^```\s*|```$/g, '')
    const parsed = JSON.parse(cleaned)
    return {
      explanation: typeof parsed.explanation === 'string' ? parsed.explanation : 'Kechirasiz, javob bera olmadim.',
      examples: Array.isArray(parsed.examples) ? parsed.examples.slice(0, 3).map(String) : [],
      practice: parsed.practice && typeof parsed.practice === 'object'
        ? {
            question: String(parsed.practice.question || ''),
            options: Array.isArray(parsed.practice.options) ? parsed.practice.options.slice(0, 4).map(String) : [],
            correctIndex: Number.isInteger(parsed.practice.correctIndex) ? parsed.practice.correctIndex : 0,
            correctExplanationUz: String(parsed.practice.correctExplanationUz || '')
          }
        : null
    }
  } catch (err) {
    console.error('AI Teacher: failed to parse model JSON, raw text:', rawText)
    return { explanation: rawText.trim() || 'Kechirasiz, javob bera olmadim. Qayta urinib ko\'ring.', examples: [], practice: null }
  }
})
