// Keep this in sync with PRO_MONTHLY_PRICE_UZS in src/stores/userStore.js
const PRICE_UZS = 29000
const PRICE_TIYIN = PRICE_UZS * 100 // Payme/Click amounts are in tiyin (1 so'm = 100 tiyin)
const SUBSCRIPTION_DAYS = 30

module.exports = { PRICE_UZS, PRICE_TIYIN, SUBSCRIPTION_DAYS }
