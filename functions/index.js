const { onRequest } = require('firebase-functions/v2/https')
const { onSchedule } = require('firebase-functions/v2/scheduler')
const { handlePayme } = require('./payme')
const { handleClick } = require('./click')
const { db, revokePro } = require('./proAccess')
const { roleplayChat } = require('./roleplay')
const { aiTeacherAsk } = require('./aiTeacher')
const { speakingFeedback } = require('./speakingFeedback')
const { ieltsWritingFeedback } = require('./ieltsWriting')
const { telegramWebhook, sendDailyTelegramReminders } = require('./telegram')

exports.roleplayChat = roleplayChat
exports.aiTeacherAsk = aiTeacherAsk
exports.speakingFeedback = speakingFeedback
exports.ieltsWritingFeedback = ieltsWritingFeedback
exports.telegramWebhook = telegramWebhook
exports.sendDailyTelegramReminders = sendDailyTelegramReminders

// Register these as your callback URLs in the Payme / Click merchant cabinets:
//   Payme:  https://<region>-<project-id>.cloudfunctions.net/paymeCallback
//   Click:  https://<region>-<project-id>.cloudfunctions.net/clickCallback
exports.paymeCallback = onRequest({ cors: false }, handlePayme)
exports.clickCallback = onRequest({ cors: false }, handleClick)

// Runs once a day and turns off `isPro` for anyone whose subscription
// period (proExpiresAt) has passed — since Payme/Click here are one-time
// charges renewed manually, not auto-recurring billing.
exports.checkExpiredSubscriptions = onSchedule('every 24 hours', async () => {
  const now = Date.now()
  const snap = await db.collection('users').where('isPro', '==', true).get()
  const expired = snap.docs.filter((d) => {
    const exp = d.data().proExpiresAt
    return exp && new Date(exp).getTime() < now
  })
  await Promise.all(expired.map((d) => revokePro(d.id)))
  console.log(`Checked ${snap.size} Pro users, revoked ${expired.length} expired subscriptions.`)
})
