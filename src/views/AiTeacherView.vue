<template>
  <div class="teacher-page">
    <AuroraBackground />
    <AppNav />

    <div class="container teacher-content">
      <div class="teacher-header reveal">
        <h1 class="teacher-title">
          <i class="ti ti-school" aria-hidden="true" style="color: var(--accent);"></i>
          AI Teacher
        </h1>
        <p class="teacher-subtitle">Ingliz tili haqida istalgan savolingizni bering — grammatika, so'z, gap tuzilishi</p>
      </div>

      <div class="glass teacher-card reveal">
        <div class="teacher-log" ref="logEl">
          <div v-if="entries.length === 0" class="teacher-empty">
            <i class="ti ti-bulb" aria-hidden="true"></i>
            <p>Masalan: <em>"Present Perfect nima?"</em> yoki <em>"why do we say 'a lot of' not 'much of'?"</em></p>
          </div>

          <div v-for="(entry, i) in entries" :key="i" class="teacher-entry">
            <div class="teacher-question">
              <i class="ti ti-help-circle" aria-hidden="true"></i>
              <span>{{ entry.question }}</span>
            </div>

            <div v-if="entry.loading" class="teacher-loading">
              <i class="ti ti-loader-2 spin" aria-hidden="true"></i> O'ylanyapman...
            </div>

            <div v-else-if="entry.error" class="teacher-error">{{ entry.error }}</div>

            <div v-else class="teacher-answer">
              <p class="teacher-explanation">{{ entry.explanation }}</p>

              <div v-if="entry.examples?.length" class="teacher-examples">
                <span v-for="(ex, ei) in entry.examples" :key="ei" class="teacher-example-chip">{{ ex }}</span>
              </div>

              <div v-if="entry.practice" class="teacher-practice">
                <p class="teacher-practice-q">
                  <i class="ti ti-pencil" aria-hidden="true"></i> {{ entry.practice.question }}
                </p>
                <div class="teacher-practice-options">
                  <button
                    v-for="(opt, oi) in entry.practice.options"
                    :key="oi"
                    class="teacher-option"
                    type="button"
                    :disabled="entry.answered"
                    :class="{
                      'teacher-option-correct': entry.answered && oi === entry.practice.correctIndex,
                      'teacher-option-wrong': entry.answered && entry.chosenIndex === oi && oi !== entry.practice.correctIndex
                    }"
                    @click="answerPractice(entry, oi)"
                  >
                    {{ opt }}
                  </button>
                </div>
                <p v-if="entry.answered" class="teacher-practice-explain">{{ entry.practice.correctExplanationUz }}</p>
              </div>
            </div>
          </div>
        </div>

        <form class="teacher-input-row" @submit.prevent="ask">
          <input
            v-model="draft"
            type="text"
            placeholder="Savolingizni yozing..."
            :disabled="asking"
            maxlength="500"
          />
          <button class="teacher-send-btn" type="submit" :disabled="asking || !draft.trim()">
            <i class="ti ti-send" aria-hidden="true"></i>
          </button>
        </form>
      </div>

      <div class="teacher-suggestions reveal">
        <button
          v-for="s in suggestions"
          :key="s"
          class="teacher-suggestion-chip"
          type="button"
          @click="draft = s; ask()"
        >
          {{ s }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase/config'
import { useUserStore } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()

const userStore = useUserStore()
const draft = ref('')
const asking = ref(false)
const entries = ref([])
const logEl = ref(null)

const suggestions = [
  'Present Perfect qachon ishlatiladi?',
  "'a' va 'an' farqi nima?",
  "'much' va 'many' farqi?",
  'Passive voice nima?'
]

async function scrollDown() {
  await nextTick()
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight
}

async function ask() {
  const question = draft.value.trim()
  if (!question || asking.value) return
  draft.value = ''
  asking.value = true

  const entry = { question, loading: true, error: null, explanation: '', examples: [], practice: null, answered: false, chosenIndex: null }
  entries.value.push(entry)
  scrollDown()

  const history = entries.value
    .slice(0, -1)
    .slice(-3)
    .flatMap((e) => [
      { role: 'user', content: e.question },
      { role: 'assistant', content: e.explanation || '' }
    ])

  try {
    const call = httpsCallable(functions, 'aiTeacherAsk')
    const result = await call({ question, level: userStore.level, history })
    entry.explanation = result.data.explanation
    entry.examples = result.data.examples || []
    entry.practice = result.data.practice
    await userStore.addXp(2, 'aiTeacher')
    userStore.incrementDailyStat('correctAnswers', 0)
  } catch (err) {
    entry.error = err?.message || "Xatolik yuz berdi. Qayta urinib ko'ring."
  } finally {
    entry.loading = false
    asking.value = false
    scrollDown()
  }
}

function answerPractice(entry, optionIndex) {
  if (entry.answered) return
  entry.answered = true
  entry.chosenIndex = optionIndex
  if (optionIndex === entry.practice.correctIndex) {
    userStore.incrementDailyStat('correctAnswers')
  }
}
</script>

<style scoped>
.teacher-content {
  padding: 100px 20px 60px;
  max-width: 720px;
  margin: 0 auto;
}

.teacher-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 28px;
  margin-bottom: 4px;
}

