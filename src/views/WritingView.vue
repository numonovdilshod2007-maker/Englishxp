<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[640px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-pencil" aria-hidden="true" style="color: var(--accent);"></i>
          Yozish mashqlari
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          {{ mode === 'sentences' ? "O'zbekcha gapni ingliz tiliga yozing" : 'Insho yozing, AI baholaydi' }}
        </p>
      </div>

      <div class="flex justify-center gap-2 mb-6 reveal">
        <button
          type="button"
          class="px-5 py-2 rounded-full text-sm font-bold"
          :style="mode === 'sentences'
            ? 'background: var(--accent); color: #05130a;'
            : 'background: var(--surface-glass); color: var(--text-secondary);'"
          @click="mode = 'sentences'"
        >
          Gaplar
        </button>
        <button
          type="button"
          class="px-5 py-2 rounded-full text-sm font-bold"
          :style="mode === 'essay'
            ? 'background: var(--accent); color: #05130a;'
            : 'background: var(--surface-glass); color: var(--text-secondary);'"
          @click="mode = 'essay'"
        >
          <i class="ti ti-crown" aria-hidden="true"></i> Insho
        </button>
      </div>

      <!-- Essay mode: AI-graded essay writing -->
      <div v-if="mode === 'essay'">
        <div v-if="!userStore.isPro" class="glass reveal rounded-[24px] p-8 text-center">
          <i class="ti ti-lock text-3xl mb-3 block" style="color: var(--text-muted);"></i>
          <p class="text-sm mb-4" style="color: var(--text-secondary);">
            Insho yozish va AI tahlili faqat Pro foydalanuvchilar uchun mavjud.
          </p>
          <router-link
            to="/upgrade"
            class="inline-flex items-center px-6 py-3 rounded-full font-bold text-sm"
            style="background: var(--accent); color: #05130a;"
          >
            Pro'ga o'tish
          </router-link>
        </div>

        <div v-else-if="!essayTask" class="glass reveal rounded-[24px] p-6">
          <h2 class="text-lg font-bold mb-4" style="color: var(--text-primary);">Mavzu tanlang</h2>
          <div class="flex flex-col gap-3">
            <button
              v-for="task in essayTasks"
              :key="task.id"
              type="button"
              class="glass rounded-[16px] p-4 text-left transition-transform hover:scale-[1.01]"
              @click="pickEssayTask(task)"
            >
              <span class="text-sm font-semibold" style="color: var(--text-primary);">{{ task.prompt }}</span>
            </button>
          </div>
        </div>

        <div v-else class="glass reveal rounded-[24px] p-6">
          <div class="flex items-center justify-between mb-4">
            <button type="button" class="text-sm font-semibold" style="color: var(--text-secondary);" @click="essayTask = null">
              <i class="ti ti-arrow-left"></i> Boshqa mavzu
            </button>
            <span class="text-xs font-bold" style="color: var(--text-muted);">{{ essayWordCount }} so'z (min. 50)</span>
          </div>
          <p class="text-sm font-semibold mb-3" style="color: var(--text-primary);">{{ essayTask.prompt }}</p>

          <textarea
            v-model="essayText"
            rows="10"
            :disabled="essayResult || essayLoading"
            placeholder="Insho matnini shu yerga yozing..."
            class="w-full px-4 py-3.5 rounded-2xl text-sm font-medium border resize-none focus:outline-none"
            style="background: var(--surface-glass); border-color: var(--border-glass); color: var(--text-primary);"
          ></textarea>

          <p v-if="essayError" class="text-xs mt-2" style="color: #e5484d;">{{ essayError }}</p>

          <button
            v-if="!essayResult"
            type="button"
            class="w-full py-3 rounded-full font-bold text-sm mt-4"
            style="background: var(--accent); color: #05130a;"
            :disabled="essayWordCount < 50 || essayLoading"
            :class="{ 'opacity-50': essayWordCount < 50 || essayLoading }"
            @click="submitEssay"
          >
            {{ essayLoading ? 'Tahlil qilinmoqda...' : 'Yuborish va bahо olish' }}
          </button>

          <div v-else class="mt-5 space-y-4">
            <div class="text-center">
              <p class="text-xs font-bold uppercase tracking-wide mb-1" style="color: var(--text-muted);">Umumiy baho</p>
              <p class="text-3xl font-extrabold" style="color: var(--accent);">{{ essayResult.bandOverall }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="glass rounded-xl p-2.5">
                <p class="text-[10px] font-bold uppercase" style="color: var(--text-muted);">Mazmun</p>
                <p class="text-sm font-bold" style="color: var(--text-primary);">{{ essayResult.bandTaskResponse }}</p>
              </div>
              <div class="glass rounded-xl p-2.5">
                <p class="text-[10px] font-bold uppercase" style="color: var(--text-muted);">Izchillik</p>
                <p class="text-sm font-bold" style="color: var(--text-primary);">{{ essayResult.bandCoherence }}</p>
              </div>
              <div class="glass rounded-xl p-2.5">
                <p class="text-[10px] font-bold uppercase" style="color: var(--text-muted);">Lug'at</p>
                <p class="text-sm font-bold" style="color: var(--text-primary);">{{ essayResult.bandLexical }}</p>
              </div>
              <div class="glass rounded-xl p-2.5">
                <p class="text-[10px] font-bold uppercase" style="color: var(--text-muted);">Grammatika</p>
                <p class="text-sm font-bold" style="color: var(--text-primary);">{{ essayResult.bandGrammar }}</p>
              </div>
            </div>
            <div class="p-3.5 rounded-xl" style="background: var(--accent-soft);">
              <p class="text-xs font-bold mb-1" style="color: var(--accent);">Kuchli tomonlar</p>
              <p class="text-xs m-0" style="color: var(--text-secondary);">{{ essayResult.strengthsUz }}</p>
            </div>
            <div class="p-3.5 rounded-xl" style="background: rgba(229,72,77,0.08);">
              <p class="text-xs font-bold mb-1" style="color: #e5484d;">Yaxshilash kerak</p>
              <p class="text-xs m-0" style="color: var(--text-secondary);">{{ essayResult.improvementsUz }}</p>
            </div>
            <div v-if="essayResult.corrections?.length" class="space-y-2">
              <p class="text-xs font-bold" style="color: var(--text-muted);">Tuzatishlar</p>
              <div v-for="(c, i) in essayResult.corrections" :key="i" class="text-xs p-2.5 rounded-xl" style="background: var(--surface-glass);">
                <p class="m-0 mb-1" style="color: #e5484d; text-decoration: line-through;">{{ c.original }}</p>
                <p class="m-0" style="color: #22c55e;">{{ c.better }}</p>
              </div>
            </div>
            <button
              type="button"
              class="w-full py-3 rounded-full font-bold text-sm"
              style="background: var(--surface-glass); color: var(--text-primary);"
              @click="essayTask = null; essayText = ''; essayResult = null"
            >
              Boshqa mavzu bilan yozish
            </button>
          </div>
        </div>
      </div>

      <!-- Sentence practice mode (existing) -->
      <div v-else>
      <!-- Idle -->
      <div v-if="phase === 'idle'" class="glass reveal rounded-[24px] p-8 text-center">
        <p class="text-sm mb-5 leading-relaxed" style="color: var(--text-secondary);">
          Ochgan darajalaringizda {{ fullPool.length }} ta gap havzasi bor. Nechta gap bilan
          mashq qilamiz?
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
            {{ opt }} gap
          </button>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px] transition-transform hover:scale-105 mt-3"
          style="background: var(--accent); color: #05130a;"
          @click="startSession"
        >
          <i class="ti ti-player-play" aria-hidden="true"></i>
          Boshlash
        </button>
      </div>

      <!-- Playing -->
      <div v-else-if="phase === 'playing' && currentPrompt" class="space-y-5">
        <div class="glass reveal flex items-center justify-center gap-7 rounded-2xl py-3.5 px-5">
          <div class="flex items-center gap-1.5 font-bold text-base">
            <i class="ti ti-list-numbers" aria-hidden="true"></i>
            <span>{{ promptIndex + 1 }}/{{ prompts.length }}</span>
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
            :style="{ width: (promptIndex / prompts.length) * 100 + '%' }"
          ></div>
        </div>

        <div class="glass reveal rounded-[24px] p-7">
          <p class="text-[11px] font-bold uppercase tracking-wide mb-2" style="color: var(--text-muted);">
            {{ currentPrompt.levelTitle }}
          </p>
          <h2 class="font-[Manrope] text-xl font-bold m-0 mb-6 leading-snug" style="color: var(--text-primary);">
            {{ currentPrompt.uz }}
          </h2>

          <textarea
            v-model="userAnswer"
            :disabled="answered"
            rows="2"
            placeholder="Ingliz tilida yozing..."
            class="w-full px-4 py-3.5 rounded-2xl text-sm font-medium border resize-none focus:outline-none"
            style="background: var(--surface-glass); border-color: var(--border-glass); color: var(--text-primary);"
            @keydown.enter.exact.prevent="submitAnswer"
          ></textarea>

          <div v-if="answered" class="mt-3 p-3.5 rounded-xl text-sm" :class="wasCorrect ? '' : ''"
            :style="wasCorrect
              ? 'background: var(--accent-soft); color: var(--accent);'
              : 'background: rgba(229,72,77,0.12); color: #e5484d;'">
            <p class="font-bold m-0 mb-1">{{ wasCorrect ? "To'g'ri! 🎉" : "Unchalik emas" }}</p>
            <p class="m-0" style="color: var(--text-secondary);">
              To'g'ri javob: <span class="font-semibold" style="color: var(--text-primary);">{{ currentPrompt.accepted[0] }}</span>
            </p>
          </div>

          <div class="flex justify-between items-center mt-4 gap-2">
            <button
              v-if="!answered"
              type="button"
              class="text-xs font-semibold px-3 py-2 rounded-full"
              style="background: var(--surface-glass); color: var(--text-muted);"
              @click="showHint = !showHint"
            >
              <i class="ti ti-bulb" aria-hidden="true"></i> Yordam
            </button>
            <span v-else></span>
            <button
              type="button"
              class="px-6 py-2.5 rounded-full font-bold text-sm transition-transform hover:scale-105"
              style="background: var(--accent); color: #05130a;"
              @click="answered ? nextPrompt() : submitAnswer()"
            >
              {{ answered ? (isLastPrompt ? 'Yakunlash' : 'Keyingisi') : 'Tekshirish' }}
            </button>
          </div>
          <p v-if="showHint && !answered" class="text-xs mt-2" style="color: var(--text-muted);">
            {{ hintText }}
          </p>
        </div>
      </div>

      <!-- Done -->
      <div v-else-if="phase === 'done'" class="glass reveal rounded-[24px] p-8 text-center">
        <div class="text-4xl mb-2">🏆</div>
        <h2 class="font-[Manrope] text-xl font-bold m-0 mb-1.5">Ajoyib mashq!</h2>
        <p class="text-sm mb-1" style="color: var(--text-secondary);">
          {{ prompts.length }} tadan {{ correctCount }} tasiga to'g'ri javob berdingiz
        </p>
        <p class="text-xl font-extrabold my-4" style="color: var(--accent);">+{{ earnedXp }} XP</p>
        <div class="flex justify-center gap-2.5 flex-wrap">
          <button
            type="button"
            class="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-[15px]"
            style="background: var(--accent); color: #05130a;"
            @click="startSession"
          >
            Yana mashq qilish
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
        v-if="mode === 'sentences' && phase === 'done'"
        subject="writing"
        :my-result="{ correct: correctCount, total: prompts.length, xp: earnedXp }"
      />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { writing, checkWritingAnswer } from '../data/writing.js'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase/config.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import PartnerCompareCard from '../components/PartnerCompareCard.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

const mode = ref('sentences') // 'sentences' | 'essay'

// Essay topics shown to the user. IDs must match WRITING_TASKS in
// functions/ieltsWriting.js — the grading Cloud Function looks the prompt
// up by id server-side so the essay is always graded against the exact
// question asked (no IELTS branding shown here, just "Insho").
const essayTasks = [
  { id: 'technology-society', prompt: 'Some people believe that technology has made our lives more complicated, while others think it has made life easier. Discuss both views and give your own opinion.' },
  { id: 'online-education', prompt: 'Many students now study online instead of attending traditional classes. Do the advantages of this outweigh the disadvantages?' },
  { id: 'environment-government', prompt: 'Some people think environmental problems are too big for individuals to solve, and only governments and large businesses can make a real difference. To what extent do you agree or disagree?' },
  { id: 'social-media', prompt: 'Social media has changed the way people communicate with each other. Do you think this change has been positive or negative overall?' },
  { id: 'remote-work', prompt: 'Many companies now allow employees to work from home permanently. What are the advantages and disadvantages of this trend for both employees and employers?' }
]

const essayTask = ref(null)
const essayText = ref('')
const essayLoading = ref(false)
const essayError = ref('')
const essayResult = ref(null)

const essayWordCount = computed(() =>
  essayText.value.trim() ? essayText.value.trim().split(/\s+/).filter(Boolean).length : 0
)

function pickEssayTask(task) {
  essayTask.value = task
  essayText.value = ''
  essayResult.value = null
  essayError.value = ''
}

async function submitEssay() {
  essayLoading.value = true
  essayError.value = ''
  try {
    const call = httpsCallable(functions, 'ieltsWritingFeedback')
    const result = await call({ taskId: essayTask.value.id, essay: essayText.value, taskType: 'task2' })
    essayResult.value = result.data
    if (result.data.bandOverall) {
      const xp = Math.round(result.data.bandOverall * 8)
      await userStore.addXp(xp, 'writing')
      userStore.recordSkillScore('writing', Math.round(result.data.bandOverall), 9)
    }
  } catch (err) {
    essayError.value = err.message || 'Xatolik yuz berdi. Qayta urinib ko\'ring.'
  } finally {
    essayLoading.value = false
  }
}

const questionOptions = [8, 12, 20]
const questionCount = ref(8)

const phase = ref('idle') // idle | playing | done
const prompts = ref([])
const promptIndex = ref(0)
const correctCount = ref(0)
const earnedXp = ref(0)
const answered = ref(false)
const wasCorrect = ref(false)
const userAnswer = ref('')
const showHint = ref(false)
let usedHintCount = 0

const currentPrompt = computed(() => prompts.value[promptIndex.value] || null)
const isLastPrompt = computed(() => promptIndex.value >= prompts.value.length - 1)

const hintText = computed(() => {
  if (!currentPrompt.value) return ''
  const words = currentPrompt.value.accepted[0].split(' ')
  return words.map((w) => w[0]?.toUpperCase() + '…').join(' ')
})

const fullPool = computed(() => {
  const unlockedLevel = userStore.isPro ? 14 : userStore.level || 1
  const topics = writing.filter((w) => w.level <= unlockedLevel)
  const source = topics.length ? topics : writing.slice(0, 1)
  const pool = []
  for (const topic of source) {
    for (const p of topic.prompts) {
      pool.push({ ...p, levelTitle: topic.title })
    }
  }
  return pool
})

function buildPromptPool() {
  const pool = [...fullPool.value]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(questionCount.value, pool.length))
}

