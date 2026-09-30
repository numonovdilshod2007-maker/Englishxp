<template>
  <div class="dashboard">
    <AuroraBackground />
    <AppNav />

    <main class="container dash-content">
      <section class="welcome-row reveal">
        <div>
          <div class="eyebrow"><span class="eyebrow-dot"></span> EnglishXP learning hub</div>
          <h1 class="welcome-title">Salom, {{ userStore.profile?.displayName || 'Do\'stim' }} 👋</h1>
          <p class="welcome-sub">Bugun kichik qadam. Katta natija.</p>
        </div>
        <div class="header-pills">
          <div class="glass streak-pill">
            <i class="ti ti-flame flame-icon" aria-hidden="true"></i>
            <div>
              <span class="streak-num">{{ userStore.streakCount }}</span>
              <span class="streak-label">kunlik streak</span>
            </div>
            <i
              v-if="userStore.streakFreezeCount > 0"
              class="ti ti-snowflake freeze-icon"
              aria-hidden="true"
              :title="`${userStore.streakFreezeCount} ta Streak Freeze mavjud`"
            ></i>
          </div>
          <router-link to="/shop" class="glass gems-pill">
            <i class="ti ti-diamond gems-icon" aria-hidden="true"></i>
            <div>
              <span class="streak-num">{{ userStore.gems }}</span>
              <span class="streak-label">gems</span>
            </div>
          </router-link>
          <button class="glass goal-pill" @click="showGoalModal = true" type="button">
            <i class="ti ti-target" aria-hidden="true"></i>
            <div>
              <span class="streak-num">{{ userStore.dailyXpToday }}/{{ userStore.dailyGoal }}</span>
              <span class="streak-label">kunlik XP</span>
            </div>
          </button>
        </div>
      </section>

      <section class="dashboard-hero reveal">
        <div class="glass mission-card">
          <div class="mission-glow"></div>
          <div class="mission-topline">
            <span class="mission-kicker"><i class="ti ti-sparkles"></i> Bugungi missiya</span>
            <span class="cefr-chip">{{ userStore.cefrBand.code }} · {{ userStore.cefrBand.label }}</span>
          </div>

          <div class="mission-layout">
            <div class="mission-copy">
              <p class="mission-index">NEXT STEP · {{ userStore.level }}-DARAJA</p>
              <h2>{{ primaryPlan.title }}</h2>
              <p class="mission-description">{{ primaryPlan.subtitle }}</p>

              <div class="mission-meta">
                <span><i class="ti ti-clock"></i> ~10 daqiqa</span>
                <span><i class="ti ti-bolt"></i> +20 XP</span>
                <span><i class="ti ti-target-arrow"></i> Daily goal</span>
              </div>

              <router-link :to="primaryPlan.route" class="mission-cta">
                Boshlash
                <i class="ti ti-arrow-up-right"></i>
              </router-link>
            </div>

            <div class="goal-orbit" :style="goalOrbitStyle">
              <div class="goal-orbit-inner">
                <span class="goal-orbit-value">{{ userStore.dailyGoalPercent }}%</span>
                <span class="goal-orbit-label">daily goal</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-side glass">
          <div class="hero-side-head">
            <div>
              <span class="hero-side-kicker">YOUR SNAPSHOT</span>
              <h3>Bugungi holat</h3>
            </div>
            <router-link to="/progress" class="icon-link" title="Progress">
              <i class="ti ti-arrow-up-right"></i>
            </router-link>
          </div>

          <div class="snapshot-grid">
            <div class="snapshot-item">
              <span class="snapshot-label">Haftalik XP</span>
              <strong>{{ userStore.weeklyXp }}</strong>
              <span class="snapshot-sub">bu hafta</span>
            </div>
            <div class="snapshot-item">
              <span class="snapshot-label">So'zlar</span>
              <strong>{{ userStore.profile?.completedWords?.length || 0 }}</strong>
              <span class="snapshot-sub">o'rganilgan</span>
            </div>
            <div class="snapshot-item">
              <span class="snapshot-label">SRS</span>
              <strong>{{ userStore.dueWordsCount }}</strong>
              <span class="snapshot-sub">takrorlash</span>
            </div>
            <div class="snapshot-item">
              <span class="snapshot-label">Level</span>
              <strong>{{ userStore.level }}</strong>
              <span class="snapshot-sub">{{ currentLevelTitle }}</span>
            </div>
          </div>

          <router-link to="/ai-teacher" class="ai-quick-card">
            <span class="ai-quick-icon"><i class="ti ti-sparkles"></i></span>
            <span class="ai-quick-copy">
              <strong>AI Teacher bilan gaplashing</strong>
              <small>Real conversation · {{ userStore.cefrBand.code }} level</small>
            </span>
            <i class="ti ti-chevron-right"></i>
          </router-link>
        </div>
      </section>

      <div v-if="userStore.dueWordsCount > 0" class="glass review-banner reveal" @click="$router.push('/lesson/review')">
        <div class="review-banner-left">
          <i class="ti ti-refresh-alert" aria-hidden="true"></i>
          <div>
            <strong>{{ userStore.dueWordsCount }} ta so'zni hozir takrorlash vaqti keldi</strong>
            <p>SRS xotirani mustahkamlaydi — buni o'tkazib yubormang</p>
          </div>
        </div>
        <span class="banner-action">Takrorlash <i class="ti ti-arrow-right"></i></span>
      </div>

      <div v-if="userStore.mistakeWordsCount > 0" class="glass review-banner reveal mistake-banner" @click="$router.push('/mistakes')">
        <div class="review-banner-left">
          <i class="ti ti-bulb" aria-hidden="true"></i>
          <div>
            <strong>{{ Math.min(userStore.mistakeWordsCount, 5) }} ta xato so‘z sizni kutyapti</strong>
            <p>2–3 daqiqalik fix bilan qayta eslab qoling</p>
          </div>
        </div>
        <span class="banner-action">Xatolarim <i class="ti ti-arrow-right"></i></span>
      </div>

      <div v-if="!userStore.isPro" class="glass pro-banner reveal" @click="$router.push('/upgrade')">
        <div class="review-banner-left">
          <i class="ti ti-crown" aria-hidden="true"></i>
          <div>
            <strong>EnglishXP Pro</strong>
            <p>Barcha darslar, AI practice va eksklyuziv imkoniyatlarni oching</p>
          </div>
        </div>
        <span class="banner-action">Ko'rish <i class="ti ti-arrow-right"></i></span>
      </div>

      <section class="dashboard-grid">
        <div class="dashboard-main">
          <div class="section-row reveal">
            <div>
              <span class="section-kicker">TODAY</span>
              <h2 class="section-heading">Bugungi reja</h2>
            </div>
            <router-link to="/learning-path" class="section-link">To'liq yo'l <i class="ti ti-arrow-right"></i></router-link>
          </div>

          <div class="glass plan-card reveal">
            <button
              v-for="(item, i) in userStore.todayPlan"
              :key="item.id"
              class="plan-item"
              :class="{ 'plan-item-primary': i === 0 }"
              type="button"
              @click="$router.push(item.route)"
            >
              <span class="plan-number" :class="{ 'plan-number-primary': i === 0 }">{{ i + 1 }}</span>
              <span class="plan-icon"><i :class="['ti', item.icon]"></i></span>
              <span class="plan-copy">
                <strong>{{ item.title }}</strong>
                <small>{{ item.subtitle }}</small>
              </span>
              <span class="plan-arrow"><i class="ti ti-arrow-up-right"></i></span>
            </button>
          </div>

          <div class="section-row reveal section-row-spaced">
            <div>
              <span class="section-kicker">BUILD THE HABIT</span>
              <h2 class="section-heading">Kunlik topshiriqlar</h2>
            </div>
          </div>

          <div class="glass quests-card reveal">
            <div v-for="q in userStore.dailyQuests" :key="q.id" class="quest-row">
              <div class="quest-icon" :class="{ 'quest-icon-done': q.completed }">
                <i :class="q.completed ? 'ti ti-check' : 'ti ' + q.icon" aria-hidden="true"></i>
              </div>
              <div class="quest-info">
                <div class="quest-label-row">
                  <span class="quest-label" :class="{ 'quest-label-done': q.completed }">{{ q.label }}</span>
                  <span class="quest-value">{{ q.progress }}/{{ q.target }}</span>
                </div>
                <div class="mini-progress quest-progress">
                  <div class="mini-progress-fill" :style="{ width: Math.round((q.progress / q.target) * 100) + '%' }"></div>
                </div>
              </div>
              <span class="quest-reward">+{{ q.xpReward }} XP</span>
            </div>
          </div>
        </div>

        <aside class="dashboard-side">
          <WordOfDayWidget />
          <PartnerWidget />

          <div class="glass skill-card reveal">
            <div class="skill-head">
              <div>
                <span class="section-kicker">WEEKLY PULSE</span>
                <h3>Ko'nikmalar</h3>
              </div>
              <router-link to="/analytics" class="icon-link" title="Analitika">
                <i class="ti ti-chart-dots-3"></i>
              </router-link>
            </div>

            <div class="skill-list">
              <div v-for="skill in skillCards" :key="skill.id" class="skill-row">
                <div class="skill-name">
                  <span class="skill-icon"><i :class="['ti', skill.icon]"></i></span>
                  <span>{{ skill.label }}</span>
                </div>
                <span class="skill-percent">{{ skill.percent }}%</span>
                <div class="skill-track">
                  <div class="skill-fill" :style="{ width: `${Math.max(skill.percent, skill.percent > 0 ? 8 : 2)}%` }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass weekly-recap-card reveal">
            <div class="weekly-recap-icon"><i class="ti ti-calendar-stats" aria-hidden="true"></i></div>
            <div class="weekly-recap-text">
              <strong>{{ userStore.weeklyXp }} XP bu hafta</strong>
              <p>Streak: {{ userStore.streakCount }} kun · {{ userStore.masteredWordsCount }} ta so'z mustahkamlangan</p>
            </div>
          </div>
        </aside>
      </section>

      <div class="daily-goal-bar reveal">
        <div class="daily-goal-track">
          <div class="daily-goal-track-fill" :style="{ width: userStore.dailyGoalPercent + '%' }"></div>
        </div>
        <span class="daily-goal-text">
          <i v-if="userStore.dailyGoalReached" class="ti ti-circle-check-filled" aria-hidden="true"></i>
          Bugungi maqsad: {{ userStore.dailyXpToday }} / {{ userStore.dailyGoal }} XP
        </span>
        <button type="button" class="goal-edit" @click="showGoalModal = true">O'zgartirish</button>
      </div>

      <section class="levels-section reveal">
        <div class="section-row">
          <div>
            <span class="section-kicker">LEARNING PATH</span>
            <h2 class="section-heading">Levellar</h2>
          </div>
          <router-link to="/learning-path" class="section-link">Yo'lni ko'rish <i class="ti ti-arrow-right"></i></router-link>
        </div>

        <div class="levels-grid">
          <component
            :is="isUnlocked(lvl.level) ? 'router-link' : 'div'"
            v-for="lvl in levels"
            :key="lvl.level"
            :to="isUnlocked(lvl.level) ? `/lesson/${lvl.level}` : undefined"
            class="glass level-card reveal"
            :class="{ 'level-card-locked': !isUnlocked(lvl.level), 'level-card-current': lvl.level === userStore.level }"
          >
            <div class="level-card-top">
              <div class="level-badge" :class="{ 'level-badge-locked': !isUnlocked(lvl.level) }">
                <i v-if="!isUnlocked(lvl.level)" class="ti ti-lock" aria-hidden="true"></i>
                <span v-else>{{ lvl.level }}</span>
              </div>
              <span v-if="lvl.level === userStore.level" class="current-chip">SIZNING DARAJANGIZ</span>
              <i v-else-if="isLevelDone(lvl.level)" class="ti ti-circle-check-filled level-done-icon" aria-hidden="true"></i>
            </div>
            <h3>{{ lvl.title }}</h3>
            <p>{{ lvl.description }}</p>
            <div class="level-bottom">
              <span>{{ wordsDoneInLevel(lvl.level) }} / {{ lvl.words.length }} so'z</span>
              <span><i class="ti ti-arrow-up-right"></i></span>
            </div>
          </component>
        </div>
      </section>
    </main>

    <Modal v-model="showGoalModal" title="Kunlik XP maqsadi">
      <p class="goal-modal-hint">Har kuni qancha XP yig'ishni xohlaysiz?</p>
      <div class="goal-options">
        <button
          v-for="opt in DAILY_GOAL_OPTIONS"
          :key="opt"
          class="goal-option"
          :class="{ 'goal-option-active': userStore.dailyGoal === opt }"
          @click="selectGoal(opt)"
        >
          {{ opt }} XP
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore, DAILY_GOAL_OPTIONS } from '../stores/userStore.js'
import { levels } from '../data/vocabulary.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import Modal from '../components/Modal.vue'
import WordOfDayWidget from '../components/WordOfDayWidget.vue'
import PartnerWidget from '../components/PartnerWidget.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()

