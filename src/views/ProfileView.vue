<template>
  <div class="profile-page">
    <AuroraBackground />
    <AppNav />

    <main class="container profile-content">
      <section class="profile-hero glass" v-pop-in>
        <div class="hero-cover" aria-hidden="true">
          <div class="hero-orb hero-orb-one"></div>
          <div class="hero-orb hero-orb-two"></div>
        </div>

        <div class="hero-main">
          <div class="avatar-wrap">
            <div class="avatar-circle">
              <img v-if="userStore.profile?.photoURL" :src="userStore.profile.photoURL" alt="Profil rasmi" />
              <span v-else>{{ userStore.profile?.avatar || '🦁' }}</span>
            </div>
            <label class="avatar-edit-badge" :title="uploading ? 'Yuklanmoqda...' : 'Rasmni o\'zgartirish'">
              <input ref="fileInputEl" type="file" accept="image/*" hidden @change="handlePhotoChange" />
              <i v-if="!uploading" class="ti ti-camera"></i>
              <span v-else class="upload-progress">{{ uploadProgress }}%</span>
            </label>
          </div>

          <div class="hero-identity">
            <div v-if="!editingName" class="name-row">
              <div>
                <div class="eyebrow"><span class="live-dot"></span> Mening profilim</div>
                <h1>{{ userStore.profile?.displayName || 'Foydalanuvchi' }}</h1>
              </div>
              <ProBadge v-if="userStore.isPro" size="sm" />
              <button class="icon-btn" @click="startEditName" title="Ismni tahrirlash">
                <i class="ti ti-pencil"></i>
              </button>
            </div>

            <form v-else class="name-form" @submit.prevent="saveName">
              <input v-model="nameInput" type="text" maxlength="30" autofocus placeholder="Ismingiz" @blur="saveName" />
              <button type="submit" class="icon-btn"><i class="ti ti-check"></i></button>
            </form>

            <p class="profile-email">{{ userStore.profile?.email }}</p>

            <div class="identity-chips">
              <span class="identity-chip"><i class="ti ti-star"></i> {{ levelTitle }}</span>
              <span class="identity-chip"><i class="ti ti-bolt"></i> {{ userStore.profile?.xp || 0 }} XP</span>
              <span class="identity-chip"><i class="ti ti-flame"></i> {{ userStore.streakCount }} kun streak</span>
            </div>
          </div>

          <div class="hero-actions">
            <router-link to="/progress" class="primary-action">
              <i class="ti ti-chart-line"></i> Progress
            </router-link>
            <router-link to="/people" class="secondary-action">
              <i class="ti ti-users"></i> Odamlar
            </router-link>
          </div>
        </div>

        <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>

        <div v-if="!userStore.profile?.photoURL" class="avatar-picker">
          <div class="picker-label"><span>Avatar</span><small>O'zingizga mosini tanlang</small></div>
          <div class="emoji-row">
            <button
              v-for="emoji in AVATAR_OPTIONS"
              :key="emoji"
              type="button"
              class="emoji-btn"
              :class="{ active: emoji === userStore.profile?.avatar }"
              @click="selectEmoji(emoji)"
            >{{ emoji }}</button>
          </div>
        </div>
      </section>

      <section class="overview-grid">
        <article class="glass overview-card overview-main reveal">
          <div class="section-head">
            <div>
              <span class="section-kicker">YOUR SNAPSHOT</span>
              <h2>Bugungi holatingiz</h2>
            </div>
            <router-link to="/dashboard" class="text-link">Dashboard <i class="ti ti-arrow-up-right"></i></router-link>
          </div>

          <div class="level-progress-card">
            <div class="level-copy">
              <span class="mini-label">Hozirgi level</span>
              <strong>Level {{ userStore.level }}</strong>
              <span>{{ userStore.currentLevelWords.length }} ta so'zlik bosqich</span>
            </div>
            <div class="ring" :style="{ '--progress': userStore.levelProgressPercent }">
              <div class="ring-inner">{{ userStore.levelProgressPercent }}%</div>
            </div>
          </div>

          <div class="daily-progress">
            <div class="daily-row">
              <span>Kunlik maqsad</span>
              <strong>{{ userStore.dailyXpToday }} / {{ userStore.profile?.dailyGoal || 20 }} XP</strong>
            </div>
            <div class="progress-track"><span :style="{ width: userStore.dailyGoalPercent + '%' }"></span></div>
          </div>
        </article>

        <article class="glass overview-card reveal">
          <div class="section-head compact">
            <div>
              <span class="section-kicker">COMMUNITY</span>
              <h2>Ijtimoiy profil</h2>
            </div>
          </div>
          <div class="social-stats">
            <router-link to="/people" class="social-stat">
              <strong>{{ userStore.followersCount }}</strong>
              <span>Follower</span>
            </router-link>
            <router-link to="/people" class="social-stat">
              <strong>{{ userStore.followingCount }}</strong>
              <span>Following</span>
            </router-link>
            <div class="social-stat">
              <strong>{{ userStore.profile?.referralCount || 0 }}</strong>
              <span>Takliflar</span>
            </div>
          </div>
          <div class="social-note">
            <i class="ti ti-users-group"></i>
            <span>Odamlar sahifasidan boshqa o'quvchilarning profilini ko'rib, kuzatishingiz mumkin.</span>
          </div>
        </article>
      </section>

      <section class="stats-grid">
        <article class="glass stat-tile reveal"><div class="stat-icon"><i class="ti ti-bolt"></i></div><span class="stat-val">{{ userStore.profile?.xp || 0 }}</span><span class="stat-label">Jami XP</span><small>Umumiy natija</small></article>
        <article class="glass stat-tile reveal"><div class="stat-icon"><i class="ti ti-flame"></i></div><span class="stat-val">{{ userStore.streakCount }}</span><span class="stat-label">Streak</span><small>Ketma-ket kunlar</small></article>
        <article class="glass stat-tile reveal"><div class="stat-icon"><i class="ti ti-books"></i></div><span class="stat-val">{{ userStore.profile?.completedWords?.length || 0 }}</span><span class="stat-label">So'zlar</span><small>O'rganilgan</small></article>
        <article class="glass stat-tile reveal"><div class="stat-icon"><i class="ti ti-brain"></i></div><span class="stat-val">{{ userStore.masteredWordsCount }}</span><span class="stat-label">Mastered</span><small>Mustahkamlangan</small></article>
      </section>

      <section class="two-col-grid">
        <article class="glass panel-card reveal">
          <div class="section-head">
            <div>
              <span class="section-kicker">SKILLS</span>
              <h2>Ko'nikmalar</h2>
            </div>
            <router-link to="/analytics" class="text-link">Batafsil</router-link>
          </div>
          <div class="skills-list">
            <div v-for="(pct, skillId) in userStore.analytics.skillPercents" :key="skillId" class="skill-row">
              <div class="skill-meta"><span>{{ skillLabelMap[skillId] || skillId }}</span><strong>{{ pct }}%</strong></div>
              <div class="progress-track"><span :style="{ width: pct + '%' }"></span></div>
            </div>
          </div>
          <div v-if="userStore.analytics.weakWords.length" class="weak-box">
            <span>Qayta ko'rib chiqish kerak</span>
            <div><span v-for="w in userStore.analytics.weakWords" :key="w.word" class="weak-chip">{{ w.word }}</span></div>
          </div>
          <div v-else class="empty-note"><i class="ti ti-sparkles"></i> Mashq ko'paygani sari bu yerda kuchli va zaif ko'nikmalar aniqroq ko'rinadi.</div>
        </article>

        <article class="glass panel-card reveal">
          <div class="section-head">
            <div>
              <span class="section-kicker">ACHIEVEMENTS</span>
              <h2>Yutuqlar</h2>
            </div>
            <strong class="achievement-count">{{ unlockedCount }}/{{ userStore.achievements.length }}</strong>
          </div>
          <div class="achievements-grid">
            <div v-for="a in userStore.achievements" :key="a.id" class="achievement-tile" :class="{ locked: !a.unlocked }" :title="a.desc">
              <div class="achievement-icon"><i :class="'ti ' + a.icon"></i></div>
              <span>{{ a.label }}</span>
            </div>
          </div>
        </article>
      </section>

      <section class="glass settings-card reveal">
        <div class="section-head">
          <div>
            <span class="section-kicker">PREFERENCES</span>
            <h2>Profil va ilova sozlamalari</h2>
          </div>
        </div>
        <div class="settings-list">
          <div class="setting-row">
            <div class="setting-icon"><i class="ti ti-bell"></i></div>
            <div class="setting-copy"><strong>Kunlik eslatmalar</strong><span>Mashq qilish vaqti kelganda brauzer orqali eslatma oling.</span></div>
            <button class="reminders-toggle" :class="{ on: remindersOn }" role="switch" :aria-checked="remindersOn" @click="handleToggleReminders"><span></span></button>
          </div>
          <p v-if="notifBlocked" class="reminders-hint">Bildirishnomalar bloklangan. Brauzer sozlamalaridan ruxsat bering.</p>
          <div class="setting-row">
            <div class="setting-icon"><i class="ti ti-gift"></i></div>
            <div class="setting-copy"><strong>Do'st taklif qilish</strong><span>Shaxsiy havolangizni yuboring va bonus XP yig'ing.</span></div>
            <button class="secondary-action" @click="copyReferralLink"><i :class="copied ? 'ti ti-check' : 'ti ti-copy'"></i>{{ copied ? 'Nusxalandi' : 'Nusxalash' }}</button>
          </div>
        </div>
      </section>

      <div class="profile-footer-actions">
        <router-link to="/dashboard" class="secondary-action"><i class="ti ti-arrow-left"></i> Dashboardga qaytish</router-link>
        <button class="logout-action" @click="handleLogout"><i class="ti ti-logout"></i> Chiqish</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, AVATAR_OPTIONS } from '../stores/userStore.js'