function startSession() {
  prompts.value = buildPromptPool()
  promptIndex.value = 0
  correctCount.value = 0
  earnedXp.value = 0
  answered.value = false
  wasCorrect.value = false
  userAnswer.value = ''
  showHint.value = false
  usedHintCount = 0
  phase.value = 'playing'
  refresh()
}

function submitAnswer() {
  if (answered.value || phase.value !== 'playing' || !currentPrompt.value) return
  answered.value = true
  wasCorrect.value = checkWritingAnswer(userAnswer.value, currentPrompt.value.accepted)
  if (wasCorrect.value) {
    correctCount.value++
    userStore.incrementDailyStat('correctAnswers')
  }
  if (showHint.value) usedHintCount++
}

function nextPrompt() {
  if (isLastPrompt.value) {
    phase.value = 'done'
    finishSession()
    return
  }
  promptIndex.value++
  answered.value = false
  wasCorrect.value = false
  userAnswer.value = ''
  showHint.value = false
}

async function finishSession() {
  const accuracyBonus = Math.round((correctCount.value / (prompts.value.length || 1)) * 25)
  const hintPenalty = Math.min(usedHintCount * 2, correctCount.value * 10)
  earnedXp.value = Math.max(0, correctCount.value * 10 + accuracyBonus - hintPenalty)
  if (earnedXp.value > 0) await userStore.addXp(earnedXp.value)
  userStore.recordSkillScore('writing', correctCount.value, prompts.value.length)
  refresh()
}
</script>
