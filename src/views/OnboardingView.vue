<template>
  <div class="onboarding-page">
    <AuroraBackground />

    <div class="container onboarding-content">

      <!-- Intro screen -->
      <div v-if="stage === 'intro'" class="glass onboarding-card" v-pop-in>
        <div class="onboarding-icon">
          <i class="ti ti-target-arrow" aria-hidden="true"></i>
        </div>
        <h1>Darajangizni aniqlaymiz</h1>
        <p class="onboarding-subtitle">
          {{ questions.length }} ta qisqa savolga javob bering — tizim sizga mos darajadan boshlashni taklif qiladi.
          Bilmasangiz ham xavotir olmang, bu shunchaki boshlang'ich nuqtani belgilash uchun.
        </p>
        <button class="btn-primary onboarding-start-btn" @click="startTest">
          Testni boshlash
        </button>
        <button class="link-btn onboarding-skip-link" @click="handleSkip">
          Testsiz Level 1 dan boshlayman
        </button>
      </div>

      <!-- Quiz screen -->
      <div v-else-if="stage === 'quiz'" class="glass onboarding-card" v-pop-in>
        <div class="onboarding-progress">
          <div
            v-for="(q, i) in questions"
            :key="i"
            class="onboarding-dot"
            :class="{ 'onboarding-dot-done': i < currentIndex, 'onboarding-dot-active': i === currentIndex }"
          ></div>
        </div>

        <p class="onboarding-topic">{{ currentQuestion.topicTitle }}</p>
        <h2 class="onboarding-question">{{ currentQuestion.question }}</h2>

        <div class="mc-options">
          <button
            v-for="opt in currentQuestion.options"
            :key="opt"
            class="mc-option"
            :class="optionClass(opt)"
            :disabled="answered"
            @click="selectOption(opt)"
          >
            {{ opt }}
          </button>
        </div>

        <button v-if="answered" class="btn-primary onboarding-next-btn" @click="nextQuestion" v-pop-in>
          {{ currentIndex < questions.length - 1 ? 'Keyingi' : 'Natijani ko\'rish' }}
        </button>
      </div>

      <!-- Result screen -->
      <div v-else-if="stage === 'result'" class="glass onboarding-card" v-pop-in>
        <div class="onboarding-icon">
          <i class="ti ti-confetti" aria-hidden="true"></i>
        </div>
        <h1>Tayyor!</h1>
        <p class="onboarding-subtitle">
          {{ correctCount }} / {{ questions.length }} to'g'ri javob berdingiz.
          Siz uchun tavsiya etilgan boshlang'ich daraja:
        </p>

        <div class="suggested-level-card">
          <span class="suggested-level-num">Level {{ suggestedLevel }}</span>
          <span class="suggested-level-title">{{ suggestedLevelTitle }}</span>
        </div>

        <button class="btn-primary onboarding-start-btn" @click="confirmLevel(suggestedLevel)">
          Shu darajadan boshlayman
        </button>
        <button class="link-btn onboarding-skip-link" @click="showManualPicker = !showManualPicker">
          {{ showManualPicker ? 'Yashirish' : "O'zim tanlayman" }}
        </button>

        <div v-if="showManualPicker" class="manual-level-grid" v-pop-in>
          <button
            v-for="lvl in maxLevel"
            :key="lvl"
            class="manual-level-btn"
            :class="{ 'manual-level-btn-active': lvl === suggestedLevel }"
            @click="confirmLevel(lvl)"
          >
            {{ lvl }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import { grammar } from '../data/grammar.js'
import { levels, maxLevel } from '../data/vocabulary.js'
import AuroraBackground from '../components/AuroraBackground.vue'

const router = useRouter()
const userStore = useUserStore()

// One calibration question per selected level, spanning A1 → C1 difficulty.
const TEST_LEVELS = [1, 2, 4, 6, 8, 10, 12, 14]
const questions = TEST_LEVELS.map((lvl) => {
  const g = grammar.find((x) => x.level === lvl)
  const q = g.exercises[0]
  return { level: lvl, topicTitle: g.title, question: q.question, options: q.options, correct: q.correct }
})

const stage = ref('intro')
const currentIndex = ref(0)
const answered = ref(false)
const selected = ref(null)
const results = ref([])
const showManualPicker = ref(false)

const currentQuestion = computed(() => questions[currentIndex.value])
const correctCount = computed(() => results.value.filter(Boolean).length)

function startTest() {
  stage.value = 'quiz'
  currentIndex.value = 0
  results.value = []
  answered.value = false
  selected.value = null
}

function optionClass(opt) {
  if (!answered.value) return ''
  if (opt === currentQuestion.value.correct) return 'mc-correct'
  if (opt === selected.value) return 'mc-wrong'
  return ''
}

function selectOption(opt) {
  if (answered.value) return
  selected.value = opt
  answered.value = true
  results.value[currentIndex.value] = opt === currentQuestion.value.correct
}

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
    answered.value = false
    selected.value = null
  } else {
    stage.value = 'result'
  }
}

