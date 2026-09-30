<template>
  <router-link
    v-if="!userStore.isPro"
    to="/upgrade"
    class="lives-bar"
    :title="userStore.hasLives ? 'Jonlaringiz' : 'Jonlar tugadi — Pro bilan cheksiz'"
  >
    <i
      v-for="i in maxLives"
      :key="i"
      class="ti ti-heart-filled life-heart"
      :class="{ 'life-heart-empty': i > userStore.currentLives }"
      aria-hidden="true"
    ></i>
    <span v-if="userStore.currentLives < maxLives" class="life-timer">{{ timerLabel }}</span>
  </router-link>
  <div v-else class="lives-bar lives-bar-pro" title="Pro — cheksiz jonlar">
    <i class="ti ti-infinity" aria-hidden="true"></i>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { MAX_LIVES } from '../stores/userStore.js'

const userStore = useUserStore()
const maxLives = MAX_LIVES

const now = ref(Date.now())
let tickId = null

onMounted(() => {
  tickId = setInterval(() => { now.value = Date.now() }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(tickId)
})

const timerLabel = computed(() => {
  // Reading `now` forces this to recompute every tick even though the
  // underlying getter is otherwise only reactive to profile changes.
  void now.value
  const ms = userStore.msUntilNextLife
  if (ms <= 0) return ''
  const totalSec = Math.ceil(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
})
</script>

<style scoped>
.lives-bar {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--surface-glass);
  text-decoration: none;
  line-height: 1;
}

.lives-bar-pro {
  color: #e8983a;
  font-size: 18px;
}

.life-heart {
  font-size: 15px;
  color: #e5484d;
  transition: opacity 0.2s, transform 0.2s;
}

.life-heart-empty {
  color: var(--text-muted);
  opacity: 0.35;
}

.life-timer {
  margin-left: 4px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}
</style>
