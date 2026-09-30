<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[640px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-microphone" aria-hidden="true" style="color: var(--accent);"></i>
          Talaffuz mashqi
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          So'zni eshiting, keyin o'zingiz talaffuz qiling — mikrofon tekshirib beradi
        </p>
      </div>

      <div v-if="!isSupported" class="glass reveal rounded-[20px] p-6 text-center">
        <i class="ti ti-microphone-off text-3xl mb-2 block" style="color: var(--text-muted);"></i>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Bu brauzer ovozni tanish funksiyasini qo'llab-quvvatlamaydi. Iltimos, Chrome, Edge yoki
          Safari'dan foydalaning.
        </p>
      </div>

      <!-- Session length picker -->
      <div v-if="isSupported && !started" class="glass reveal rounded-[24px] p-8 text-center">
        <div class="flex justify-center gap-2.5 flex-wrap mb-5">
          <button
            type="button"
            class="px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
            :style="mode === 'words'
              ? 'background: var(--accent); color: #05130a;'
              : 'background: var(--surface-glass); color: var(--text-primary);'"
            @click="mode = 'words'"
          >
            <i class="ti ti-abc" aria-hidden="true"></i> So'zlar
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
            :style="mode === 'sentences'
              ? 'background: var(--accent); color: #05130a;'
              : 'background: var(--surface-glass); color: var(--text-primary);'"
            @click="mode = 'sentences'"
          >
            <i class="ti ti-align-left" aria-hidden="true"></i> Jumlalar
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
            :style="mode === 'pairs'
              ? 'background: var(--accent); color: #05130a;'
              : 'background: var(--surface-glass); color: var(--text-primary);'"
            @click="mode = 'pairs'"
          >
            <i class="ti ti-waveform" aria-hidden="true"></i> Minimal juftlar
          </button>
        </div>
        <p class="text-sm mb-5 leading-relaxed" style="color: var(--text-secondary);">
          <template v-if="mode === 'words'">
            Ochgan darajalaringizdagi {{ fullPool.length }} ta so'zdan mashq qilasiz. Nechta so'z bilan
            boshlaymiz?
          </template>
          <template v-else-if="mode === 'sentences'">
            {{ pronunciationSentences.length }} ta to'liq jumlani talaffuz qilib, gapirish
            ko'nikmangizni oshiring. Nechta jumla bilan boshlaymiz?
          </template>
          <template v-else>
            O'xshash tovushli so'zlarni farqlashni mashq qiling (masalan "ship" va "sheep"). Ovozni
            tinglang va qaysi so'z aytilganini toping. Nechta juft bilan boshlaymiz?
          </template>
        </p>
        <div class="flex justify-center gap-2.5 flex-wrap mb-2">
          <button
            v-for="opt in sessionOptions"
            :key="opt"
            type="button"
            class="px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
            :style="opt === sessionSize
              ? 'background: var(--accent); color: #05130a;'
              : 'background: var(--surface-glass); color: var(--text-primary);'"
            @click="sessionSize = opt"
          >
            {{ opt }} {{ mode === 'words' ? "so'z" : mode === 'pairs' ? 'juft' : 'jumla' }}
          </button>
        </div>
        <button
          type="button"
          class="mt-5 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px] transition-transform hover:scale-105"
          style="background: var(--accent); color: #05130a;"
          @click="restart"
        >
          <i class="ti ti-player-play" aria-hidden="true"></i>
          Boshlash
        </button>
      </div>

      <template v-else-if="isSupported">
        <!-- Progress -->
        <div class="flex items-center justify-between mb-4 reveal">
          <span class="text-xs font-semibold" style="color: var(--text-muted);">
            {{ currentIndex + 1 }} / {{ words.length }}
          </span>
          <span class="text-xs font-bold" style="color: var(--accent);">
            {{ sessionCorrect }} to'g'ri javob
          </span>
        </div>
        <div class="w-full h-1.5 rounded-full mb-6 overflow-hidden reveal" style="background: var(--surface-glass);">
          <div
            class="h-full rounded-full transition-all duration-300"
            style="background: var(--accent);"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>

        <!-- Word/sentence card (speak-and-check) -->
        <div v-if="mode !== 'pairs' && currentWord" class="glass reveal rounded-[24px] p-8 text-center">
          <p class="text-[13px] font-semibold uppercase tracking-wide mb-3" style="color: var(--text-muted);">
            {{ mode === 'words' ? "Ushbu so'zni talaffuz qiling" : 'Ushbu jumlani talaffuz qiling' }}
          </p>
          <h2
            class="font-[Manrope] font-extrabold m-0 mb-1.5"
            :class="mode === 'words' ? 'text-4xl' : 'text-2xl'"
            style="color: var(--text-primary);"
          >
            {{ currentWord.en }}
          </h2>
          <p v-if="currentWord.ipa" class="text-sm mb-1.5" style="color: var(--accent);">{{ currentWord.ipa }}</p>
          <p class="text-[15px] mb-6" style="color: var(--text-secondary);">{{ currentWord.uz }}</p>

          <button
            type="button"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-7 transition-transform hover:scale-105"
            style="background: var(--surface-glass); color: var(--text-primary);"
            @click="playTarget"
          >
            <i class="ti ti-volume" aria-hidden="true"></i>
            Eshitish
          </button>

          <!-- Mic button -->
          <div class="flex flex-col items-center gap-4">
            <button
              type="button"
              class="w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300"
              :class="listening ? 'animate-pulse scale-110' : 'hover:scale-105'"
              :style="micStyle"
              :disabled="listening"
              @click="startListening"
            >
              <i :class="listening ? 'ti ti-microphone' : 'ti ti-microphone-2'" aria-hidden="true"></i>
            </button>
            <p class="text-xs m-0" style="color: var(--text-muted);">
              {{ listening ? 'Tinglanmoqda... gapiring' : 'Boshlash uchun bosing' }}
            </p>
          </div>

          <!-- Result -->
          <div v-if="lastResult" class="mt-6 pt-6 border-t" style="border-color: var(--border-glass);">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-2"
              :style="lastResult.passed
                ? 'background: var(--accent-soft); color: var(--accent);'
                : 'background: rgba(229,72,77,0.12); color: #e5484d;'"
            >
              <i :class="lastResult.passed ? 'ti ti-check' : 'ti ti-x'" aria-hidden="true"></i>
              {{ lastResult.passed ? 'Ajoyib talaffuz!' : 'Yana urinib ko\'ring' }}
              ({{ Math.round(lastResult.similarity * 100) }}%)
            </div>
            <p class="text-[13px] m-0" style="color: var(--text-muted);">
              Eshitildi: "{{ lastResult.transcript }}"
            </p>
          </div>

          <div v-else-if="micError" class="mt-6 pt-6 border-t text-[13px]" style="border-color: var(--border-glass); color: var(--text-muted);">
            {{ micError }}
          </div>
        </div>

        <!-- Minimal pairs card (listen-and-choose) -->
        <div v-else-if="mode === 'pairs' && currentWord" class="glass reveal rounded-[24px] p-8 text-center">
          <p class="text-[13px] font-semibold uppercase tracking-wide mb-1" style="color: var(--text-muted);">
            Ovozni tinglang va qaysi so'z aytilganini tanlang
          </p>
          <p class="text-xs mb-6" style="color: var(--text-muted);">Kontrast: {{ currentWord.contrast }}</p>

          <button
            type="button"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-bold mb-7 transition-transform hover:scale-105"
            style="background: var(--accent-soft); color: var(--accent);"
            @click="playPairTarget"
          >
            <i class="ti ti-volume" aria-hidden="true"></i>
            Eshitish
          </button>

          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="side in ['a', 'b']"
              :key="side"
              type="button"
              class="glass rounded-[16px] p-5 text-center transition-transform"
              :class="pairAnswered ? '' : 'hover:scale-[1.03]'"
              :style="pairOptionStyle(side)"
              :disabled="pairAnswered"
              @click="choosePair(side)"
            >
              <p class="font-[Manrope] text-xl font-extrabold m-0 mb-1">{{ currentWord[side].en }}</p>
              <p class="text-xs m-0 mb-1" style="color: var(--accent);">{{ currentWord[side].ipa }}</p>
              <p class="text-xs m-0" style="color: var(--text-muted);">{{ currentWord[side].uz }}</p>
            </button>
          </div>

          <p v-if="pairAnswered" class="text-sm font-bold mt-5" :style="{ color: pairCorrect ? 'var(--accent)' : '#e5484d' }">
            <i :class="pairCorrect ? 'ti ti-check' : 'ti ti-x'" aria-hidden="true"></i>
            {{ pairCorrect ? "To'g'ri!" : "Noto'g'ri — to'g'ri javob: " + currentWord[currentWord.target].en }}
          </p>
        </div>

        <!-- Next -->
        <div class="flex justify-center gap-3 mt-6 reveal">
          <button
            type="button"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px] transition-transform hover:scale-105"
            style="background: var(--accent); color: #05130a;"
            @click="next"
          >
            {{ isLastWord ? 'Tugatish' : (mode === 'pairs' ? 'Keyingi juft' : 'Keyingi so\'z') }}
            <i class="ti ti-arrow-right" aria-hidden="true"></i>
          </button>
        </div>

        <!-- Session complete -->
        <div v-if="finished" class="glass reveal rounded-[24px] p-8 text-center mt-6">
          <div class="text-4xl mb-2">🎙️</div>
          <h2 class="font-[Manrope] text-xl font-bold m-0 mb-1.5">Mashq tugadi!</h2>
          <p class="text-sm mb-1" style="color: var(--text-secondary);">
            {{ words.length }} tadan {{ sessionCorrect }} tasini to'g'ri talaffuz qildingiz
          </p>
          <p class="text-xl font-extrabold my-4" style="color: var(--accent);">+{{ earnedXp }} XP</p>
          <div class="flex justify-center gap-2.5 flex-wrap">
            <button
              type="button"
              class="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-[15px]"
              style="background: var(--accent); color: #05130a;"
              @click="backToPicker"
            >
              Qayta mashq qilish
            </button>
            <router-link
              to="/dashboard"
              class="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-sm"
              style="background: var(--surface-glass); color: var(--text-primary);"
            >
              Bosh sahifaga
            </router-link>
          </div>

          <PartnerCompareCard
            subject="pronunciation"
            :my-result="{ correct: sessionCorrect, total: words.length, xp: earnedXp }"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { getWordsForLevel } from '../data/vocabulary.js'
