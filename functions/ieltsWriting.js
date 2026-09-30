const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const { db } = require('./proAccess')

const ANTHROPIC_API_KEY = defineSecret('ANTHROPIC_API_KEY')

// IELTS Writing Task 2 prompts. Kept here (not in the frontend data file)
// so the grading prompt always matches the exact task the essay answers.
const WRITING_TASKS = [
  { id: 'technology-society', prompt: 'Some people believe that technology has made our lives more complicated, while others think it has made life easier. Discuss both views and give your own opinion.' },
  { id: 'online-education', prompt: 'Many students now study online instead of attending traditional classes. Do the advantages of this outweigh the disadvantages?' },
  { id: 'environment-government', prompt: 'Some people think environmental problems are too big for individuals to solve, and only governments and large businesses can make a real difference. To what extent do you agree or disagree?' },
  { id: 'work-life-balance', prompt: 'In many countries, people are working longer hours than ever before. What are the causes of this, and what effects does it have on individuals and society?' },
  { id: 'social-media', prompt: 'Social media has changed the way people communicate with each other. Do you think this change has been positive or negative overall?' },
  { id: 'urban-vs-rural', prompt: 'More and more people are moving from rural areas to live in cities. What are the causes of this trend, and what problems can it create for both cities and the countryside?' },
  { id: 'traditional-culture', prompt: 'As countries become more globalised, some argue that traditional customs and culture are being lost. To what extent do you agree or disagree with this view?' },
  { id: 'space-exploration', prompt: 'Governments should spend money on space exploration rather than on solving problems on Earth. To what extent do you agree or disagree?' },
  { id: 'advertising-children', prompt: 'Some people think advertising aimed at children should be banned. Others believe parents, not governments, should be responsible for what children see. Discuss both views and give your own opinion.' },
  { id: 'university-tuition', prompt: 'In some countries, university education is free, while in others students must pay high fees. Do the advantages of free university education outweigh the disadvantages?' },
  { id: 'zoos-animal-welfare', prompt: 'Some people believe zoos are cruel and should be closed, while others think they play an important role in education and conservation. Discuss both views and give your own opinion.' },
  { id: 'remote-work', prompt: 'Many companies now allow employees to work from home permanently. What are the advantages and disadvantages of this trend for both employees and employers?' }
]

exports.IELTS_WRITING_TASKS = WRITING_TASKS

// Must stay in sync with ieltsWritingTask1s in src/data/ielts.js.
const WRITING_TASK1S = [
  { id: 'internet-usage-by-age', title: 'Internet Usage by Age Group (2010 vs 2023)', instruction: 'The table below shows the percentage of internet users in different age groups in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', columns: ['Age group', '2010 (%)', '2023 (%)'], rows: [['16-24', '78', '99'], ['25-44', '65', '97'], ['45-64', '38', '89'], ['65+', '11', '61']] },
  { id: 'city-population-growth', title: 'Population of Three Cities (2000-2020)', instruction: 'The chart below shows the population (in millions) of three cities between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', columns: ['Year', 'Rivertown', 'Lakeside', 'Hillview'], rows: [['2000', '2.1', '3.4', '1.2'], ['2010', '2.8', '3.6', '1.9'], ['2020', '4.5', '3.5', '3.1']] },
  { id: 'household-energy-sources', title: 'Household Energy Sources in Country X (1990-2020)', instruction: 'The table below shows the percentage of household energy from different sources in Country X over three decades. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', columns: ['Source', '1990 (%)', '2005 (%)', '2020 (%)'], rows: [['Coal', '48', '30', '9'], ['Natural gas', '30', '35', '31'], ['Renewables', '4', '14', '42'], ['Nuclear', '18', '21', '18']] },
  { id: 'coffee-production-process', title: 'The Coffee Production Process', instruction: 'The diagram below shows the stages involved in producing coffee, from harvesting to packaging. Summarise the information by describing the main stages of the process.', columns: ['Stage', 'What happens'], rows: [['1. Harvesting', 'Ripe coffee cherries are picked by hand or machine'], ['2. Processing', 'Cherries are pulped and the beans are separated from the fruit'], ['3. Drying', 'Beans are spread out and dried in the sun for 1-2 weeks'], ['4. Roasting', 'Dried beans are roasted at high temperature to develop flavour'], ['5. Packaging', 'Roasted beans are cooled, ground or left whole, and packaged']] },
  { id: 'graduate-employment-fields', title: 'Fields of Employment for University Graduates (2023)', instruction: 'The table below shows the percentage of university graduates working in different fields one year after graduation. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', columns: ['Field', 'Graduates (%)'], rows: [['Technology', '27'], ['Healthcare', '19'], ['Education', '15'], ['Finance', '14'], ['Other / unemployed', '25']] }
]

exports.IELTS_WRITING_TASK1S = WRITING_TASK1S

function tableToText(task1) {
  const header = task1.columns.join(' | ')
  const rows = task1.rows.map((r) => r.join(' | ')).join('\n')
  return `${header}\n${rows}`
}