// Finds the highest level the learner has "earned" by answering correctly,
// stopping at the first question they get wrong (since topics build on
// each other). Skipping the test defaults to Level 1.
const suggestedLevel = computed(() => {
  let level = 1
  for (let i = 0; i < questions.length; i++) {
    if (results.value[i]) {
      level = Math.min(questions[i].level + 1, maxLevel)
    } else {
      break
    }
  }
  return level
})

const suggestedLevelTitle = computed(() => {
  const found = levels.find((l) => l.level === suggestedLevel.value)
  return found ? found.title : ''
})

async function confirmLevel(level) {
  await userStore.completeOnboarding(level)
  router.push('/learning-path')
}

async function handleSkip() {
  await userStore.skipOnboarding()
  router.push('/learning-path')
}
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
}

.onboarding-content {
  max-width: 480px;
  width: 100%;
}

.onboarding-card {
  padding: 40px 32px;
  text-align: center;
}

.onboarding-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 20px;
}

.onboarding-card h1 {
  font-family: 'Manrope', sans-serif;
  font-size: 25px;
  font-weight: 700;
  margin: 0 0 12px;
}

.onboarding-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 28px;
}

.onboarding-start-btn {
  width: 100%;
  justify-content: center;
  margin-bottom: 14px;
}

.onboarding-skip-link {
  font-size: 13px;
  color: var(--text-muted);
}

.onboarding-progress {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 24px;
}

.onboarding-dot {
  width: 22px;
  height: 5px;
  border-radius: 100px;
  background: var(--card-border);
  transition: background 0.25s var(--ease-premium);
}

.onboarding-dot-done {
  background: var(--accent);
}

.onboarding-dot-active {
  background: var(--accent-dim);
}

.onboarding-topic {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent-dim);
  margin: 0 0 10px;
}

.onboarding-question {
  font-family: 'Manrope', sans-serif;
  font-size: 19px;
  font-weight: 700;
  margin: 0 0 24px;
  line-height: 1.5;
}

.onboarding-next-btn {
  width: 100%;
  justify-content: center;
  margin-top: 22px;
}

.suggested-level-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: linear-gradient(155deg, var(--accent-soft), rgba(60, 230, 125, 0.22));
  border: 1px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 26px 20px;
  margin-bottom: 24px;
  box-shadow: 0 12px 32px -18px rgba(60, 230, 125, 0.5);
}

.suggested-level-num {
  font-family: 'Manrope', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: var(--accent-dim);
}

.suggested-level-title {
  font-size: 13px;
  color: var(--text-secondary);
}

.manual-level-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 20px;
}

.manual-level-btn {
  padding: 12px 0;
  border-radius: var(--radius-sm);
  background: rgba(13, 17, 16, 0.035);
  border: 1px solid var(--card-border);
  color: var(--card-text-primary);
  font-weight: 700;
  transition: background 0.2s var(--ease-premium), border-color 0.2s var(--ease-premium);
}

.manual-level-btn:hover {
  background: rgba(60, 230, 125, 0.08);
}

.manual-level-btn-active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent-dim);
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
  transition: background 0.2s var(--ease-premium), border-color 0.2s var(--ease-premium);
}

.mc-option:hover:not(:disabled) {
  background: rgba(60, 230, 125, 0.08);
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
</style>
