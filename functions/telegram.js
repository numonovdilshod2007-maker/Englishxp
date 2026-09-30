const { onRequest } = require('firebase-functions/v2/https')
const { onSchedule } = require('firebase-functions/v2/scheduler')
const { db, admin } = require('./proAccess')

// Small helper — calls the Telegram Bot API. No SDK dependency needed,
// this is just a REST call.
async function callTelegram(token, method, payload) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  if (!data.ok) {
    console.error(`Telegram API error (${method}):`, data.description)
  }
  return data
}

// ---------------------------------------------------------------------
// Account linking flow:
// 1. In the app (ProfileView), the user taps "Telegram orqali ulash" ->
//    userStore.generateTelegramLinkCode() writes a random 6-char code onto
//    their OWN doc (users/{uid}.telegramLinkCode) — this is an ordinary
//    owner write, no special rules needed.
// 2. The user opens the bot in Telegram and sends /start <code>.
// 3. This webhook looks up which user has that telegramLinkCode, stores
//    the chat id on that user's doc (telegramChatId), and clears the code.
//    This write uses the Admin SDK, so it bypasses Firestore rules — safe,
//    since only this server-side function can do it.
// ---------------------------------------------------------------------
exports.telegramWebhook = onRequest({ cors: false }, async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const update = req.body
  const message = update?.message
  if (!message?.text || !message?.chat?.id) {
    res.status(200).send('ok')
    return
  }

  const chatId = message.chat.id
  const text = message.text.trim()

  if (text === '/start' || text.startsWith('/start ')) {
    const code = text.replace('/start', '').trim().toUpperCase()

    if (!code) {
      await callTelegram(token, 'sendMessage', {
        chat_id: chatId,
        text: "Salom! 👋 EnglishXP botiga xush kelibsiz.\n\nHisobingizni ulash uchun ilovadagi Profil sahifasidan kodni oling va shu yerga /start KOD shaklida yuboring."
      })
      res.status(200).send('ok')
      return
    }

    const snap = await db.collection('users').where('telegramLinkCode', '==', code).limit(1).get()
    if (snap.empty) {
      await callTelegram(token, 'sendMessage', {
        chat_id: chatId,
        text: "Bunday kod topilmadi yoki eskirgan. Ilovadan yangi kod oling va qayta urinib ko'ring."
      })
      res.status(200).send('ok')
      return
    }

    const userDoc = snap.docs[0]
    await userDoc.ref.update({
      telegramChatId: String(chatId),
      telegramLinkCode: admin.firestore.FieldValue.delete(),
      remindersEnabled: true
    })

    await callTelegram(token, 'sendMessage', {
      chat_id: chatId,
      text: `Hisobingiz ulandi! ✅ Endi kunlik eslatmalarni shu yerdan olasiz, ${userDoc.data().displayName || 'do\'stim'}. 🔥`
    })
    res.status(200).send('ok')
    return
  }

  if (text === '/stop') {
    const snap = await db.collection('users').where('telegramChatId', '==', String(chatId)).limit(1).get()
    if (!snap.empty) {
      await snap.docs[0].ref.update({ telegramChatId: admin.firestore.FieldValue.delete(), remindersEnabled: false })
    }
    await callTelegram(token, 'sendMessage', { chat_id: chatId, text: "Eslatmalar o'chirildi. Xohlagan vaqtda /start KOD bilan qayta ulanishingiz mumkin." })
    res.status(200).send('ok')
    return
  }

  // Unknown command — stay quiet-ish, just point back to the app.
  await callTelegram(token, 'sendMessage', {
    chat_id: chatId,
    text: "Buyruqni tushunmadim. /start KOD — hisob ulash, /stop — eslatmalarni o'chirish."
  })
  res.status(200).send('ok')
})

// ---------------------------------------------------------------------
// Runs once a day. Anyone with a linked Telegram (telegramChatId set),
// reminders turned on, and who HASN'T practiced yet today gets a nudge —
// mentioning their streak so it stings a little if they're about to lose it.
// ---------------------------------------------------------------------
exports.sendDailyTelegramReminders = onSchedule(
  { schedule: 'every day 18:00', timeZone: 'Asia/Tashkent' },
  async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const today = new Date().toDateString()

    const snap = await db.collection('users')
      .where('remindersEnabled', '==', true)
      .get()

    const targets = snap.docs.filter((d) => {
      const data = d.data()
      return data.telegramChatId && data.lastActiveDate !== today
    })

    let sent = 0
    for (const d of targets) {
      const data = d.data()
      const streak = data.streak || 0
      const streakLine = streak > 0
        ? `${streak} kunlik streak'ingiz xavf ostida — uni yo'qotmang! 🔥`
        : "Bugun hali mashq qilmadingiz. Bir necha daqiqa ajrating! 💪"

      try {
        await callTelegram(token, 'sendMessage', {
          chat_id: data.telegramChatId,
          text: `Salom, ${data.displayName || 'do\'stim'}! ${streakLine}`
        })
        sent++
      } catch (e) {
        console.error(`Failed to message ${d.id}:`, e)
      }
    }

    console.log(`Daily Telegram reminders: checked ${snap.size}, sent ${sent}.`)
  }
)
