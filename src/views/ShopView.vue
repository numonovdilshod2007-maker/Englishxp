<template>
  <div class="shop-page">
    <AuroraBackground />
    <AppNav />

    <main class="container shop-content">
      <section class="shop-hero reveal">
        <div>
          <span class="shop-eyebrow"><i class="ti ti-sparkles"></i> REWARD HUB</span>
          <h1 class="shop-title">EnglishXP Shop</h1>
          <p class="shop-sub">Darslardan topgan gemlaringizni foydali power-up va profil itemlariga almashtiring.</p>
        </div>
        <div class="balance-card glass" v-pop-in>
          <div class="balance-icon"><i class="ti ti-diamond"></i></div>
          <div><span>Balans</span><strong>{{ userStore.gems }}</strong><small>gems</small></div>
        </div>
      </section>

      <section class="shop-stat-grid reveal">
        <div class="shop-stat glass"><span class="stat-icon green"><i class="ti ti-bolt"></i></span><div><small>Lifetime XP</small><strong>{{ userStore.xp }}</strong></div></div>
        <div class="shop-stat glass"><span class="stat-icon orange"><i class="ti ti-flame"></i></span><div><small>Streak</small><strong>{{ userStore.streakCount }} kun</strong></div></div>
        <div class="shop-stat glass"><span class="stat-icon blue"><i class="ti ti-heart"></i></span><div><small>Lives</small><strong>{{ userStore.currentLives }}/5</strong></div></div>
      </section>

      <section v-if="!userStore.profile?.shopWelcomeBonusClaimed" class="starter-card glass reveal">
        <div class="starter-glow"></div>
        <div class="starter-icon"><i class="ti ti-gift"></i></div>
        <div class="starter-copy">
          <span class="section-kicker">WELCOME REWARD</span>
          <h2>Shopni sinab ko‘ring</h2>
          <p>Yangi hisob uchun bir martalik <strong>250 gems</strong> bonus. Power-up'larni darhol sinab ko‘rishingiz mumkin.</p>
        </div>
        <button class="starter-btn" :disabled="buyingId === 'starter'" @click="handleStarterBonus">
          {{ buyingId === 'starter' ? 'Olinmoqda…' : '250 gems olish' }}
        </button>
      </section>

      <section class="shop-section reveal">
        <div class="section-heading-row">
          <div><span class="section-kicker">POWER-UPS</span><h2>O‘yinni kuchaytirish</h2></div>
          <span class="section-note">Gems bilan olinadi</span>
        </div>

        <div class="shop-grid power-grid">
          <article class="shop-card glass featured-card">
            <div class="item-topline"><span class="item-badge blue-badge">STREAK</span><span class="item-price"><i class="ti ti-diamond"></i> 200</span></div>
            <div class="shop-art freeze-art"><i class="ti ti-snowflake"></i><span></span></div>
            <h3>Streak Freeze</h3>
            <p>Bir kunni o‘tkazib yuborsangiz ham streakingizni saqlab qoladi.</p>
            <div class="owned-row"><span>{{ userStore.streakFreezeCount }}/3 saqlangan</span><strong>{{ userStore.streakFreezeCount >= 3 ? 'MAX' : 'READY' }}</strong></div>
            <button class="shop-buy-btn primary" :disabled="buyingId || userStore.streakFreezeCount >= 3 || userStore.gems < 200" @click="handleBuyFreeze">
              {{ userStore.streakFreezeCount >= 3 ? 'To‘liq' : buyingId === 'freeze' ? 'Sotib olinmoqda…' : '200 gems' }}
            </button>
          </article>

          <article class="shop-card glass">
            <div class="item-topline"><span class="item-badge pink-badge">ENERGY</span><span class="item-price"><i class="ti ti-diamond"></i> 120</span></div>
            <div class="shop-art heart-art"><i class="ti ti-heart-filled"></i><span>+5</span></div>
            <h3>Full Hearts</h3>
            <p>5 ta life'ni birdaniga tiklab, mashqni to‘xtatmasdan davom eting.</p>
            <div class="owned-row"><span>Hozir: {{ userStore.currentLives }}/5</span><strong>INSTANT</strong></div>
            <button class="shop-buy-btn primary" :disabled="buyingId || userStore.currentLives >= 5 || userStore.gems < 120" @click="handleRefillLives">
              {{ userStore.currentLives >= 5 ? 'To‘liq' : buyingId === 'lives' ? 'Tiklanmoqda…' : '120 gems' }}
            </button>
          </article>

          <article class="shop-card glass">
            <div class="item-topline"><span class="item-badge green-badge">BOOST</span><span class="item-price"><i class="ti ti-diamond"></i> 150</span></div>
            <div class="shop-art boost-art"><i class="ti ti-bolt-filled"></i><span>1.5× XP</span></div>
            <h3>XP Boost</h3>
            <p>30 daqiqa davomida har bir practice'dan ko‘proq XP oling.</p>
            <div class="owned-row"><span>{{ xpBoostLabel }}</span><strong>30 MIN</strong></div>
            <button class="shop-buy-btn primary" :disabled="buyingId || userStore.gems < 150" @click="handleBuyBoost">
              {{ buyingId === 'boost' ? 'Faollashtirilmoqda…' : '150 gems' }}
            </button>
          </article>

          <article class="shop-card glass featured-chest">
            <div class="item-topline"><span class="item-badge purple-badge">RANDOM REWARD</span><span class="item-price"><i class="ti ti-diamond"></i> 250</span></div>
            <div class="shop-art chest-art"><i class="ti ti-gift"></i><span class="chest-shine"></span></div>
            <h3>Mystery Chest</h3>
            <p>Random reward: gems, Streak Freeze yoki XP Boost vaqtini oling.</p>
            <div class="owned-row"><span>Ochilsa darhol reward beradi</span><strong>INSTANT</strong></div>
            <button class="shop-buy-btn purple-btn" :disabled="buyingId || userStore.gems < 250" @click="handleOpenChest">
              {{ buyingId === 'chest' ? 'Ochilyapti…' : userStore.gems < 250 ? '250 gems kerak' : 'Chestni ochish' }}
            </button>
          </article>
        </div>
      </section>

      <section class="shop-section reveal">
        <div class="section-heading-row">
          <div><span class="section-kicker">PROFILE LAB</span><h2>Avatar collection</h2></div>
          <router-link to="/profile" class="section-link">Profilga o‘tish <i class="ti ti-arrow-right"></i></router-link>
        </div>

        <div class="avatar-grid">
          <button v-for="emoji in freeAvatars" :key="emoji" class="avatar-card glass" :class="{ selected: userStore.profile?.avatar === emoji }" @click="selectAvatar(emoji)">
            <span>{{ emoji }}</span><small>{{ userStore.profile?.avatar === emoji ? 'Tanlangan' : 'Tanlash' }}</small>
          </button>
          <button v-for="emoji in proAvatars" :key="emoji" class="avatar-card glass pro-avatar" :class="{ locked: !userStore.isPro, selected: userStore.profile?.avatar === emoji }" @click="selectProAvatar(emoji)">
            <span>{{ userStore.isPro ? emoji : '🔒' }}</span><small>{{ userStore.isPro ? (userStore.profile?.avatar === emoji ? 'Tanlangan' : 'Pro avatar') : 'Pro' }}</small>
          </button>
        </div>
      </section>

      <div v-if="feedback" class="shop-feedback" :class="{ error: feedbackIsError }" v-pop-in>
        <i :class="feedbackIsError ? 'ti ti-alert-circle' : 'ti ti-circle-check'"></i>{{ feedback }}
      </div>

      <section class="earn-card glass reveal">
        <div class="earn-icon"><i class="ti ti-diamond"></i></div>
        <div><span class="section-kicker">KEEP EARNING</span><h3>Gems qanday yig‘iladi?</h3><p>Har bir to‘g‘ri javob va lesson yakunidan keyin gems avtomatik qo‘shiladi. Ko‘proq practice → ko‘proq reward.</p></div>
        <router-link to="/learning-path" class="earn-btn">Darsga qaytish <i class="ti ti-arrow-right"></i></router-link>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore, AVATAR_OPTIONS, PRO_AVATAR_OPTIONS } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'

