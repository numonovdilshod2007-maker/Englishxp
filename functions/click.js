// Click Merchant API (Prepare + Complete callback).
// Spec reference: https://docs.click.uz/click-api-request/
//
// Required setup (see functions/.env.example):
//   CLICK_MERCHANT_ID, CLICK_SERVICE_ID, CLICK_SECRET_KEY — from your Click merchant cabinet
//
// This single endpoint handles both steps; Click distinguishes them via
// the `action` field (0 = Prepare, 1 = Complete).

const crypto = require('crypto')
const { db, grantPro } = require('./proAccess')
const { PRICE_UZS } = require('./config')

const CLICK_ERROR = {
  SUCCESS: 0,
  SIGN_FAILED: -1,
  ALREADY_PAID: -4,
  USER_NOT_FOUND: -5,
  TRANSACTION_NOT_FOUND: -6,
  AMOUNT_MISMATCH: -2
}

function verifySign(body, secretKey) {
  const {
    click_trans_id, service_id, merchant_trans_id,
    amount, action, sign_time, merchant_prepare_id
  } = body

  const parts = action === '1' || action === 1
    ? [click_trans_id, service_id, secretKey, merchant_trans_id, merchant_prepare_id, amount, action, sign_time]
    : [click_trans_id, service_id, secretKey, merchant_trans_id, amount, action, sign_time]

  const expected = crypto.createHash('md5').update(parts.join('')).digest('hex')
  return expected === body.sign_string
}

async function handleClick(req, res) {
  const body = req.body || {}
  const secretKey = process.env.CLICK_SECRET_KEY

  if (!secretKey || !verifySign(body, secretKey)) {
    return res.json({
      click_trans_id: body.click_trans_id,
      merchant_trans_id: body.merchant_trans_id,
      error: CLICK_ERROR.SIGN_FAILED,
      error_note: 'SIGN CHECK FAILED'
    })
  }

  const uid = body.merchant_trans_id // we pass our Firebase uid as merchant_trans_id
  const amount = Number(body.amount)
  const isComplete = String(body.action) === '1'
  const transactions = db.collection('clickTransactions')

  try {
    if (Math.round(amount) !== PRICE_UZS) {
      return res.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id: uid,
        error: CLICK_ERROR.AMOUNT_MISMATCH,
        error_note: 'Incorrect amount'
      })
    }

    const userSnap = await db.collection('users').doc(uid).get()
    if (!userSnap.exists) {
      return res.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id: uid,
        error: CLICK_ERROR.USER_NOT_FOUND,
        error_note: 'User not found'
      })
    }

    if (!isComplete) {
      // --- Prepare step ---
      const txRef = transactions.doc(String(body.click_trans_id))
      await txRef.set({
        uid,
        amount,
        clickTransId: body.click_trans_id,
        state: 'prepared',
        createdAt: Date.now()
      })
      return res.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id: uid,
        merchant_prepare_id: body.click_trans_id,
        error: CLICK_ERROR.SUCCESS,
        error_note: 'Success'
      })
    }

    // --- Complete step ---
    const txRef = transactions.doc(String(body.click_trans_id))
    const txSnap = await txRef.get()
    if (!txSnap.exists) {
      return res.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id: uid,
        error: CLICK_ERROR.TRANSACTION_NOT_FOUND,
        error_note: 'Transaction not found'
      })
    }
    if (txSnap.data().state === 'completed') {
      return res.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id: uid,
        merchant_confirm_id: body.click_trans_id,
        error: CLICK_ERROR.ALREADY_PAID,
        error_note: 'Already paid'
      })
    }

    if (Number(body.error) < 0) {
      await txRef.update({ state: 'cancelled' })
      return res.json({
        click_trans_id: body.click_trans_id,
        merchant_trans_id: uid,
        error: CLICK_ERROR.SUCCESS,
        error_note: 'Cancelled by Click'
      })
    }

    await txRef.update({ state: 'completed' })
    await grantPro(uid, { provider: 'click', providerTransactionId: body.click_trans_id, amount })

    return res.json({
      click_trans_id: body.click_trans_id,
      merchant_trans_id: uid,
      merchant_confirm_id: body.click_trans_id,
      error: CLICK_ERROR.SUCCESS,
      error_note: 'Success'
    })
  } catch (err) {
    console.error('Click handler error', err)
    return res.json({
      click_trans_id: body.click_trans_id,
      merchant_trans_id: uid,
      error: -9,
      error_note: 'Internal error'
    })
  }
}

module.exports = { handleClick }
