<template>
  <div class="mm-page">
    <AuroraBackground />
    <AppNav />

    <div class="container mm-content">
      <div class="mm-header reveal">
        <h1 class="mm-title">
          <i class="ti ti-bolt" aria-hidden="true" style="color: var(--accent);"></i>
          Match Madness
        </h1>
        <p class="mm-subtitle">So'z juftlarini vaqt tugashidan oldin moslashtiring!</p>
      </div>

      <!-- Idle: start screen -->
      <div v-if="phase === 'idle'" class="glass mm-card reveal">
        <p class="mm-intro">
          8 ta juft so'z (ingliz-o'zbek), {{ timeLimit }} soniya vaqt. Qanchalik tez tugatsangiz,
          shunchalik ko'p XP olasiz!
        </p>
        <button class="mm-start-btn" @click="startGame">
          <i class="ti ti-player-play" aria-hidden="true"></i>
          Boshlash
        </button>
      </div>

      <!-- Playing -->
      <div v-else-if="phase === 'playing'" class="mm-playing">
        <div class="mm-stats glass reveal">
          <div class="mm-stat">
            <i class="ti ti-clock" aria-hidden="true"></i>
            <span :class="{ 'mm-time-low': timeLeft <= 15 }">{{ timeLeft }}s</span>
          </div>
          <div class="mm-stat">
            <i class="ti ti-check" aria-hidden="true"></i>
            <span>{{ matchedCount }}/{{ pairs.length }}</span>
          </div>
        </div>

        <div class="mm-grid">
          <button
            v-for="card in cards"
            :key="card.id"
            class="mm-card-tile glass"
            :class="{
              'mm-tile-selected': selected.includes(card.id),
              'mm-tile-matched': card.matched,
              'mm-tile-wrong': wrongFlash.includes(card.id)
            }"
            :disabled="card.matched"
            @click="selectCard(card)"
          >
            {{ card.text }}
          </button>
        </div>
      </div>

      <!-- Finished (success) -->
      <div v-else-if="phase === 'done'" class="glass mm-card reveal">
        <div class="mm-result-icon">🎉</div>
        <h2>Ajoyib!</h2>
        <p class="mm-intro">Siz {{ elapsedTime }} soniyada {{ pairs.length }} ta juftni topdingiz.</p>
        <p class="mm-xp-earned">+{{ earnedXp }} XP</p>
        <div class="mm-actions">
          <button class="mm-start-btn" @click="startGame">Yana o'ynash</button>
          <router-link to="/dashboard" class="mm-secondary-btn">Bosh sahifaga</router-link>
        </div>
      </div>

      <!-- Time's up -->
      <div v-else-if="phase === 'timeout'" class="glass mm-card reveal">
        <div class="mm-result-icon">⏱️</div>
        <h2>Vaqt tugadi</h2>
        <p class="mm-intro">{{ matchedCount }}/{{ pairs.length }} juft topdingiz. Yana urinib ko'ring!</p>
        <div class="mm-actions">
          <button class="mm-start-btn" @click="startGame">Qayta urinish</button>
          <router-link to="/dashboard" class="mm-secondary-btn">Bosh sahifaga</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

const timeLimit = 90
const phase = ref('idle') // idle | playing | done | timeout
const pairs = ref([])
const cards = ref([])
const selected = ref([])
const wrongFlash = ref([])
const matchedCount = ref(0)
const timeLeft = ref(timeLimit)
const elapsedTime = ref(0)
const earnedXp = ref(0)
let timer = null
let startedAt = 0

function pickPairs() {
  const words = [...(userStore.currentLevelWords || [])]
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[words[i], words[j]] = [words[j], words[i]]
  }
  return words.slice(0, 8)
}

function buildCards(list) {
  const built = []
  list.forEach((w, idx) => {
    built.push({ id: `en-${idx}`, pairId: idx, text: w.en, matched: false })
    built.push({ id: `uz-${idx}`, pairId: idx, text: w.uz, matched: false })
  })
  for (let i = built.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[built[i], built[j]] = [built[j], built[i]]
  }
  return built
}

function startGame() {
  clearInterval(timer)
  pairs.value = pickPairs()
  cards.value = buildCards(pairs.value)
  selected.value = []
  wrongFlash.value = []
  matchedCount.value = 0
  timeLeft.value = timeLimit
  earnedXp.value = 0
  phase.value = 'playing'
  startedAt = Date.now()

  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      phase.value = 'timeout'
    }
  }, 1000)
}

function selectCard(card) {
  if (phase.value !== 'playing' || card.matched || selected.value.includes(card.id)) return
  if (selected.value.length === 2) return

  selected.value.push(card.id)
  if (selected.value.length < 2) return

  const [firstId, secondId] = selected.value
  const first = cards.value.find((c) => c.id === firstId)
  const second = cards.value.find((c) => c.id === secondId)

  if (first.pairId === second.pairId) {
    first.matched = true
    second.matched = true
    matchedCount.value++
    selected.value = []
    if (matchedCount.value === pairs.value.length) {
      finishGame()
    }
  } else {
    wrongFlash.value = [firstId, secondId]
    setTimeout(() => {
      wrongFlash.value = []
      selected.value = []
    }, 500)
  }
}

async function finishGame() {
  clearInterval(timer)
  elapsedTime.value = Math.round((Date.now() - startedAt) / 1000)
  // Faster completion earns more XP: base 20, up to +30 speed bonus.
  const speedBonus = Math.max(0, Math.round(30 * (1 - elapsedTime.value / timeLimit)))
  earnedXp.value = 20 + speedBonus
  phase.value = 'done'
  await userStore.addXp(earnedXp.value)
  userStore.incrementDailyStat('correctAnswers')
  refresh()
}

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.mm-content {
  padding: 36px 24px 80px;
  max-width: 640px;
}

.mm-header {
  text-align: center;
  margin-bottom: 24px;
}

.mm-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 6px;
}

.mm-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.mm-card {
  padding: 32px 24px;
  text-align: center;
}

.mm-intro {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 22px;
}

.mm-start-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 100px;
  background: var(--accent);
  color: #0d1110;
  font-weight: 700;
  font-size: 15px;
  transition: transform 0.2s var(--ease-spring);
}

.mm-start-btn:hover {
  transform: scale(1.04);
}

.mm-secondary-btn {
  display: inline-flex;
  align-items: center;
  padding: 13px 28px;
  border-radius: 100px;
  background: var(--surface-glass);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
}

.mm-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.mm-stats {
  display: flex;
  justify-content: center;
  gap: 28px;
  padding: 14px 20px;
  margin-bottom: 18px;
  border-radius: 16px;
}

.mm-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 16px;
}

.mm-time-low {
  color: #e5484d;
}

.mm-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.mm-card-tile {
  aspect-ratio: 1.1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  line-height: 1.25;
  transition: transform 0.15s var(--ease-spring), background 0.2s, opacity 0.3s;
}

.mm-card-tile:hover:not(:disabled) {
  transform: scale(1.03);
}

.mm-tile-selected {
  background: var(--accent-soft);
  border: 1px solid var(--accent);
}

.mm-tile-matched {
  opacity: 0;
  pointer-events: none;
}

.mm-tile-wrong {
  background: rgba(229, 72, 77, 0.15);
  border: 1px solid rgba(229, 72, 77, 0.4);
}

.mm-result-icon {
  font-size: 44px;
  margin-bottom: 8px;
}

.mm-xp-earned {
  font-size: 22px;
  font-weight: 800;
  color: var(--accent);
  margin: 0 0 20px;
}

@media (max-width: 480px) {
  .mm-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