import { pronunciationSentences } from '../data/pronunciationSentences.js'
import { getAllMinimalPairs } from '../data/minimalPairs.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import PartnerCompareCard from '../components/PartnerCompareCard.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { speakWord } from '../composables/useSpeech.js'
import { isRecognitionSupported, listenAndCompare } from '../composables/useSpeechRecognition.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

const isSupported = isRecognitionSupported()
const sessionOptions = [10, 20, 40]

// Every word across every level the user has unlocked (Pro unlocks all),
// deduplicated, so practice sessions aren't limited to just the current level.
const fullPool = computed(() => {
  const maxUnlocked = userStore.isPro ? 14 : userStore.level || 1
  const seen = new Set()
  const words = []
  for (let lvl = 1; lvl <= maxUnlocked; lvl++) {
    for (const w of getWordsForLevel(lvl)) {
      if (!seen.has(w.en)) {
        seen.add(w.en)
        words.push(w)
      }
    }
  }
  return words
})

const mode = ref('words') // 'words' | 'sentences'
const sessionSize = ref(20)
const started = ref(false)
const words = ref([])
const currentIndex = ref(0)
const sessionCorrect = ref(0)
const listening = ref(false)
const lastResult = ref(null)
const micError = ref('')
const finished = ref(false)
const earnedXp = ref(0)

