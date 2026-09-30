<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[760px] pt-9 pb-20">
      <div class="text-center mb-7 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-chart-bar" aria-hidden="true" style="color: var(--accent);"></i>
          Analitika
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Kuchli va zaif tomonlaringiz — nimaga ko'proq vaqt ajratish kerakligini shu yerdan bilib oling
        </p>
      </div>

      <!-- Not enough data yet -->
      <div v-if="!hasAnyData" class="glass reveal rounded-[24px] p-8 text-center">
        <i class="ti ti-chart-bar text-4xl mb-3" aria-hidden="true" style="color: var(--text-muted);"></i>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Hali yetarli statistika yo'q. Grammar Quiz, Listening, Writing yoki Speaking mashqlarini bir necha marta
          bajaring — natijalar shu yerda ko'rinadi.
        </p>
      </div>

      <template v-else>
        <!-- Per-skill accuracy -->
        <div class="glass reveal rounded-[24px] p-6 mb-5">
          <h2 class="font-[Manrope] text-lg font-bold m-0 mb-4 flex items-center gap-2">
            <i class="ti ti-percentage" aria-hidden="true" style="color: var(--accent);"></i>
            Ko'nikmalar bo'yicha aniqlik
          </h2>
          <div class="space-y-4">
            <div v-for="s in skillSummaries" :key="s.id">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-sm font-semibold flex items-center gap-1.5">
                  <i :class="'ti ' + s.icon" aria-hidden="true" style="color: var(--text-secondary);"></i>
                  {{ s.label }}
                </span>
                <span class="text-sm font-bold" :style="{ color: accuracyColor(s.percent) }">
                  {{ s.attempts ? s.percent + '%' : "ma'lumot yo'q" }}
                </span>
              </div>
              <div class="h-2 rounded-full overflow-hidden" style="background: var(--surface-glass);">
                <div
                  class="h-full rounded-full transition-all"
                  :style="{ width: s.percent + '%', background: accuracyColor(s.percent) }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Strengths & weaknesses -->
        <div class="grid gap-5 mb-5" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
          <div class="glass reveal rounded-[24px] p-6">
            <h2 class="font-[Manrope] text-base font-bold m-0 mb-3 flex items-center gap-2" style="color: #22c55e;">
              <i class="ti ti-trending-up" aria-hidden="true"></i> Kuchli tomonlar
            </h2>
            <ul v-if="strengths.length" class="text-sm space-y-2 m-0 pl-0 list-none" style="color: var(--text-secondary);">
              <li v-for="s in strengths" :key="s.id" class="flex items-center gap-2">
                <i class="ti ti-check" aria-hidden="true" style="color: #22c55e;"></i>
                {{ s.label }} — {{ s.percent }}%
              </li>
            </ul>
            <p v-else class="text-sm m-0" style="color: var(--text-muted);">Hali aniqlanmadi</p>
          </div>

          <div class="glass reveal rounded-[24px] p-6">
            <h2 class="font-[Manrope] text-base font-bold m-0 mb-3 flex items-center gap-2" style="color: #ef4444;">
              <i class="ti ti-trending-down" aria-hidden="true"></i> Zaif tomonlar
            </h2>
            <ul v-if="weaknesses.length" class="text-sm space-y-2 m-0 pl-0 list-none" style="color: var(--text-secondary);">
              <li v-for="s in weaknesses" :key="s.id" class="flex items-center gap-2">
                <i class="ti ti-x" aria-hidden="true" style="color: #ef4444;"></i>
                {{ s.label }} — {{ s.percent }}%
              </li>
            </ul>
            <p v-else class="text-sm m-0" style="color: var(--text-muted);">Hali aniqlanmadi</p>
          </div>
        </div>

        <!-- Weakest grammar topics -->
        <div v-if="weakGrammarTopics.length" class="glass reveal rounded-[24px] p-6 mb-5">
          <h2 class="font-[Manrope] text-lg font-bold m-0 mb-4 flex items-center gap-2">
            <i class="ti ti-abc" aria-hidden="true" style="color: var(--accent);"></i>
            Eng ko'p qiynalayotgan grammatika mavzulari
          </h2>
          <div class="space-y-3">
            <div v-for="t in weakGrammarTopics" :key="t.id" class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-semibold m-0">{{ t.label }}</p>
                <p class="text-xs m-0" style="color: var(--text-muted);">{{ t.wrong }} ta xato / {{ t.total }} ta urinish</p>
              </div>
              <span class="text-sm font-bold shrink-0" style="color: #ef4444;">{{ t.wrongRate }}% xato</span>
            </div>
          </div>
          <router-link
            to="/grammar-quiz"
            class="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
            style="background: var(--accent); color: #05130a;"
          >
            <i class="ti ti-refresh" aria-hidden="true"></i> Shu mavzularni takrorlash
          </router-link>
        </div>

        <!-- Words being forgotten -->
        <div v-if="weakWords.length" class="glass reveal rounded-[24px] p-6 mb-5">
          <h2 class="font-[Manrope] text-lg font-bold m-0 mb-4 flex items-center gap-2">
            <i class="ti ti-brain" aria-hidden="true" style="color: var(--accent);"></i>
            Ko'p unutilayotgan so'zlar
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="w in weakWords"
              :key="w.word"
              class="px-3 py-1.5 rounded-full text-xs font-semibold"
              style="background: rgba(239,68,68,0.12); color: #ef4444; border: 1px solid rgba(239,68,68,0.3);"
            >
              {{ w.word }}
            </span>
          </div>
          <router-link
            to="/lesson/review"
            class="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
            style="background: var(--accent); color: #05130a;"
          >
            <i class="ti ti-cards" aria-hidden="true"></i> Takrorlashni boshlash
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import AuroraBackground from '../components/AuroraBackground.vue'
import AppNav from '../components/AppNav.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
useScrollReveal()

