<template>
  <div class="lesson-page" :class="{ 'lesson-page-complete': finished }">
    <div class="lesson-bg" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>

    <div class="lesson-shell">
      <header class="lesson-hud">
        <router-link to="/dashboard" class="hud-icon-btn" aria-label="Darsdan chiqish">
          <i class="ti ti-x" aria-hidden="true"></i>
        </router-link>

        <div class="hud-progress" aria-label="Dars progressi">
          <div class="hud-progress-track">
            <div class="hud-progress-fill" :style="{ width: `${progressPercent}%` }"></div>
          </div>
          <div class="hud-progress-meta">
            <span>{{ currentIndex + (finished ? 0 : 1) }} / {{ queue.length }}</span>
            <span v-if="!isReviewMode">{{ lessonLengthLabel }}</span>
            <span v-else>Review</span>
          </div>
        </div>

        <div class="hud-stats">
          <div class="hud-stat" title="Lives">
            <i class="ti ti-heart-filled" aria-hidden="true"></i>
            <span>{{ userStore.currentLives }}</span>
          </div>
          <div v-if="combo > 1" class="hud-combo" :class="{ 'hud-combo-hot': combo >= 5 }" title="Ketma-ket to‘g‘ri javoblar">
            <span>⚡</span> {{ combo }}x
          </div>
          <div class="hud-stat hud-xp" title="Session XP">
            <i class="ti ti-bolt-filled" aria-hidden="true"></i>
            <span>{{ sessionXp }}</span>
          </div>
        </div>
      </header>

      <main class="lesson-main">
        <div v-if="isReviewMode && queue.length === 0" class="lesson-empty">
          <div class="empty-orb"><i class="ti ti-check" aria-hidden="true"></i></div>
          <span class="lesson-eyebrow">SRS REVIEW</span>
          <h1>Hozircha takrorlash kerak emas</h1>
          <p>Barcha kartalaringiz vaqtida. Yangi so‘zlarni o‘rganing va keyingi review uchun yana qayting.</p>
          <router-link to="/dashboard" class="lesson-primary-btn">Dashboardga qaytish <i class="ti ti-arrow-right"></i></router-link>
        </div>

        <div v-else-if="!finished" class="lesson-content">
          <section class="question-head" :key="`head-${currentIndex}-${current.type}`">
            <div class="question-type-pill">
              <span v-if="sprintRound" class="sprint-round-copy">{{ sprintRound.title }}</span>
              <i :class="['ti', questionTypeIcon]"></i>
              {{ questionTypeLabel }}
            </div>
            <div class="question-context">
              <span v-if="!isReviewMode && !isCheckpointMode" class="micro-sprint-badge">⚡ 5 daqiqalik sprint</span>
              <span v-else-if="isCheckpointMode" class="micro-sprint-badge">🎯 MINI CHECKPOINT</span>
              <span>{{ currentLabel }}</span>
              <button v-if="current.word?.en" class="sound-mini-btn" @click="playCurrentPrompt" type="button" aria-label="Tinglash">
                <i class="ti ti-volume-2" aria-hidden="true"></i>
              </button>
            </div>
          </section>

          <transition mode="out-in" @enter="onCardEnter" @leave="onCardLeave" :css="false">
            <section :key="`${currentIndex}-${current.type}`" class="exercise-panel">
              <!-- Grammar intro -->
              <div v-if="current.type === 'grammar'" class="exercise-card grammar-intro-card">
                <span class="eyebrow-chip"><i class="ti ti-book-2"></i> Grammar lesson</span>
                <h2>{{ current.grammar.title }}</h2>
                <p class="grammar-title-en">{{ current.grammar.titleEn }}</p>
                <div class="grammar-points">
                  <div v-for="(point, i) in current.grammar.points" :key="i" class="grammar-point">
                    <span>{{ i + 1 }}</span><p>{{ point }}</p>
                  </div>
                </div>
                <div class="grammar-example-grid">
                  <div v-for="(ex, i) in current.grammar.examples" :key="i" class="grammar-example-box">
                    <strong>{{ ex.en }}</strong><span>{{ ex.uz }}</span>
                  </div>
                </div>
                <button class="lesson-primary-btn wide" @click="continueFromGrammar">
                  Qoidani o‘rgandim <i class="ti ti-arrow-right"></i>
                </button>
              </div>

              <!-- Grammar quiz -->
              <div v-else-if="current.type === 'grammarQuiz'" class="exercise-card">
                <div class="exercise-title-row">
                  <span class="mini-topic">{{ current.grammar.title }}</span>
                  <span class="question-number">+10 XP</span>
                </div>
                <h2 class="question-title">{{ current.grammarQuestion.question }}</h2>
                <div class="choice-grid choice-grid-vertical">
                  <button
                    v-for="opt in current.grammarQuestion.options"
                    :key="opt"
                    class="answer-choice"
                    :class="gqOptionClass(opt)"
                    :disabled="gqAnswered"
                    @click="gqSelect(opt)"
                  >
                    <span class="choice-letter">{{ optionLetter(current.grammarQuestion.options, opt) }}</span>
                    <span>{{ opt }}</span>
                    <i v-if="gqAnswered && opt === current.grammarQuestion.correct" class="ti ti-check choice-state"></i>
                    <i v-else-if="gqAnswered && opt === gqSelected" class="ti ti-x choice-state"></i>
                  </button>
                </div>
              </div>

              <!-- Flashcard -->
              <div v-else-if="current.type === 'flashcard'" class="exercise-card flashcard-card" @click="showFlashAnswer = true">
                <div class="new-word-badge"><i class="ti ti-sparkles"></i> YANGI SO‘Z</div>
                <h2 class="flash-word">{{ current.word.en }}</h2>
                <span class="ipa" v-if="current.word.ipa">{{ current.word.ipa }}</span>
                <button class="flash-sound" @click.stop="playCurrentPrompt" type="button"><i class="ti ti-volume-2"></i></button>
                <p class="flash-tap" v-if="!showFlashAnswer"><i class="ti ti-hand-click"></i> Tarjimani ko‘rish uchun bosing</p>
                <div v-if="showFlashAnswer" class="flash-answer" v-pop-in>
                  <strong>{{ current.word.uz }}</strong>
                  <span>{{ current.word.example }}</span>
                  <small>{{ current.word.exampleUz }}</small>
                </div>
              </div>

              <!-- Classic multiple choice -->
              <div v-else-if="current.type === 'multipleChoice'" class="exercise-card">
                <p class="exercise-instruction">To‘g‘ri tarjimani tanlang</p>
                <h2 class="question-word">{{ current.word.en }}</h2>
                <span class="ipa large" v-if="current.word.ipa">{{ current.word.ipa }}</span>
                <div class="choice-grid">
                  <button
                    v-for="(opt, idx) in mcData.options"
                    :key="opt"
                    class="answer-choice"
                    :class="mcOptionClass(opt)"
                    :disabled="mcAnswered"
                    @click="handleMcAnswer(opt)"
                  >
                    <span class="choice-letter">{{ String.fromCharCode(65 + idx) }}</span>
                    <span>{{ opt }}</span>
                    <i v-if="mcAnswered && opt === mcData.correct" class="ti ti-check choice-state"></i>
                    <i v-else-if="mcAnswered && opt === mcSelected" class="ti ti-x choice-state"></i>
                  </button>
                </div>
              </div>

              <!-- Visual choice, inspired by picture-based beginner questions -->
              <div v-else-if="current.type === 'visualChoice'" class="exercise-card visual-card">
                <p class="exercise-instruction">Rasm o‘rnidagi belgilar orasidan to‘g‘ri ma’noni toping</p>
                <h2 class="question-title">Which one is “{{ current.word.en }}”?</h2>
                <div class="visual-grid">
                  <button
                    v-for="(opt, idx) in visualData.options"
                    :key="`${opt.en}-${idx}`"
                    class="visual-option"
                    :class="visualOptionClass(opt.en)"
                    :disabled="visualAnswered"
                    @click="handleVisualAnswer(opt.en)"
                  >
                    <div class="visual-art" :class="`visual-tone-${idx}`">
                      <i :class="['ti', opt.icon]"></i>
                    </div>
                    <span>{{ opt.uz }}</span>
                    <small>{{ String(idx + 1) }}</small>
                  </button>
                </div>
              </div>

              <!-- Listening MC -->
              <div v-else-if="current.type === 'listening'" class="exercise-card listening-card">
                <p class="exercise-instruction">Gapni tinglang va to‘g‘ri tarjimani tanlang</p>
                <button class="big-listen-btn" :class="{ playing: isSpeaking }" @click="playCurrentPrompt" type="button">
                  <i class="ti ti-volume-2"></i>
                </button>
                <p class="listen-caption">Bir necha marta tinglash mumkin</p>
                <div class="choice-grid choice-grid-vertical compact">
                  <button
                    v-for="(opt, idx) in mcData.options"
                    :key="opt"
                    class="answer-choice"
                    :class="mcOptionClass(opt)"
                    :disabled="mcAnswered"
                    @click="handleMcAnswer(opt)"
                  >
                    <span class="choice-letter">{{ String.fromCharCode(65 + idx) }}</span>
                    <span>{{ opt }}</span>
                  </button>
                </div>
              </div>

              <!-- Word order -->
              <div v-else-if="current.type === 'wordOrder'" class="exercise-card">
                <p class="exercise-instruction">So‘zlarni to‘g‘ri tartibda joylashtiring</p>
                <h2 class="question-title question-title-small">{{ woHint }}</h2>
                <div class="answer-zone" :class="{ empty: chosenWords.length === 0 }">
                  <span v-if="chosenWords.length === 0" class="answer-zone-hint">So‘zlarni shu yerga yig‘ing</span>
                  <button
                    v-for="(w, i) in chosenWords"
                    :key="`chosen-${i}`"
                    class="word-chip selected"
                    :class="{ correct: woAnswered && woCorrect, wrong: woAnswered && !woCorrect }"
                    :disabled="woAnswered"
                    @click="removeFromChosen(i)"
                  >{{ w }}</button>
                </div>
                <div class="word-bank">
                  <button v-for="(w, i) in availableWords" :key="`bank-${i}-${w}`" class="word-chip" :disabled="woAnswered" @click="addToChosen(i)">
                    {{ w }}
                  </button>
                </div>
                <button v-if="!woAnswered" class="lesson-primary-btn wide" :disabled="chosenWords.length !== woData.correctOrder.length" @click="checkWordOrder">Tekshirish <i class="ti ti-check"></i></button>
                <div v-else class="inline-feedback" :class="woCorrect ? 'good' : 'bad'">
                  <i :class="woCorrect ? 'ti ti-circle-check' : 'ti ti-alert-circle'"></i>
                  <span v-if="woCorrect">To‘g‘ri! Juda yaxshi.</span>
                  <span v-else>To‘g‘ri javob: <strong>{{ woData.correctOrder.join(' ') }}</strong></span>
                </div>
              </div>

              <!-- Typing -->
              <div v-else-if="current.type === 'typing'" class="exercise-card typing-card">
                <p class="exercise-instruction">Inglizcha so‘zni yozing</p>
                <div class="typing-prompt">
                  <span>Tarjimasi</span>
                  <strong>{{ typingData.prompt }}</strong>
                </div>
                <form @submit.prevent="checkTyping">
                  <input v-model="typingInput" class="typing-input" :class="typingResultClass" type="text" :disabled="typingAnswered" autocomplete="off" autofocus placeholder="English word..." />
                  <button v-if="!typingAnswered" type="submit" class="lesson-primary-btn wide" :disabled="!typingInput.trim()">Tekshirish <i class="ti ti-arrow-right"></i></button>
                </form>
                <div v-if="typingAnswered" class="inline-feedback" :class="typingCorrect ? 'good' : 'bad'">
                  <i :class="typingCorrect ? 'ti ti-circle-check' : 'ti ti-alert-circle'"></i>
                  <span v-if="typingCorrect">Ajoyib! To‘g‘ri javob.</span>
                  <span v-else>To‘g‘ri javob: <strong>{{ typingData.answer }}</strong></span>
                </div>
              </div>

              <!-- Fill the blank -->
              <div v-else-if="current.type === 'fillBlank'" class="exercise-card">
                <p class="exercise-instruction">Gapdagi yetishmayotgan so‘zni toping</p>
                <h2 class="sentence-blank">{{ fillBlankData.sentence }}</h2>
                <div class="choice-grid choice-grid-vertical compact">
                  <button v-for="(opt, idx) in fillBlankData.options" :key="opt" class="answer-choice" :class="fillOptionClass(opt)" :disabled="fillAnswered" @click="handleFillAnswer(opt)">
                    <span class="choice-letter">{{ String.fromCharCode(65 + idx) }}</span><span>{{ opt }}</span>
                  </button>
                </div>
              </div>

              <!-- Definition / reverse multiple choice -->
              <div v-else-if="current.type === 'definitionChoice'" class="exercise-card">
                <p class="exercise-instruction">Qaysi inglizcha so‘z ushbu ma’noni bildiradi?</p>
                <div class="definition-box"><i class="ti ti-quote"></i><strong>{{ current.word.uz }}</strong></div>
                <div class="choice-grid choice-grid-vertical">
                  <button v-for="(opt, idx) in definitionData.options" :key="opt" class="answer-choice" :class="definitionOptionClass(opt)" :disabled="definitionAnswered" @click="handleDefinitionAnswer(opt)">
                    <span class="choice-letter">{{ String.fromCharCode(65 + idx) }}</span><span>{{ opt }}</span>
                  </button>
                </div>
              </div>

              <!-- Sentence translation -->
              <div v-else-if="current.type === 'translateSentence'" class="exercise-card typing-card">
                <p class="exercise-instruction">Gapni ingliz tiliga tarjima qiling</p>
                <div class="translation-prompt">{{ translateData.prompt }}</div>
                <form @submit.prevent="checkSentenceTranslation">
                  <textarea v-model="translateInput" class="translation-input" :class="translateResultClass" :disabled="translateAnswered" rows="3" placeholder="Write the English sentence..."></textarea>
                  <button v-if="!translateAnswered" type="submit" class="lesson-primary-btn wide" :disabled="!translateInput.trim()">Tekshirish <i class="ti ti-check"></i></button>
                </form>
                <div v-if="translateAnswered" class="inline-feedback" :class="translateCorrect ? 'good' : 'bad'">
                  <i :class="translateCorrect ? 'ti ti-circle-check' : 'ti ti-alert-circle'"></i>
                  <span v-if="translateCorrect">Zo‘r! Gap to‘g‘ri.</span>
                  <span v-else>Namuna: <strong>{{ translateData.answer }}</strong></span>
                </div>
              </div>

              <!-- Speaking -->
              <div v-else-if="current.type === 'speaking'" class="exercise-card speaking-card">
                <p class="exercise-instruction">So‘zni ovoz chiqarib ayting</p>
                <h2 class="question-word">{{ current.word.en }}</h2>
                <span class="ipa large" v-if="current.word.ipa">{{ current.word.ipa }}</span>
                <div class="speaking-target">“{{ current.word.en }}”</div>
                <button class="mic-action" :class="{ active: speakingListening }" :disabled="speakingListening || speakingAnswered" @click="handleSpeakingAttempt" type="button">
                  <span class="mic-ring"><i class="ti ti-microphone"></i></span>
                  <span>{{ speakingListening ? 'Tinglanmoqda…' : speakingAnswered ? 'Natija tayyor' : 'Gapirish uchun bosing' }}</span>
                </button>
                <button class="sound-text-btn" @click="playCurrentPrompt" type="button"><i class="ti ti-volume-2"></i> Avval namuna eshiting</button>
                <div v-if="speakingAnswered" class="speaking-result" v-pop-in>
                  <div class="speaking-score-ring">{{ speakingScore }}%</div>
                  <div><strong>{{ speakingPassed ? 'Ajoyib talaffuz!' : 'Yana bir marta urinib ko‘ring' }}</strong><span v-if="speakingTranscript">Siz aytdingiz: “{{ speakingTranscript }}”</span></div>
                </div>
                <p v-if="speakingError" class="inline-error">{{ speakingError }}</p>
              </div>
            </section>
          </transition>

          <div v-if="showContinueBtn" class="answer-footer" v-pop-in>
            <div class="answer-footer-inner">
              <div class="feedback-mark" :class="lastAnswerCorrect ? 'positive' : 'negative'">
                <i :class="lastAnswerCorrect ? 'ti ti-check' : 'ti ti-x'"></i>
              </div>
              <div class="feedback-copy">
                <span>{{ lastAnswerCorrect ? 'Nice job!' : 'Yana mashq qilamiz' }}</span>
                <small>{{ lastAnswerCorrect ? 'Javob to‘g‘ri · davom eting' : 'Xato qilish ham o‘rganishning bir qismi' }}</small>
              </div>
              <div class="footer-actions">
                <button class="tiny-feedback" type="button"><i class="ti ti-flag-2"></i> Report</button>
                <button class="lesson-primary-btn footer-continue" @click="goToNext">Davom etish <i class="ti ti-arrow-right"></i></button>
              </div>
            </div>
          </div>

          <div v-if="current.type === 'flashcard' && showFlashAnswer" class="flash-footer" v-pop-in>
            <div class="flash-footer-title">Bu so‘zni bilardingizmi?</div>
            <div class="flash-answer-actions">
              <button class="review-choice no" @click="handleFlashAnswer(false)"><i class="ti ti-refresh"></i> Hali yo‘q</button>
              <button class="review-choice yes" @click="handleFlashAnswer(true)"><i class="ti ti-check"></i> Ha, bilaman</button>
            </div>
          </div>
        </div>

        <div v-else class="lesson-completion" v-pop-in>
          <div class="completion-confetti">🎉</div>
          <span class="lesson-eyebrow">{{ isCheckpointMode ? 'CHECKPOINT COMPLETE' : isReviewMode ? 'REVIEW COMPLETE' : 'SPRINT COMPLETE' }}</span>
          <h1>{{ isCheckpointMode ? 'Checkpoint tugadi!' : isReviewMode ? 'Smart Review tugadi!' : 'Bugungi sprint tugadi!' }}</h1>
          <p>Zo‘r ish. Qisqa sprintni tugatdingiz — miyangizga yana bir kichik g‘alaba.</p>

          <div class="completion-score">
            <div class="score-main"><span>+{{ displayedXp }}</span><small>XP</small></div>
            <div class="score-stat"><strong>{{ displayedCorrect }}</strong><span>to‘g‘ri</span></div>
            <div class="score-stat"><strong>{{ answerableCount }}</strong><span>savol</span></div>
          </div>

          <div class="quick-win-grid">
            <div class="quick-win"><strong>{{ sessionNewWords }}</strong><span>yangi so‘z</span></div>
            <div class="quick-win"><strong>{{ sessionMistakesFixed }}</strong><span>xato tuzatildi</span></div>
            <div class="quick-win"><strong>{{ bestCombo }}x</strong><span>eng yaxshi combo</span></div>
          </div>

          <div class="completion-actions">
            <router-link v-if="nextLevelUnlocked" :to="`/lesson/${levelNum + 1}`" class="lesson-primary-btn">Keyingi level <i class="ti ti-arrow-right"></i></router-link>
            <router-link v-else to="/dashboard" class="lesson-primary-btn">Dashboardga qaytish <i class="ti ti-arrow-right"></i></router-link>
            <router-link to="/learning-path" class="lesson-secondary-btn">Learning pathni ko‘rish</router-link>
          </div>
        </div>
      </main>
    </div>

    <OutOfLivesModal v-model="showOutOfLives" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { animate } from 'animejs'
