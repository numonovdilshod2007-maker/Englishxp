<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[640px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-abc" aria-hidden="true" style="color: var(--accent);"></i>
          Grammar Quiz Arena
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          O'zingiz ochgan darajalardan aralash grammatika savollari, {{ timeLimit }} soniya vaqt
        </p>
      </div>

      <!-- Idle -->
      <div v-if="phase === 'idle'" class="glass reveal rounded-[24px] p-8 text-center">
        <p class="text-sm mb-5 leading-relaxed" style="color: var(--text-secondary);">
          Ochgan darajalaringizda {{ fullPool.length }} ta savol havzasi bor. Nechta savol bilan
          o'ynaymiz?
        </p>
        <div class="flex justify-center gap-2.5 flex-wrap mb-2">
          <button
            v-for="opt in questionOptions"
            :key="opt"
            type="button"
            class="px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
            :style="opt === questionCount
              ? 'background: var(--accent); color: #05130a;'
              : 'background: var(--surface-glass); color: var(--text-primary);'"
            @click="questionCount = opt"
          >
            {{ opt }} savol
          </button>
        </div>
        <p class="text-xs mt-3 mb-5" style="color: var(--text-muted);">
          Vaqt: {{ timeLimit }} soniya
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px] transition-transform hover:scale-105"
          style="background: var(--accent); color: #05130a;"
          @click="startNormalQuiz"
        >
          <i class="ti ti-player-play" aria-hidden="true"></i>
          Boshlash
        </button>

        <div class="flex justify-center gap-2.5 flex-wrap mt-4">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
            style="background: var(--surface-glass); color: var(--text-secondary);"
            @click="openLesson"
          >
            <i class="ti ti-book" aria-hidden="true"></i>
            Qoidalarni ko'rib chiqish
          </button>
          <button
            v-if="weakTopics.length"
            type="button"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
            style="background: rgba(229,72,77,0.12); color: #e5484d;"
            @click="startWeakPractice"
          >
            <i class="ti ti-target-arrow" aria-hidden="true"></i>
            Zaif mavzularni mashq qil ({{ weakTopics.length }})
          </button>
        </div>
      </div>

      <!-- Lesson: rule bullets + examples per unlocked topic -->
      <div v-if="phase === 'idle' && showLesson" class="glass reveal rounded-[24px] p-6 mt-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold m-0" style="color: var(--text-primary);">Qoidalar</h2>
          <button type="button" class="text-xs font-semibold" style="color: var(--text-secondary);" @click="showLesson = false">
            Yopish
          </button>
        </div>
        <div class="space-y-5">
          <div v-for="topic in topicAccuracy" :key="topic.level" class="pb-4" style="border-bottom: 1px solid var(--border-glass);">
            <div class="flex items-center justify-between gap-2 mb-2">
              <h3 class="text-sm font-bold m-0" style="color: var(--text-primary);">{{ topic.title }}</h3>
              <span
                v-if="topic.attempted"
                class="text-[11px] font-bold px-2 py-0.5 rounded-full"
                :style="topic.accuracy < 70
                  ? 'background: rgba(229,72,77,0.12); color: #e5484d;'
                  : 'background: var(--accent-soft); color: var(--accent);'"
              >
                {{ topic.accuracy }}%
              </span>
            </div>
            <ul class="list-disc pl-4 space-y-1 mb-2.5">
              <li v-for="(p, i) in topic.points" :key="i" class="text-xs leading-relaxed" style="color: var(--text-secondary);">{{ p }}</li>
            </ul>
            <div class="flex flex-col gap-1">
              <p v-for="(ex, i) in topic.examples" :key="i" class="text-xs m-0" style="color: var(--text-muted);">
                <span style="color: var(--text-primary);">{{ ex.en }}</span> — {{ ex.uz }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Playing -->
      <div v-else-if="phase === 'playing' && currentQuestion" class="space-y-5">
        <div class="glass reveal flex items-center justify-center gap-7 rounded-2xl py-3.5 px-5">
          <div class="flex items-center gap-1.5 font-bold text-base" :class="{ 'text-[#e5484d]': timeLeft <= 10 }">
            <i class="ti ti-clock" aria-hidden="true"></i>
            <span>{{ timeLeft }}s</span>
          </div>
          <div class="flex items-center gap-1.5 font-bold text-base">
            <i class="ti ti-list-numbers" aria-hidden="true"></i>
            <span>{{ questionIndex + 1 }}/{{ questions.length }}</span>
          </div>
          <div class="flex items-center gap-1.5 font-bold text-base" style="color: var(--accent);">
            <i class="ti ti-check" aria-hidden="true"></i>
            <span>{{ correctCount }}</span>
          </div>
        </div>

        <div class="w-full h-1.5 rounded-full overflow-hidden reveal" style="background: var(--surface-glass);">
          <div
            class="h-full rounded-full transition-all duration-300"
            style="background: var(--accent);"
            :style="{ width: ((questionIndex) / questions.length) * 100 + '%' }"
          ></div>
        </div>

        <div class="glass reveal rounded-[24px] p-7">
          <div class="flex items-start justify-between gap-2 mb-2">
            <p class="text-[11px] font-bold uppercase tracking-wide m-0" style="color: var(--text-muted);">
              {{ currentQuestion.levelTitle }}
            </p>
            <button
              type="button"
              class="text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
              style="background: var(--surface-glass); color: var(--text-secondary);"
              @click="showRuleHint = !showRuleHint"
            >
              <i class="ti ti-help-circle" aria-hidden="true"></i> Qoida
            </button>
          </div>

          <div v-if="showRuleHint" class="mb-4 p-3.5 rounded-2xl" style="background: var(--surface-glass);">
            <ul class="list-disc pl-4 space-y-1">
              <li v-for="(p, i) in currentQuestion.topicPoints" :key="i" class="text-xs leading-relaxed" style="color: var(--text-secondary);">{{ p }}</li>
            </ul>
          </div>

          <h2 class="font-[Manrope] text-xl font-bold m-0 mb-6 leading-snug" style="color: var(--text-primary);">
            {{ currentQuestion.question }}
          </h2>

          <div class="grid gap-2.5">
            <button
              v-for="opt in currentQuestion.options"
              :key="opt"
              type="button"
              class="text-left px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-150 border"
              :disabled="answered"
              :class="optionClasses(opt)"
              :style="optionStyle(opt)"
              @click="selectOption(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <div v-if="answered && !wasCorrect" class="mt-4 p-3.5 rounded-2xl" style="background: rgba(229,72,77,0.08);">
            <p class="text-xs font-bold mb-1.5" style="color: #e5484d;">Nega?</p>
            <p class="text-xs leading-relaxed m-0" style="color: var(--text-secondary);">
              {{ currentQuestion.topicPoints && currentQuestion.topicPoints[0] }}
            </p>
            <p v-if="currentQuestion.topicExamples && currentQuestion.topicExamples[0]" class="text-xs mt-1.5 m-0" style="color: var(--text-muted);">
              Masalan: <span style="color: var(--text-primary);">{{ currentQuestion.topicExamples[0].en }}</span> — {{ currentQuestion.topicExamples[0].uz }}
            </p>
          </div>
        </div>
      </div>

      <!-- Done -->
      <div v-else-if="phase === 'done' || phase === 'timeout'" class="glass reveal rounded-[24px] p-8 text-center">
        <div class="text-4xl mb-2">{{ phase === 'timeout' ? '⏱️' : '🏆' }}</div>
        <h2 class="font-[Manrope] text-xl font-bold m-0 mb-1.5">
          {{ phase === 'timeout' ? "Vaqt tugadi" : 'Ajoyib natija!' }}
        </h2>
        <p class="text-sm mb-1" style="color: var(--text-secondary);">
          {{ questions.length }} tadan {{ correctCount }} tasiga to'g'ri javob berdingiz
        </p>
        <p class="text-xl font-extrabold my-4" style="color: var(--accent);">+{{ earnedXp }} XP</p>
        <div class="flex justify-center gap-2.5 flex-wrap">
          <button
            type="button"
            class="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-[15px]"
            style="background: var(--accent); color: #05130a;"
            @click="startQuiz"
          >
            Yana o'ynash
          </button>
          <router-link
            to="/dashboard"
            class="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-sm"
            style="background: var(--surface-glass); color: var(--text-primary);"
          >
            Bosh sahifaga
          </router-link>
        </div>
      </div>

      <PartnerCompareCard
        v-if="phase === 'done' || phase === 'timeout'"
        subject="grammar"
        :my-result="{ correct: correctCount, total: questions.length, xp: earnedXp }"
      />
    </div>

    <OutOfLivesModal v-model="showOutOfLives" />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { grammar } from '../data/grammar.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import PartnerCompareCard from '../components/PartnerCompareCard.vue'
import OutOfLivesModal from '../components/OutOfLivesModal.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()
const showOutOfLives = ref(false)

const questionOptions = [10, 15, 25]
const questionCount = ref(15)

const phase = ref('idle') // idle | playing | done | timeout
const questions = ref([])
const questionIndex = ref(0)
const correctCount = ref(0)
const timeLeft = ref(0)
const earnedXp = ref(0)
const answered = ref(false)
const chosenOption = ref('')
const wasCorrect = ref(false)
const showRuleHint = ref(false)
let timer = null

const currentQuestion = computed(() => questions.value[questionIndex.value] || null)

// ~6 seconds per question, so longer sessions still feel fair.
const timeLimit = computed(() => questionCount.value * 6)

const fullPool = computed(() => {
  const unlockedLevel = userStore.isPro ? 14 : userStore.level || 1
  const topics = grammar.filter((g) => g.level <= unlockedLevel)
  const source = topics.length ? topics : grammar.slice(0, 1)
  const pool = []
  for (const topic of source) {
    for (const ex of topic.exercises) {
      pool.push({
        ...ex,
        levelTitle: topic.title,
        topicLevel: topic.level,
        topicPoints: topic.points,
        topicExamples: topic.examples
      })
    }
  }
  return pool
})

// Topics covered by the current unlocked pool, used for the pre-quiz
// "lesson" step (rule bullets + examples) so users learn before testing.
const unlockedTopics = computed(() => {
  const unlockedLevel = userStore.isPro ? 14 : userStore.level || 1
  const topics = grammar.filter((g) => g.level <= unlockedLevel)
  return topics.length ? topics : grammar.slice(0, 1)
})

// Per-topic accuracy from userStore.topicStats, sorted worst-first, so we
// can surface a "practice weak topics" shortcut and show badges in the
// lesson list.
const topicAccuracy = computed(() => {
  const stats = userStore.profile?.topicStats?.grammar || {}
  return unlockedTopics.value.map((topic) => {
    const s = stats[String(topic.level)]
    const total = s ? s.correct + s.wrong : 0
    const accuracy = total ? Math.round((s.correct / total) * 100) : null
    return { ...topic, accuracy, attempted: total > 0 }
  })
})

const weakTopics = computed(() =>
  topicAccuracy.value
    .filter((t) => t.attempted && t.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
)

const showLesson = ref(false)
const practicingWeakOnly = ref(false)

function openLesson() {
  showLesson.value = true
}

function startWeakPractice() {
  practicingWeakOnly.value = true
  startQuiz()
}

function startNormalQuiz() {
  practicingWeakOnly.value = false
  startQuiz()
}

function buildQuestionPool() {
  let base = fullPool.value
  if (practicingWeakOnly.value) {
    const weakLevels = new Set(weakTopics.value.map((t) => t.level))
    const filtered = base.filter((ex) => weakLevels.has(ex.topicLevel))
    base = filtered.length ? filtered : base
  }
  const pool = [...base]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(questionCount.value, pool.length))
}

function startQuiz() {
  if (!userStore.hasLives) {
    showOutOfLives.value = true
    return
  }
  clearInterval(timer)
  showLesson.value = false
  questions.value = buildQuestionPool()
  questionIndex.value = 0
  correctCount.value = 0
  timeLeft.value = timeLimit.value
  earnedXp.value = 0
  answered.value = false
  chosenOption.value = ''
  wasCorrect.value = false
  showRuleHint.value = false
  phase.value = 'playing'

  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      phase.value = 'timeout'
      finishQuiz()
    }
  }, 1000)
  refresh()
}