import ProBadge from '../components/ProBadge.vue'
import { getLevelTitle } from '../data/vocabulary.js'
import { useImageUpload } from '../composables/useImageUpload.js'
import { isNotificationSupported, notificationPermission, requestNotificationPermission, initReminders, stopReminders } from '../composables/useReminders.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const router = useRouter()
const userStore = useUserStore()
const { refresh } = useScrollReveal()
refresh()

const unlockedCount = computed(() => userStore.achievements.filter((a) => a.unlocked).length)
const levelTitle = computed(() => getLevelTitle(userStore.level))
const { uploading, uploadProgress, uploadError, uploadProfilePhoto } = useImageUpload()
const fileInputEl = ref(null)
const editingName = ref(false)
const nameInput = ref('')
const copied = ref(false)
const remindersOn = computed(() => userStore.remindersEnabled && notificationPermission() === 'granted')
const notifBlocked = computed(() => isNotificationSupported() && notificationPermission() === 'denied')

const skillLabelMap = {
  vocabulary: "So'zlar",
  grammar: 'Grammatika',
  listening: 'Tinglash',
  speaking: 'Gapirish',
  writing: 'Yozish',
  aiTeacher: 'AI Teacher'
}

function copyReferralLink() {
  const uid = userStore.user?.uid
  if (!uid) return
  const link = `${window.location.origin}/login?ref=${uid}`
  navigator.clipboard?.writeText(link).then(() => {
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 2000)
  })
}

