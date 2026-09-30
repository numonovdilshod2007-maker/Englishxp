// Payme Merchant API (Business/Subscribe API, JSON-RPC over HTTPS).
// Spec reference: https://developer.help.paycom.uz/
//
// Required setup (see functions/.env.example):
//   PAYME_MERCHANT_ID  — from your Payme business cabinet
//   PAYME_SECRET_KEY   — Test key while integrating, Production key when live
//
// This endpoint must be registered in the Payme cabinet as your merchant's
// callback URL. Payme calls it with Basic Auth: base64("Paycom:<SECRET_KEY>").

const { db, grantPro } = require('./proAccess')
const { PRICE_TIYIN } = require('./config')

const ERRORS = {
  INVALID_AMOUNT: -31001,
  TRANSACTION_NOT_FOUND: -31003,
  CANNOT_CANCEL: -31007,
  USER_NOT_FOUND: -31050,
  ALREADY_DONE: -31060, // custom code range reserved by Payme for merchant use (1000-...)
  PENDING: -31008
}

function authorize(req) {
  const merchantSecret = process.env.PAYME_SECRET_KEY
  const header = req.headers.authorization || ''
  const expected = 'Basic ' + Buffer.from(`Paycom:${merchantSecret}`).toString('base64')
  return merchantSecret && header === expected
}

function rpcError(id, code, message) {
  return { jsonrpc: '2.0', id, error: { code, message: { ru: message, uz: message, en: message } } }
}

function rpcResult(id, result) {
  return { jsonrpc: '2.0', id, result }
}

async function findUserByUid(uid) {
  if (!uid) return null
  const snap = await db.collection('users').doc(uid).get()
  return snap.exists ? snap : null
}

async function handlePayme(req, res) {
  if (!authorize(req)) {
    return res.status(200).json(rpcError(req.body?.id ?? null, -32504, 'Insufficient privileges'))
  }

  const { method, params, id } = req.body || {}
  const transactions = db.collection('paymeTransactions')

  try {
    switch (method) {
      case 'CheckPerformTransaction': {
        const uid = params?.account?.user_id
        const user = await findUserByUid(uid)
        if (!user) return res.json(rpcError(id, ERRORS.USER_NOT_FOUND, 'User not found'))
        if (params.amount !== PRICE_TIYIN) {
          return res.json(rpcError(id, ERRORS.INVALID_AMOUNT, 'Incorrect amount'))
        }
        return res.json(rpcResult(id, { allow: true }))
      }

      case 'CreateTransaction': {
        const uid = params?.account?.user_id
        const user = await findUserByUid(uid)
        if (!user) return res.json(rpcError(id, ERRORS.USER_NOT_FOUND, 'User not found'))
        if (params.amount !== PRICE_TIYIN) {
          return res.json(rpcError(id, ERRORS.INVALID_AMOUNT, 'Incorrect amount'))
        }

        const existing = await transactions.doc(params.id).get()
        if (existing.exists) {
          const data = existing.data()
          return res.json(rpcResult(id, {
            create_time: data.createTime,
            transaction: params.id,
            state: data.state
          }))
        }

        const createTime = Date.now()
        await transactions.doc(params.id).set({
          uid,
          amount: params.amount,
          state: 1, // created, awaiting PerformTransaction
          createTime,
          performTime: 0,
          cancelTime: 0,
          reason: null
        })
        return res.json(rpcResult(id, { create_time: createTime, transaction: params.id, state: 1 }))
      }

      case 'PerformTransaction': {
        const txRef = transactions.doc(params.id)
        const txSnap = await txRef.get()
        if (!txSnap.exists) return res.json(rpcError(id, ERRORS.TRANSACTION_NOT_FOUND, 'Transaction not found'))
        const tx = txSnap.data()

        if (tx.state === 2) {
          return res.json(rpcResult(id, { transaction: params.id, perform_time: tx.performTime, state: 2 }))
        }
        if (tx.state !== 1) {
          return res.json(rpcError(id, ERRORS.CANNOT_CANCEL, 'Transaction in wrong state'))
        }

        const performTime = Date.now()
        await txRef.update({ state: 2, performTime })
        await grantPro(tx.uid, { provider: 'payme', providerTransactionId: params.id, amount: tx.amount })

        return res.json(rpcResult(id, { transaction: params.id, perform_time: performTime, state: 2 }))
      }

      case 'CancelTransaction': {
        const txRef = transactions.doc(params.id)
        const txSnap = await txRef.get()
        if (!txSnap.exists) return res.json(rpcError(id, ERRORS.TRANSACTION_NOT_FOUND, 'Transaction not found'))
        const tx = txSnap.data()

        const newState = tx.state === 2 ? -2 : -1
        const cancelTime = Date.now()
        if (tx.state !== newState) {
          await txRef.update({ state: newState, cancelTime, reason: params.reason })
        }
        return res.json(rpcResult(id, { transaction: params.id, cancel_time: cancelTime, state: newState }))
      }

      case 'CheckTransaction': {
        const txSnap = await transactions.doc(params.id).get()
        if (!txSnap.exists) return res.json(rpcError(id, ERRORS.TRANSACTION_NOT_FOUND, 'Transaction not found'))
        const tx = txSnap.data()
        return res.json(rpcResult(id, {
          create_time: tx.createTime,
          perform_time: tx.performTime,
          cancel_time: tx.cancelTime,
          transaction: params.id,
          state: tx.state,
          reason: tx.reason
        }))
      }

      case 'GetStatement': {
        const snap = await transactions
          .where('createTime', '>=', params.from)
          .where('createTime', '<=', params.to)
          .get()
        const list = snap.docs.map((d) => ({
          id: d.id,
          time: d.data().createTime,
          amount: d.data().amount,
          account: { user_id: d.data().uid },
          create_time: d.data().createTime,
          perform_time: d.data().performTime,
          cancel_time: d.data().cancelTime,
          transaction: d.id,
          state: d.data().state,
          reason: d.data().reason
        }))
        return res.json(rpcResult(id, { transactions: list }))
      }

      default:
        return res.json(rpcError(id, -32601, 'Method not found'))
    }
  } catch (err) {
    console.error('Payme handler error', err)
    return res.json(rpcError(id ?? null, -32400, 'Internal error'))
  }
}

module.exports = { handlePayme }
