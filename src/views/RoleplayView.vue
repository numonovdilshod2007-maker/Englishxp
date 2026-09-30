<template>
  <div class="rp-page">
    <AuroraBackground />
    <AppNav />

    <div class="container rp-content">
      <div class="rp-header reveal">
        <h1 class="rp-title">
          <i class="ti ti-message-2-bolt" aria-hidden="true" style="color: var(--accent);"></i>
          AI Roleplay
        </h1>
        <p class="rp-subtitle">Sun'iy intellekt bilan real vaziyatlarda ingliz tilida suhbatlashing</p>
      </div>

      <!-- Not Pro: upsell -->
      <div v-if="!userStore.isPro" class="glass rp-card reveal rp-upsell">
        <div class="rp-upsell-icon"><i class="ti ti-crown" aria-hidden="true"></i></div>
        <h2>AI Roleplay — Pro funksiya</h2>
        <p class="rp-intro">
          Kafeda buyurtma berish, ish suhbati, mehmonxonada ro'yxatdan o'tish kabi real vaziyatlarda
          AI bilan erkin yozishib, gapirish ko'nikmangizni mustahkamlang.
        </p>
        <router-link to="/upgrade" class="rp-cta-btn">
          <i class="ti ti-crown" aria-hidden="true"></i>
          Pro'ga o'tish
        </router-link>
      </div>

      <!-- Scenario picker -->
      <div v-else-if="!activeScenario" class="rp-scenarios reveal">
        <button
          v-for="(info, key) in scenarios"
          :key="key"
          class="glass rp-scenario-card"
          @click="startScenario(key)"
        >
          <span class="rp-scenario-emoji">{{ info.emoji }}</span>
          <span class="rp-scenario-title">{{ info.title }}</span>
          <span class="rp-scenario-desc">{{ info.desc }}</span>
        </button>
      </div>

      <!-- Chat -->
      <div v-else class="rp-chat-wrap reveal">
        <div class="glass rp-chat-header">
          <button class="rp-back-btn" @click="endScenario">
            <i class="ti ti-arrow-left" aria-hidden="true"></i>
          </button>
          <span class="rp-chat-title">{{ scenarios[activeScenario].emoji }} {{ scenarios[activeScenario].title }}</span>
          <button class="rp-back-btn" @click="restartScenario" title="Qaytadan boshlash">
            <i class="ti ti-refresh" aria-hidden="true"></i>
          </button>
        </div>

        <div class="rp-toggles">
          <button
            v-if="ttsSupported"
            class="rp-toggle-chip"
            :class="{ active: voiceReply }"
            @click="voiceReply = !voiceReply"
            type="button"
          >
            <i class="ti ti-volume" aria-hidden="true"></i> Ovozli javob
          </button>
          <button
            class="rp-toggle-chip"
            :class="{ active: wantCorrection }"
            @click="wantCorrection = !wantCorrection"
            type="button"
          >
            <i class="ti ti-checkbox" aria-hidden="true"></i> Xatolarni tuzatish
          </button>
        </div>

        <div ref="chatBody" class="glass rp-chat-body">
          <div v-for="(m, idx) in chatMessages" :key="idx">
            <div
              class="rp-bubble"
              :class="m.role === 'user' ? 'rp-bubble-user' : 'rp-bubble-ai'"
            >
              {{ m.content }}
            </div>
            <p v-if="m.correction" class="rp-correction">
              <i class="ti ti-bulb" aria-hidden="true"></i> {{ m.correction }}
            </p>
          </div>
          <div v-if="loading" class="rp-bubble rp-bubble-ai rp-bubble-typing">
            <span></span><span></span><span></span>
          </div>
          <p v-if="errorMsg" class="rp-error">{{ errorMsg }}</p>
        </div>

        <form class="rp-input-row" @submit.prevent="sendMessage">
          <button
            v-if="micSupported"
            type="button"
            class="rp-mic-btn"
            :class="{ listening: listening }"
            :disabled="loading"
            @click="startVoiceInput"
            title="Gapiring"
          >
            <i class="ti ti-microphone" aria-hidden="true"></i>
          </button>
          <input
            v-model="draft"
            type="text"
            class="rp-input"
            placeholder="Ingliz tilida yozing yoki gapiring..."
            :disabled="loading"
          />
          <button type="submit" class="rp-send-btn" :disabled="loading || !draft.trim()">
            <i class="ti ti-send" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed, onUnmounted } from 'vue'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase/config.js'
import { useUserStore } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { speakWord, isSpeechSupported } from '../composables/useSpeech.js'
import { isRecognitionSupported } from '../composables/useSpeechRecognition.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