async function handlePhotoChange(e) {
  const file = e.target.files?.[0]
  if (!file || !userStore.user) return
  const url = await uploadProfilePhoto(userStore.user.uid, file)
  if (url) await userStore.updatePhotoURL(url)
  e.target.value = ''
}

function startEditName() {
  nameInput.value = userStore.profile?.displayName || ''
  editingName.value = true
}

async function saveName() {
  if (!editingName.value) return
  editingName.value = false
  const trimmed = nameInput.value.trim()
  if (trimmed && trimmed !== userStore.profile?.displayName) await userStore.updateDisplayName(trimmed)
}

async function selectEmoji(emoji) {
  await userStore.updateAvatar(emoji)
}

async function handleToggleReminders() {
  if (remindersOn.value) {
    await userStore.setRemindersEnabled(false)
    stopReminders()
    return
  }
  if (!isNotificationSupported()) return
  const permission = await requestNotificationPermission()
  if (permission !== 'granted') return
  await userStore.setRemindersEnabled(true)
  initReminders(() => ({ dailyGoalReached: userStore.dailyGoalReached }))
}

async function handleLogout() {
  await userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-content { padding: 30px 24px 90px; max-width: 1080px; }
.profile-hero { overflow: hidden; padding: 0; margin-bottom: 20px; position: relative; }
.hero-cover { height: 140px; position: relative; overflow: hidden; background: linear-gradient(120deg, rgba(60,230,125,.16), rgba(111,124,255,.10), transparent 80%); border-bottom: 1px solid var(--border-glass); }
.hero-orb { position:absolute; border-radius:999px; filter: blur(4px); opacity:.6; }
.hero-orb-one { width: 260px; height:260px; background: rgba(60,230,125,.22); top:-170px; left:12%; }
.hero-orb-two { width: 220px; height:220px; background: rgba(111,124,255,.16); right:5%; top:-130px; }
.hero-main { display:grid; grid-template-columns:auto 1fr auto; gap:22px; align-items:center; padding: 0 34px 28px; margin-top:-42px; position:relative; }
.avatar-wrap { position:relative; width:104px; z-index:2; }
.avatar-circle { width:104px; height:104px; border-radius:32px; background:var(--accent-soft); border:4px solid var(--bg-void); box-shadow:0 18px 40px rgba(0,0,0,.12); display:grid; place-items:center; overflow:hidden; font-size:44px; }
.avatar-circle img { width:100%; height:100%; object-fit:cover; }
.avatar-edit-badge { position:absolute; right:-6px; bottom:-6px; width:34px; height:34px; border-radius:12px; background:var(--accent); color:#07140b; display:grid; place-items:center; border:3px solid var(--bg-void); cursor:pointer; box-shadow:0 10px 22px rgba(60,230,125,.25); }
.upload-progress { font-size:8px; font-weight:900; }
.hero-identity { min-width:0; padding-top:40px; }
.eyebrow,.section-kicker { text-transform:uppercase; letter-spacing:.12em; font-weight:900; font-size:10px; color:var(--accent); }
.live-dot { width:7px; height:7px; border-radius:999px; background:var(--accent); box-shadow:0 0 0 5px rgba(60,230,125,.12); display:inline-block; margin-right:7px; }
.name-row { display:flex; align-items:center; gap:10px; }
.name-row h1 { margin:5px 0 4px; font-size:clamp(28px,4vw,42px); line-height:1; letter-spacing:-.04em; }
.icon-btn { width:38px; height:38px; border:1px solid var(--border-glass); border-radius:12px; background:var(--surface-glass); color:var(--text-secondary); cursor:pointer; display:grid; place-items:center; }
.icon-btn:hover { background:var(--accent-soft); color:var(--accent); }
.profile-email { color:var(--text-muted); margin:0; font-size:13px; }
.identity-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
.identity-chip { display:inline-flex; align-items:center; gap:7px; padding:8px 11px; background:var(--surface-glass); border:1px solid var(--border-glass); border-radius:999px; font-size:12px; font-weight:800; }
.identity-chip i { color:var(--accent); }
.hero-actions { display:flex; gap:10px; padding-top:40px; }
.primary-action,.secondary-action,.logout-action { display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:42px; padding:0 14px; border-radius:13px; font-weight:800; font-size:12px; text-decoration:none; cursor:pointer; border:1px solid transparent; }
.primary-action { background:var(--accent); color:#0a1710; box-shadow:0 14px 30px rgba(60,230,125,.18); }
.secondary-action { background:var(--surface-glass); color:var(--text-secondary); border-color:var(--border-glass); }
.primary-action:hover,.secondary-action:hover,.logout-action:hover { transform:translateY(-1px); }
.avatar-picker { padding:0 34px 28px; border-top:1px solid var(--border-glass); padding-top:18px; }
.picker-label { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.picker-label span { font-weight:800; }
.picker-label small { color:var(--text-muted); }
.emoji-row { display:flex; gap:8px; flex-wrap:wrap; }
.emoji-btn { width:40px; height:40px; border-radius:12px; border:1px solid var(--border-glass); background:var(--surface-glass); font-size:20px; cursor:pointer; transition:.2s ease; }
.emoji-btn:hover,.emoji-btn.active { border-color:var(--accent); background:var(--accent-soft); transform:translateY(-2px); }
.upload-error { margin:0 34px 20px; color:#e5484d; font-size:12px; }
.name-form { display:flex; align-items:center; gap:8px; }
.name-form input { width:min(320px,100%); height:42px; padding:0 13px; border:1px solid var(--border-glass); border-radius:13px; background:var(--surface-glass); color:var(--text-primary); outline:none; font:inherit; }
.overview-grid { display:grid; grid-template-columns:1.4fr .8fr; gap:20px; margin-bottom:20px; }
.overview-card,.panel-card,.settings-card { padding:24px; }
.section-head { display:flex; justify-content:space-between; gap:18px; align-items:flex-start; margin-bottom:20px; }
.section-head.compact { margin-bottom:18px; }
.section-head h2 { margin:5px 0 0; font-size:21px; letter-spacing:-.03em; }
.text-link { color:var(--accent); font-size:12px; font-weight:800; text-decoration:none; display:inline-flex; gap:6px; align-items:center; }
.level-progress-card { display:flex; justify-content:space-between; align-items:center; gap:20px; padding:18px; border-radius:20px; background:linear-gradient(135deg,var(--accent-soft),var(--surface-glass)); border:1px solid var(--border-glass); }
.level-copy { display:flex; flex-direction:column; gap:4px; }
.mini-label { color:var(--text-muted); font-size:11px; text-transform:uppercase; letter-spacing:.1em; font-weight:800; }
.level-copy strong { font-size:27px; }
.level-copy span:last-child { color:var(--text-muted); font-size:12px; }
.ring { --size:76px; width:var(--size); height:var(--size); border-radius:50%; display:grid; place-items:center; background:conic-gradient(var(--accent) calc(var(--progress) * 1%), var(--border-glass) 0); position:relative; flex-shrink:0; }
.ring::before { content:''; position:absolute; inset:7px; background:var(--card-bg, var(--bg-void)); border-radius:50%; }
.ring-inner { position:relative; z-index:1; font-size:14px; font-weight:900; }
.daily-progress { margin-top:18px; }
.daily-row { display:flex; justify-content:space-between; gap:10px; font-size:12px; margin-bottom:8px; color:var(--text-secondary); }
.daily-row strong { color:var(--text-primary); }
.progress-track { height:8px; background:var(--surface-glass); border:1px solid var(--border-glass); border-radius:999px; overflow:hidden; }
.progress-track span { height:100%; display:block; background:linear-gradient(90deg,var(--accent),#9cea45); border-radius:inherit; }
.social-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.social-stat { text-decoration:none; color:inherit; padding:15px 10px; border-radius:16px; background:var(--surface-glass); border:1px solid var(--border-glass); display:flex; flex-direction:column; gap:3px; text-align:center; }
.social-stat strong { font-size:22px; }
.social-stat span { color:var(--text-muted); font-size:11px; }
.social-stat:hover { border-color:rgba(60,230,125,.4); }
.social-note,.empty-note { display:flex; gap:10px; align-items:flex-start; color:var(--text-muted); font-size:11px; line-height:1.5; margin-top:14px; }
.social-note i,.empty-note i { color:var(--accent); margin-top:2px; }
.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
.stat-tile { padding:19px; display:grid; grid-template-columns:auto 1fr; grid-template-rows:auto auto auto; column-gap:12px; align-items:center; }
.stat-icon { width:34px; height:34px; border-radius:11px; background:var(--accent-soft); color:var(--accent); display:grid; place-items:center; grid-row:1 / span 3; }
.stat-val { font-size:24px; font-weight:900; line-height:1; }
.stat-label { color:var(--text-secondary); font-size:11px; margin-top:5px; }
.stat-tile small { color:var(--text-muted); font-size:10px; margin-top:3px; }
.two-col-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
.skills-list { display:flex; flex-direction:column; gap:14px; }
.skill-row { display:flex; flex-direction:column; gap:6px; }
.skill-meta { display:flex; justify-content:space-between; font-size:12px; }
.skill-meta span { color:var(--text-secondary); }
.skill-meta strong { font-size:11px; }
.weak-box { margin-top:18px; padding:13px; border-radius:16px; background:rgba(232,152,58,.08); border:1px solid rgba(232,152,58,.18); }
.weak-box > span { display:block; color:var(--text-muted); font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; }
.weak-chip { display:inline-flex; padding:6px 9px; border-radius:999px; background:rgba(232,152,58,.12); color:#b9791f; font-size:11px; margin:3px; }
.achievement-count { color:var(--accent); font-size:12px; padding-top:5px; }
.achievements-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
.achievement-tile { min-height:92px; border:1px solid var(--border-glass); background:var(--surface-glass); border-radius:16px; padding:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7px; text-align:center; }
.achievement-tile.locked { opacity:.34; filter:grayscale(.8); }
.achievement-icon { width:34px; height:34px; border-radius:11px; background:var(--accent-soft); color:var(--accent); display:grid; place-items:center; }
.achievement-tile span { font-size:10px; font-weight:800; line-height:1.2; }
.settings-card { margin-bottom:20px; }
.settings-list { display:flex; flex-direction:column; gap:2px; }
.setting-row { display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:14px; padding:14px 0; border-top:1px solid var(--border-glass); }
.setting-row:first-child { border-top:0; }
.setting-icon { width:40px; height:40px; border-radius:13px; background:var(--accent-soft); color:var(--accent); display:grid; place-items:center; }
.setting-copy { display:flex; flex-direction:column; gap:4px; }
.setting-copy strong { font-size:13px; }
.setting-copy span { color:var(--text-muted); font-size:11px; line-height:1.4; }
.reminders-toggle { width:52px; height:30px; border:0; border-radius:999px; padding:3px; background:var(--surface-glass); border:1px solid var(--border-glass); cursor:pointer; }
.reminders-toggle span { display:block; width:22px; height:22px; border-radius:50%; background:var(--text-muted); transition:.2s ease; }
.reminders-toggle.on { background:var(--accent-soft); border-color:rgba(60,230,125,.35); }
.reminders-toggle.on span { transform:translateX(22px); background:var(--accent); }
.reminders-hint { color:#b9791f; font-size:11px; margin:0 0 0 54px; }
.profile-footer-actions { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.logout-action { background:transparent; color:#e5484d; border-color:rgba(229,72,77,.2); }
@media (max-width: 860px) {
  .hero-main { grid-template-columns:auto 1fr; }
  .hero-actions { grid-column:2; padding-top:0; }
  .overview-grid,.two-col-grid { grid-template-columns:1fr; }
  .stats-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width: 600px) {
  .profile-content { padding:18px 14px 88px; }
  .hero-cover { height:116px; }
  .hero-main { grid-template-columns:1fr; text-align:center; justify-items:center; margin-top:-50px; padding:0 18px 22px; }
  .avatar-wrap { margin-bottom:0; }
  .hero-identity { padding-top:0; width:100%; }
  .name-row { justify-content:center; }
  .identity-chips { justify-content:center; }
  .hero-actions { grid-column:auto; width:100%; justify-content:center; }
  .primary-action,.secondary-action { flex:1; }
  .avatar-picker { padding-left:18px; padding-right:18px; }
  .picker-label { align-items:flex-start; flex-direction:column; gap:3px; }
  .stats-grid { grid-template-columns:1fr 1fr; gap:10px; }
  .stat-tile { padding:14px; }
  .stat-val { font-size:21px; }
  .achievements-grid { grid-template-columns:repeat(3,1fr); }
  .setting-row { grid-template-columns:auto 1fr; }
  .setting-row > :last-child { grid-column:2; justify-self:start; }
  .reminders-hint { margin-left:0; }
  .profile-footer-actions { flex-direction:column; align-items:stretch; }
}
</style>