const userStore = useUserStore()
const showGoalModal = ref(false)

const primaryPlan = computed(() => userStore.todayPlan?.[0] || {
  title: `${userStore.level}-daraja darsini davom ettiring`,
  subtitle: 'Bugungi darsni boshlab, learning path bo\'ylab yana bir qadam tashlang.',
  route: `/lesson/${userStore.level}`
})

const goalOrbitStyle = computed(() => ({
  background: `conic-gradient(var(--accent) ${userStore.dailyGoalPercent}%, var(--surface-glass) 0)`
}))

const skillCards = computed(() => {
  const p = userStore.analytics?.skillPercents || {}
  return [
    { id: 'vocabulary', label: 'Vocabulary', icon: 'ti-abc', percent: p.vocabulary || 0 },
    { id: 'grammar', label: 'Grammar', icon: 'ti-abc-2', percent: p.grammar || 0 },
    { id: 'listening', label: 'Listening', icon: 'ti-headphones', percent: p.listening || 0 },
    { id: 'speaking', label: 'Speaking', icon: 'ti-microphone-2', percent: p.speaking || 0 }
  ]
})

const currentLevelTitle = computed(() => {
  const found = levels.find((l) => l.level === userStore.level)
  return found ? found.title : ''
})

async function selectGoal(amount) {
  await userStore.setDailyGoal(amount)
  showGoalModal.value = false
}

