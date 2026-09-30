<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[640px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-microphone-2" aria-hidden="true" style="color: var(--accent);"></i>
          Nutq mashqi
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Mavzu tanlang, 30-90 soniya gapiring — sun'iy intellekt nutqingizni tahlil qiladi
        </p>
      </div>

      <!-- Not Pro -->
      <div v-if="!userStore.isPro" class="glass reveal rounded-[24px] p-8 text-center">
        <div class="text-3xl mb-2" style="color: #e8983a;"><i class="ti ti-crown" aria-hidden="true"></i></div>
        <h2 class="font-[Manrope] text-xl font-bold m-0 mb-2">Nutq mashqi — Pro funksiya</h2>
        <p class="text-sm mb-6 leading-relaxed" style="color: var(--text-secondary);">
          Erkin mavzuda gapiring va sun'iy intellektdan grammatika, so'z boyligi va ravonlik
          bo'yicha shaxsiy fikr-mulohaza oling — xuddi real ustoz bilan ishlagandek.
        </p>
        <router-link
          to="/upgrade"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px]"
          style="background: linear-gradient(135deg, #f6c453, #e8983a); color: #4a2e00;"
        >
          <i class="ti ti-crown" aria-hidden="true"></i>
          Pro'ga o'tish
        </router-link>
      </div>

      <div v-else-if="!isMicSupported" class="glass reveal rounded-[20px] p-6 text-center">
        <i class="ti ti-microphone-off text-3xl mb-2 block" style="color: var(--text-muted);"></i>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Bu brauzer ovozni tanish funksiyasini qo'llab-quvvatlamaydi. Chrome, Edge yoki Safari'dan
          foydalaning.
        </p>
      </div>

      <!-- Topic picker -->
      <div v-else-if="!activeTopic" class="rp-grid reveal">
        <button
          v-for="t in topics"
          :key="t.id"
          class="glass topic-card"
          @click="selectTopic(t)"
        >
          <span class="topic-title">{{ t.title }}</span>
          <span class="topic-prompt">{{ t.prompt }}</span>
        </button>
      </div>

      <!-- Speaking session -->
      <div v-else class="reveal">
        <div class="glass rounded-[20px] p-5 mb-5 flex items-start gap-3">
          <button class="back-btn" @click="reset" title="Orqaga">
            <i class="ti ti-arrow-left" aria-hidden="true"></i>
          </button>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide mb-1" style="color: var(--text-muted);">
              {{ activeTopic.title }}
            </p>
            <p class="text-[15px] font-medium m-0" style="color: var(--text-primary);">
              {{ activeTopic.prompt }}
            </p>
          </div>
        </div>

        <!-- Recording controls -->
        <div v-if="!feedback" class="glass rounded-[24px] p-8 text-center">
          <div class="flex flex-col items-center gap-4 mb-6">
            <button
              type="button"
              class="w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-300"
              :class="recording ? 'animate-pulse' : 'hover:scale-105'"
              :style="recording
                ? 'background: rgba(229,72,77,0.15); color: #e5484d;'
                : 'background: var(--accent-soft); color: var(--accent);'"
              @click="toggleRecording"
              :disabled="submitting"
            >
              <i :class="recording ? 'ti ti-player-stop' : 'ti ti-microphone'" aria-hidden="true"></i>
            </button>
            <p class="text-xs m-0" style="color: var(--text-muted);">
              {{ recording ? 'Gapiring... tugatgach to\'xtatish tugmasini bosing' : 'Boshlash uchun bosing' }}
            </p>
            <p v-if="recording" class="text-sm font-bold" style="color: var(--accent);">{{ elapsedLabel }}</p>
          </div>

          <div v-if="liveTranscript" class="text-left rounded-[14px] p-4 text-sm leading-relaxed" style="background: var(--surface-glass); color: var(--text-secondary); min-height: 60px;">
            {{ liveTranscript }}
          </div>

          <button
            v-if="!recording && liveTranscript && !submitting"
            type="button"
            class="mt-5 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px] transition-transform hover:scale-105"
            style="background: var(--accent); color: #05130a;"
            @click="submitForFeedback"
          >
            <i class="ti ti-sparkles" aria-hidden="true"></i>
            Tahlilni olish
          </button>

          <p v-if="submitting" class="text-sm mt-5" style="color: var(--text-muted);">
            <i class="ti ti-loader-2 animate-spin" aria-hidden="true"></i> Tahlil qilinmoqda...
          </p>
          <p v-if="errorMsg" class="text-sm mt-4" style="color: #e5484d;">{{ errorMsg }}</p>
        </div>

        <!-- Feedback -->
        <div v-else class="glass rounded-[24px] p-7 reveal">
          <div class="text-center mb-6">
            <p class="text-xs font-semibold uppercase tracking-wide mb-1" style="color: var(--text-muted);">Umumiy baho</p>
            <p class="font-[Manrope] text-5xl font-extrabold m-0" style="color: var(--accent);">{{ feedback.score }}<span class="text-xl" style="color: var(--text-muted);">/10</span></p>
          </div>

          <div class="mb-5">
            <p class="text-sm font-bold mb-1.5 flex items-center gap-1.5" style="color: var(--text-primary);">
              <i class="ti ti-thumb-up" aria-hidden="true" style="color: var(--accent);"></i> Yaxshi tomonlari
            </p>
            <p class="text-sm m-0" style="color: var(--text-secondary);">{{ feedback.strengthsUz }}</p>
          </div>

          <div class="mb-5">
            <p class="text-sm font-bold mb-1.5 flex items-center gap-1.5" style="color: var(--text-primary);">
              <i class="ti ti-target-arrow" aria-hidden="true" style="color: #e8983a;"></i> Nimani yaxshilash kerak
            </p>
            <p class="text-sm m-0" style="color: var(--text-secondary);">{{ feedback.improvementsUz }}</p>
          </div>

          <div v-if="feedback.corrections.length" class="mb-5">
            <p class="text-sm font-bold mb-2 flex items-center gap-1.5" style="color: var(--text-primary);">
              <i class="ti ti-pencil" aria-hidden="true" style="color: #e5484d;"></i> Tuzatishlar
            </p>
            <div v-for="(c, i) in feedback.corrections" :key="i" class="text-sm mb-2 rounded-[10px] p-3" style="background: var(--surface-glass);">
              <span style="color: #e5484d; text-decoration: line-through;">{{ c.original }}</span>
              <br />
              <span style="color: var(--accent);">{{ c.better }}</span>
            </div>
          </div>

          <div v-if="feedback.newVocabulary.length" class="mb-6">
            <p class="text-sm font-bold mb-2 flex items-center gap-1.5" style="color: var(--text-primary);">
              <i class="ti ti-bulb" aria-hidden="true" style="color: #f6c453;"></i> Foydali so'zlar
            </p>
            <div v-for="(v, i) in feedback.newVocabulary" :key="i" class="text-sm mb-1.5 flex justify-between gap-3">
              <span class="font-semibold" style="color: var(--text-primary);">{{ v.word }}</span>
              <span style="color: var(--text-muted);">{{ v.meaning_uz || v.meaningUz }}</span>
            </div>
          </div>

          <div class="flex justify-center gap-2.5 flex-wrap">
            <button
              type="button"
              class="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-[15px]"
              style="background: var(--accent); color: #05130a;"
              @click="reset"
            >
              Yangi mavzu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, computed } from 'vue'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase/config.js'
