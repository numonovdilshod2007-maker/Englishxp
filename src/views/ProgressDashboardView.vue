<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[820px] pt-9 pb-20">
      <div class="text-center mb-7 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-report-analytics" aria-hidden="true" style="color: var(--accent);"></i>
          Progress Dashboard
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Umumiy rivojlanishingiz — so'zlar, ko'nikmalar, haftalik va oylik statistika bir joyda
        </p>
      </div>

      <!-- Top summary cards -->
      <div class="grid gap-4 mb-6" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
        <div class="glass reveal rounded-[20px] p-5 text-center">
          <i class="ti ti-abc-2 text-2xl mb-2" aria-hidden="true" style="color: var(--accent);"></i>
          <p class="text-2xl font-bold m-0 font-[Manrope]">{{ vocabularyCount }}</p>
          <p class="text-xs m-0 mt-1" style="color: var(--text-muted);">O'rganilgan so'zlar</p>
        </div>
        <div class="glass reveal rounded-[20px] p-5 text-center">
          <i class="ti ti-flame text-2xl mb-2" aria-hidden="true" style="color: #f59e0b;"></i>
          <p class="text-2xl font-bold m-0 font-[Manrope]">{{ userStore.profile?.streak || 0 }}</p>
          <p class="text-xs m-0 mt-1" style="color: var(--text-muted);">Kunlik streak</p>
        </div>
        <div class="glass reveal rounded-[20px] p-5 text-center">
          <i class="ti ti-star text-2xl mb-2" aria-hidden="true" style="color: var(--accent);"></i>
          <p class="text-2xl font-bold m-0 font-[Manrope]">{{ userStore.profile?.xp || 0 }}</p>
          <p class="text-xs m-0 mt-1" style="color: var(--text-muted);">Umumiy XP</p>
        </div>
        <div class="glass reveal rounded-[20px] p-5 text-center">
          <i class="ti ti-trophy text-2xl mb-2" aria-hidden="true" style="color: var(--accent);"></i>
          <p class="text-2xl font-bold m-0 font-[Manrope]">Lvl {{ userStore.profile?.level || 1 }}</p>
          <p class="text-xs m-0 mt-1" style="color: var(--text-muted);">{{ userStore.cefrBand?.code }} — {{ userStore.cefrBand?.label }}</p>
        </div>
      </div>

      <!-- Per-skill percentages -->
      <div class="glass reveal rounded-[24px] p-6 mb-6">
        <h2 class="font-[Manrope] text-lg font-bold m-0 mb-4 flex items-center gap-2">
          <i class="ti ti-chart-donut" aria-hidden="true" style="color: var(--accent);"></i>
          Ko'nikmalar bo'yicha progress
        </h2>
        <div class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
          <div v-for="s in skillSummaries" :key="s.id" class="text-center">
            <div class="skill-ring mx-auto mb-2" :style="ringStyle(s.percent)">
              <span class="skill-ring-value">{{ s.attempts ? s.percent + '%' : '—' }}</span>
            </div>
            <p class="text-xs font-semibold m-0 flex items-center justify-center gap-1">
              <i :class="'ti ' + s.icon" aria-hidden="true" style="color: var(--text-secondary);"></i>
              {{ s.label }}
            </p>
          </div>
        </div>
      </div>

      <!-- Weekly progress -->
      <div class="glass reveal rounded-[24px] p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-[Manrope] text-lg font-bold m-0 flex items-center gap-2">
            <i class="ti ti-calendar-week" aria-hidden="true" style="color: var(--accent);"></i>
            Haftalik progress
          </h2>
          <span class="text-sm font-bold" style="color: var(--accent);">{{ weeklyTotal }} XP</span>
        </div>
        <div class="week-chart">
          <div v-for="d in userStore.last7DaysXp" :key="d.date" class="week-chart-col">
            <div class="week-chart-bar-track">
              <div class="week-chart-bar" :style="{ height: barHeight(d.xp, weeklyMax) + '%' }"></div>
            </div>
            <span class="week-chart-label">{{ d.label }}</span>
          </div>
        </div>
      </div>

      <!-- Monthly progress -->
      <div class="glass reveal rounded-[24px] p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-[Manrope] text-lg font-bold m-0 flex items-center gap-2">
            <i class="ti ti-calendar-stats" aria-hidden="true" style="color: var(--accent);"></i>
            Oylik progress (so'nggi 30 kun)
          </h2>
          <span class="text-sm font-bold" style="color: var(--accent);">{{ monthlyTotal }} XP</span>
        </div>
        <div v-if="userStore.last30DaysWeeklyXp.length" class="month-chart">
          <div v-for="(w, i) in userStore.last30DaysWeeklyXp" :key="w.weekStart" class="month-chart-col">
            <div class="week-chart-bar-track month-chart-bar-track">
              <div class="week-chart-bar" :style="{ height: barHeight(w.xp, monthlyMax) + '%' }"></div>
            </div>
            <span class="week-chart-label">{{ i + 1 }}-hafta</span>
          </div>
        </div>
        <p v-else class="text-sm m-0" style="color: var(--text-muted);">Hali yetarli ma'lumot yo'q.</p>
      </div>
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

const vocabularyCount = computed(() => userStore.totalTrackedWords || 0)

const SKILL_DEFS = [
  { id: 'grammar', label: 'Grammatika', icon: 'ti-abc' },
  { id: 'listening', label: 'Tinglash', icon: 'ti-headphones' },
  { id: 'writing', label: 'Yozish', icon: 'ti-pencil' },
  { id: 'speaking', label: 'Gapirish', icon: 'ti-microphone' }
]

const skillSummaries = computed(() => {
  const scores = userStore.profile?.skillScores || {}
  return SKILL_DEFS.map((def) => {
    const history = scores[def.id] || []
    const totalCorrect = history.reduce((sum, h) => sum + h.correct, 0)
    const totalQuestions = history.reduce((sum, h) => sum + h.total, 0)
    const percent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    return { ...def, percent, attempts: totalQuestions }
  })
})

function ringStyle(percent) {
  const color = percent >= 75 ? '#22c55e' : percent >= 50 ? '#f59e0b' : percent > 0 ? '#ef4444' : 'var(--surface-glass)'
  return {
    background: `conic-gradient(${color} ${percent * 3.6}deg, var(--surface-glass) 0deg)`
  }
}

const weeklyTotal = computed(() => userStore.last7DaysXp.reduce((sum, d) => sum + d.xp, 0))
const weeklyMax = computed(() => Math.max(1, ...userStore.last7DaysXp.map((d) => d.xp)))

const monthlyTotal = computed(() => userStore.last30DaysWeeklyXp.reduce((sum, w) => sum + w.xp, 0))
const monthlyMax = computed(() => Math.max(1, ...userStore.last30DaysWeeklyXp.map((w) => w.xp)))

function barHeight(value, max) {
  return Math.max(4, Math.round((value / max) * 100))
}
</script>

<style scoped>
.skill-ring {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.skill-ring::before {
  content: '';
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: var(--card-bg, #0b1210);
}
.skill-ring-value {
  position: relative;
  z-index: 1;
  font-size: 13px;
  font-weight: 700;
}

.week-chart {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 140px;
}
.week-chart-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 8px;
}
.week-chart-bar-track {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface-glass);
}
.week-chart-bar {
  width: 100%;
  background: linear-gradient(180deg, var(--accent), rgba(34, 197, 94, 0.5));
  border-radius: 8px;
  transition: height 0.3s ease;
  min-height: 4px;
}
.week-chart-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
}

.month-chart {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 120px;
  overflow-x: auto;
  padding-bottom: 2px;
}
.month-chart-col {
  flex: 0 0 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 6px;
}
.month-chart-bar-track {
  height: 90px;
}
</style>