const scenarios = {
  cafe: { emoji: '☕', title: 'Kafeda buyurtma berish', desc: 'Barista bilan kofe buyurtma qiling' },
  interview: { emoji: '💼', title: 'Ish suhbati', desc: 'HR menejer bilan intervyu' },
  hotel: { emoji: '🏨', title: 'Mehmonxonada ro\'yxatdan o\'tish', desc: 'Resepshn xodimi bilan gaplashing' },
  directions: { emoji: '🗺️', title: 'Yo\'l so\'rash', desc: 'Ko\'chada yo\'l so\'rang' },
  doctor: { emoji: '🩺', title: 'Shifokor qabulida', desc: 'Shifokorga alomatlaringizni tushuntiring' },
  airport: { emoji: '✈️', title: 'Aeroportda', desc: 'Aviakompaniya xodimi bilan ro\'yxatdan o\'ting' },
  shopping: { emoji: '🛍️', title: 'Do\'konda xarid', desc: 'Kiyim-kechak do\'konida sotuvchi bilan' },
  restaurant: { emoji: '🍽️', title: 'Restoranda', desc: 'Ofitsiantga buyurtma bering' },
  bank: { emoji: '🏦', title: 'Bankda', desc: 'Yangi hisob ochish haqida so\'rang' },
  smalltalk: { emoji: '🎉', title: 'Yangi tanish', desc: 'Tadbirda begona odam bilan tanishing' },
  landlord: { emoji: '🏠', title: 'Kvartira ijarasi', desc: 'Uy egasi bilan kvartira ko\'ring' },
  university: { emoji: '🎓', title: 'Universitetda', desc: 'Akademik maslahatchi bilan gaplashing' },
  phone: { emoji: '📞', title: 'Telefon qo\'ng\'irog\'i', desc: 'Qo\'llab-quvvatlash xizmati bilan' },
  freetalk: { emoji: '💬', title: 'Erkin suhbat', desc: 'Istalgan mavzuda erkin gaplashing' }
}

const activeScenario = ref(null)
const chatMessages = ref([])
const draft = ref('')
const loading = ref(false)
const errorMsg = ref('')
const chatBody = ref(null)
const voiceReply = ref(true)
const wantCorrection = ref(true)
const listening = ref(false)
const micSupported = isRecognitionSupported()
const ttsSupported = isSpeechSupported()

// Tracks this scenario session's correction-based accuracy (only counted
// when "wantCorrection" is on, since that's the only signal we have on
// whether a user message was correct). Flushed to Analytics on
// end/restart/unmount so the Speaking skill % reflects Roleplay too.
const sessionCorrect = ref(0)
const sessionTotal = ref(0)

function flushSpeakingStats() {
  if (sessionTotal.value > 0) {
    userStore.recordSkillScore('speaking', sessionCorrect.value, sessionTotal.value)
  }
  sessionCorrect.value = 0
  sessionTotal.value = 0
}

const OPENERS = {
  cafe: "Hi there! Welcome in — what can I get started for you today?",
  interview: "Thanks for coming in today. To start, can you tell me a little about yourself?",
  hotel: "Good evening and welcome! Do you have a reservation with us tonight?",
  directions: "Oh, hi! You look a little lost — can I help you find something?",
  doctor: "Hello, please have a seat. What brings you in today?",
  airport: "Good morning! Passport and ticket, please. Where are you flying to today?",
  shopping: "Hi! Let me know if you need any help finding your size or a color.",
  restaurant: "Welcome! Here's the menu — can I start you off with something to drink?",
  bank: "Good afternoon! I understand you'd like to open a new account with us?",
  smalltalk: "Hey, I don't think we've met yet! I'm Alex. How do you know the host?",
  landlord: "Hi, thanks for coming! This is the living room — feel free to look around.",
  university: "Welcome, and congratulations on joining us! What are you thinking of majoring in?",
  phone: "Thank you for calling support, my name is Sam. Can I get your account number?",
  freetalk: "Hey! Good to chat with you. So, what's on your mind today?"
}

function startVoiceInput() {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Ctor || listening.value) return
  const recognition = new Ctor()
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  listening.value = true
  recognition.onresult = (event) => {
    const text = event.results?.[0]?.[0]?.transcript
    if (text) draft.value = text
  }
  recognition.onerror = () => { listening.value = false }
  recognition.onend = () => { listening.value = false }
  recognition.start()
}

function startScenario(key) {
  flushSpeakingStats()
  activeScenario.value = key
  chatMessages.value = [{ role: 'assistant', content: OPENERS[key] }]
  errorMsg.value = ''
  draft.value = ''
  nextTick(() => refresh())
}

function restartScenario() {
  if (activeScenario.value) startScenario(activeScenario.value)
}

function endScenario() {
  flushSpeakingStats()
  activeScenario.value = null
  chatMessages.value = []
  nextTick(() => refresh())
}

onUnmounted(() => {
  flushSpeakingStats()
})

