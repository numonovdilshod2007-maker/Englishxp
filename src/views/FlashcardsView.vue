<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[520px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-cards" aria-hidden="true" style="color: var(--accent);"></i>
          Flashcardlar
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Kartani suring: chapga — bilmayman, o'ngga — bilaman
        </p>
      </div>

      <!-- No cards due -->
      <div v-if="!started && queue.length === 0" class="glass reveal rounded-[24px] p-8 text-center">
        <i class="ti ti-circle-check-filled text-4xl mb-3 block" style="color: var(--accent);"></i>
        <h2 class="font-[Manrope] text-lg font-bold m-0 mb-1.5">Hozircha takrorlash kerak emas</h2>
        <p class="text-sm mb-5" style="color: var(--text-secondary);">
          Barcha so'zlaringiz yaxshi holatda. Yangi so'zlar bilan mashq qiling yoki keyinroq qayting.
        </p>
        <router-link
          to="/dashboard"
          class="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-[15px]"
          style="background: var(--accent); color: #05130a;"
        >
          Bosh sahifaga
        </router-link>
      </div>

      <!-- Intro -->
      <div v-else-if="!started" class="glass reveal rounded-[24px] p-8 text-center">
        <p class="text-sm mb-5 leading-relaxed" style="color: var(--text-secondary);">
          {{ queue.length }} ta so'z takrorlashga tayyor. Har bir kartani ko'ring, tarjimasini
          eslashga harakat qiling, so'ng aylantirib tekshiring.
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px] transition-transform hover:scale-105"
          style="background: var(--accent); color: #05130a;"
          @click="beginDeck"
        >
          <i class="ti ti-player-play" aria-hidden="true"></i>
          Boshlash
        </button>
      </div>

      <!-- Deck -->
      <template v-else-if="currentCard">
        <div class="flex items-center justify-between mb-4 reveal">
          <span class="text-xs font-semibold" style="color: var(--text-muted);">
            {{ index + 1 }} / {{ queue.length }}
          </span>
          <span class="text-xs font-bold" style="color: var(--accent);">+{{ earnedXpSoFar }} XP</span>
        </div>

        <div class="relative select-none" style="perspective: 1200px;">
          <div
            class="glass rounded-[24px] p-9 text-center min-h-[260px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-200"
            :style="cardStyle"
            @click="flipped = !flipped"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <template v-if="!flipped">
              <p class="text-[11px] font-bold uppercase tracking-wide mb-3" style="color: var(--text-muted);">
                Bu so'z nima ma'noni bildiradi?
              </p>
              <img
                v-if="!imageFailed"
                :src="imageUrlFor(currentCard.en)"
                :alt="currentCard.en"
                class="flashcard-image"
                @error="imageFailed = true"
              />
              <h2 class="font-[Manrope] text-4xl font-extrabold m-0" style="color: var(--text-primary);">
                {{ currentCard.en }}
              </h2>
              <p v-if="currentCard.ipa" class="text-sm mt-1 mb-0" style="color: var(--accent);">/{{ currentCard.ipa.replace(/\//g, '') }}/</p>
              <button
                type="button"
                class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style="background: var(--surface-glass); color: var(--text-primary);"
                @click.stop="speak(currentCard.en)"
              >
                <i class="ti ti-volume" aria-hidden="true"></i>
                Eshitish
              </button>
              <p class="text-xs mt-6 mb-0" style="color: var(--text-muted);">Aylantirish uchun bosing</p>
            </template>
            <template v-else>
              <p class="text-[11px] font-bold uppercase tracking-wide mb-3" style="color: var(--text-muted);">
                Tarjima
              </p>
              <h2 class="font-[Manrope] text-3xl font-extrabold m-0 mb-2" style="color: var(--accent);">
                {{ currentCard.uz }}
              </h2>
              <p class="text-sm italic mb-0" style="color: var(--text-secondary);">{{ currentCard.example }}</p>
              <div v-if="currentCard.synonyms?.length || currentCard.antonyms?.length" class="flashcard-synonyms">
                <span v-if="currentCard.synonyms?.length" class="flashcard-tag flashcard-tag-syn">
                  <i class="ti ti-arrows-join-2" aria-hidden="true"></i> {{ currentCard.synonyms.join(', ') }}
                </span>
                <span v-if="currentCard.antonyms?.length" class="flashcard-tag flashcard-tag-ant">
                  <i class="ti ti-arrows-diff" aria-hidden="true"></i> {{ currentCard.antonyms.join(', ') }}
                </span>
              </div>
              <p class="text-xs mt-6 mb-0" style="color: var(--text-muted);">
                Bilganingizni pastdagi tugmalar bilan belgilang
              </p>
            </template>
          </div>

          <!-- Drag hint overlays -->
          <div
            class="pointer-events-none absolute inset-0 rounded-[24px] flex items-center justify-start pl-6 font-extrabold text-xl transition-opacity"
            style="color: #e5484d;"
            :style="{ opacity: dragX < -30 ? Math.min(1, -dragX / 120) : 0 }"
          >
            ✕
          </div>
          <div
            class="pointer-events-none absolute inset-0 rounded-[24px] flex items-center justify-end pr-6 font-extrabold text-xl transition-opacity"
            style="color: var(--accent);"
            :style="{ opacity: dragX > 30 ? Math.min(1, dragX / 120) : 0 }"
          >
            ✓
          </div>
        </div>

        <div class="flex justify-center gap-4 mt-6 reveal">
          <button
            type="button"
            class="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform hover:scale-110"
            style="background: rgba(229,72,77,0.12); color: #e5484d;"
            title="Bilmayman"
            @click="answer(false)"
          >
            <i class="ti ti-x" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            class="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform hover:scale-110"
            style="background: var(--accent-soft); color: var(--accent);"
            title="Bilaman"
            @click="answer(true)"
          >
            <i class="ti ti-check" aria-hidden="true"></i>
          </button>
        </div>
      </template>

      <!-- Finished -->
      <div v-else class="glass reveal rounded-[24px] p-8 text-center">
        <div class="text-4xl mb-2">🗂️</div>
        <h2 class="font-[Manrope] text-xl font-bold m-0 mb-1.5">Barcha kartalar ko'rib chiqildi!</h2>
        <p class="text-sm mb-1" style="color: var(--text-secondary);">
          {{ queue.length }} tadan {{ knownCount }} tasini bilar ekansiz
        </p>
        <p class="text-xl font-extrabold my-4" style="color: var(--accent);">+{{ earnedXpSoFar }} XP</p>
        <router-link
          to="/dashboard"
          class="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-[15px]"
          style="background: var(--accent); color: #05130a;"
        >
          Bosh sahifaga
        </router-link>

        <PartnerCompareCard
          subject="flashcards"
          :my-result="{ correct: knownCount, total: queue.length, xp: earnedXpSoFar }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { getAllWords } from '../data/vocabulary.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import PartnerCompareCard from '../components/PartnerCompareCard.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { speakWord } from '../composables/useSpeech.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

const started = ref(false)
const flipped = ref(false)
const index = ref(0)
const knownCount = ref(0)
const earnedXpSoFar = ref(0)
const queue = ref([])

const dragX = ref(0)
const dragging = ref(false)
let pointerStartX = 0

onMounted(() => {
  const allWords = getAllWords()
  const wordsByEn = Object.fromEntries(allWords.map((w) => [w.en, w]))
  queue.value = userStore.dueWords
    .map((d) => wordsByEn[d.en])
    .filter(Boolean)
})

const currentCard = computed(() => queue.value[index.value] || null)

// Dynamic word image (no manual curation needed — works for any word).
// Reset whenever the card changes so a broken image on one word doesn't
// hide the image for the next one.
const imageFailed = ref(false)
watch(currentCard, () => {
  imageFailed.value = false
})
function imageUrlFor(word) {
  return `https://source.unsplash.com/300x200/?${encodeURIComponent(word)}`
}

const cardStyle = computed(() => {
  const rotate = dragX.value / 14
  return {
    transform: `translateX(${dragX.value}px) rotate(${rotate}deg)`,
    transition: dragging.value ? 'none' : 'transform 0.25s ease'
  }
})

function speak(word) {
  speakWord(word)
}

function beginDeck() {
  started.value = true
  nextTick(() => refresh())
}

async function answer(known) {
  if (!currentCard.value) return
  await userStore.reviewWord(currentCard.value.en, known)
  if (known) {
    knownCount.value++
    const xp = 3
    earnedXpSoFar.value += xp
    await userStore.addXp(xp)
    userStore.incrementDailyStat('correctAnswers')
  }
  flipped.value = false
  dragX.value = 0
  index.value++
  refresh()
}

function onPointerDown(e) {
  dragging.value = true
  pointerStartX = e.clientX
}

function onPointerMove(e) {
  if (!dragging.value) return
  dragX.value = e.clientX - pointerStartX
}

function onPointerUp() {
  if (!dragging.value) return
  dragging.value = false
  if (dragX.value > 90) {
    answer(true)
  } else if (dragX.value < -90) {
    answer(false)
  } else {
    dragX.value = 0
  }
}
</script>

<style scoped>
.flashcard-image {
  width: 100%;
  max-width: 220px;
  height: 130px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 14px;
}
.flashcard-synonyms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}
.flashcard-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}
.flashcard-tag-syn {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}
.flashcard-tag-ant {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}
</style>

