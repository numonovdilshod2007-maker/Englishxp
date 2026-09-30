<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[640px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-headphones" aria-hidden="true" style="color: var(--accent);"></i>
          Tinglab tushunish
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Matnni tinglang, keyin savollarga javob bering
        </p>
      </div>

      <div v-if="!isSupported" class="glass reveal rounded-[20px] p-6 text-center">
        <i class="ti ti-volume-off text-3xl mb-2 block" style="color: var(--text-muted);"></i>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Bu brauzer ovoz chiqarish funksiyasini qo'llab-quvvatlamaydi.
        </p>
      </div>

      <!-- Item picker -->
      <div v-else-if="!started" class="glass reveal rounded-[24px] p-6">
        <h2 class="text-lg font-bold mb-4" style="color: var(--text-primary);">{{ levelSet.title }}</h2>
        <div class="flex flex-col gap-3">
          <button
            v-for="(item, idx) in levelSet.items"
            :key="idx"
            type="button"
            class="glass rounded-[16px] p-4 text-left transition-transform hover:scale-[1.02] flex items-center justify-between gap-3"
            @click="startItem(idx)"
          >
            <span class="text-sm font-semibold" style="color: var(--text-primary);">Audio {{ idx + 1 }}</span>
            <i class="ti ti-player-play" style="color: var(--accent);"></i>
          </button>
        </div>
      </div>

      <!-- Active exercise -->
      <div v-else class="glass reveal rounded-[24px] p-6">
        <div class="flex items-center justify-between mb-3">
          <button type="button" class="text-sm font-semibold" style="color: var(--text-secondary);" @click="reset">
            <i class="ti ti-arrow-left"></i> Orqaga
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-full text-sm font-bold"
            style="background: var(--accent); color: #05130a;"
            @click="playAudio"
          >
            <i class="ti ti-volume" aria-hidden="true"></i> {{ playCount === 0 ? 'Eshitish' : 'Qayta eshitish' }}
          </button>
        </div>

        <div class="flex items-center justify-center gap-2 mb-5">
          <button
            type="button"
            class="listening-chip"
            :class="{ 'listening-chip-active': playbackRate === 0.75 }"
            @click="playbackRate = 0.75"
          >0.75x</button>
          <button
            type="button"
            class="listening-chip"
            :class="{ 'listening-chip-active': playbackRate === 0.9 }"
            @click="playbackRate = 0.9"
          >Normal</button>
          <button
            type="button"
            class="listening-chip"
            :class="{ 'listening-chip-active': showTranscript }"
            @click="showTranscript = !showTranscript"
          >
            <i class="ti ti-quote" aria-hidden="true"></i> Subtitle
          </button>
        </div>

        <p v-if="showTranscript" class="listening-transcript">{{ currentItem.script }}</p>

        <p v-if="playCount === 0" class="text-sm text-center mb-6" style="color: var(--text-muted);">
          Boshlash uchun "Eshitish" tugmasini bosing
        </p>

        <!-- Dictation: type what you hear, checked against the script -->
        <div v-else-if="!dictationDone" class="mb-6">
          <p class="text-sm font-semibold mb-2.5" style="color: var(--text-primary);">
            <i class="ti ti-pencil" aria-hidden="true"></i> Eshitganingizni yozing:
          </p>
          <textarea
            v-model="dictationInput"
            rows="2"
            class="listening-dictation-input"
            placeholder="Type what you heard..."
            :disabled="dictationChecked"
          ></textarea>
          <div v-if="dictationChecked" class="listening-dictation-result">
            <span v-for="(w, i) in dictationDiff" :key="i" :class="w.correct ? 'diff-correct' : 'diff-wrong'">{{ w.word }} </span>
          </div>
          <div class="flex gap-2 mt-3">
            <button
              v-if="!dictationChecked"
              type="button"
              class="px-4 py-2 rounded-full text-sm font-bold"
              style="background: var(--accent); color: #05130a;"
              :disabled="!dictationInput.trim()"
              @click="checkDictation"
            >
              Tekshirish
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-full text-sm font-semibold"
              style="background: var(--surface-glass); color: var(--text-secondary);"
              @click="dictationDone = true"
            >
              {{ dictationChecked ? "Savollarga o'tish" : "O'tkazib yuborish" }}
            </button>
          </div>
        </div>

        <div v-else>
          <div v-for="(q, qi) in currentItem.questions" :key="qi" class="mb-5">
            <p class="text-sm font-semibold mb-2.5" style="color: var(--text-primary);">{{ qi + 1 }}. {{ q.question }}</p>
            <div class="flex flex-col gap-2">
              <button
                v-for="opt in q.options"
                :key="opt"
                type="button"
                class="text-left px-4 py-2.5 rounded-[12px] text-sm transition-transform hover:scale-[1.01]"
                :disabled="submitted"
                :style="optionStyle(qi, opt)"
                @click="selectAnswer(qi, opt)"
              >
                {{ opt }}
              </button>
            </div>
          </div>

          <button
            v-if="!submitted"
            type="button"
            class="w-full py-3 rounded-full font-bold text-sm mt-2"
            style="background: var(--accent); color: #05130a;"
            :disabled="!allAnswered"
            :class="{ 'opacity-50': !allAnswered }"
            @click="submit"
          >
            Tekshirish
          </button>

          <div v-else class="text-center mt-4">
            <p class="text-lg font-bold mb-3" style="color: var(--text-primary);">
              {{ score }} / {{ currentItem.questions.length }} to'g'ri
            </p>
            <button
              type="button"
              class="px-5 py-2.5 rounded-full text-sm font-bold"
              style="background: var(--surface-glass); color: var(--text-primary);"
              @click="reset"
            >
              Boshqa audio tanlash
            </button>

            <PartnerCompareCard
              subject="listening"
              :my-result="{ correct: score, total: currentItem.questions.length, xp: score * XP_REWARDS.correctAnswer }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import AppNav from '../components/AppNav.vue'
import PartnerCompareCard from '../components/PartnerCompareCard.vue'
import { getListeningForLevel } from '../data/listening.js'
import { isSpeechSupported } from '../composables/useSpeech.js'
import { useUserStore } from '../stores/userStore.js'
import { XP_REWARDS } from '../data/vocabulary.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()
const isSupported = isSpeechSupported()

const levelSet = computed(() => getListeningForLevel(userStore.level))

const started = ref(false)
const activeIdx = ref(0)
const playCount = ref(0)
const answers = ref({})
const submitted = ref(false)
const score = ref(0)

const playbackRate = ref(0.9)
const showTranscript = ref(false)
const dictationInput = ref('')
const dictationChecked = ref(false)
const dictationDone = ref(false)
const dictationDiff = ref([])

const currentItem = computed(() => levelSet.value.items[activeIdx.value])

const allAnswered = computed(() =>
  currentItem.value.questions.every((_, qi) => answers.value[qi] !== undefined)
)

function startItem(idx) {
  activeIdx.value = idx
  started.value = true
  playCount.value = 0
  answers.value = {}
  submitted.value = false
  score.value = 0
  showTranscript.value = false
  dictationInput.value = ''
  dictationChecked.value = false
  dictationDone.value = false
  dictationDiff.value = []
  nextTick(() => refresh())
}

function playAudio() {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(currentItem.value.script)
  utterance.lang = 'en-US'
  utterance.rate = playbackRate.value
  window.speechSynthesis.speak(utterance)
  playCount.value++
}

// Word-level diff between what the learner typed and the real script, used
// to highlight correct vs. wrong words after checking dictation.
function checkDictation() {
  const clean = (s) => s.toLowerCase().replace(/[^a-z0-9' ]/g, '').split(/\s+/).filter(Boolean)
  const target = clean(currentItem.value.script)
  const typed = clean(dictationInput.value)
  dictationDiff.value = target.map((word, i) => ({ word, correct: typed[i] === word }))
  dictationChecked.value = true
}

function selectAnswer(qi, opt) {
  if (submitted.value) return
  answers.value[qi] = opt
}

function optionStyle(qi, opt) {
  if (!submitted.value) {
    return answers.value[qi] === opt
      ? 'background: var(--accent); color: #05130a; font-weight: 700;'
      : 'background: var(--surface-glass); color: var(--text-primary);'
  }
  const correct = currentItem.value.questions[qi].correct
  if (opt === correct) return 'background: #22c55e; color: white; font-weight: 700;'
  if (opt === answers.value[qi] && opt !== correct) return 'background: #ef4444; color: white;'
  return 'background: var(--surface-glass); color: var(--text-muted);'
}

async function submit() {
  submitted.value = true
  let correctCount = 0
  currentItem.value.questions.forEach((q, qi) => {
    if (answers.value[qi] === q.correct) correctCount++
  })
  score.value = correctCount
  userStore.recordSkillScore('listening', correctCount, currentItem.value.questions.length)
  if (correctCount > 0) {
    await userStore.addXp(correctCount * XP_REWARDS.correctAnswer)
  }
  if (userStore.incrementDailyStat) {
    await userStore.incrementDailyStat('correctAnswers', correctCount)
  }
  userStore.incrementDailyStat('listeningCompleted')
  await userStore.markListeningCompleted()
}

function reset() {
  started.value = false
  playCount.value = 0
  answers.value = {}
  submitted.value = false
  nextTick(() => refresh())
}
</script>

<style scoped>
.listening-chip {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: var(--surface-glass);
  color: var(--text-secondary);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.listening-chip-active {
  background: var(--accent);
  color: #05130a;
}
.listening-transcript {
  background: var(--surface-glass);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 13px;
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 16px;
  text-align: center;
}
.listening-dictation-input {
  width: 100%;
  background: var(--surface-glass);
  border: none;
  outline: none;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  color: inherit;
  resize: none;
  font-family: inherit;
}
.listening-dictation-result {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.8;
}
.diff-correct {
  color: #22c55e;
  font-weight: 600;
}
.diff-wrong {
  color: #ef4444;
  text-decoration: underline;
}
</style>

