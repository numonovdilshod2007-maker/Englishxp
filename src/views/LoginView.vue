<template>
  <div class="auth-page">
    <AuroraBackground />

    <div class="auth-shell">
      <div class="auth-brand">
        <router-link to="/" class="auth-logo">
          <i class="ti ti-bolt" aria-hidden="true" style="color: var(--accent); font-size: 28px;"></i>
          <span>English<span class="text-gradient">XP</span></span>
        </router-link>
        <blockquote class="auth-quote">
          "Har kuni 10 daqiqa &mdash; 3 oyda erkin gaplasha olasiz."
        </blockquote>
        <div class="auth-mini-stats">
          <div><span>10</span><small>Daraja</small></div>
          <div><span>600+</span><small>So'z</small></div>
          <div><span>100%</span><small>Bepul</small></div>
        </div>
      </div>

      <div class="glass auth-card" v-pop-in>

      <!-- STEP 1: Choice screen — asks the user directly whether they already have an account -->
      <Transition name="step-fade" mode="out-in">
        <div v-if="step === 'choice'" key="choice">
          <h1 class="auth-title">Xush kelibsiz 👋</h1>
          <p class="auth-subtitle">Avval bittasini tanlang</p>

          <div class="choice-grid">
            <button class="choice-card" @click="chooseStep('login')">
              <div class="choice-icon"><i class="ti ti-login" aria-hidden="true"></i></div>
              <div class="choice-text">
                <strong>Akkountim bor</strong>
                <span>Email va parol bilan kiraman</span>
              </div>
              <i class="ti ti-chevron-right choice-arrow" aria-hidden="true"></i>
            </button>

            <button class="choice-card choice-card--accent" @click="chooseStep('register')">
              <div class="choice-icon"><i class="ti ti-user-plus" aria-hidden="true"></i></div>
              <div class="choice-text">
                <strong>Akkountim yo'q</strong>
                <span>Yangi hisob ochaman</span>
              </div>
              <i class="ti ti-chevron-right choice-arrow" aria-hidden="true"></i>
            </button>
          </div>

          <div class="divider"><span>yoki</span></div>

          <button class="btn-google" @click="handleGoogleSignIn" :disabled="loading">
            <i class="ti ti-brand-google" aria-hidden="true"></i>
            Google orqali davom etish
          </button>
        </div>

        <!-- STEP 2: Login or Register form -->
        <div v-else key="form">
          <button class="back-btn" @click="step = 'choice'">
            <i class="ti ti-arrow-left" aria-hidden="true"></i> Orqaga
          </button>

          <h1 class="auth-title">{{ isRegister ? 'Ro\'yxatdan o\'tish' : 'Tizimga kirish' }}</h1>
          <p class="auth-subtitle">
            {{ isRegister ? 'Ism, email va parol kiriting' : 'Email va parolingizni kiriting' }}
          </p>

          <form @submit.prevent="handleSubmit" class="auth-form">
            <div v-if="isRegister" class="form-group">
              <label>Ismingiz</label>
              <input v-model="displayName" type="text" placeholder="Dilshod" required autofocus />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="email" type="email" placeholder="email@gmail.com" required :autofocus="!isRegister" />
            </div>
            <div class="form-group">
              <label>Parol</label>
              <input v-model="password" type="password" placeholder="••••••••" required minlength="6" />
            </div>

            <p v-if="error" class="auth-error">{{ error }}</p>

            <button type="submit" class="btn-primary auth-submit" :disabled="loading">
              {{ loading ? 'Yuklanmoqda...' : (isRegister ? 'Hisob yaratish' : 'Kirish') }}
            </button>
          </form>

          <p class="auth-switch">
            {{ isRegister ? 'Hisobingiz bormi?' : 'Hisobingiz yo\'qmi?' }}
            <button class="link-btn" @click="isRegister = !isRegister">
              {{ isRegister ? 'Kirish' : 'Ro\'yxatdan o\'tish' }}
            </button>
          </p>
        </div>
      </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import AuroraBackground from '../components/AuroraBackground.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// step controls which screen is shown: 'choice' -> 'login' | 'register'
const step = ref('choice')
const isRegister = ref(false)
const email = ref('')
const password = ref('')
const displayName = ref('')
const loading = ref(false)
const error = ref('')
const referralCode = typeof route.query.ref === 'string' ? route.query.ref : null

function chooseStep(target) {
  isRegister.value = target === 'register'
  step.value = 'form'
}

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    if (isRegister.value) {
      await userStore.signUpWithEmail(email.value, password.value, displayName.value, referralCode)
    } else {
      await userStore.signInWithEmail(email.value, password.value)
    }
    router.push('/dashboard')
  } catch (e) {
    error.value = mapFirebaseError(e.code)
  } finally {
    loading.value = false
  }
}