function isUnlocked(levelNum) {
  return userStore.isPro || levelNum <= userStore.level
}

function isLevelDone(levelNum) {
  return levelNum < userStore.level
}

function wordsDoneInLevel(levelNum) {
  const lvl = levels.find((l) => l.level === levelNum)
  if (!lvl) return 0
  const completed = userStore.profile?.completedWords || []
  if (levelNum < userStore.level) return lvl.words.length
  return lvl.words.filter((w) => completed.includes(`${levelNum}:${w.en}`)).length
}
</script>

<style scoped>
.dash-content {
  position: relative;
  z-index: 1;
  padding: 34px 24px 96px;
}

.welcome-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.eyebrow,
.section-kicker,
.hero-side-kicker,
.mission-index {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
}

.eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 5px var(--accent-soft);
}

.welcome-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  line-height: 1.05;
  margin: 0 0 8px;
  letter-spacing: -.04em;
}

.welcome-sub {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.header-pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.streak-pill,
.gems-pill,
.goal-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 56px;
  padding: 9px 15px;
  border-radius: 17px;
}

.streak-pill {
  background: linear-gradient(135deg, rgba(60, 230, 125, 0.12), rgba(60, 230, 125, 0.03)) !important;
  border-color: rgba(60, 230, 125, 0.25) !important;
}

