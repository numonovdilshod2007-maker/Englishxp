<template>
  <div class="upgrade-page">
    <AuroraBackground />
    <AppNav />

    <div class="container upgrade-content">

      <div v-if="userStore.realIsPro" class="glass pro-active-card reveal">
        <div class="pro-active-icon">
          <i class="ti ti-crown" aria-hidden="true"></i>
        </div>
        <h1>Siz Pro a'zosiz!</h1>
        <p>2x XP, barcha darajalarga to'liq kirish va eksklyuziv avatarlar sizga ochiq.</p>
        <button class="link-btn cancel-pro-link" @click="handleCancel">
          Pro obunani bekor qilish
        </button>
      </div>

      <div v-else-if="userStore.isPromoActive" class="glass pro-active-card reveal">
        <div class="pro-active-icon">
          <i class="ti ti-gift" aria-hidden="true"></i>
        </div>
        <h1>Pro hozircha hammaga bepul!</h1>
        <p>
          2x XP, barcha darajalar, AI Roleplay va Writing tahlili — {{ promoEndLabel }} gacha bepul ochiq.
          Hech qanday to'lov yoki karta ma'lumoti kerak emas.
        </p>
        <p class="promo-fineprint">
          {{ promoEndLabel }} dan keyin Pro xususiyatlaridan foydalanish uchun oyiga {{ formattedPrice }} to'lov talab qilinadi.
        </p>
      </div>

      <template v-else>
        <div class="upgrade-header reveal">
          <div class="pro-active-icon">
            <i class="ti ti-crown" aria-hidden="true"></i>
          </div>
          <h1>EnglishXP Pro'ga o'ting</h1>
          <p>O'rganishni tezlashtiring va eksklyuziv imkoniyatlarni oching</p>
        </div>

        <div class="plans-grid reveal">
          <div class="glass plan-card">
            <h3>Bepul</h3>
            <p class="plan-price">0 so'm</p>
            <ul class="plan-features">
              <li><i class="ti ti-check" aria-hidden="true"></i> Barcha lug'at va grammatika darslari</li>
              <li><i class="ti ti-check" aria-hidden="true"></i> Hikoyalar va reyting</li>
              <li><i class="ti ti-check" aria-hidden="true"></i> Darajalarni ketma-ket ochish</li>
              <li class="plan-feature-off"><i class="ti ti-x" aria-hidden="true"></i> Oddiy XP tezligi</li>
            </ul>
          </div>

          <div class="glass plan-card plan-card-pro">
            <div class="plan-pro-tag">Tavsiya etiladi</div>
            <h3><i class="ti ti-crown" aria-hidden="true"></i> Pro</h3>
            <p class="plan-price">{{ formattedPrice }} <span>/ oy</span></p>
            <ul class="plan-features">
              <li><i class="ti ti-check" aria-hidden="true"></i> <strong>2x XP</strong> — tezroq daraja oshiring</li>
              <li><i class="ti ti-check" aria-hidden="true"></i> <strong>Barcha darajalar</strong> darhol ochiq</li>
              <li><i class="ti ti-check" aria-hidden="true"></i> Eksklyuziv Pro avatarlar</li>
              <li><i class="ti ti-check" aria-hidden="true"></i> <strong>AI Roleplay</strong> — sun'iy intellekt bilan suhbat</li>
              <li><i class="ti ti-check" aria-hidden="true"></i> Profilda oltin <strong>PRO</strong> nishon</li>
              <li><i class="ti ti-check" aria-hidden="true"></i> Xohlagan vaqt bekor qilish mumkin</li>
            </ul>
            <button class="btn-primary plan-cta" @click="showCheckout = true">
              Pro'ga o'tish
            </button>
          </div>
        </div>
      </template>

    </div>

    <!-- Payment method modal -->
    <Modal v-model="showCheckout" title="To'lov usulini tanlang">
      <p v-if="!merchantsConfigured" class="checkout-notice checkout-notice-warn">
        <i class="ti ti-alert-triangle" aria-hidden="true"></i>
        Merchant ID'lar hali sozlanmagan (<code>PAYME_MERCHANT_ID</code> / <code>CLICK_MERCHANT_ID</code>
        — <code>src/stores/userStore.js</code>). To'lov tizimlari ulanmaguncha checkout ishlamaydi.
      </p>
      <div class="checkout-summary">
        <span>EnglishXP Pro — 1 oy</span>
        <strong>{{ formattedPrice }}</strong>
      </div>

      <button class="payment-option payment-option-payme" :disabled="!PAYME_MERCHANT_ID" @click="payWithPayme">
        <span>Payme orqali to'lash</span>
        <i class="ti ti-arrow-right" aria-hidden="true"></i>
      </button>
      <button class="payment-option payment-option-click" :disabled="!CLICK_MERCHANT_ID" @click="payWithClick">
        <span>Click orqali to'lash</span>
        <i class="ti ti-arrow-right" aria-hidden="true"></i>
      </button>

      <p class="checkout-footnote">
        To'lovni tasdiqlagach, Pro darhol faollashadi. Savol bo'lsa — qo'llab-quvvatlash xizmatiga murojaat qiling.
      </p>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  useUserStore,
  PRO_MONTHLY_PRICE_UZS,
  PRO_PROMO_ENDS_AT,
  PAYME_MERCHANT_ID,
  CLICK_MERCHANT_ID,
  CLICK_SERVICE_ID
} from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import Modal from '../components/Modal.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()
const userStore = useUserStore()

