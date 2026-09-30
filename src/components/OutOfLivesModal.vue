<template>
  <Modal :model-value="modelValue" title="Jonlaringiz tugadi 💔" @update:model-value="$emit('update:modelValue', $event)">
    <p class="mb-4">
      Barcha jonlaringizni sarfladingiz. Yangi jon <strong>{{ timerLabel }}</strong> dan keyin tiklanadi,
      yoki hoziroq Pro'ga o'tib cheksiz mashq qiling.
    </p>
    <div class="flex flex-col gap-2.5">
      <router-link
        to="/upgrade"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[15px]"
        style="background: linear-gradient(135deg, #f6c453, #e8983a); color: #4a2e00; text-decoration: none;"
      >
        <i class="ti ti-crown" aria-hidden="true"></i>
        Pro'ga o'tish — cheksiz jonlar
      </router-link>
      <button
        type="button"
        class="px-6 py-3 rounded-full font-semibold text-[15px]"
        style="background: var(--surface-glass); color: var(--text-secondary);"
        @click="$emit('update:modelValue', false)"
      >
        Keyinroq
      </button>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Modal from './Modal.vue'
import { useUserStore } from '../stores/userStore.js'

defineProps({ modelValue: { type: Boolean, default: false } })
defineEmits(['update:modelValue'])

const userStore = useUserStore()
const now = ref(Date.now())
let tickId = null

onMounted(() => {
  tickId = setInterval(() => { now.value = Date.now() }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(tickId)
})

const timerLabel = computed(() => {
  void now.value
  const ms = userStore.msUntilNextLife
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
})
</script>