const userStore = useUserStore()
const buyingId = ref('')
const feedback = ref('')
const feedbackIsError = ref(false)
const freeAvatars = AVATAR_OPTIONS
const proAvatars = PRO_AVATAR_OPTIONS

const xpBoostLabel = computed(() => {
  const until = Number(userStore.profile?.xpBoostUntil || 0)
  if (!until || until <= Date.now()) return 'Faol emas'
  const mins = Math.max(1, Math.ceil((until - Date.now()) / 60000))
  return `${mins} daqiqa qoldi`
})

function setFeedback(message, isError = false) {
  feedback.value = message
  feedbackIsError.value = isError
  window.clearTimeout(setFeedback.timer)
  setFeedback.timer = window.setTimeout(() => { feedback.value = '' }, 4200)
}

async function runPurchase(id, action, successMessage) {
  buyingId.value = id
  try {
    const result = await action()
    if (result?.success) setFeedback(successMessage)
    else setFeedback(result?.reason === 'not-enough-gems' ? 'Gems yetarli emas. Avval yana bir nechta dars bajaring.' : result?.reason === 'full-lives' ? 'Sizda allaqachon 5 ta life bor.' : 'Bu itemni hozir olishning iloji bo‘lmadi.', true)
  } catch {
    setFeedback('Xatolik yuz berdi. Qaytadan urinib ko‘ring.', true)
  } finally {
    buyingId.value = ''
  }
}

