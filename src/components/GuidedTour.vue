<template>
  <Teleport to="body">
    <div v-if="visible" class="tour-root">
      <!-- Dimmed overlay with a spotlight "hole" cut around the target -->
      <div class="tour-overlay" :style="spotlightStyle" @click.self="skip"></div>

      <!-- Tooltip card positioned next to the target -->
      <div class="tour-card" :style="cardStyle" v-pop-in>
        <p class="tour-step-count">{{ currentIndex + 1 }} / {{ steps.length }}</p>
        <h3 class="tour-title">{{ currentStep.title }}</h3>
        <p class="tour-text">{{ currentStep.text }}</p>
        <div class="tour-actions">
          <button class="tour-skip" @click="skip">O'tkazib yuborish</button>
          <button class="tour-next" @click="next">
            {{ currentIndex < steps.length - 1 ? 'Keyingi' : 'Tushunarli!' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

// steps: [{ selector: '.css-selector', title, text, placement: 'bottom' | 'top' }]
const props = defineProps({
  steps: { type: Array, required: true },
  autoStart: { type: Boolean, default: true }
})
const emit = defineEmits(['finish'])

const visible = ref(false)
const currentIndex = ref(0)
const rect = ref(null)

const currentStep = computed(() => props.steps[currentIndex.value] || {})

function measure() {
  const el = document.querySelector(currentStep.value.selector)
  if (!el) {
    // Target not on screen (e.g. empty state) — skip straight past this step.
    next()
    return
  }
  el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  // Wait a beat for smooth-scroll to settle before measuring position.
  setTimeout(() => {
    rect.value = el.getBoundingClientRect()
  }, 260)
}

const PADDING = 10

const spotlightStyle = computed(() => {
  if (!rect.value) return {}
  const r = rect.value
  const top = r.top - PADDING
  const left = r.left - PADDING
  const width = r.width + PADDING * 2
  const height = r.height + PADDING * 2
  return {
    '--sx': `${left}px`,
    '--sy': `${top}px`,
    '--sw': `${width}px`,
    '--sh': `${height}px`
  }
})

const cardStyle = computed(() => {
  if (!rect.value) return { opacity: 0 }
  const r = rect.value
  const placement = currentStep.value.placement || 'bottom'
  const viewportW = window.innerWidth
  const cardWidth = Math.min(320, viewportW - 32)
  let top, left
  if (placement === 'top') {
    top = r.top - PADDING - 14
    left = r.left + r.width / 2
    return { top: `${top}px`, left: `${left}px`, width: `${cardWidth}px`, transform: 'translate(-50%, -100%)' }
  }
  top = r.bottom + PADDING + 14
  left = Math.min(Math.max(r.left + r.width / 2, cardWidth / 2 + 16), viewportW - cardWidth / 2 - 16)
  return { top: `${top}px`, left: `${left}px`, width: `${cardWidth}px`, transform: 'translate(-50%, 0)' }
})

function next() {
  if (currentIndex.value < props.steps.length - 1) {
    currentIndex.value++
    nextTick(measure)
  } else {
    finish()
  }
}

function skip() {
  finish()
}

function finish() {
  visible.value = false
  window.removeEventListener('resize', measure)
  emit('finish')
}

function start() {
  if (!props.steps.length) return
  currentIndex.value = 0
  visible.value = true
  nextTick(measure)
  window.addEventListener('resize', measure)
}

onMounted(() => {
  if (props.autoStart) start()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
})

defineExpose({ start })
</script>

<style scoped>
.tour-root {
  position: fixed;
  inset: 0;
  z-index: 200;
}

.tour-overlay {
  position: fixed;
  inset: 0;
  background: transparent;
  box-shadow: 0 0 0 9999px rgba(4, 8, 6, 0.72);
  border-radius: 16px;
  top: var(--sy, 50%);
  left: var(--sx, 50%);
  width: var(--sw, 0px);
  height: var(--sh, 0px);
  transition: top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease;
  pointer-events: auto;
}

.tour-card {
  position: fixed;
  background: rgba(20, 24, 22, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-glass-strong, rgba(255,255,255,.18));
  border-radius: 18px;
  padding: 20px 22px;
  z-index: 201;
  box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.6);
  transition: top 0.3s ease, left 0.3s ease;
}

.tour-step-count {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tour-title {
  font-family: 'Manrope', sans-serif;
  font-size: 16.5px;
  font-weight: 800;
  margin: 0 0 6px;
  color: var(--text-primary, #eef2f0);
}

.tour-text {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-secondary, #9aa39d);
  margin: 0 0 16px;
}

.tour-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.tour-skip {
  font-size: 12.5px;
  color: var(--text-muted, #667069);
  font-weight: 500;
}

.tour-skip:hover {
  color: var(--text-secondary, #9aa39d);
}

.tour-next {
  padding: 9px 18px;
  border-radius: 10px;
  background: var(--accent, #3ce67d);
  color: #04140b;
  font-weight: 700;
  font-size: 13px;
  white-space: nowrap;
}

.tour-next:hover {
  filter: brightness(1.08);
}
</style>
