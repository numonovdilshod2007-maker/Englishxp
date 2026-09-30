<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[640px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-bolt" aria-hidden="true" style="color: var(--accent);"></i>
          Kunlik Challenge
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Har kuni 5 ta qisqa mashq — 5-15 daqiqada tugaydi, so'zdan gapirishgacha
        </p>
      </div>

      <!-- Overall progress ring -->
      <div class="glass reveal rounded-[24px] p-6 mb-6 text-center">
        <div class="challenge-ring mx-auto mb-3" :style="ringStyle">
          <div class="challenge-ring-inner">
            <span class="challenge-ring-count">{{ completedCount }}/{{ quests.length }}</span>
            <span class="challenge-ring-label">bajarildi</span>
          </div>
        </div>
        <p v-if="allDone" class="text-sm font-bold m-0" style="color: #22c55e;">
          <i class="ti ti-confetti" aria-hidden="true"></i>
          Ajoyib! Bugungi challenge to'liq tugallandi.
        </p>
        <p v-else class="text-sm m-0" style="color: var(--text-secondary);">
          {{ quests.length - completedCount }} ta vazifa qoldi
        </p>
      </div>

      <!-- Checklist -->
      <div class="space-y-3">
        <router-link
          v-for="q in quests"
          :key="q.id"
          :to="q.route"
          class="glass reveal challenge-item"
          :class="{ 'challenge-item-done': q.completed }"
        >
          <div class="challenge-item-icon" :class="{ 'challenge-item-icon-done': q.completed }">
            <i :class="q.completed ? 'ti ti-check' : 'ti ' + q.icon" aria-hidden="true"></i>
          </div>
          <div class="challenge-item-body">
            <p class="challenge-item-title">{{ q.label }}</p>
            <div class="challenge-item-progress-track">
              <div class="challenge-item-progress-fill" :style="{ width: Math.round((q.progress / q.target) * 100) + '%' }"></div>
            </div>
          </div>
          <div class="challenge-item-xp">
            <span v-if="q.completed" class="challenge-item-xp-done"><i class="ti ti-check" aria-hidden="true"></i></span>
            <span v-else>+{{ q.xpReward }} XP</span>
          </div>
        </router-link>
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

// Maps each daily quest to the page where the learner actually does it.
const quests = computed(() => {
  const questRoutes = {
    correctAnswers: '/flashcards',
    lessonsCompleted: `/lesson/${userStore.profile?.level || 1}`,
    grammarCompleted: '/grammar-quiz',
    listeningCompleted: '/listening',
    speakingCompleted: '/roleplay'
  }
  return userStore.dailyQuests.map((q) => ({ ...q, route: questRoutes[q.id] || '/dashboard' }))
})

const completedCount = computed(() => quests.value.filter((q) => q.completed).length)
const allDone = computed(() => quests.value.length > 0 && completedCount.value === quests.value.length)

const ringStyle = computed(() => {
  const percent = quests.value.length ? Math.round((completedCount.value / quests.value.length) * 100) : 0
  const color = allDone.value ? '#22c55e' : 'var(--accent)'
  return { background: `conic-gradient(${color} ${percent * 3.6}deg, var(--surface-glass) 0deg)` }
})
</script>

<style scoped>
.challenge-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.challenge-ring-inner {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--card-bg, #0b1210);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.challenge-ring-count {
  font-size: 20px;
  font-weight: 800;
  font-family: 'Manrope', sans-serif;
}
.challenge-ring-label {
  font-size: 11px;
  color: var(--text-muted);
}

.challenge-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease;
}
.challenge-item:hover {
  transform: translateY(-2px);
}
.challenge-item-done {
  opacity: 0.65;
}

.challenge-item-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-glass);
  font-size: 18px;
  color: var(--accent);
}
.challenge-item-icon-done {
  background: rgba(34, 197, 94, 0.18);
  color: #22c55e;
}

.challenge-item-body {
  flex: 1;
  min-width: 0;
}
.challenge-item-title {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 6px;
}
.challenge-item-progress-track {
  height: 6px;
  border-radius: 4px;
  background: var(--surface-glass);
  overflow: hidden;
}
.challenge-item-progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.challenge-item-xp {
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
}
.challenge-item-xp-done {
  color: #22c55e;
  font-size: 18px;
}
</style>