.streak-num {
  display: block;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.05;
  color: var(--accent);
}

.streak-label {
  display: block;
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
}

.gems-pill {
  background: linear-gradient(135deg, rgba(94, 190, 255, .12), rgba(94, 190, 255, .03)) !important;
  border-color: rgba(94, 190, 255, .22) !important;
}

.gems-icon {
  color: #5ebeff;
  font-size: 18px;
}

.gems-pill .streak-num {
  color: #5ebeff;
}

.goal-pill {
  text-align: left;
}

.goal-pill > i:first-child {
  color: var(--accent);
  font-size: 18px;
}

.freeze-icon {
  color: #5ebeff;
  font-size: 17px;
}

.dashboard-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(300px, .85fr);
  gap: 18px;
  margin-bottom: 18px;
}

.mission-card {
  position: relative;
  overflow: hidden;
  min-height: 340px;
  padding: 28px;
  background:
    radial-gradient(circle at 80% 15%, rgba(60, 230, 125, .13), transparent 26%),
    var(--card-bg);
}

.mission-glow {
  position: absolute;
  width: 260px;
  height: 260px;
  top: -100px;
  right: -30px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(60,230,125,.25), transparent 65%);
  filter: blur(12px);
  pointer-events: none;
}

.mission-topline,
.hero-side-head,
.section-row,
.mission-meta,
.level-bottom,
.quest-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.mission-topline {
  position: relative;
  z-index: 1;
}

