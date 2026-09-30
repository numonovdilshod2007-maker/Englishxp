const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const { db } = require('./proAccess')

const ANTHROPIC_API_KEY = defineSecret('ANTHROPIC_API_KEY')

// Speaking topics the learner can be prompted with. Grouped so the client
// can show a fresh, level-appropriate set each session.
const TOPICS = [
  { id: 'daily-routine', title: 'Kunlik rejim', prompt: 'Describe your typical daily routine, from morning to night.' },
  { id: 'hometown', title: 'Tug\'ilgan shahar', prompt: 'Describe your hometown and what you like about it.' },
  { id: 'family', title: 'Oila', prompt: 'Talk about your family and your relationship with them.' },
  { id: 'hobby', title: 'Sevimli mashg\'ulot', prompt: 'Talk about a hobby you enjoy and why you like it.' },
  { id: 'dream-job', title: 'Orzudagi kasb', prompt: 'Describe your dream job and why you want it.' },
  { id: 'memorable-trip', title: 'Esda qolarli sayohat', prompt: 'Describe a trip or journey you remember well.' },
  { id: 'favorite-food', title: 'Sevimli taom', prompt: 'Talk about your favorite food and how it is made.' },
  { id: 'technology', title: 'Texnologiya', prompt: 'Talk about how technology has changed your daily life.' },
  { id: 'goals', title: 'Kelajak rejalari', prompt: 'Talk about your goals for the next five years.' },
  { id: 'a-book-or-movie', title: 'Kitob yoki film', prompt: 'Describe a book or movie that made an impression on you.' },
  { id: 'friendship', title: 'Do\'stlik', prompt: 'Talk about what makes a good friend, using examples.' },
  { id: 'environment', title: 'Atrof-muhit', prompt: 'Talk about one environmental problem and what could help solve it.' }
]

function levelBand(level) {
  const n = Number(level) || 1
  if (n <= 3) return 'The learner is at an A1-A2 (beginner) level.'
  if (n <= 7) return 'The learner is at a B1 (intermediate) level.'
  return 'The learner is at a B2-C1 (upper-intermediate/advanced) level.'
}

exports.SPEAKING_TOPICS = TOPICS

exports.speakingFeedback = onCall({ secrets: [ANTHROPIC_API_KEY], cors: true }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Bu funksiyadan foydalanish uchun tizimga kiring.')
  }

  const uid = request.auth.uid
  const userSnap = await db.collection('users').doc(uid).get()
  if (!userSnap.exists || !userSnap.data().isPro) {
    throw new HttpsError('permission-denied', 'Nutq tahlili faqat Pro foydalanuvchilar uchun mavjud.')
  }

  const { topicId, transcript, level } = request.data || {}
  const topic = TOPICS.find((t) => t.id === topicId)
  if (!topic) {
    throw new HttpsError('invalid-argument', 'Noto\'g\'ri mavzu.')
  }
  const cleanTranscript = typeof transcript === 'string' ? transcript.trim().slice(0, 3000) : ''
  if (!cleanTranscript || cleanTranscript.split(/\s+/).length < 3) {
    throw new HttpsError('invalid-argument', 'Nutq juda qisqa yoki bo\'sh. Iltimos, ko\'proq gapiring.')
  }

  const systemPrompt = `You are a supportive, expert spoken-English coach reviewing a transcript of a learner's spoken (not written) answer to a speaking prompt. ${levelBand(level)} The prompt was: "${topic.prompt}"

Evaluate the transcript as SPOKEN English — do not penalize missing punctuation or capitalization, since this came from speech-to-text. Focus on: grammar accuracy, vocabulary range, sentence variety, and how well the answer addressed the prompt.

Respond ONLY with a raw JSON object, no markdown, no code fences, in this exact shape:
{
  "score": <integer 1-10, overall speaking quality>,
  "strengths_uz": "<1-2 short encouraging sentences in Uzbek about what the learner did well>",
  "improvements_uz": "<1-2 short constructive sentences in Uzbek about the main thing to improve>",
  "corrections": [ { "original": "<short excerpt with a mistake, max 12 words>", "better": "<corrected version>" } ],
  "new_vocabulary": [ { "word": "<a useful English word or phrase related to the topic the learner didn't use>", "meaning_uz": "<short Uzbek meaning>" } ]
}
Keep "corrections" to at most 3 items and "new_vocabulary" to at most 3 items. If there are no clear grammar mistakes, return an empty corrections array.`

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
        max_tokens: 700,
        system: systemPrompt,
        messages: [{ role: 'user', content: cleanTranscript }]
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

  let feedback
  try {
    const cleaned = rawText.trim().replace(/^```json\s*|^```\s*|```$/g, '')
    feedback = JSON.parse(cleaned)
  } catch (err) {
    console.error('Failed to parse speaking feedback JSON:', rawText)
    throw new HttpsError('internal', 'Tahlil natijasini o\'qib bo\'lmadi. Qayta urinib ko\'ring.')
  }

  return {
    score: Number(feedback.score) || null,
    strengthsUz: feedback.strengths_uz || '',
    improvementsUz: feedback.improvements_uz || '',
    corrections: Array.isArray(feedback.corrections) ? feedback.corrections.slice(0, 3) : [],
    newVocabulary: Array.isArray(feedback.new_vocabulary) ? feedback.new_vocabulary.slice(0, 3) : []
  }
})