const SKILL_DEFS = [
  { id: 'vocabulary', label: "Lug'at (Vocabulary)", icon: 'ti-abc-2' },
  { id: 'grammar', label: 'Grammatika', icon: 'ti-abc' },
  { id: 'listening', label: 'Tinglash (Listening)', icon: 'ti-headphones' },
  { id: 'writing', label: 'Yozish (Writing)', icon: 'ti-pencil' },
  { id: 'speaking', label: 'Gapirish (Speaking)', icon: 'ti-microphone' }
]

// Vocabulary doesn't have a right/wrong "skillScores" history (it's
// mastery-based via SRS), so it's summarized separately from completedWords.
const vocabularyPercent = computed(() => {
  const completed = userStore.profile?.completedWords?.length || 0
  const cards = userStore.profile?.srsCards || {}
  const cardIds = Object.keys(cards)
  if (!cardIds.length) return { percent: completed > 0 ? 100 : 0, attempts: completed }
  const strong = cardIds.filter((k) => cards[k].ef >= 2.2 && cards[k].reps >= 2).length
  return { percent: Math.round((strong / cardIds.length) * 100), attempts: cardIds.length }
})

const skillSummaries = computed(() => {
  const scores = userStore.profile?.skillScores || {}
  return SKILL_DEFS.map((def) => {
    if (def.id === 'vocabulary') {
      const v = vocabularyPercent.value
      return { ...def, percent: v.percent, attempts: v.attempts }
    }
    const history = scores[def.id] || []
    const totalCorrect = history.reduce((sum, h) => sum + h.correct, 0)
    const totalQuestions = history.reduce((sum, h) => sum + h.total, 0)
    const percent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    return { ...def, percent, attempts: totalQuestions }
  })
})

const hasAnyData = computed(() => skillSummaries.value.some((s) => s.attempts > 0))

function accuracyColor(percent) {
  if (percent >= 75) return '#22c55e'
  if (percent >= 50) return '#f59e0b'
  return '#ef4444'
}

const rankedSkills = computed(() => skillSummaries.value.filter((s) => s.attempts >= 3))
const strengths = computed(() => [...rankedSkills.value].sort((a, b) => b.percent - a.percent).slice(0, 2).filter((s) => s.percent >= 60))
const weaknesses = computed(() => [...rankedSkills.value].sort((a, b) => a.percent - b.percent).slice(0, 2).filter((s) => s.percent < 75))

// Weakest grammar topics: needs at least 3 attempts on that topic so a
// single unlucky guess doesn't flag it, ranked by wrong rate.
const weakGrammarTopics = computed(() => {
  const grammarStats = userStore.profile?.topicStats?.grammar || {}
  return Object.entries(grammarStats)
    .map(([id, s]) => ({
      id,
      label: s.label || `Daraja ${id}`,
      wrong: s.wrong,
      total: s.correct + s.wrong,
      wrongRate: Math.round((s.wrong / (s.correct + s.wrong || 1)) * 100)
    }))
    .filter((t) => t.total >= 3 && t.wrongRate > 0)
    .sort((a, b) => b.wrongRate - a.wrongRate)
    .slice(0, 5)
})

// Weak/forgotten words: cards reviewed at least once but with low ease
// factor (repeatedly gotten wrong) or reset back to zero reps.
const weakWords = computed(() => {
  const cards = userStore.profile?.srsCards || {}
  return Object.entries(cards)
    .filter(([, c]) => c.lastReviewed && (c.ef <= 1.8 || c.reps === 0))
    .sort((a, b) => a[1].ef - b[1].ef)
    .slice(0, 16)
    .map(([word]) => ({ word }))
})
</script>