.mission-kicker {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 800;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: .08em;
}

.cefr-chip {
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: var(--accent-soft);
  color: var(--accent-dim);
}

.mission-layout {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  min-height: 268px;
}

.mission-copy {
  max-width: 620px;
}

.mission-index {
  margin: 0 0 10px;
}

.mission-copy h2 {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(26px, 3.2vw, 40px);
  line-height: 1.03;
  letter-spacing: -.04em;
  margin: 0 0 12px;
  max-width: 560px;
}

.mission-description {
  margin: 0;
  max-width: 560px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.65;
}

.mission-meta {
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 20px 0;
  color: var(--text-muted);
  font-size: 11px;
}

.mission-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.mission-cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 17px;
  border-radius: 13px;
  background: var(--accent);
  color: #05130a;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 14px 32px -18px rgba(60, 230, 125, .85);
  transition: transform .2s var(--ease-spring), box-shadow .2s var(--ease-premium);
}

.mission-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 42px -18px rgba(60, 230, 125, .95);
}

.goal-orbit {
  width: 150px;
  height: 150px;
  padding: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.06), 0 24px 50px -24px rgba(60,230,125,.55);
}

.goal-orbit-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
}

.goal-orbit-value {
  font-family: 'Manrope', sans-serif;
  font-size: 28px;
  font-weight: 800;
}

.goal-orbit-label {
  margin-top: 3px;
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: .08em;
}

.hero-side {
  padding: 22px;
}

.hero-side-head h3,
.skill-head h3 {
  margin: 4px 0 0;
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 800;
}

.icon-link {
  width: 34px;
  height: 34px;
  border-radius: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-glass);
  color: var(--text-secondary);
  transition: .2s ease;
}

.icon-link:hover {
  color: var(--accent);
  background: var(--accent-soft);
}

.snapshot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin: 20px 0;
}

.snapshot-item {
  padding: 13px;
  border: 1px solid var(--card-border);
  border-radius: 15px;
  background: var(--surface-glass);
}

.snapshot-label,
.snapshot-sub {
  display: block;
  font-size: 10px;
  color: var(--text-muted);
}

.snapshot-item strong {
  display: block;
  margin: 6px 0 2px;
  font-family: 'Manrope', sans-serif;
  font-size: 23px;
  line-height: 1;
}

.ai-quick-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 15px;
  background: linear-gradient(135deg, var(--accent-soft), rgba(60,230,125,.04));
  border: 1px solid rgba(60,230,125,.2);
  transition: transform .2s var(--ease-premium);
}

.ai-quick-card:hover {
  transform: translateY(-2px);
}

.ai-quick-icon {
  width: 35px;
  height: 35px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: var(--accent);
  background: rgba(60,230,125,.13);
  flex-shrink: 0;
}