function handleBuyFreeze() { runPurchase('freeze', () => userStore.buyStreakFreeze(), 'Streak Freeze sotib olindi. 🔥') }
function handleRefillLives() { runPurchase('lives', () => userStore.buyLivesRefill(), '5 ta heart qayta tiklandi. ❤️') }
function handleBuyBoost() { runPurchase('boost', () => userStore.buyXpBoost(30), 'XP Boost 30 daqiqaga faollashdi. ⚡') }
function handleStarterBonus() {
  runPurchase('starter', () => userStore.claimShopStarterBonus(), '250 gems bonus olindi. Endi Shopni sinab ko‘ring! 💎')
}

async function handleOpenChest() {
  buyingId.value = 'chest'
  try {
    const result = await userStore.openMysteryChest()
    if (result?.success) setFeedback(`🎁 ${result.reward.label}`)
    else setFeedback(result?.reason === 'not-enough-gems' ? 'Chest uchun 250 gems kerak.' : 'Chestni hozir ochib bo‘lmadi.', true)
  } catch {
    setFeedback('Chestni ochishda xatolik yuz berdi.', true)
  } finally {
    buyingId.value = ''
  }
}

async function selectAvatar(emoji) {
  try { await userStore.updateAvatar(emoji); setFeedback('Avatar yangilandi.') } catch { setFeedback('Avatarni o‘zgartirib bo‘lmadi.', true) }
}
async function selectProAvatar(emoji) {
  if (!userStore.isPro) { setFeedback('Bu avatar EnglishXP Pro uchun.', true); return }
  await selectAvatar(emoji)
}
</script>