import { useUserStore } from '../stores/userStore.js'
import {
  getLevelData,
  maxLevel,
  XP_REWARDS,
  buildLessonQueue,
  buildReviewQueue,
  buildMultipleChoice,
  buildMultipleChoiceGeneric,
  buildWordOrder,
  buildTyping,
  buildUzHint,
  getAllWords,
  buildVisualChoice,
  buildFillBlank,
  buildDefinitionChoice,
  buildTranslateSentence
} from '../data/vocabulary.js'
import { getGrammarForLevel } from '../data/grammar.js'
import { speakWord } from '../composables/useSpeech.js'
import { isRecognitionSupported, listenAndCompare } from '../composables/useSpeechRecognition.js'
import AuroraBackground from '../components/AuroraBackground.vue'
import OutOfLivesModal from '../components/OutOfLivesModal.vue'

const route = useRoute()
const userStore = useUserStore()
const showOutOfLives = ref(false)
const isSpeaking = ref(false)

const isReviewMode = computed(() => route.params.level === 'review')
const isCheckpointMode = computed(() => route.query.checkpoint === '1')
const levelNum = computed(() => Number(route.params.level) || 1)
const levelData = computed(() => isReviewMode.value
  ? { title: 'Takrorlash vaqti' }
  : getLevelData(levelNum.value))