.ai-quick-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.ai-quick-copy strong {
  font-size: 12px;
  font-weight: 800;
}

.ai-quick-copy small {
  font-size: 10px;
  color: var(--text-muted);
}

.review-banner,
.pro-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 18px;
  margin-bottom: 18px;
  cursor: pointer;
}

.review-banner {
  border-color: rgba(220, 160, 60, .28);
}

.pro-banner {
  border-color: rgba(232,152,58,.28);
  background: linear-gradient(135deg, rgba(246,196,83,.07), rgba(232,152,58,.05));
}

.review-banner-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.review-banner-left > i:first-child {
  font-size: 22px;
  color: #d4a03c;
}

.pro-banner .review-banner-left > i:first-child {
  color: #b9791f;
}

.review-banner strong {
  display: block;
  font-size: 13px;
  margin-bottom: 2px;
}

.review-banner p {
  margin: 0;
  font-size: 11px;
  color: var(--text-muted);
}

.banner-action,
.section-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(300px, .85fr);
  gap: 18px;
  align-items: start;
}

.dashboard-main,
.dashboard-side {
  min-width: 0;
}

.section-row {
  margin-bottom: 12px;
}

.section-row-spaced {
  margin-top: 28px;
}

.section-heading {
  margin: 4px 0 0;
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -.025em;
}

.plan-card,
.quests-card,
.skill-card {
  padding: 8px;
}

.plan-item {
  width: 100%;
  display: grid;
  grid-template-columns: 28px 38px minmax(0,1fr) 34px;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid transparent;
  border-radius: 16px;
  background: transparent;
  color: inherit;
  text-align: left;
  transition: background .2s ease, border-color .2s ease, transform .2s var(--ease-premium);
}

.plan-item:hover,
.plan-item-primary {
  background: var(--surface-glass);
  border-color: var(--card-border);
}

.plan-item:hover {
  transform: translateX(2px);
}

.plan-number {
  width: 26px;
  height: 26px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: var(--surface-glass);
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 800;
}

.plan-number-primary {
  background: var(--accent-soft);
  color: var(--accent);
}

.plan-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 18px;
}

.plan-copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.plan-copy strong {
  font-size: 13px;
}

.plan-copy small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-muted);
  font-size: 10px;
}

.plan-arrow {
  width: 34px;
  height: 34px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: var(--text-muted);
  background: var(--surface-glass);
}

.quests-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.quest-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  border-radius: 14px;
}

.quest-row + .quest-row {
  border-top: 1px solid var(--card-border);
}

.quest-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: var(--surface-glass);
  color: var(--text-secondary);
}

.quest-icon-done {
  background: var(--accent-soft);
  color: var(--accent);
}

.quest-info {
  flex: 1;
  min-width: 0;
}

.quest-label-row {
  margin-bottom: 6px;
}

.quest-label {
  font-size: 11px;
  font-weight: 700;
}

.quest-label-done {
  color: var(--text-muted);
  text-decoration: line-through;
}

.quest-value {
  font-size: 10px;
  color: var(--text-muted);
}

.quest-progress {
  height: 5px;
  margin: 0;
}

.quest-reward {
  font-size: 10px;
  font-weight: 800;
  color: var(--accent);
  white-space: nowrap;
}

.skill-card {
  padding: 18px;
  margin-top: 18px;
}

.skill-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skill-row {
  display: grid;
  grid-template-columns: minmax(100px, 1fr) 34px;
  gap: 7px 10px;
  align-items: center;
}

.skill-name {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 11px;
  font-weight: 700;
}

.skill-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: var(--surface-glass);
  color: var(--text-secondary);
}

.skill-percent {
  text-align: right;
  font-size: 10px;
  font-weight: 800;
  color: var(--text-muted);
}

.skill-track {
  grid-column: 1 / -1;
  height: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--surface-glass);
}

.skill-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-dim));
  transition: width .5s var(--ease-premium);
}

.weekly-recap-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  margin-top: 18px;
}

