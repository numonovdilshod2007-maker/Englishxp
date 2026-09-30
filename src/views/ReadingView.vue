<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[640px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-book" aria-hidden="true" style="color: var(--accent);"></i>
          O'qib tushunish
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Matnni o'qing, keyin savollarga javob bering
        </p>
      </div>

      <!-- Passage picker -->
      <div v-if="!started" class="glass reveal rounded-[24px] p-6">
        <h2 class="text-lg font-bold mb-4" style="color: var(--text-primary);">Matn tanlang</h2>
        <div class="flex flex-col gap-3">
          <button
            v-for="(passage, idx) in passages"
            :key="passage.id"
            type="button"
            class="glass rounded-[16px] p-4 text-left transition-transform hover:scale-[1.02] flex items-center justify-between gap-3"
            @click="startPassage(idx)"
          >
            <div>
              <span class="text-sm font-semibold block" style="color: var(--text-primary);">{{ passage.title }}</span>
              <span class="text-xs" style="color: var(--text-muted);">{{ passage.questions.length }} ta savol</span>
            </div>
            <i class="ti ti-chevron-right shrink-0" style="color: var(--accent);"></i>
          </button>
        </div>
      </div>

      <!-- Reading + questions -->
      <div v-else class="glass reveal rounded-[24px] p-6">
        <div class="flex items-center justify-between mb-4">
          <button type="button" class="text-sm font-semibold" style="color: var(--text-secondary);" @click="reset">
            <i class="ti ti-arrow-left"></i> Orqaga
          </button>
          <span class="text-xs font-bold" style="color: var(--text-muted);">{{ currentPassage.title }}</span>
        </div>

        <div class="reading-passage">{{ currentPassage.text }}</div>

        <div class="mt-6">
          <div v-for="(q, qi) in currentPassage.questions" :key="qi" class="mb-5">
            <p class="text-sm font-semibold mb-2.5" style="color: var(--text-primary);">
              {{ qi + 1 }}. {{ q.question }}
              <span v-if="q.type === 'tfng'" class="text-[10px] font-bold uppercase ml-1" style="color: var(--text-muted);">True / False / Not Given</span>
            </p>
            <div class="flex flex-col gap-2">
              <button
                v-for="opt in q.options"
                :key="opt"
                type="button"
                class="text-left px-4 py-2.5 rounded-[12px] text-sm transition-transform hover:scale-[1.01]"
                :disabled="submitted"
                :style="optionStyle(qi, opt)"
                @click="selectAnswer(qi, opt)"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <button
            v-if="!submitted"
            type="button"
            class="w-full py-3 rounded-full font-bold text-sm mt-2"
            style="background: var(--accent); color: #05130a;"
            :disabled="!allAnswered"
            :class="{ 'opacity-50': !allAnswered }"
            @click="submit"
          >
            Tekshirish
          </button>

          <div v-else class="text-center mt-4">
            <p class="text-lg font-bold mb-1" style="color: var(--text-primary);">
              {{ score }} / {{ currentPassage.questions.length }} to'g'ri
            </p>
            <p class="text-sm font-extrabold mb-4" style="color: var(--accent);">+{{ earnedXp }} XP</p>
            <div class="flex justify-center gap-2.5 flex-wrap">
              <button
                type="button"
                class="px-5 py-2.5 rounded-full text-sm font-bold"
                style="background: var(--accent); color: #05130a;"
                @click="reset"
              >
                Boshqa matn tanlash
              </button>
            </div>

            <PartnerCompareCard
              subject="reading"
              :my-result="{ correct: score, total: currentPassage.questions.length, xp: earnedXp }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import AppNav from '../components/AppNav.vue'
import PartnerCompareCard from '../components/PartnerCompareCard.vue'
import { ieltsReadingPassages } from '../data/ielts.js'
import { useUserStore } from '../stores/userStore.js'
import { XP_REWARDS } from '../data/vocabulary.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

// Reuses the reading passages already written for the IELTS mock test, but
// presented as a standalone, untimed reading-comprehension practice mode
// with no exam framing — open to everyone, not just Pro users.
const passages = ieltsReadingPassages

const started = ref(false)
const activeIdx = ref(0)
const answers = ref({})
const submitted = ref(false)
const score = ref(0)
const earnedXp = ref(0)

const currentPassage = computed(() => passages[activeIdx.value])

const allAnswered = computed(() =>
  currentPassage.value.questions.every((_, qi) => answers.value[qi] !== undefined)
)

function startPassage(idx) {
  activeIdx.value = idx
  started.value = true
  answers.value = {}
  submitted.value = false
  score.value = 0
  earnedXp.value = 0
  nextTick(() => refresh())
}

function selectAnswer(qi, opt) {
  if (submitted.value) return
  answers.value[qi] = opt
}

function optionStyle(qi, opt) {
  if (!submitted.value) {
    return answers.value[qi] === opt
      ? 'background: var(--accent); color: #05130a; font-weight: 700;'
      : 'background: var(--surface-glass); color: var(--text-primary);'
  }
  const correct = currentPassage.value.questions[qi].correct
  if (opt === correct) return 'background: #22c55e; color: white; font-weight: 700;'
  if (opt === answers.value[qi] && opt !== correct) return 'background: #ef4444; color: white;'
  return 'background: var(--surface-glass); color: var(--text-muted);'
}

async function submit() {
  submitted.value = true
  let correctCount = 0
  currentPassage.value.questions.forEach((q, qi) => {
    if (answers.value[qi] === q.correct) correctCount++
  })
  score.value = correctCount
  const total = currentPassage.value.questions.length
  earnedXp.value = correctCount * XP_REWARDS.correctAnswer
  userStore.recordSkillScore('reading', correctCount, total)
  if (earnedXp.value > 0) await userStore.addXp(earnedXp.value, 'reading')
  userStore.incrementDailyStat('correctAnswers', correctCount)
  userStore.incrementDailyStat('readingCompleted')
}

function reset() {
  started.value = false
  answers.value = {}
  submitted.value = false
  nextTick(() => refresh())
}
</script>

<style scoped>
.reading-passage {
  background: var(--surface-glass);
  border-radius: 16px;
  padding: 18px 20px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-primary);
  white-space: pre-line;
}
</style>