import { useUserStore } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { createContinuousRecognizer, isRecognitionSupported } from '../composables/useSpeechRecognition.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

const isMicSupported = isRecognitionSupported()

const topics = [
  { id: 'daily-routine', title: 'Kunlik rejim', prompt: 'Describe your typical daily routine, from morning to night.' },
  { id: 'hometown', title: 'Tug\'ilgan shahar', prompt: 'Describe your hometown and what you like about it.' },
  { id: 'family', title: 'Oila', prompt: 'Talk about your family and your relationship with them.' },
  { id: 'hobby', title: 'Sevimli mashg\'ulot', prompt: 'Talk about a hobby you enjoy and why you like it.' },
  { id: 'dream-job', title: 'Orzudagi kasb', prompt: 'Describe your dream job and why you want it.' },
  { id: 'memorable-trip', title: 'Esda qolarli sayohat', prompt: 'Describe a trip or journey you remember well.' },
  { id: 'favorite-food', title: 'Sevimli taom', prompt: 'Talk about your favorite food and how it is made.' },
  { id: 'technology', title: 'Texnologiya', prompt: 'Talk about how technology has changed your daily life.' },
  { id: 'goals', title: 'Kelajak rejalari', prompt: 'Talk about your goals for the next five years.' },
  { id: 'a-book-or-movie', title: 'Kitob yoki film', prompt: 'Describe a book or movie that made an impression on you.' },
  { id: 'friendship', title: 'Do\'stlik', prompt: 'Talk about what makes a good friend, using examples.' },
  { id: 'environment', title: 'Atrof-muhit', prompt: 'Talk about one environmental problem and what could help solve it.' }
]