const queue = ref([])
const currentIndex = ref(0)
const finished = ref(false)
const sessionXp = ref(0)
const correctCount = ref(0)
const combo = ref(0)
const bestCombo = ref(0)
const sessionNewWords = ref(0)
const sessionMistakesFixed = ref(0)
const comboMilestones = new Set()
const displayedXp = ref(0)
const displayedCorrect = ref(0)
const showContinueBtn = ref(false)
const lastAnswerCorrect = ref(true)
const current = computed(() => queue.value[currentIndex.value] || { type: 'flashcard', word: {} })
const answerableCount = computed(() => queue.value.filter((item) => item.type !== 'grammar').length)
const progressPercent = computed(() => queue.value.length ? Math.round(((currentIndex.value + (finished.value ? 1 : 0)) / queue.value.length) * 100) : 0)
const lessonLengthLabel = computed(() => isReviewMode.value ? 'Smart Review' : isCheckpointMode.value ? `${queue.value.length || 12} ta checkpoint` : `${queue.value.length || 15} ta micro-test`)
const sprintRound = computed(() => {
  if (isReviewMode.value || !queue.value.length) return null
  const firstMicro = queue.value.findIndex((item) => !['grammar', 'grammarQuiz'].includes(item.type))
  if (firstMicro < 0 || currentIndex.value < firstMicro) return null
  const round = Math.floor((currentIndex.value - firstMicro) / 4)
  return [
    { title: '1 · Tanib oling', hint: 'Yangi so‘zlarni tez taning' },
    { title: '2 · Eslang', hint: 'Tarjimasini xotiradan toping' },
    { title: '3 · Kontekstda', hint: 'So‘zni gap ichida ishlating' }
  ][Math.min(round, 2)]
})

