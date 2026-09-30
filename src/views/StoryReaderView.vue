<template>
  <div class="story-reader-page">
    <AuroraBackground />
    <AppNav />

    <div class="container reader-content" v-if="story">
      <div class="reader-header">
        <router-link to="/stories" class="back-link">
          <i class="ti ti-arrow-left" aria-hidden="true"></i>
          Orqaga
        </router-link>
        <h1 class="reader-title">{{ story.title }}</h1>
        <div class="reader-progress-bar">
          <div
            v-for="(s, idx) in progressSteps"
            :key="idx"
            class="progress-segment"
            :class="{ filled: idx < progressIndex, active: idx === progressIndex }"
          ></div>
        </div>
      </div>

      <!-- READING PHASE -->
      <div v-if="phase === 'reading'" class="glass reader-card" v-pop-in :key="`s-${sentenceIndex}`">
        <p class="reader-label">
          <i class="ti ti-book-2" aria-hidden="true"></i>
          Jumla {{ sentenceIndex + 1 }} / {{ story.sentences.length }}
        </p>
        <h2 class="sentence-en" @click="showTranslation = true">
          <span
            v-for="(token, i) in sentenceTokens"
            :key="i"
            :class="{ 'word-token': token.trim() }"
            @click.stop="token.trim() && onWordClick(token)"
          >{{ token }}</span>
        </h2>
        <p v-if="!showTranslation" class="tap-hint">
          <i class="ti ti-hand-click" aria-hidden="true"></i>
          Tarjimani ko'rish uchun bosing, notanish so'zga esa alohida bosing
        </p>
        <p v-else class="sentence-uz" v-pop-in>{{ currentSentence.uz }}</p>

        <div v-if="wordPopup" class="word-popup" v-pop-in @click.self="closeWordPopup">
          <div class="word-popup-inner">
            <strong>{{ wordPopup.display }}</strong>
            <span v-if="wordPopup.translation">— {{ wordPopup.translation }}</span>
            <span v-else class="word-popup-unknown">Bu so'z hali lug'atimizda yo'q</span>
            <span v-if="wordPopup.status === 'saved'" class="word-popup-badge">
              <i class="ti ti-check" aria-hidden="true"></i> Takrorlash ro'yxatiga qo'shildi
            </span>
            <button class="word-popup-close" @click="closeWordPopup">
              <i class="ti ti-x" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div v-if="showTranslation" class="answer-actions" v-pop-in>
          <button class="btn-primary continue-btn" @click="nextSentence">
            Davom etish
            <i class="ti ti-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- QUESTIONS PHASE -->
      <div v-else-if="phase === 'questions'" class="glass reader-card" v-pop-in :key="`q-${questionIndex}`">
        <p class="reader-label">
          <i class="ti ti-help-circle" aria-hidden="true"></i>
          Savol {{ questionIndex + 1 }} / {{ story.questions.length }}
        </p>
        <h2 class="question-text">{{ currentQuestion.question }}</h2>
        <div class="mc-options">
          <button
            v-for="opt in currentQuestion.options"
            :key="opt"
            class="mc-option"
            :class="mcOptionClass(opt)"
            :disabled="answered"
            @click="handleAnswer(opt)"
          >
            {{ opt }}
          </button>
        </div>

        <div v-if="answered" class="answer-actions" v-pop-in>
          <button class="btn-primary continue-btn" @click="nextQuestion">
            Davom etish
            <i class="ti ti-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- COMPLETE -->
      <div v-else class="glass completion-screen" v-pop-in>
        <i class="ti ti-confetti completion-icon" aria-hidden="true"></i>
        <h2>Ajoyib! Hikoya tugadi</h2>
        <p>Siz <span class="text-gradient">+{{ displayedXp }} XP</span> ishladingiz</p>
        <div class="completion-stats">
          <div>
            <span class="completion-num">{{ correctCount }}</span>
            <span class="completion-label">to'g'ri javob</span>
          </div>
          <div>
            <span class="completion-num">{{ story.questions.length }}</span>
            <span class="completion-label">jami savol</span>
          </div>
        </div>
        <div class="completion-actions">
          <router-link to="/stories" class="btn-primary completion-btn">
            Boshqa hikoya o'qish
          </router-link>
          <router-link to="/dashboard" class="btn-secondary completion-btn">
            Bosh sahifaga qaytish
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="container reader-content">
      <p class="not-found">Hikoya topilmadi.</p>
      <router-link to="/stories" class="btn-secondary">Hikoyalarga qaytish</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getStoryById, STORY_XP } from '../data/stories.js'
