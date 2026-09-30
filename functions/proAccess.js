const admin = require('firebase-admin')
const { SUBSCRIPTION_DAYS } = require('./config')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()

// Grants (or extends) Pro for a user. Called only from server-side payment
// callbacks after a transaction has been confirmed by Payme/Click — never
// reachable directly from the client.
async function grantPro(uid, { provider, providerTransactionId, amount }) {
  const userRef = db.collection('users').doc(uid)
  const snap = await userRef.get()
  if (!snap.exists) {
    throw new Error(`User ${uid} not found`)
  }

  const now = Date.now()
  const current = snap.data()
  // Extend from the current expiry if still active, otherwise from now.
  const currentExpiry = current.proExpiresAt ? new Date(current.proExpiresAt).getTime() : 0
  const base = currentExpiry > now ? currentExpiry : now
  const newExpiry = new Date(base + SUBSCRIPTION_DAYS * 24 * 60 * 60 * 1000).toISOString()

  await userRef.update({
    isPro: true,
    proSince: current.proSince || new Date(now).toISOString(),
    proExpiresAt: newExpiry
  })

  await db.collection('payments').add({
    uid,
    provider,
    providerTransactionId,
    amount,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })
}

async function revokePro(uid) {
  await db.collection('users').doc(uid).update({ isPro: false })
}

module.exports = { admin, db, grantPro, revokePro }