const nextLevelUnlocked = computed(() => !isReviewMode.value && !isCheckpointMode.value && levelNum.value < maxLevel && userStore.level > levelNum.value)

const questionTypeMeta = {
  grammar: ['ti-book-2', 'GRAMMAR TIP'],
  grammarQuiz: ['ti-abc-2', 'GRAMMAR TEST'],
  flashcard: ['ti-sparkles', 'NEW WORD'],
  multipleChoice: ['ti-category-2', 'TRANSLATION'],
  visualChoice: ['ti-photo', 'VISUAL CHOICE'],
  listening: ['ti-headphones', 'LISTENING'],
  wordOrder: ['ti-arrows-sort', 'WORD ORDER'],
  typing: ['ti-keyboard', 'TYPE IT'],
  fillBlank: ['ti-edit', 'FILL THE BLANK'],
  definitionChoice: ['ti-book', 'MEANING'],
  translateSentence: ['ti-language', 'TRANSLATE'],
  speaking: ['ti-microphone', 'SPEAKING']
}
const questionTypeIcon = computed(() => questionTypeMeta[current.value.type]?.[0] || 'ti-question-mark')
const questionTypeLabel = computed(() => questionTypeMeta[current.value.type]?.[1] || 'PRACTICE')
const currentLabel = computed(() => current.value.type === 'grammar' ? levelData.value?.title : current.value.word?.en || 'Practice')

const showFlashAnswer = ref(false)
const gqAnswered = ref(false)
const gqSelected = ref(null)
const mcData = ref({ options: [], correct: '' })
const mcAnswered = ref(false)
const mcSelected = ref(null)
const visualData = ref({ options: [], correct: '' })
const visualAnswered = ref(false)
const fillBlankData = ref({ sentence: '', options: [], correct: '' })
const fillAnswered = ref(false)
const fillSelected = ref(null)
const definitionData = ref({ options: [], correct: '' })
const definitionAnswered = ref(false)
const definitionSelected = ref(null)
const woData = ref({ scrambled: [], correctOrder: [] })
const woHint = ref('')
const availableWords = ref([])
const chosenWords = ref([])
const woAnswered = ref(false)
const woCorrect = ref(false)
const typingData = ref({ prompt: '', answer: '' })
const typingInput = ref('')
const typingAnswered = ref(false)
const typingCorrect = ref(false)
const translateData = ref({ prompt: '', answer: '' })
const translateInput = ref('')
const translateAnswered = ref(false)
const translateCorrect = ref(false)

const speakingSupported = isRecognitionSupported()
const speakingListening = ref(false)
const speakingAnswered = ref(false)
const speakingPassed = ref(false)
const speakingTranscript = ref('')
const speakingScore = ref(0)
const speakingError = ref('')

const typingResultClass = computed(() => !typingAnswered.value ? '' : typingCorrect.value ? 'typing-correct' : 'typing-wrong')
const translateResultClass = computed(() => !translateAnswered.value ? '' : translateCorrect.value ? 'typing-correct' : 'typing-wrong')