import { findWordByEn } from '../data/vocabulary.js'
import { useUserStore } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { animate } from 'animejs'

const route = useRoute()
const userStore = useUserStore()

const story = computed(() => getStoryById(route.params.id))

const phase = ref('reading') // reading -> questions -> complete
const sentenceIndex = ref(0)
const showTranslation = ref(false)

const questionIndex = ref(0)
const answered = ref(false)
const selectedOption = ref(null)
const correctCount = ref(0)

const sessionXp = ref(0)
const displayedXp = ref(0)

const currentSentence = computed(() => story.value?.sentences[sentenceIndex.value] || { en: '', uz: '' })

// Splits the current sentence into tappable word tokens (keeping the
// original spacing/punctuation for display) so the learner can tap any
// unfamiliar word to see its translation, without losing the existing
// tap-anywhere-for-full-sentence-translation behavior.
const sentenceTokens = computed(() => (currentSentence.value.en || '').split(/(\s+)/).filter((t) => t !== ''))

const wordPopup = ref(null) // { display, translation, status: 'known' | 'saved' | 'unknown' }

function cleanWord(token) {
  return token.toLowerCase().replace(/[^a-z']/g, '')
}

async function onWordClick(token) {
  const clean = cleanWord(token)
  if (!clean) return
  const entry = findWordByEn(clean)
  if (!entry) {
    wordPopup.value = { display: token.trim(), translation: null, status: 'unknown' }
    return
  }
  const result = await userStore.saveWordFromReading(clean)
  wordPopup.value = {
    display: token.trim(),
    translation: entry.uz,
    status: result === 'new' ? 'saved' : 'known'
  }
}

function closeWordPopup() {
  wordPopup.value = null
}
const currentQuestion = computed(() => story.value?.questions[questionIndex.value] || { question: '', options: [] })

const progressSteps = computed(() => {
  if (!story.value) return []
  return [...story.value.sentences, ...story.value.questions]
})

const progressIndex = computed(() => {
  if (!story.value) return 0
  if (phase.value === 'reading') return sentenceIndex.value
  if (phase.value === 'questions') return story.value.sentences.length + questionIndex.value
  return progressSteps.value.length
})

function nextSentence() {
  showTranslation.value = false
  wordPopup.value = null
  if (sentenceIndex.value < story.value.sentences.length - 1) {
    sentenceIndex.value++
  } else {
    phase.value = 'questions'
  }
  sessionXp.value += STORY_XP.perSentence
}

function mcOptionClass(opt) {
  if (!answered.value) return ''
  if (opt === currentQuestion.value.correct) return 'mc-correct'
  if (opt === selectedOption.value) return 'mc-wrong'
  return ''
}

function handleAnswer(opt) {
  if (answered.value) return
  answered.value = true
  selectedOption.value = opt
  if (opt === currentQuestion.value.correct) {
    correctCount.value++
    sessionXp.value += STORY_XP.correctAnswer
  }
}

async function nextQuestion() {
  answered.value = false
  selectedOption.value = null
  if (questionIndex.value < story.value.questions.length - 1) {
    questionIndex.value++
  } else {
    await finishStory()
  }
}

async function finishStory() {
  if (correctCount.value === story.value.questions.length) {
    sessionXp.value += STORY_XP.perfectBonus
  }
  await userStore.addXp(sessionXp.value)
  await userStore.markStoryCompleted(story.value.id)
  phase.value = 'complete'
  animateXp()
}

function animateXp() {
  displayedXp.value = 0
  const target = { v: 0 }
  animate(target, {
    v: sessionXp.value,
    duration: 900,
    ease: 'outExpo',
    onUpdate: () => { displayedXp.value = Math.round(target.v) }
  })
}

function resetReader() {
  phase.value = 'reading'
  sentenceIndex.value = 0
  showTranslation.value = false
  questionIndex.value = 0
  answered.value = false
  selectedOption.value = null
  correctCount.value = 0
  sessionXp.value = 0
  displayedXp.value = 0
}

onMounted(resetReader)
watch(() => route.params.id, resetReader)
</script>

<style scoped>
.reader-content {
  padding: 36px 24px 80px;
  max-width: 640px;
}

.reader-header {
  margin-bottom: 32px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 16px;
  transition: color 0.2s var(--ease-premium);
}

.back-link:hover {
  color: var(--text-primary);
}

.reader-title {
  font-family: 'Manrope', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 20px;
}

.reader-progress-bar {
  display: flex;
  gap: 6px;
}

.progress-segment {
  flex: 1;
  height: 5px;
  border-radius: 4px;
  background: rgba(13, 17, 16, 0.08);
  transition: background 0.3s var(--ease-premium);
}

.progress-segment.filled,
.progress-segment.active {
  background: var(--accent);
}

.reader-card {
  padding: 40px 32px;
  min-height: 280px;
  text-align: center;
}

.reader-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
  margin: 0 0 24px;
  font-weight: 500;
}

.sentence-en {
  font-family: 'Manrope', sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0 0 16px;
  cursor: pointer;
}

.word-token {
  border-radius: 6px;
  padding: 0 2px;
  transition: background 0.15s ease;
}
.word-token:hover {
  background: rgba(34, 197, 94, 0.18);
}

.word-popup {
  margin-top: 14px;
  display: flex;
  justify-content: center;
}
.word-popup-inner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  background: var(--surface-glass);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 14px;
  padding: 10px 36px 10px 14px;
  font-size: 14px;
}
.word-popup-unknown {
  color: var(--text-muted);
  font-style: italic;
}
.word-popup-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #22c55e;
  font-weight: 700;
}
.word-popup-close {
  position: absolute;
  top: 6px;
  right: 6px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
}