const activeTopic = ref(null)
const recording = ref(false)
const liveTranscript = ref('')
const submitting = ref(false)
const errorMsg = ref('')
const feedback = ref(null)
const elapsedSec = ref(0)
let timerId = null
let recognizer = null

const elapsedLabel = computed(() => {
  const m = Math.floor(elapsedSec.value / 60)
  const s = elapsedSec.value % 60
  return `${m}:${String(s).padStart(2, '0')}`
})

function selectTopic(t) {
  activeTopic.value = t
  liveTranscript.value = ''
  feedback.value = null
  errorMsg.value = ''
  refresh()
}

function reset() {
  stopRecognizer()
  activeTopic.value = null
  liveTranscript.value = ''
  feedback.value = null
  errorMsg.value = ''
  recording.value = false
  refresh()
}

function stopRecognizer() {
  clearInterval(timerId)
  if (recognizer) recognizer.stop()
}

function toggleRecording() {
  if (recording.value) {
    recording.value = false
    stopRecognizer()
    return
  }

  liveTranscript.value = ''
  errorMsg.value = ''
  elapsedSec.value = 0
  recording.value = true

  recognizer = createContinuousRecognizer({
    onTranscriptChange: (text) => { liveTranscript.value = text },
    onError: () => {
      errorMsg.value = 'Mikrofon xatosi yuz berdi. Qayta urinib ko\'ring.'
      recording.value = false
      clearInterval(timerId)
    }
  })
  recognizer.start()

  timerId = setInterval(() => {
    elapsedSec.value++
    if (elapsedSec.value >= 90) {
      recording.value = false
      stopRecognizer()
    }
  }, 1000)
}

async function submitForFeedback() {
  if (!liveTranscript.value.trim()) return
  submitting.value = true
  errorMsg.value = ''
  try {
    const call = httpsCallable(functions, 'speakingFeedback')
    const result = await call({
      topicId: activeTopic.value.id,
      transcript: liveTranscript.value,
      level: userStore.level
    })
    feedback.value = result.data
    await userStore.addXp(15)
    if (typeof feedback.value?.score === 'number') {
      userStore.recordSkillScore('speaking', feedback.value.score, 10)
    }
    refresh()
  } catch (err) {
    errorMsg.value = err?.message || 'Xatolik yuz berdi. Birozdan keyin qayta urinib ko\'ring.'
  } finally {
    submitting.value = false
  }
}

onBeforeUnmount(() => {
  stopRecognizer()
})
</script>

<style scoped>
.rp-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.topic-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 18px;
  border-radius: 16px;
  text-align: left;
  transition: transform 0.2s var(--ease-spring);
}

.topic-card:hover {
  transform: translateY(-3px);
}

.topic-title {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
}

.topic-prompt {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.back-btn {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-glass);
  color: var(--text-primary);
}

@media (max-width: 480px) {
  .rp-grid {
    grid-template-columns: 1fr;
  }
}
</style>