function optionLetter(options, opt) { return String.fromCharCode(65 + options.indexOf(opt)) }
function normalize(text) {
  return text.toLowerCase().replace(/[.!?,;:'"“”]/g, '').replace(/\s+/g, ' ').trim()
}

function questionLevelWords() { return isReviewMode.value ? getAllWords() : getLevelData(levelNum.value)?.words || getAllWords() }

function resetCommonStates() {
  showFlashAnswer.value = false
  showContinueBtn.value = false
  gqAnswered.value = false; gqSelected.value = null
  mcAnswered.value = false; mcSelected.value = null
  visualAnswered.value = false
  fillAnswered.value = false; fillSelected.value = null
  definitionAnswered.value = false; definitionSelected.value = null
  woAnswered.value = false; woCorrect.value = false; chosenWords.value = []
  typingAnswered.value = false; typingCorrect.value = false; typingInput.value = ''
  translateAnswered.value = false; translateCorrect.value = false; translateInput.value = ''
  speakingListening.value = false; speakingAnswered.value = false; speakingPassed.value = false; speakingTranscript.value = ''; speakingScore.value = 0; speakingError.value = ''
}

function setupGrammarQuiz() { gqAnswered.value = false; gqSelected.value = null }
function gqOptionClass(opt) {
  if (!gqAnswered.value) return ''
  if (opt === current.value.grammarQuestion.correct) return 'correct'
  if (opt === gqSelected.value) return 'wrong'
  return ''
}
async function gqSelect(opt) {
  if (gqAnswered.value) return
  gqSelected.value = opt; gqAnswered.value = true
  const correct = opt === current.value.grammarQuestion.correct
  await registerAnswer(correct, 'grammar')
}

function setupMultipleChoice() {
  mcData.value = isReviewMode.value ? buildMultipleChoiceGeneric(current.value.word, getAllWords()) : buildMultipleChoice(current.value.word, levelNum.value)
  mcAnswered.value = false; mcSelected.value = null
}
function mcOptionClass(opt) {
  if (!mcAnswered.value) return ''
  if (opt === mcData.value.correct) return 'correct'
  if (opt === mcSelected.value) return 'wrong'
  return ''
}
async function handleMcAnswer(opt) {
  if (mcAnswered.value) return
  mcAnswered.value = true; mcSelected.value = opt
  await registerAnswer(opt === mcData.value.correct, current.value.type === 'listening' ? 'listening' : 'vocabulary')
}

function setupVisualChoice() {
  visualData.value = buildVisualChoice(current.value.word, questionLevelWords())
  visualAnswered.value = false
}
function visualOptionClass(en) {
  if (!visualAnswered.value) return ''
  if (en === visualData.value.correct) return 'correct'
  return visualData.value.selected === en ? 'wrong' : ''
}
async function handleVisualAnswer(en) {
  if (visualAnswered.value) return
  visualAnswered.value = true; visualData.value.selected = en
  await registerAnswer(en === visualData.value.correct, 'vocabulary')
}

function setupFillBlank() { fillBlankData.value = buildFillBlank(current.value.word, questionLevelWords()); fillAnswered.value = false; fillSelected.value = null }
function fillOptionClass(opt) {
  if (!fillAnswered.value) return ''
  if (opt === fillBlankData.value.correct) return 'correct'
  if (opt === fillSelected.value) return 'wrong'
  return ''
}
async function handleFillAnswer(opt) { if (fillAnswered.value) return; fillAnswered.value = true; fillSelected.value = opt; await registerAnswer(opt === fillBlankData.value.correct, 'vocabulary') }

function setupDefinitionChoice() { definitionData.value = buildDefinitionChoice(current.value.word, questionLevelWords()); definitionAnswered.value = false; definitionSelected.value = null }
function definitionOptionClass(opt) {
  if (!definitionAnswered.value) return ''
  if (opt === definitionData.value.correct) return 'correct'
  if (opt === definitionSelected.value) return 'wrong'
  return ''
}
async function handleDefinitionAnswer(opt) { if (definitionAnswered.value) return; definitionAnswered.value = true; definitionSelected.value = opt; await registerAnswer(opt === definitionData.value.correct, 'vocabulary') }

function setupWordOrder() { woData.value = buildWordOrder(current.value.word); woHint.value = buildUzHint(current.value.word); availableWords.value = [...woData.value.scrambled]; chosenWords.value = []; woAnswered.value = false; woCorrect.value = false }
function addToChosen(idx) { chosenWords.value.push(availableWords.value[idx]); availableWords.value.splice(idx, 1) }
function removeFromChosen(idx) { if (woAnswered.value) return; availableWords.value.push(chosenWords.value[idx]); chosenWords.value.splice(idx, 1) }
async function checkWordOrder() { if (woAnswered.value) return; const correct = chosenWords.value.join(' ') === woData.value.correctOrder.join(' '); woCorrect.value = correct; woAnswered.value = true; await registerAnswer(correct, 'writing') }

function setupTyping() { typingData.value = buildTyping(current.value.word); typingInput.value = ''; typingAnswered.value = false; typingCorrect.value = false }
async function checkTyping() { if (typingAnswered.value) return; typingAnswered.value = true; typingCorrect.value = normalize(typingInput.value) === normalize(typingData.value.answer); await registerAnswer(typingCorrect.value, 'vocabulary') }

function setupTranslateSentence() { translateData.value = buildTranslateSentence(current.value.word); translateInput.value = ''; translateAnswered.value = false; translateCorrect.value = false }
async function checkSentenceTranslation() { if (translateAnswered.value) return; translateAnswered.value = true; translateCorrect.value = normalize(translateInput.value) === normalize(translateData.value.answer); await registerAnswer(translateCorrect.value, 'writing') }

function setupSpeaking() { speakingListening.value = false; speakingAnswered.value = false; speakingPassed.value = false; speakingTranscript.value = ''; speakingScore.value = 0; speakingError.value = '' }
async function handleSpeakingAttempt() {
  if (!speakingSupported) { speakingError.value = 'Bu brauzer mikrofonni qo‘llab-quvvatlamaydi. Chrome yoki Edge ishlating.'; return }
  speakingError.value = ''; speakingListening.value = true
  try {
    const result = await listenAndCompare(current.value.word.en)
    speakingListening.value = false; speakingTranscript.value = result.transcript; speakingPassed.value = result.passed; speakingScore.value = Math.round((result.similarity || 0) * 100); speakingAnswered.value = true
    await registerAnswer(result.passed, 'speaking')
  } catch (err) {
    speakingListening.value = false
    speakingError.value = err.message === 'not-allowed' || err.message === 'permission-denied' ? 'Mikrofonga ruxsat berilmadi.' : 'Ovoz eshitilmadi. Yana urinib ko‘ring.'
  }
}

function playCurrentPrompt() {
  const word = current.value.word
  if (!word) return
  isSpeaking.value = true
  const text = current.value.type === 'listening' && word.example ? word.example : word.en
  speakWord(text)
  window.setTimeout(() => { isSpeaking.value = false }, Math.max(900, text.length * 55))
}

async function registerAnswer(wasCorrect, skillId = 'vocabulary') {
  lastAnswerCorrect.value = !!wasCorrect
  const wordEn = current.value.word?.en
  const wasMistakeBefore = !!wordEn && userStore.mistakeWords.some((item) => item.en === wordEn)
  await userStore.recordLearningActivity()

  if (wasCorrect) {
    correctCount.value++
    combo.value++
    bestCombo.value = Math.max(bestCombo.value, combo.value)

    const awarded = await userStore.addXp(XP_REWARDS.correctAnswer, skillId)
    sessionXp.value += awarded || XP_REWARDS.correctAnswer
    userStore.incrementDailyStat('correctAnswers')
    if (skillId === 'grammar') userStore.incrementDailyStat('grammarCompleted')
    if (skillId === 'listening') userStore.incrementDailyStat('listeningCompleted')
    if (skillId === 'speaking') userStore.incrementDailyStat('speakingCompleted')

    if (!isReviewMode.value && !isCheckpointMode.value && wordEn) {
      const wasNew = await userStore.markWordCompleted(wordEn, levelNum.value)
      if (wasNew) sessionNewWords.value++
    }

    if (wasMistakeBefore) {
      sessionMistakesFixed.value++
      await userStore.recordMistakeFixed()
    }

    const milestone = combo.value >= 8 ? 8 : combo.value >= 5 ? 5 : combo.value >= 3 ? 3 : 0
    if (milestone && !comboMilestones.has(milestone)) {
      comboMilestones.add(milestone)
      const bonus = milestone === 3 ? 5 : milestone === 5 ? 10 : 15
      const comboXp = await userStore.addXp(bonus, skillId)
      sessionXp.value += comboXp || bonus
    }
  } else {
    combo.value = 0
    await userStore.loseLife()
    if (!userStore.hasLives) showOutOfLives.value = true
  }

  if (wordEn) await userStore.reviewWord(wordEn, wasCorrect)
  showContinueBtn.value = true
}


function handleFlashAnswer(knewIt) { showFlashAnswer.value = false; registerAnswer(knewIt, 'vocabulary').then(advance) }
function continueFromGrammar() { lastAnswerCorrect.value = true; showContinueBtn.value = true }

function goToNext() {
  if (!userStore.hasLives) { showOutOfLives.value = true; return }
  showContinueBtn.value = false
  advance()
}
function advance() {
  if (currentIndex.value < queue.value.length - 1) { currentIndex.value++; setupCurrentExercise() }
  else completeLesson()
}
async function completeLesson() {
  if (answerableCount.value > 0 && correctCount.value === answerableCount.value) {
    const bonus = await userStore.addXp(XP_REWARDS.perfectLesson, 'overall')
    sessionXp.value += bonus || XP_REWARDS.perfectLesson
  }
  await userStore.recordLearningActivity()
  await userStore.incrementDailyStat('lessonsCompleted')
  if (!isReviewMode.value) {
    if (isCheckpointMode.value) await userStore.recordCheckpoint(levelNum.value, correctCount.value, answerableCount.value)
    else await userStore.incrementSprintCount()
  }
  finished.value = true
  animateCounters()
}

function setupCurrentExercise() {
  resetCommonStates()
  switch (current.value.type) {
    case 'grammarQuiz': setupGrammarQuiz(); break
    case 'multipleChoice':
    case 'listening': setupMultipleChoice(); break
    case 'visualChoice': setupVisualChoice(); break
    case 'fillBlank': setupFillBlank(); break
    case 'definitionChoice': setupDefinitionChoice(); break
    case 'wordOrder': setupWordOrder(); break
    case 'typing': setupTyping(); break
    case 'translateSentence': setupTranslateSentence(); break
    case 'speaking': setupSpeaking(); break
    default: break
  }
}

async function resetLesson() {
  await userStore.syncLives()
  if (!userStore.hasLives) showOutOfLives.value = true

  if (isReviewMode.value) {
    const requestedWord = String(route.query.word || '').trim()
    const smartWords = requestedWord
      ? [requestedWord, ...userStore.smartReviewWords.filter((en) => en !== requestedWord)].slice(0, 8)
      : userStore.smartReviewWords
    queue.value = buildReviewQueue(smartWords)
  } else {
    queue.value = buildLessonQueue(levelNum.value, {
      completedWords: userStore.profile?.completedWords || [],
      targetWords: isCheckpointMode.value ? 3 : 4
    })

    const grammar = getGrammarForLevel(levelNum.value)
    if (grammar?.exercises?.length) {
      const quizItems = [...grammar.exercises]
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((q) => ({ type: 'grammarQuiz', grammar, grammarQuestion: q, word: {} }))
      queue.value = [{ type: 'grammar', grammar, word: {} }, ...quizItems, ...queue.value]
    }
  }

  currentIndex.value = 0
  finished.value = false
  sessionXp.value = 0
  correctCount.value = 0
  combo.value = 0
  bestCombo.value = 0
  sessionNewWords.value = 0
  sessionMistakesFixed.value = 0
  comboMilestones.clear()
  displayedXp.value = 0
  displayedCorrect.value = 0
  lastAnswerCorrect.value = true
  setupCurrentExercise()
}



function animateCounters() {
  displayedXp.value = 0; displayedCorrect.value = 0
  const xpTarget = { v: 0 }; const correctTarget = { v: 0 }
  animate(xpTarget, { v: sessionXp.value, duration: 900, ease: 'outExpo', onUpdate: () => { displayedXp.value = Math.round(xpTarget.v) } })
  animate(correctTarget, { v: correctCount.value, duration: 700, ease: 'outExpo', onUpdate: () => { displayedCorrect.value = Math.round(correctTarget.v) } })
}
function onCardEnter(el, done) { animate(el, { opacity: [0, 1], translateY: [24, 0], scale: [0.98, 1], duration: 360, ease: 'outExpo', onComplete: done }) }
function onCardLeave(el, done) { animate(el, { opacity: [1, 0], translateY: [0, -20], scale: [1, 0.98], duration: 180, ease: 'inExpo', onComplete: done }) }

onMounted(resetLesson)
watch(() => [route.params.level, route.query.checkpoint, route.query.word], resetLesson)
</script>

<style scoped>
.lesson-page {
  --lesson-bg: #0d1a1e;
  --lesson-panel: #17272d;
  --lesson-panel-2: #1d3037;
  --lesson-border: #30444c;
  --lesson-text: #f5faf8;
  --lesson-muted: #a9b8b9;
  --lesson-green: #98e21d;
  --lesson-green-2: #b1f33b;
  min-height: 100vh;
  color: var(--lesson-text);
  background: radial-gradient(circle at 50% -20%, rgba(88, 127, 70, 0.18), transparent 38%), var(--lesson-bg);
  overflow-x: hidden;
}
.lesson-bg { position: fixed; inset: 0; pointer-events: none; overflow: hidden; }
.lesson-bg span { position: absolute; border-radius: 999px; filter: blur(80px); opacity: .2; background: #69b54c; }
.lesson-bg span:nth-child(1){ width:340px;height:340px;top:-190px;left:-80px; }
.lesson-bg span:nth-child(2){ width:300px;height:300px;right:-100px;top:36%;background:#2f7d63; }
.lesson-bg span:nth-child(3){ width:260px;height:260px;left:30%;bottom:-170px;background:#4f8f6e; }
.lesson-shell { position: relative; z-index: 1; min-height: 100vh; }
.lesson-hud { height: 86px; max-width: 1080px; margin: 0 auto; padding: 0 26px; display: grid; grid-template-columns: 52px 1fr auto; align-items: center; gap: 22px; }
.hud-icon-btn { width: 44px; height: 44px; border: 0; border-radius: 50%; display:flex;align-items:center;justify-content:center; color:#8f9d9f; background:transparent; font-size:24px; transition:.2s ease; }
.hud-icon-btn:hover { background: rgba(255,255,255,.06); color:#fff; }
.hud-progress { min-width: 0; }
.hud-progress-track { height: 11px; background: #32454c; border-radius: 999px; overflow: hidden; box-shadow: inset 0 1px 2px rgba(0,0,0,.25); }
.hud-progress-fill { height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--lesson-green),var(--lesson-green-2)); box-shadow: 0 0 22px rgba(152,226,29,.2); transition: width .35s ease; }
.hud-progress-meta { display:flex;justify-content:space-between;margin-top:7px;font-size:11px;color:#8c9a9e;font-weight:700;letter-spacing:.03em;text-transform:uppercase; }
.hud-stats { display:flex; align-items:center; gap:18px; }
.hud-stat { display:flex; align-items:center; gap:7px; font-weight:800; font-size:16px; }
.hud-stat i { color:#ff5b62; font-size:20px; }
.hud-stat.hud-xp i { color:var(--lesson-green); }
.hud-combo { display:flex; align-items:center; gap:5px; padding:7px 10px; border-radius:999px; background:rgba(255,184,77,.12); color:#ffd28a; font-size:13px; font-weight:900; border:1px solid rgba(255,184,77,.18); animation:comboPulse .25s ease; }
.hud-combo-hot { background:rgba(255,93,93,.12); color:#ff9c9c; border-color:rgba(255,93,93,.2); }
@keyframes comboPulse { from{transform:scale(.9)} to{transform:scale(1)} }
.lesson-main { width: min(880px, calc(100% - 32px)); margin: 0 auto; padding: 22px 0 120px; }
.lesson-content { min-height: calc(100vh - 110px); display:flex;flex-direction:column; }
.question-head { display:flex; justify-content:space-between; align-items:center; margin: 15px 0 22px; }
.question-type-pill, .eyebrow-chip { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px; background:rgba(152,226,29,.10); color:#c1ed75; font-weight:800; font-size:12px; letter-spacing:.05em; }
.question-context { display:flex; align-items:center; gap:10px; color:#8c9b9f; font-size:13px; font-weight:700; }
.sound-mini-btn { width:36px;height:36px;border-radius:50%;border:1px solid var(--lesson-border);background:rgba(255,255,255,.03);color:#dbe5e4;display:flex;align-items:center;justify-content:center; }
.exercise-panel { width:100%; }
.exercise-card { width:100%; border:1px solid var(--lesson-border); border-radius:24px; background:linear-gradient(145deg, rgba(29,48,55,.98), rgba(20,36,42,.98)); box-shadow: 0 26px 80px rgba(0,0,0,.22); padding: 40px; }
.exercise-title-row { display:flex;justify-content:space-between;align-items:center;margin-bottom:18px; }
.mini-topic { color:#9eafb2;font-size:12px;font-weight:800;letter-spacing:.03em; }
.question-number { color:#93a4a8;font-size:12px;font-weight:800; }
.question-title { margin:0 0 28px; font-size:30px; line-height:1.16; font-weight:800; letter-spacing:-.03em; }
.question-title-small { font-size:22px; }
.exercise-instruction { margin:0 0 18px; color:#aab9bb; font-weight:700; font-size:14px; }
.question-word, .flash-word { margin:0; text-align:center; font-size:54px; line-height:1; font-weight:900; letter-spacing:-.04em; }
.ipa { display:block;text-align:center;color:#849499;font-size:14px;margin-top:10px; }
.ipa.large { font-size:16px; }
.choice-grid { display:grid;grid-template-columns:1fr 1fr; gap:13px; }
.choice-grid-vertical { grid-template-columns:1fr; }
.choice-grid.compact { gap:10px; }
.answer-choice { min-height:68px; position:relative; display:flex; align-items:center; gap:13px; padding:14px 17px; border:2px solid #344950; border-radius:17px; background:#1a2c33; color:#eef5f3; font-size:15px; text-align:left; font-weight:700; transition:.16s ease; }
.answer-choice:hover:not(:disabled) { transform:translateY(-1px); border-color:#52717a; background:#21363d; }
.answer-choice:disabled { cursor:default; }
.answer-choice.correct { border-color:#79b71d; background:rgba(112,170,22,.16); }
.answer-choice.wrong { border-color:#e55a64; background:rgba(218,77,87,.12); }
.choice-letter { width:32px;height:32px;border-radius:10px;border:1px solid #3c5158;display:flex;align-items:center;justify-content:center;color:#9fafb1;font-size:12px;font-weight:900;flex:0 0 auto; }
.choice-state { margin-left:auto; font-size:19px; }
.answer-choice.correct .choice-state { color:#a7e936; }
.answer-choice.wrong .choice-state { color:#ff747c; }
.new-word-badge { color:#cb76ff;font-size:13px;font-weight:900;letter-spacing:.04em;display:flex;align-items:center;gap:8px;justify-content:center;margin-bottom:28px; }
.flashcard-card { min-height:430px; display:flex; flex-direction:column;align-items:center;justify-content:center;cursor:pointer;text-align:center; }
.flash-word { margin-bottom:8px; }
.flash-sound { width:54px;height:54px;margin:22px 0 10px;border:0;border-radius:50%;background:#23373d;color:#d9e7e4;font-size:21px; }
.flash-tap { color:#89999d;font-size:13px;display:flex;align-items:center;gap:7px; }
.flash-answer { width:min(520px,100%);margin-top:26px;padding-top:24px;border-top:1px solid #32484f;display:flex;flex-direction:column;gap:7px; }
.flash-answer strong{font-size:28px;color:#a8e43a;}.flash-answer span{font-size:14px;color:#e1e9e7}.flash-answer small{font-size:13px;color:#8ea0a4}
.visual-card { padding-bottom:34px; }
.visual-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:14px; }
.visual-option { position:relative; border:2px solid #344950; background:#182a31;border-radius:20px;padding:14px;color:#eef5f3;text-align:left;transition:.18s ease; }
.visual-option:hover:not(:disabled){transform:translateY(-3px);border-color:#557178;}
.visual-option.correct {border-color:#86c724;background:rgba(118,183,24,.12)} .visual-option.wrong{border-color:#e25c65;background:rgba(226,92,101,.1)}
.visual-art { height:185px;border-radius:15px;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#243940,#172a31);margin-bottom:12px;font-size:72px;position:relative;overflow:hidden; }
.visual-art::after{content:'';position:absolute;inset:auto -15% -50% -15%;height:100px;background:rgba(255,255,255,.045);border-radius:50%;}
.visual-tone-0 .ti{color:#a7e83a}.visual-tone-1 .ti{color:#7bd8ef}.visual-tone-2 .ti{color:#ffb45a}.visual-option span{font-weight:800;font-size:14px}.visual-option small{float:right;color:#71848a;font-weight:900}
.big-listen-btn { width:92px;height:92px;border:0;border-radius:50%;background:linear-gradient(145deg,#a8e72f,#75bb15);color:#0e1b0f;font-size:35px;display:flex;align-items:center;justify-content:center;margin:10px auto 9px;box-shadow:0 18px 40px rgba(123,181,26,.22);transition:.2s ease; }.big-listen-btn:hover{transform:scale(1.05)}.big-listen-btn.playing{animation:pulse .8s infinite alternate}.listen-caption{text-align:center;color:#7e9095;font-size:12px;margin:0 0 24px}
.answer-zone { min-height:110px;border:2px dashed #445b63;border-radius:17px;padding:14px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:9px;background:rgba(7,16,19,.16);margin-bottom:17px; }.answer-zone.empty{align-content:center}.answer-zone-hint{color:#708188;font-size:13px}.word-bank{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:24px;justify-content:center}.word-chip{padding:12px 15px;border-radius:13px;border:1px solid #3b525a;background:#22353c;color:#eff5f3;font-weight:700;font-size:14px;box-shadow:0 3px 0 #112126;transition:.14s ease}.word-chip:hover:not(:disabled){transform:translateY(-2px)}.word-chip.selected{background:#29414a}.word-chip.correct{border-color:#7db91f}.word-chip.wrong{border-color:#e45f67}
.typing-prompt { background:#20343b;border:1px solid #334a52;border-radius:17px;padding:19px;text-align:center;margin-bottom:18px;display:flex;flex-direction:column;gap:8px }.typing-prompt span{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#74868b;font-weight:900}.typing-prompt strong{font-size:26px;color:#dce8e5}.typing-input,.translation-input{width:100%;border:2px solid #38515a;background:#15272e;color:#f2f7f5;border-radius:17px;padding:18px 19px;font-size:18px;outline:none;font-family:inherit;margin-bottom:14px}.typing-input:focus,.translation-input:focus{border-color:#86c624;box-shadow:0 0 0 4px rgba(134,198,36,.09)}.typing-input.typing-correct,.translation-input.typing-correct{border-color:#7fb923}.typing-input.typing-wrong,.translation-input.typing-wrong{border-color:#df5b64}.translation-input{resize:vertical;min-height:115px}.translation-prompt{padding:24px;border-radius:18px;background:#20343b;border:1px solid #334a52;font-size:20px;line-height:1.5;color:#eff6f4;margin-bottom:17px}
.sentence-blank { font-size:27px;line-height:1.35;letter-spacing:-.02em;margin:16px 0 26px;color:#f0f6f4;text-align:center; }.definition-box{display:flex;align-items:center;justify-content:center;gap:11px;min-height:110px;border-radius:18px;border:1px solid #364e56;background:#20343b;margin-bottom:20px}.definition-box i{color:#8bbd2c;font-size:20px}.definition-box strong{font-size:28px}
.speaking-card{text-align:center}.speaking-target{font-size:13px;color:#91a0a4;background:#1f3339;border:1px solid #32494f;border-radius:999px;padding:8px 14px;display:inline-flex;margin:18px 0}.mic-action{display:flex;flex-direction:column;align-items:center;gap:11px;background:transparent;border:0;color:#ecf5f2;font-weight:800;margin:12px auto 10px}.mic-ring{width:94px;height:94px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#9ee42b;color:#10200d;font-size:34px;box-shadow:0 0 0 12px rgba(158,228,43,.09);transition:.18s ease}.mic-action:hover:not(:disabled) .mic-ring,.mic-action.active .mic-ring{transform:scale(1.04);box-shadow:0 0 0 18px rgba(158,228,43,.07),0 12px 40px rgba(158,228,43,.18)}.sound-text-btn{border:0;background:none;color:#91a4a8;font-size:13px;font-weight:700;margin-top:8px}.speaking-result{display:flex;align-items:center;justify-content:center;gap:16px;border-top:1px solid #334a51;margin-top:24px;padding-top:20px;text-align:left}.speaking-score-ring{width:65px;height:65px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#20343a;border:5px solid #8dd128;color:#b4ed49;font-weight:900}.speaking-result div:last-child{display:flex;flex-direction:column;gap:4px}.speaking-result span{color:#8ea0a4;font-size:12px}.inline-error{color:#ff7a81;font-size:13px}
.lesson-primary-btn,.lesson-secondary-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;border-radius:14px;padding:15px 20px;font-weight:900;font-size:14px;border:0;transition:.18s ease;text-decoration:none;}.lesson-primary-btn{background:linear-gradient(180deg,#a8e93a,#8bc724);color:#102008;box-shadow:0 10px 24px rgba(129,186,24,.18)}.lesson-primary-btn:hover{transform:translateY(-2px);filter:brightness(1.05)}.lesson-primary-btn:disabled{opacity:.38;cursor:not-allowed;transform:none}.lesson-primary-btn.wide{width:100%}.lesson-secondary-btn{border:1px solid #3d555c;color:#dae5e3;background:#1a2c33}.lesson-secondary-btn:hover{border-color:#60767c;background:#21373e}
.answer-footer,.flash-footer{position:fixed;left:0;right:0;bottom:0;background:#1c3037;border-top:1px solid #30464e;box-shadow:0 -18px 40px rgba(0,0,0,.18);z-index:10}.answer-footer-inner,.flash-footer{padding:16px max(20px, calc((100vw - 880px)/2));}.answer-footer-inner{display:flex;align-items:center;gap:14px}.feedback-mark{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:25px;background:#13262c}.feedback-mark.positive{color:#9fe22f}.feedback-mark.negative{color:#ff6970}.feedback-copy{display:flex;flex-direction:column;gap:3px;min-width:0}.feedback-copy span{font-size:20px;font-weight:900}.feedback-copy small{font-size:12px;color:#84979b}.footer-actions{margin-left:auto;display:flex;align-items:center;gap:14px}.tiny-feedback{background:none;border:0;color:#759095;font-weight:800;font-size:12px}.footer-continue{min-width:155px}.flash-footer{padding-top:14px;padding-bottom:18px;text-align:center}.flash-footer-title{font-size:15px;font-weight:900;margin-bottom:12px}.flash-answer-actions{display:flex;justify-content:center;gap:10px}.review-choice{border-radius:14px;padding:13px 20px;font-weight:900;font-size:13px;display:inline-flex;align-items:center;justify-content:center;gap:7px}.review-choice.no{background:#2c3336;color:#d4dcda;border:1px solid #4a5558}.review-choice.yes{background:#8dca25;color:#102008;border:1px solid #a3e03b}
.inline-feedback{margin-top:16px;border-radius:15px;padding:14px 15px;display:flex;gap:10px;align-items:center;font-size:13px;font-weight:700}.inline-feedback.good{background:rgba(130,190,28,.12);color:#b4e75e}.inline-feedback.bad{background:rgba(230,83,94,.1);color:#ff8b91}
.grammar-intro-card h2{font-size:32px;line-height:1.15;margin:22px 0 5px;font-weight:900}.grammar-title-en{margin:0 0 26px;color:#89999e;font-size:13px;font-style:italic}.grammar-points{display:grid;gap:10px;margin-bottom:18px}.grammar-point{display:flex;gap:12px;align-items:flex-start;padding:11px 0}.grammar-point span{width:26px;height:26px;border-radius:8px;background:#29402e;color:#aee849;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex:0 0 auto}.grammar-point p{margin:3px 0 0;color:#dbe5e3;font-size:14px;line-height:1.45}.grammar-example-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:22px}.grammar-example-box{background:#1c3036;border:1px solid #334950;border-radius:15px;padding:14px;display:flex;flex-direction:column;gap:5px}.grammar-example-box strong{font-size:13px}.grammar-example-box span{font-size:12px;color:#8b9da1}
.lesson-completion{min-height:calc(100vh - 110px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:50px 0}.completion-confetti{font-size:56px;margin-bottom:15px}.lesson-eyebrow{font-size:12px;letter-spacing:.12em;font-weight:900;color:#9ddc36}.lesson-completion h1{font-size:42px;line-height:1.05;margin:14px 0 10px;letter-spacing:-.04em}.lesson-completion p{max-width:540px;color:#9cacb0;line-height:1.55;margin:0 auto 30px}.completion-score{display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:10px;width:min(560px,100%);margin-bottom:28px}.score-main,.score-stat{border:1px solid #334a52;background:#1b3037;border-radius:18px;padding:18px;display:flex;align-items:center;justify-content:center;gap:7px}.score-main span{font-size:30px;font-weight:900;color:#b1ec48}.score-main small{font-weight:900;color:#8aa09e}.score-stat{flex-direction:column;gap:2px}.score-stat strong{font-size:24px}.score-stat span{font-size:11px;color:#7f9196;text-transform:uppercase;font-weight:900}.quick-win-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:min(560px,100%);margin:0 auto 24px}.quick-win{padding:13px 10px;border:1px solid #334a52;background:#182c33;border-radius:16px;display:flex;flex-direction:column;align-items:center;gap:3px}.quick-win strong{font-size:21px;color:#f2f7f5}.quick-win span{font-size:10px;color:#7f9196;text-transform:uppercase;font-weight:900;letter-spacing:.06em}.completion-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.empty-orb{width:88px;height:88px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#9ee42b;color:#122009;font-size:36px;margin-bottom:18px;box-shadow:0 14px 40px rgba(143,212,39,.17)}.lesson-empty{text-align:center;min-height:calc(100vh - 120px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:50px}.lesson-empty h1{font-size:34px;margin:10px 0}.lesson-empty p{max-width:560px;color:#8e9fa4;line-height:1.55;margin:0 0 24px}
@keyframes pulse{from{transform:scale(1)}to{transform:scale(1.06)}}
.sprint-round-copy{font-weight:900}.sprint-round-copy::after{content:' · ';opacity:.45;margin-left:4px}.question-type-pill .sprint-round-copy + i{margin-left:2px}
.micro-sprint-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 8px;border-radius:999px;background:rgba(158,228,43,.10);color:#a9e445;border:1px solid rgba(158,228,43,.17);font-size:10px;font-weight:900;white-space:nowrap}.micro-sprint-badge + .sound-mini-btn{margin-left:4px}
@media (max-width:700px){.lesson-hud{grid-template-columns:42px 1fr auto;gap:11px;padding:0 15px;height:74px}.hud-icon-btn{width:38px;height:38px}.hud-stats{gap:9px}.hud-stat{font-size:13px}.lesson-main{width:min(100% - 18px,880px);padding-top:10px}.question-head{margin:10px 0 14px}.exercise-card{padding:24px 18px;border-radius:20px}.question-title{font-size:25px}.question-word,.flash-word{font-size:44px}.choice-grid,.grammar-example-grid,.visual-grid{grid-template-columns:1fr}.visual-art{height:150px}.answer-footer-inner{padding:12px 14px;gap:9px}.feedback-mark{width:46px;height:46px;font-size:19px}.feedback-copy span{font-size:15px}.feedback-copy small{font-size:10px}.tiny-feedback{display:none}.footer-continue{min-width:130px}.flash-footer{padding-left:14px;padding-right:14px}.lesson-completion h1{font-size:33px}.completion-score{grid-template-columns:1fr 1fr 1fr}.score-main{grid-column:span 3}.quick-win-grid{grid-template-columns:1fr 1fr 1fr}.quick-win{padding:10px 7px}.lesson-empty{padding:35px 8px}.lesson-empty h1{font-size:28px}}
</style>