.tap-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 13px;
  margin: 0;
}

.sentence-uz {
  color: var(--accent-dim);
  font-size: 17px;
  font-weight: 600;
  margin: 0;
}

.question-text {
  font-family: 'Manrope', sans-serif;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0 0 24px;
}

.mc-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 480px) {
  .mc-options {
    grid-template-columns: 1fr;
  }
}

.mc-option {
  padding: 16px;
  border-radius: var(--radius-sm);
  background: rgba(13, 17, 16, 0.035);
  border: 1px solid var(--card-border);
  color: var(--card-text-primary);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: background 0.2s var(--ease-premium), border-color 0.2s var(--ease-premium);
}

.mc-option:hover:not(:disabled) {
  background: var(--accent-soft);
  border-color: var(--accent);
}

.mc-option:disabled {
  cursor: default;
}

.mc-correct {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent-dim);
  font-weight: 700;
}

.mc-wrong {
  background: rgba(220, 60, 60, 0.1);
  border-color: rgba(220, 60, 60, 0.4);
  color: #b8302f;
}

.answer-actions {
  margin-top: 28px;
}

.continue-btn {
  width: 100%;
  justify-content: center;
}

.completion-screen {
  text-align: center;
  padding: 64px 24px;
}

.completion-icon {
  font-size: 56px;
  color: var(--accent);
  margin-bottom: 22px;
  display: block;
}

.completion-screen h2 {
  font-family: 'Manrope', sans-serif;
  font-size: 27px;
  font-weight: 700;
  margin: 0 0 10px;
}

.completion-screen p {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0 0 34px;
}

.completion-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 38px;
}

.completion-num {
  display: block;
  font-family: 'Manrope', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: var(--accent-dim);
}

.completion-label {
  display: block;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
}

.completion-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.completion-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 320px;
}

.not-found {
  text-align: center;
  color: var(--text-secondary);
  margin: 60px 0 20px;
}
</style>