const showCheckout = ref(false)
const merchantsConfigured = computed(() => !!PAYME_MERCHANT_ID || !!CLICK_MERCHANT_ID)

const formattedPrice = computed(() => `${PRO_MONTHLY_PRICE_UZS.toLocaleString('ru-RU')} so'm`)
const promoEndLabel = computed(() => PRO_PROMO_ENDS_AT.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }))

// Payme checkout link format: base64("m=MERCHANT_ID;ac.user_id=UID;a=AMOUNT_TIYIN")
function payWithPayme() {
  const uid = userStore.user.uid
  const amountTiyin = PRO_MONTHLY_PRICE_UZS * 100
  const returnUrl = encodeURIComponent(window.location.origin + '/upgrade')
  const raw = `m=${PAYME_MERCHANT_ID};ac.user_id=${uid};a=${amountTiyin};c=${returnUrl}`
  const encoded = btoa(raw)
  window.location.href = `https://checkout.paycom.uz/${encoded}`
}

// Click checkout link format (hosted checkout page).
function payWithClick() {
  const uid = userStore.user.uid
  const returnUrl = encodeURIComponent(window.location.origin + '/upgrade')
  const url = `https://my.click.uz/services/pay?service_id=${CLICK_SERVICE_ID}&merchant_id=${CLICK_MERCHANT_ID}&amount=${PRO_MONTHLY_PRICE_UZS}&transaction_param=${uid}&return_url=${returnUrl}`
  window.location.href = url
}

async function handleCancel() {
  await userStore.cancelPro()
}
</script>

<style scoped>
.upgrade-page {
  min-height: 100vh;
  padding-bottom: 60px;
}

.upgrade-content {
  max-width: 760px;
  padding-top: 40px;
}

.upgrade-header {
  text-align: center;
  margin-bottom: 36px;
}

.pro-active-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f6c453, #e8983a);
  color: #4a2e00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin: 0 auto 18px;
}

.upgrade-header h1 {
  font-family: 'Manrope', sans-serif;
  font-size: 27px;
  font-weight: 800;
  margin: 0 0 8px;
}

.upgrade-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.plans-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

@media (max-width: 640px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
}

.plan-card {
  padding: 28px 24px;
  position: relative;
}

.plan-card h3 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Manrope', sans-serif;
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 10px;
}

.plan-card-pro {
  border-color: rgba(232, 152, 58, 0.5);
}

.plan-card-pro h3 {
  color: #b9791f;
}

.plan-pro-tag {
  position: absolute;
  top: -12px;
  right: 20px;
  background: linear-gradient(135deg, #f6c453, #e8983a);
  color: #4a2e00;
  font-size: 11px;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 100px;
}

.plan-price {
  font-family: 'Manrope', sans-serif;
  font-size: 26px;
  font-weight: 800;
  margin: 0 0 20px;
}

.plan-price span {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--card-text-primary);
}

.plan-features li i {
  color: var(--accent);
  flex-shrink: 0;
}

.plan-feature-off {
  color: var(--text-muted) !important;
}

.plan-feature-off i {
  color: var(--text-muted) !important;
}

.plan-cta {
  width: 100%;
  justify-content: center;
}

.pro-active-card {
  text-align: center;
  padding: 44px 32px;
  max-width: 460px;
  margin: 40px auto 0;
}

.pro-active-card h1 {
  font-family: 'Manrope', sans-serif;
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 10px;
}

.pro-active-card p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0 0 20px;
}

.cancel-pro-link {
  font-size: 13px;
  color: var(--text-muted);
}

.promo-fineprint {
  font-size: 12px !important;
  color: var(--text-muted) !important;
  margin-top: -8px !important;
}

.checkout-notice {
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: var(--text-secondary);
  background: rgba(13, 17, 16, 0.035);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  margin-bottom: 20px;
  line-height: 1.6;
}

.checkout-notice i {
  flex-shrink: 0;
  margin-top: 2px;
}

.checkout-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--card-border);
}

.checkout-notice-warn {
  background: rgba(220, 60, 60, 0.08);
  color: #b8302f;
}

.payment-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--card-border);
  background: rgba(13, 17, 16, 0.02);
  color: var(--card-text-primary);
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
  transition: background 0.2s var(--ease-premium), border-color 0.2s var(--ease-premium);
}

.payment-option:hover:not(:disabled) {
  background: rgba(60, 230, 125, 0.06);
  border-color: var(--accent);
}

.payment-option:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.payment-option-payme {
  border-color: rgba(41, 171, 226, 0.4);
}

.payment-option-click {
  border-color: rgba(0, 148, 255, 0.4);
}

.checkout-footnote {
  font-size: 12px;
  color: var(--text-muted);
  margin: 16px 0 0;
  line-height: 1.6;
}
</style>
