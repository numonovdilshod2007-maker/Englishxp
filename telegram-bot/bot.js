import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import cron from 'node-cron'
import { levels, maxLevel } from './data/vocabulary.js'
import { grammar } from './data/grammar.js'
import { getUser, upsertUser, getAllUsers, markActiveToday, pendingPolls } from './storage.js'

const TOKEN = process.env.BOT_TOKEN
if (!TOKEN) {
  console.error('BOT_TOKEN topilmadi. .env faylini .env.example dan nusxalab, tokeningizni kiriting.')
  process.exit(1)
}

const bot = new TelegramBot(TOKEN, { polling: true })
console.log('English XP bot ishga tushdi (polling)...')

const mainMenu = {
  reply_markup: {
    keyboard: [
      [{ text: "📖 Bugungi so'z" }, { text: '📝 Grammar test' }],
      [{ text: '🔥 Streak' }, { text: '🎯 Daraja' }],
      [{ text: 'ℹ️ Yordam' }]
    ],
    resize_keyboard: true
  }
}

function levelData(levelNum) {
  return levels.find((l) => l.level === levelNum) || levels[0]
}

function grammarData(levelNum) {
  return grammar.find((g) => g.level === levelNum) || grammar[0]
}

// Deterministic-ish "word of the day" per user: rotates through their level's
// word list based on the day of the year, so everyone at the same level sees
// the same word on the same day (feels intentional, not random noise).
function wordOfTheDay(levelNum) {
  const { words } = levelData(levelNum)
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return words[dayOfYear % words.length]
}

function randomExercise(levelNum) {
  const g = grammarData(levelNum)
  const ex = g.exercises[Math.floor(Math.random() * g.exercises.length)]
  return { topic: g.title, ex }
}

// ---------- Commands ----------

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  const user = getUser(chatId)
  if (!user) {
    upsertUser(chatId, {
      level: 1,
      streak: 0,
      lastActiveDate: null,
      name: msg.chat.first_name || msg.chat.username || "Do'stim"
    })
  }
  bot.sendMessage(
    chatId,
    `Salom, ${msg.chat.first_name || "Do'stim"}! 👋\n\n` +
      `Men *English XP* botiman — har kuni yangi so'z, grammatika testi va streak eslatmasi yuboraman.\n\n` +
      `Boshlash uchun quyidagi tugmalardan foydalaning:`,
    { parse_mode: 'Markdown', ...mainMenu }
  )
})

bot.onText(/\/help/, (msg) => sendHelp(msg.chat.id))
function sendHelp(chatId) {
  bot.sendMessage(
    chatId,
    'Buyruqlar:\n' +
      "/word — bugungi so'z\n" +
      '/quiz — grammatika savoli\n' +
      '/streak — joriy streak holati\n' +
      '/level — darajani tanlash\n' +
      '/help — shu ro\'yxat',
    mainMenu
  )
}

bot.onText(/\/word/, (msg) => sendWord(msg.chat.id))
bot.on('message', (msg) => {
  if (msg.text === "📖 Bugungi so'z") sendWord(msg.chat.id)
  if (msg.text === '📝 Grammar test') sendQuiz(msg.chat.id)
  if (msg.text === '🔥 Streak') sendStreak(msg.chat.id)
  if (msg.text === '🎯 Daraja') sendLevelPicker(msg.chat.id)
  if (msg.text === 'ℹ️ Yordam') sendHelp(msg.chat.id)
})

function sendWord(chatId) {
  const user = getUser(chatId) || upsertUser(chatId, {})
  const word = wordOfTheDay(user.level || 1)
  bot.sendMessage(
    chatId,
    `📖 *Bugungi so'z* (Level ${user.level || 1})\n\n` +
      `*${word.en}* — ${word.uz}\n\n` +
      `_${word.example}_\n${word.exampleUz}`,
    {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[{ text: '✅ Bilaman', callback_data: 'know_word' }]] }
    }
  )
}

