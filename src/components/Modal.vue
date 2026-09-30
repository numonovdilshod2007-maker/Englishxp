<template>
  <teleport to="body">
    <transition @enter="onEnter" @leave="onLeave" :css="false">
      <div v-if="modelValue" class="modal-overlay" @click.self="close">
        <div ref="dialogRef" class="glass modal-content">
          <button class="modal-close" @click="close" aria-label="Yopish">
            <i class="ti ti-x" aria-hidden="true"></i>
          </button>
          <h2 v-if="title" class="modal-title">{{ title }}</h2>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { animate } from 'animejs'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const dialogRef = ref(null)

function close() {
  emit('update:modelValue', false)
}

function onEnter(el, done) {
  animate(el, {
    opacity: [0, 1],
    duration: 200,
    ease: 'outQuad'
  })
  animate(dialogRef.value, {
    opacity: [0, 1],
    scale: [0.92, 1],
    translateY: [16, 0],
    duration: 420,
    ease: 'outExpo',
    onComplete: done
  })
}

function onLeave(el, done) {
  animate(el, {
    opacity: [1, 0],
    duration: 180,
    ease: 'inQuad',
    onComplete: done
  })
}
</script>

<style scoped>
.modal-title {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-right: 24px;
}

.modal-body {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
}
</style>