function optionClasses(opt) {
  if (!answered.value) return 'hover:scale-[1.015]'
  const isCorrect = opt === currentQuestion.value.correct
  const isChosen = opt === chosenOption.value
  if (isCorrect) return 'scale-[1.01]'
  if (isChosen && !isCorrect) return ''
  return 'opacity-45'
}

function optionStyle(opt) {
  if (!answered.value) {
    return 'background: var(--surface-glass); border-color: var(--border-glass); color: var(--text-primary);'
  }
  const isCorrect = opt === currentQuestion.value.correct
  const isChosen = opt === chosenOption.value
  if (isCorrect) {
    return 'background: var(--accent-soft); border-color: var(--accent); color: var(--accent);'
  }
  if (isChosen && !isCorrect) {
    return 'background: rgba(229,72,77,0.12); border-color: rgba(229,72,77,0.4); color: #e5484d;'
  }
  return 'background: var(--surface-glass); border-color: var(--border-glass); color: var(--text-primary);'
}

function selectOption(opt) {
  if (answered.value || phase.value !== 'playing') return
  answered.value = true
  chosenOption.value = opt
  const isCorrect = opt === currentQuestion.value.correct
  wasCorrect.value = isCorrect
  if (isCorrect) {
    correctCount.value++
    userStore.incrementDailyStat('correctAnswers')
  } else {
    userStore.loseLife()
  }
  userStore.recordTopicResult('grammar', currentQuestion.value.topicLevel, currentQuestion.value.levelTitle, isCorrect)

  setTimeout(() => {
    if (!isCorrect && !userStore.hasLives) {
      clearInterval(timer)
      phase.value = 'done'
      finishQuiz()
      showOutOfLives.value = true
    } else if (questionIndex.value >= questions.value.length - 1) {
      clearInterval(timer)
      phase.value = 'done'
      finishQuiz()
    } else {
      questionIndex.value++
      answered.value = false
      chosenOption.value = ''
      showRuleHint.value = false
    }
  }, 900)
}

async function finishQuiz() {
  const accuracyBonus = Math.round((correctCount.value / (questions.value.length || 1)) * 20)
  earnedXp.value = correctCount.value * 8 + accuracyBonus
  if (earnedXp.value > 0) await userStore.addXp(earnedXp.value, 'grammar')
  userStore.recordSkillScore('grammar', correctCount.value, questions.value.length)
  userStore.incrementDailyStat('grammarCompleted')
  refresh()
}

onUnmounted(() => clearInterval(timer))
</script>