bot.onText(/\/quiz/, (msg) => sendQuiz(msg.chat.id))
function sendQuiz(chatId) {
  const user = getUser(chatId) || upsertUser(chatId, {})
  const { topic, ex } = randomExercise(user.level || 1)
  const correctIndex = ex.options.indexOf(ex.correct)

  bot
    .sendPoll(chatId, `[${topic}]\n${ex.question}`, ex.options, {
      type: 'quiz',
      correct_option_id: correctIndex,
      is_anonymous: false
    })
    .then((poll) => {
      pendingPolls.set(poll.poll.id, { chatId })
    })
    .catch((err) => console.error('sendPoll xatosi:', err.message))
}

bot.on('poll_answer', (pollAnswer) => {
  const pending = pendingPolls.get(pollAnswer.poll_id)
  if (!pending) return
  pendingPolls.delete(pollAnswer.poll_id)
  // Any answered quiz counts as practice for the streak, right or wrong —
  // showing up and trying is what the streak is meant to reward.
  markActiveToday(pending.chatId)
})

bot.on('callback_query', (query) => {
  if (query.data === 'know_word') {
    markActiveToday(query.message.chat.id)
    bot.answerCallbackQuery(query.id, { text: "So'z belgilandi! Streak yangilandi 🔥" })
  }
  if (query.data.startsWith('setlevel_')) {
    const level = parseInt(query.data.replace('setlevel_', ''), 10)
    upsertUser(query.message.chat.id, { level })
    bot.answerCallbackQuery(query.id, { text: `Daraja ${level} qilib tanlandi` })
    bot.sendMessage(query.message.chat.id, `🎯 Darajangiz: Level ${level} — ${levelData(level).title}`)
  }
})

bot.onText(/\/streak/, (msg) => sendStreak(msg.chat.id))
function sendStreak(chatId) {
  const user = getUser(chatId) || upsertUser(chatId, {})
  const today = new Date().toISOString().slice(0, 10)
  const doneToday = user.lastActiveDate === today
  bot.sendMessage(
    chatId,
    `🔥 Joriy streak: *${user.streak || 0} kun*\n` +
      (doneToday ? "Bugun allaqachon mashq qildingiz. Ajoyib!" : "Bugun hali mashq qilmadingiz — /word yoki /quiz bilan streak'ni saqlab qoling."),
    { parse_mode: 'Markdown' }
  )
}

bot.onText(/\/level/, (msg) => sendLevelPicker(msg.chat.id))
function sendLevelPicker(chatId) {
  const buttons = []
  for (let i = 1; i <= maxLevel; i += 5) {
    const row = []
    for (let j = i; j < i + 5 && j <= maxLevel; j++) {
      row.push({ text: String(j), callback_data: `setlevel_${j}` })
    }
    buttons.push(row)
  }
  bot.sendMessage(chatId, "Darajangizni tanlang (1 = boshlang'ich, 14 = yuqori):", {
    reply_markup: { inline_keyboard: buttons }
  })
}

// ---------- Daily streak reminder ----------

const hour = process.env.REMINDER_HOUR || '19'
const minute = process.env.REMINDER_MINUTE || '0'

// Runs once a day. Anyone who hasn't practiced yet today gets a nudge with
// their word of the day attached, so the reminder doubles as content.
cron.schedule(`${minute} ${hour} * * *`, () => {
  const today = new Date().toISOString().slice(0, 10)
  const users = getAllUsers()

  Object.values(users).forEach((user) => {
    if (user.lastActiveDate === today) return // already practiced today

    const word = wordOfTheDay(user.level || 1)
    bot
      .sendMessage(
        user.chatId,
        `🔥 Streak: ${user.streak || 0} kun\n\n` +
          `Bugun hali mashq qilmadingiz! Streak'ni yo'qotmang.\n\n` +
          `📖 Bugungi so'z: *${word.en}* — ${word.uz}`,
        { parse_mode: 'Markdown', ...mainMenu }
      )
      .catch((err) => console.error(`Eslatma yuborishda xato (${user.chatId}):`, err.message))
  })

  console.log(`[${new Date().toISOString()}] Streak eslatmalari yuborildi.`)
})

console.log(`Kunlik eslatma vaqti: har kuni ${hour}:${minute.padStart(2, '0')}`)