async function scrollToBottom() {
  await nextTick()
  if (chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight
}

async function sendMessage() {
  const text = draft.value.trim()
  if (!text || loading.value) return

  chatMessages.value.push({ role: 'user', content: text })
  draft.value = ''
  errorMsg.value = ''
  loading.value = true
  scrollToBottom()

  try {
    const call = httpsCallable(functions, 'roleplayChat')
    const result = await call({
      scenario: activeScenario.value,
      messages: chatMessages.value,
      level: userStore.level,
      wantCorrection: wantCorrection.value
    })
    if (result.data.correction) {
      const lastUser = [...chatMessages.value].reverse().find((m) => m.role === 'user')
      if (lastUser) lastUser.correction = result.data.correction
    }
    if (wantCorrection.value) {
      sessionTotal.value += 1
      if (!result.data.correction) sessionCorrect.value += 1
    }
    chatMessages.value.push({ role: 'assistant', content: result.data.reply })
    if (voiceReply.value && ttsSupported) speakWord(result.data.reply)
    // A short, natural back-and-forth is itself good speaking/writing practice.
    await userStore.addXp(3, 'speaking')
    userStore.incrementDailyStat('speakingCompleted')
  } catch (err) {
    errorMsg.value = err?.message || 'Xatolik yuz berdi. Birozdan keyin qayta urinib ko\'ring.'
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.rp-content {
  padding: 36px 24px 80px;
  max-width: 640px;
}

.rp-header {
  text-align: center;
  margin-bottom: 24px;
}

.rp-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 6px;
}

.rp-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.rp-card {
  padding: 32px 24px;
  text-align: center;
}

.rp-intro {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 22px;
}

.rp-upsell-icon {
  font-size: 34px;
  color: #e8983a;
  margin-bottom: 10px;
}

.rp-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 100px;
  background: linear-gradient(135deg, #f6c453, #e8983a);
  color: #4a2e00;
  font-weight: 700;
  font-size: 15px;
  transition: transform 0.2s var(--ease-spring);
}

.rp-cta-btn:hover {
  transform: scale(1.04);
}

.rp-scenarios {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.rp-scenario-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 18px;
  border-radius: 16px;
  text-align: left;
  transition: transform 0.2s var(--ease-spring);
}

.rp-scenario-card:hover {
  transform: translateY(-3px);
}

.rp-scenario-emoji {
  font-size: 26px;
}

.rp-scenario-title {
  font-weight: 700;
  font-size: 15px;
}

.rp-scenario-desc {
  font-size: 12px;
  color: var(--text-muted);
}

.rp-chat-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rp-chat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 16px;
}

.rp-chat-title {
  flex: 1;
  font-weight: 700;
  font-size: 15px;
}

.rp-back-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-glass);
  color: var(--text-primary);
  flex-shrink: 0;
}

.rp-chat-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border-radius: 16px;
  min-height: 360px;
  max-height: 480px;
  overflow-y: auto;
}

.rp-bubble {
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.45;
}

.rp-bubble-ai {
  align-self: flex-start;
  background: var(--surface-glass);
  color: var(--text-primary);
  border-bottom-left-radius: 4px;
}

.rp-bubble-user {
  align-self: flex-end;
  background: var(--accent);
  color: #0d1110;
  border-bottom-right-radius: 4px;
}

.rp-bubble-typing {
  display: flex;
  gap: 4px;
  padding: 14px;
}

.rp-bubble-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: rp-blink 1.1s infinite ease-in-out;
}

.rp-bubble-typing span:nth-child(2) { animation-delay: 0.15s; }
.rp-bubble-typing span:nth-child(3) { animation-delay: 0.3s; }

@keyframes rp-blink {
  0%, 80%, 100% { opacity: 0.25; }
  40% { opacity: 1; }
}

.rp-error {
  color: #e5484d;
  font-size: 13px;
  margin: 4px 0 0;
}

.rp-toggles {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.rp-toggle-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 100px;
  background: var(--surface-glass);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.rp-toggle-chip.active {
  background: var(--accent);
  color: #0d1110;
}

.rp-correction {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  align-self: flex-end;
  max-width: 78%;
  margin: 4px 0 0 auto;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(246, 196, 83, 0.14);
  color: #e8983a;
  font-size: 12px;
  line-height: 1.4;
}

.rp-mic-btn {
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-glass);
  color: var(--text-primary);
  transition: transform 0.2s var(--ease-spring);
}

.rp-mic-btn.listening {
  background: #e5484d;
  color: #fff;
  animation: rp-mic-pulse 1s infinite;
}

@keyframes rp-mic-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.rp-mic-btn:not(:disabled):hover {
  transform: scale(1.06);
}

.rp-input-row {
  display: flex;
  gap: 8px;
}

.rp-input {
  flex: 1;
  padding: 13px 16px;
  border-radius: 100px;
  background: var(--surface-glass);
  color: var(--text-primary);
  font-size: 14px;
  border: 1px solid transparent;
}

.rp-input:focus {
  outline: none;
  border-color: var(--accent);
}

.rp-send-btn {
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--accent);
  color: #0d1110;
  transition: transform 0.2s var(--ease-spring);
}

.rp-send-btn:disabled {
  opacity: 0.4;
}

.rp-send-btn:not(:disabled):hover {
  transform: scale(1.06);
}

@media (max-width: 480px) {
  .rp-scenarios {
    grid-template-columns: 1fr;
  }
}
</style>