// Minimal-pairs mode state (listen-and-choose, separate mechanic from
// the speak-and-check word/sentence modes above).
const pairAnswered = ref(false)
const pairCorrect = ref(false)
const pairChoice = ref(null)

function pickWords() {
  if (mode.value === 'pairs') {
    const pool = [...getAllMinimalPairs()]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, Math.min(sessionSize.value, pool.length)).map((pair) => ({
      ...pair,
      target: Math.random() < 0.5 ? 'a' : 'b'
    }))
  }
  const pool = mode.value === 'sentences' ? [...pronunciationSentences] : [...fullPool.value]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(sessionSize.value, pool.length))
}

function restart() {
  words.value = pickWords()
  currentIndex.value = 0
  sessionCorrect.value = 0
  lastResult.value = null
  micError.value = ''
  finished.value = false
  earnedXp.value = 0
  started.value = true
  pairAnswered.value = false
  pairCorrect.value = false
  pairChoice.value = null
  refresh()
}

function backToPicker() {
  started.value = false
  finished.value = false
  refresh()
}

const currentWord = computed(() => words.value[currentIndex.value] || null)
const isLastWord = computed(() => currentIndex.value >= words.value.length - 1)
const progressPercent = computed(() =>
  words.value.length ? Math.round((currentIndex.value / words.value.length) * 100) : 0
)