<style scoped>
.shop-page{min-height:100vh;position:relative}.shop-content{padding:40px 24px 90px;position:relative;z-index:1}.shop-hero{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:22px}.shop-eyebrow,.section-kicker{font-size:11px;letter-spacing:.12em;font-weight:900;color:var(--accent-dim)}.shop-eyebrow{display:inline-flex;align-items:center;gap:7px}.shop-title{font-family:'Manrope',sans-serif;font-size:38px;line-height:1;margin:9px 0 10px;font-weight:900;letter-spacing:-.04em}.shop-sub{color:var(--text-secondary);max-width:650px;margin:0;line-height:1.55;font-size:14px}.balance-card{min-width:175px;padding:16px 18px;display:flex;align-items:center;gap:13px}.balance-icon{width:44px;height:44px;border-radius:14px;background:rgba(94,190,255,.13);color:#5ebeff;display:flex;align-items:center;justify-content:center;font-size:20px}.balance-card div:last-child{display:grid;grid-template-columns:auto auto;column-gap:6px;align-items:end}.balance-card span{grid-column:1/-1;color:var(--text-muted);font-size:11px}.balance-card strong{font-size:24px}.balance-card small{color:#5ebeff;font-weight:800}.shop-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:42px}.shop-stat{padding:16px;display:flex;align-items:center;gap:13px}.stat-icon{width:42px;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:19px}.stat-icon.green{background:var(--accent-soft);color:var(--accent-dim)}.stat-icon.orange{background:rgba(250,157,70,.12);color:#e58a30}.stat-icon.blue{background:rgba(94,190,255,.12);color:#4aa9e7}.shop-stat small{display:block;color:var(--text-muted);font-size:11px}.shop-stat strong{display:block;font-size:17px;margin-top:2px}.shop-section{margin-top:28px}.section-heading-row{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:14px}.section-heading-row h2{font:800 22px/1.2 'Manrope',sans-serif;margin:5px 0 0}.section-note,.section-link{color:var(--text-muted);font-size:12px;font-weight:700}.section-link{color:var(--accent-dim);display:flex;align-items:center;gap:5px}.shop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.shop-card{padding:16px;min-height:390px;display:flex;flex-direction:column}.item-topline{display:flex;justify-content:space-between;align-items:center}.item-badge{font-size:9px;font-weight:900;letter-spacing:.08em;padding:5px 7px;border-radius:999px}.blue-badge{background:rgba(94,190,255,.12);color:#5ebeff}.pink-badge{background:rgba(255,91,98,.12);color:#ff6a70}.green-badge{background:var(--accent-soft);color:var(--accent-dim)}.purple-badge{background:rgba(143,103,255,.12);color:#9475ff}.item-price{font-size:12px;font-weight:900;display:flex;align-items:center;gap:5px}.item-price i{color:#5ebeff}.item-price.muted{color:var(--text-muted)}.shop-art{height:150px;margin:14px 0;border-radius:17px;background:linear-gradient(145deg,rgba(60,230,125,.08),rgba(13,17,16,.025));border:1px solid var(--card-border);position:relative;display:flex;align-items:center;justify-content:center;font-size:55px;overflow:hidden}.shop-art:after{content:'';position:absolute;width:180px;height:70px;border-radius:50%;bottom:-37px;background:rgba(255,255,255,.05)}.freeze-art{color:#5ebeff;background:linear-gradient(145deg,rgba(94,190,255,.10),rgba(94,190,255,.03))}.freeze-art span{position:absolute;width:90px;height:90px;border-radius:50%;border:1px solid rgba(94,190,255,.18)}.heart-art{color:#ff6269;background:linear-gradient(145deg,rgba(255,98,105,.10),rgba(255,98,105,.02));}.heart-art span,.boost-art span{position:absolute;bottom:12px;right:12px;padding:5px 7px;border-radius:8px;background:rgba(0,0,0,.12);font:900 10px Inter,sans-serif;color:var(--card-text-primary)}.boost-art{color:#a4e33b;background:linear-gradient(145deg,rgba(60,230,125,.11),rgba(60,230,125,.02))}.chest-art{color:#aa8cff;background:linear-gradient(145deg,rgba(143,103,255,.11),rgba(143,103,255,.02))}.shop-card h3{font:800 17px/1.2 'Manrope',sans-serif;margin:2px 0 7px}.shop-card p{font-size:12px;line-height:1.5;color:var(--text-secondary);margin:0 0 12px}.owned-row{margin-top:auto;margin-bottom:11px;display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--text-muted);font-size:10px}.owned-row strong{color:var(--accent-dim);font-size:9px;letter-spacing:.05em}.shop-buy-btn{width:100%;border-radius:12px;padding:12px 10px;border:1px solid var(--card-border);font-weight:900;font-size:12px}.shop-buy-btn.primary{background:var(--accent);color:#07130b;border-color:var(--accent)}.shop-buy-btn.primary:hover:not(:disabled){filter:brightness(1.04);transform:translateY(-1px)}.shop-buy-btn.secondary{background:var(--surface-glass);color:var(--text-muted)}.shop-buy-btn:disabled{opacity:.48;cursor:not-allowed;transform:none}.coming-card{opacity:.74}.avatar-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:10px}.avatar-card{padding:12px 8px;border:1px solid var(--card-border);display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer}.avatar-card span{font-size:30px;line-height:1}.avatar-card small{font-size:9px;color:var(--text-muted);font-weight:800}.avatar-card:hover{transform:translateY(-2px)}.avatar-card.selected{border-color:var(--accent);box-shadow:0 12px 30px -20px var(--accent)}.pro-avatar{background:linear-gradient(145deg,rgba(232,152,58,.06),transparent)}.pro-avatar.locked{cursor:not-allowed;opacity:.65}.shop-feedback{margin:18px 0 0;padding:13px 16px;border-radius:13px;background:rgba(60,230,125,.10);color:var(--accent-dim);font-size:13px;font-weight:700;display:flex;gap:8px;align-items:center}.shop-feedback.error{background:rgba(224,87,92,.10);color:#d55358}.earn-card{margin-top:28px;padding:18px 20px;display:flex;align-items:center;gap:15px}.earn-icon{width:44px;height:44px;border-radius:14px;background:rgba(94,190,255,.12);color:#5ebeff;display:flex;align-items:center;justify-content:center;font-size:19px;flex:0 0 auto}.earn-card h3{font:800 16px/1.2 'Manrope',sans-serif;margin:4px 0}.earn-card p{margin:0;color:var(--text-secondary);font-size:12px;line-height:1.5}.earn-btn{margin-left:auto;white-space:nowrap;display:inline-flex;align-items:center;gap:7px;color:var(--accent-dim);font-size:12px;font-weight:900}
.starter-card{position:relative;overflow:hidden;margin-bottom:28px;padding:20px 22px;display:flex;align-items:center;gap:16px;border-color:rgba(60,230,125,.24);background:linear-gradient(110deg,rgba(60,230,125,.10),rgba(255,255,255,.025))}.starter-glow{position:absolute;inset:auto -40px -70px auto;width:220px;height:150px;border-radius:50%;background:rgba(60,230,125,.12);filter:blur(25px);pointer-events:none}.starter-icon{width:48px;height:48px;flex:0 0 auto;border-radius:15px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-dim);font-size:21px}.starter-copy{position:relative;z-index:1}.starter-copy h2{font:900 20px/1.2 'Manrope',sans-serif;margin:4px 0 5px}.starter-copy p{margin:0;color:var(--text-secondary);font-size:12px;line-height:1.5}.starter-copy strong{color:var(--text-primary)}.starter-btn{margin-left:auto;position:relative;z-index:1;white-space:nowrap;border:0;border-radius:12px;padding:12px 15px;background:var(--accent);color:#07130b;font-weight:900;font-size:12px}.starter-btn:disabled{opacity:.6;cursor:not-allowed}.purple-btn{background:linear-gradient(135deg,#9b7aff,#7556e8)!important;color:#fff!important;border-color:transparent!important}.featured-chest .shop-art{background:radial-gradient(circle at 50% 42%,rgba(153,119,255,.20),transparent 55%),linear-gradient(145deg,rgba(143,103,255,.11),rgba(143,103,255,.02))}.chest-shine{position:absolute;width:110px;height:40px;top:25px;border-radius:50%;background:rgba(255,255,255,.08);filter:blur(8px)}

@media(max-width:1050px){.shop-grid{grid-template-columns:repeat(2,1fr)}.avatar-grid{grid-template-columns:repeat(6,1fr)}}
@media(max-width:700px){.shop-content{padding:25px 16px 78px}.shop-hero{align-items:flex-start;flex-direction:column}.shop-title{font-size:32px}.balance-card{width:100%}.shop-stat-grid{grid-template-columns:1fr 1fr}.shop-stat:last-child{grid-column:span 2}.section-heading-row{align-items:flex-start;gap:10px;flex-direction:column}.shop-grid{grid-template-columns:1fr}.avatar-grid{grid-template-columns:repeat(4,1fr)}.earn-card{align-items:flex-start;flex-wrap:wrap}.earn-btn{margin-left:59px}}
</style>