.teacher-subtitle {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.teacher-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.teacher-log {
  max-height: 55vh;
  overflow-y: auto;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.teacher-empty {
  text-align: center;
  color: var(--text-secondary);
  padding: 30px 10px;
}

.teacher-empty i {
  font-size: 28px;
  color: var(--accent);
  margin-bottom: 8px;
  display: block;
}

.teacher-question {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-weight: 600;
}

.teacher-question i {
  color: var(--accent);
  margin-top: 2px;
}

.teacher-loading {
  color: var(--text-secondary);
  font-size: 14px;
  padding-left: 24px;
}

.spin {
  animation: teacher-spin 1s linear infinite;
  display: inline-block;
}

@keyframes teacher-spin {
  to { transform: rotate(360deg); }
}

.teacher-error {
  color: #d9534f;
  font-size: 14px;
  padding-left: 24px;
}

.teacher-answer {
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.teacher-explanation {
  margin: 0;
  line-height: 1.5;
}

.teacher-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.teacher-example-chip {
  font-size: 13px;
  font-style: italic;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(120, 100, 255, 0.08);
  border: 1px solid rgba(120, 100, 255, 0.18);
}

.teacher-practice {
  border-radius: 12px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color, rgba(255,255,255,0.08));
}

.teacher-practice-q {
  margin: 0 0 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.teacher-practice-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.teacher-option {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border-color, rgba(255,255,255,0.08));
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: inherit;
  font: inherit;
  transition: background 0.15s ease;
}

.teacher-option:hover:not(:disabled) {
  background: rgba(120, 100, 255, 0.08);
}

.teacher-option:disabled {
  cursor: default;
}

.teacher-option-correct {
  border-color: #4caf7d;
  background: rgba(76, 175, 125, 0.12);
}

.teacher-option-wrong {
  border-color: #d9534f;
  background: rgba(217, 83, 79, 0.12);
}

.teacher-practice-explain {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--text-secondary);
}

.teacher-input-row {
  display: flex;
  gap: 10px;
  padding: 16px 22px;
  border-top: 1px solid var(--border-color, rgba(255,255,255,0.08));
}

.teacher-input-row input {
  flex: 1;
}

.teacher-send-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.teacher-send-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.teacher-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.teacher-suggestion-chip {
  font-size: 13px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border-color, rgba(255,255,255,0.08));
  background: transparent;
  cursor: pointer;
  color: inherit;
}

.teacher-suggestion-chip:hover {
  background: rgba(120, 100, 255, 0.08);
}
</style>
