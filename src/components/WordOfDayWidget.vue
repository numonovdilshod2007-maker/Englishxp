<template>
  <div
    v-if="word"
    class="glass reveal relative overflow-hidden rounded-[20px] p-5 mb-6 flex items-center gap-4 cursor-default"
  >
    <div
      class="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
      style="background: var(--accent-soft); color: var(--accent);"
    >
      <i class="ti ti-sparkles" aria-hidden="true"></i>
    </div>

    <div class="min-w-0 flex-1">
      <p
        class="text-[11px] font-bold uppercase tracking-wide m-0"
        style="color: var(--text-muted);"
      >
        Kunning so'zi
      </p>
      <div class="flex items-baseline gap-2 flex-wrap mt-0.5">
        <span class="text-lg font-extrabold" style="color: var(--text-primary);">{{ word.en }}</span>
        <span class="text-sm" style="color: var(--text-secondary);">— {{ word.uz }}</span>
      </div>
      <p class="text-[13px] italic mt-1 mb-0 truncate" style="color: var(--text-muted);">
        {{ word.example }}
      </p>
    </div>

    <button
      type="button"
      class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
      style="background: var(--surface-glass); color: var(--text-primary);"
      title="Talaffuzni eshitish"
      @click="speak"
    >
      <i class="ti ti-volume" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getWordOfTheDay } from '../data/wordOfDay.js'
import { speakWord } from '../composables/useSpeech.js'

const word = computed(() => getWordOfTheDay())

function speak() {
  if (word.value) speakWord(word.value.en)
}
</script>