.weekly-recap-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
  color: var(--accent);
}

.weekly-recap-text strong {
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
}

.weekly-recap-text p {
  margin: 0;
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1.5;
}

.daily-goal-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0 40px;
}

.daily-goal-track {
  flex: 1;
  height: 7px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--surface-glass);
  border: 1px solid var(--card-border);
}

.daily-goal-track-fill {
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transition: width .6s var(--ease-premium);
}

.daily-goal-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 700;
}

.daily-goal-text i {
  color: var(--accent);
}

.goal-edit {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--accent);
  font-size: 10px;
  font-weight: 800;
}

.levels-section {
  margin-top: 8px;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.level-card {
  padding: 18px;
  display: block;
  min-height: 160px;
  position: relative;
}

.level-card-locked {
  opacity: .42;
  cursor: not-allowed;
}

.level-card-current {
  border-color: rgba(60,230,125,.45);
  background: linear-gradient(145deg, rgba(60,230,125,.08), var(--card-bg));
}

.level-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 18px;
}

.level-badge {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
  font-size: 17px;
  font-weight: 800;
}

.level-badge-locked {
  background: var(--surface-glass);
  color: var(--text-muted);
}

.current-chip {
  padding: 6px 8px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 8px;
  letter-spacing: .08em;
  font-weight: 900;
}

.level-done-icon {
  font-size: 22px;
  color: var(--accent);
}

.level-card h3 {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin: 0 0 6px;
}

.level-card p {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.5;
  min-height: 34px;
  margin: 0;
}

.level-bottom {
  margin-top: 16px;
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 700;
}

.level-bottom span:last-child {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: var(--surface-glass);
}

.goal-modal-hint {
  margin: 0 0 18px;
  color: var(--text-secondary);
}

.goal-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.goal-option {
  padding: 14px;
  border-radius: var(--radius-sm);
  background: var(--surface-glass);
  border: 1px solid var(--card-border);
  color: var(--card-text-primary);
  font-weight: 700;
  transition: .2s ease;
}

.goal-option:hover {
  background: var(--accent-soft);
}

.goal-option-active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent-dim);
}

@media (max-width: 1000px) {
  .dashboard-hero,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-side {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 18px;
    align-items: start;
  }

  .dashboard-side > :deep(.partner-widget),
  .dashboard-side > :deep(.glass),
  .dashboard-side > .skill-card,
  .dashboard-side > .weekly-recap-card {
    margin-top: 0;
  }
}

@media (max-width: 760px) {
  .dash-content {
    padding: 26px 16px 92px;
  }

  .dashboard-side {
    display: block;
  }

  .header-pills {
    width: 100%;
  }

  .header-pills > * {
    flex: 1;
    min-width: 0;
  }

  .mission-card,
  .hero-side {
    padding: 20px;
  }

  .mission-layout {
    min-height: 0;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
    padding-top: 24px;
  }

  .goal-orbit {
    width: 120px;
    height: 120px;
    align-self: flex-end;
    margin-top: -6px;
  }

  .goal-orbit-value {
    font-size: 24px;
  }

  .daily-goal-bar {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .daily-goal-track {
    width: 100%;
    flex-basis: 100%;
  }

  .daily-goal-text {
    order: 2;
  }

  .goal-edit {
    margin-left: auto;
    order: 3;
  }

  .levels-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .header-pills {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
  }

  .streak-pill,
  .gems-pill,
  .goal-pill {
    min-height: 62px;
    padding: 9px 10px;
    gap: 7px;
  }

  .streak-num {
    font-size: 15px;
  }

  .streak-label {
    font-size: 9px;
  }

  .mission-copy h2 {
    font-size: 29px;
  }

  .plan-item {
    grid-template-columns: 24px 34px minmax(0,1fr) 28px;
    padding: 11px 9px;
  }

  .plan-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
  }

  .plan-copy small {
    white-space: normal;
  }
}
</style>

<style scoped>
.mistake-banner { border-color: color-mix(in srgb, var(--accent) 18%, transparent); }
</style>