async function handleGoogleSignIn() {
  error.value = ''
  loading.value = true
  try {
    await userStore.signInWithGoogle()
    router.push('/dashboard')
  } catch (e) {
    error.value = mapFirebaseError(e.code)
  } finally {
    loading.value = false
  }
}

function mapFirebaseError(code) {
  const map = {
    'auth/email-already-in-use': 'Bu email allaqachon ro\'yxatdan o\'tgan.',
    'auth/invalid-email': 'Email manzili noto\'g\'ri.',
    'auth/weak-password': 'Parol kamida 6 belgidan iborat bo\'lishi kerak.',
    'auth/user-not-found': 'Foydalanuvchi topilmadi.',
    'auth/wrong-password': 'Parol noto\'g\'ri.',
    'auth/invalid-credential': 'Email yoki parol noto\'g\'ri.'
  }
  return map[code] || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.'
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
}

.auth-shell {
  width: 100%;
  max-width: 880px;
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: 28px;
  align-items: stretch;
  position: relative;
  z-index: 1;
}

@media (max-width: 780px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }
  .auth-brand {
    display: none;
  }
}

.auth-brand {
  border-radius: var(--radius-lg);
  background: linear-gradient(155deg, var(--accent-dim), var(--accent) 65%);
  color: #04140b;
  padding: 40px 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.auth-quote {
  font-family: 'Manrope', sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  opacity: 0.92;
}

.auth-mini-stats {
  display: flex;
  gap: 26px;
}

.auth-mini-stats div {
  display: flex;
  flex-direction: column;
}

.auth-mini-stats span {
  font-family: 'Manrope', sans-serif;
  font-size: 22px;
  font-weight: 800;
}

.auth-mini-stats small {
  font-size: 11.5px;
  font-weight: 600;
  opacity: 0.75;
}

.auth-card {
  width: 100%;
  padding: 44px 38px;
  position: relative;
  z-index: 1;
}

@media (max-width: 780px) {
  .auth-card {
    max-width: 408px;
    margin: 0 auto;
  }
}

.auth-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  margin-bottom: 32px;
}

.auth-title {
  font-family: 'Manrope', sans-serif;
  font-size: 27px;
  font-weight: 700;
  margin: 0 0 8px;
}

.auth-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0 0 28px;
}

.btn-google {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--surface-glass);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  padding: 14px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 14px;
  transition: background 0.25s var(--ease-premium), border-color 0.25s var(--ease-premium);
}

.btn-google:hover {
  background: var(--surface-glass-hover);
  border-color: var(--border-glass-strong);
}

.btn-google:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 26px 0;
  color: var(--text-muted);
  font-size: 12px;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border-glass);
}

.divider span {
  padding: 0 12px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

.form-group input {
  background: rgba(13, 17, 16, 0.03);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-sm);
  padding: 13px 14px;
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.25s var(--ease-premium), background 0.25s var(--ease-premium);
  font-family: inherit;
}

.form-group input:focus {
  border-color: var(--accent);
  background: rgba(60, 230, 125, 0.04);
}

.auth-error {
  color: #e0575c;
  background: rgba(224, 87, 92, 0.1);
  border: 1px solid rgba(224, 87, 92, 0.25);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  margin: 0;
}

.auth-submit {
  width: 100%;
  margin-top: 8px;
  justify-content: center;
}

.auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-switch {
  text-align: center;
  margin: 26px 0 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.link-btn {
  color: var(--accent);
  font-weight: 600;
  font-size: 14px;
  margin-left: 4px;
}

/* --- Step 1: choice cards --- */
.choice-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.choice-card {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 16px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border-glass);
  background: var(--surface-glass);
  text-align: left;
  transition: transform 0.2s var(--ease-premium), border-color 0.2s var(--ease-premium), background 0.2s var(--ease-premium);
}

.choice-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-glass-strong);
  background: var(--surface-glass-hover);
}

.choice-card--accent {
  border-color: var(--accent);
  background: rgba(60, 230, 125, 0.06);
}

.choice-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-dim);
  color: var(--accent);
  font-size: 20px;
}

.choice-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.choice-text strong {
  font-size: 15px;
  color: var(--text-primary);
}

.choice-text span {
  font-size: 12.5px;
  color: var(--text-secondary);
}

.choice-arrow {
  color: var(--text-muted);
  font-size: 18px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  transition: color 0.2s var(--ease-premium);
}

.back-btn:hover {
  color: var(--text-primary);
}

/* --- Step transition animation --- */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.22s var(--ease-premium), transform 0.22s var(--ease-premium);
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateX(14px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-14px);
}
</style>