exports.ieltsWritingFeedback = onCall({ secrets: [ANTHROPIC_API_KEY], cors: true }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Bu funksiyadan foydalanish uchun tizimga kiring.')
  }

  const uid = request.auth.uid
  const userSnap = await db.collection('users').doc(uid).get()
  if (!userSnap.exists || !userSnap.data().isPro) {
    throw new HttpsError('permission-denied', 'IELTS Writing tahlili faqat Pro foydalanuvchilar uchun mavjud.')
  }

  const { taskId, essay, taskType } = request.data || {}
  const isTask1 = taskType === 'task1'
  const task = isTask1 ? WRITING_TASK1S.find((t) => t.id === taskId) : WRITING_TASKS.find((t) => t.id === taskId)
  if (!task) {
    throw new HttpsError('invalid-argument', 'Noto\'g\'ri topshiriq.')
  }
  const cleanEssay = typeof essay === 'string' ? essay.trim().slice(0, 6000) : ''
  const wordCount = cleanEssay ? cleanEssay.split(/\s+/).filter(Boolean).length : 0
  const minWords = isTask1 ? 50 : 50
  if (wordCount < minWords) {
    throw new HttpsError('invalid-argument', `Javob juda qisqa. Kamida ${minWords} so'z yozing (IELTS talabi ${isTask1 ? '150' : '250'}+ so'z).`)
  }

  const systemPrompt = isTask1
    ? `You are an experienced IELTS Academic Writing Task 1 examiner. Grade the following response against the official IELTS Task 1 band descriptors: Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Task 1 requires an objective overview and description of the data/process — it must NOT contain personal opinion (unlike Task 2).

The task was: "${task.instruction}"
Data given to the candidate:
${tableToText(task)}

The response has approximately ${wordCount} words (IELTS Task 1 expects 150+).

Respond ONLY with a raw JSON object, no markdown, no code fences, in this exact shape:
{
  "band_overall": <number, IELTS band 1.0-9.0 in 0.5 steps, e.g. 6.5>,
  "band_task_response": <number, band 1.0-9.0, this is Task Achievement for Task 1>,
  "band_coherence": <number, band 1.0-9.0>,
  "band_lexical": <number, band 1.0-9.0>,
  "band_grammar": <number, band 1.0-9.0>,
  "strengths_uz": "<2-3 short encouraging sentences in Uzbek about what the response did well>",
  "improvements_uz": "<2-3 short, specific, constructive sentences in Uzbek about the main things to improve for a higher band>",
  "corrections": [ { "original": "<short excerpt with a mistake, max 20 words>", "better": "<corrected version>" } ]
}
Keep "corrections" to at most 4 items. Penalize responses that give personal opinion instead of an objective overview, or that fail to report an overview/main trend. Be realistic and consistent with real IELTS band standards — do not inflate the score.`
    : `You are an experienced IELTS Writing Task 2 examiner. Grade the following essay against the official IELTS band descriptors: Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. The essay question was: "${task.prompt}"

The essay has approximately ${wordCount} words (IELTS Task 2 expects 250+).

Respond ONLY with a raw JSON object, no markdown, no code fences, in this exact shape:
{
  "band_overall": <number, IELTS band 1.0-9.0 in 0.5 steps, e.g. 6.5>,
  "band_task_response": <number, band 1.0-9.0>,
  "band_coherence": <number, band 1.0-9.0>,
  "band_lexical": <number, band 1.0-9.0>,
  "band_grammar": <number, band 1.0-9.0>,
  "strengths_uz": "<2-3 short encouraging sentences in Uzbek about what the essay did well>",
  "improvements_uz": "<2-3 short, specific, constructive sentences in Uzbek about the main things to improve for a higher band>",
  "corrections": [ { "original": "<short excerpt with a mistake, max 20 words>", "better": "<corrected version>" } ]
}
Keep "corrections" to at most 4 items, choosing the most instructive mistakes. Be realistic and consistent with real IELTS band standards — do not inflate the score.`

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
        max_tokens: 900,
        system: systemPrompt,
        messages: [{ role: 'user', content: cleanEssay }]
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
    console.error('Failed to parse IELTS writing feedback JSON:', rawText)
    throw new HttpsError('internal', 'Tahlil natijasini o\'qib bo\'lmadi. Qayta urinib ko\'ring.')
  }

  return {
    bandOverall: Number(feedback.band_overall) || null,
    bandTaskResponse: Number(feedback.band_task_response) || null,
    bandCoherence: Number(feedback.band_coherence) || null,
    bandLexical: Number(feedback.band_lexical) || null,
    bandGrammar: Number(feedback.band_grammar) || null,
    strengthsUz: feedback.strengths_uz || '',
    improvementsUz: feedback.improvements_uz || '',
    corrections: Array.isArray(feedback.corrections) ? feedback.corrections.slice(0, 4) : [],
    wordCount
  }
})