const micStyle = computed(() =>
  listening.value
    ? 'background: rgba(229,72,77,0.15); color: #e5484d;'
    : 'background: var(--accent-soft); color: var(--accent);'
)

function playTarget() {
  if (currentWord.value) speakWord(currentWord.value.en)
}

function playPairTarget() {
  if (currentWord.value) speakWord(currentWord.value[currentWord.value.target].en)
}

function choosePair(side) {
  if (pairAnswered.value || !currentWord.value) return
  pairChoice.value = side
  pairAnswered.value = true
  pairCorrect.value = side === currentWord.value.target
  if (pairCorrect.value) {
    sessionCorrect.value++
    userStore.incrementDailyStat('correctAnswers')
  }
}

function pairOptionStyle(side) {
  if (!pairAnswered.value) return 'background: var(--surface-glass);'
  const isTarget = side === currentWord.value.target
  if (isTarget) return 'background: rgba(34,197,94,0.15); border: 1px solid #22c55e;'
  if (side === pairChoice.value) return 'background: rgba(229,72,77,0.12); border: 1px solid #e5484d;'
  return 'background: var(--surface-glass); opacity: 0.6;'
}

async function startListening() {
  if (!currentWord.value || listening.value) return
  listening.value = true
  lastResult.value = null
  micError.value = ''
  try {
    const result = await listenAndCompare(currentWord.value.en, {
      timeoutMs: mode.value === 'sentences' ? 12000 : 6000
    })
    lastResult.value = result
    if (result.passed) {
      sessionCorrect.value++
      userStore.incrementDailyStat('correctAnswers')
    }
  } catch (err) {
    micError.value =
      err.message === 'timeout' || err.message === 'no-speech'
        ? 'Ovoz eshitilmadi. Yana urinib ko\'ring.'
        : err.message === 'unsupported'
          ? 'Bu qurilmada mikrofon qo\'llab-quvvatlanmaydi.'
          : 'Mikrofonga ruxsat berilmagan bo\'lishi mumkin.'
  } finally {
    listening.value = false
  }
}

async function next() {
  lastResult.value = null
  micError.value = ''
  pairAnswered.value = false
  pairCorrect.value = false
  pairChoice.value = null
  if (isLastWord.value) {
    finished.value = true
    earnedXp.value = sessionCorrect.value * 6
    if (earnedXp.value > 0) await userStore.addXp(earnedXp.value)
    refresh()
  } else {
    currentIndex.value++
  }
}
</script>
