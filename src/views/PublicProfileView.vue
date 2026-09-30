<template>
  <div class="public-page">
    <AuroraBackground />
    <AppNav />

    <main class="container public-content">
      <div class="topbar">
        <button class="back-btn" @click="router.back()"><i class="ti ti-arrow-left"></i> Orqaga</button>
      </div>

      <div v-if="loading" class="glass state-card"><i class="ti ti-loader-2 spinning"></i><span>Profil yuklanmoqda...</span></div>
      <div v-else-if="errorMsg" class="glass state-card error"><i class="ti ti-alert-triangle"></i><span>{{ errorMsg }}</span></div>

      <template v-else-if="profile">
        <section class="glass public-hero" v-pop-in>
          <div class="public-cover"><div></div><div></div></div>
          <div class="public-main">
            <div class="public-avatar">
              <img v-if="profile.photoURL" :src="profile.photoURL" alt="Profil rasmi" />
              <span v-else>{{ profile.avatar || '🦁' }}</span>
            </div>
            <div class="public-identity">
              <div class="name-line">
                <h1>{{ profile.displayName || 'Foydalanuvchi' }}</h1>
                <span v-if="profile.isPro" class="pro-pill"><i class="ti ti-crown"></i> PRO</span>
              </div>
              <p>EnglishXP o'quvchisi · Level {{ profile.level || 1 }} · {{ levelTitle }}</p>
              <div class="public-chips">
                <span><i class="ti ti-bolt"></i>{{ profile.xp || 0 }} XP</span>
                <span><i class="ti ti-flame"></i>{{ profile.streak || 0 }} streak</span>
                <span><i class="ti ti-books"></i>{{ wordsCount }} so'z</span>
              </div>
            </div>
            <div v-if="isSelf" class="self-action">
              <router-link to="/profile" class="primary-action"><i class="ti ti-user"></i> Mening profilim</router-link>
            </div>
            <div v-else class="self-action action-stack">
              <button class="primary-action" :class="{ following: following }" @click="toggleFollow">
                <i :class="following ? 'ti ti-user-check' : 'ti ti-user-plus'"></i>
                {{ following ? 'Kuzatilmoqda' : 'Kuzatish' }}
              </button>
              <router-link :to="`/chat/${route.params.uid}`" class="secondary-action"><i class="ti ti-message-circle"></i> Xabar</router-link>
            </div>
          </div>
        </section>

        <section class="stats-grid">
          <article class="glass stat-card"><span>XP</span><strong>{{ profile.xp || 0 }}</strong><small>Jami natija</small></article>
          <article class="glass stat-card"><span>Streak</span><strong>{{ profile.streak || 0 }}</strong><small>Ketma-ket kun</small></article>
          <article class="glass stat-card"><span>Follower</span><strong>{{ (profile.followers || []).length }}</strong><small>Kuzatuvchilar</small></article>
          <article class="glass stat-card"><span>Following</span><strong>{{ (profile.following || []).length }}</strong><small>Kuzatilganlar</small></article>
        </section>

        <section class="two-col">
          <article class="glass panel-card">
            <div class="section-head"><div><span>PROGRESS</span><h2>O'quv yo'li</h2></div><div class="level-badge">Level {{ profile.level || 1 }}</div></div>
            <div class="progress-row">
              <div><strong>{{ levelTitle }}</strong><p>{{ completedWords }} ta word track qilingan</p></div>
              <div class="level-ring" :style="{ '--p': levelProgress + '%' }"><b>{{ levelProgress }}%</b></div>
            </div>
            <div class="bar"><span :style="{ width: levelProgress + '%' }"></span></div>
          </article>

          <article class="glass panel-card">
            <div class="section-head"><div><span>ACHIEVEMENTS</span><h2>Yutuqlar</h2></div><strong class="count">{{ unlockedAchievements.length }}/{{ achievements.length }}</strong></div>
            <div class="achievement-mini-grid">
              <div v-for="a in achievements" :key="a.id" class="achievement-mini" :class="{ locked: !a.unlocked }" :title="a.desc">
                <i :class="'ti ' + a.icon"></i><span>{{ a.label }}</span>
              </div>
            </div>
          </article>
        </section>

        <section class="glass public-note">
          <div class="note-icon"><i class="ti ti-shield-check"></i></div>
          <div><strong>EnglishXP profil</strong><p>Bu sahifada faqat o'quvchining o'qish uchun mo'ljallangan umumiy statistikasi ko'rsatiladi. Email kabi shaxsiy ma'lumotlar bu yerda chiqmaydi.</p></div>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import { ACHIEVEMENTS } from '../data/achievements.js'
import { getLevelTitle, getWordsForLevel } from '../data/vocabulary.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const profile = ref(null)
const loading = ref(true)
const errorMsg = ref('')

const isSelf = computed(() => route.params.uid === userStore.user?.uid)
const following = computed(() => userStore.isFollowing(route.params.uid))
const wordsCount = computed(() => profile.value?.completedWords?.length || 0)
const completedWords = computed(() => wordsCount.value)
const levelTitle = computed(() => getLevelTitle(profile.value?.level || 1))
const achievements = computed(() => ACHIEVEMENTS.map((a) => ({ ...a, unlocked: a.check(profile.value || {}) })))
const unlockedAchievements = computed(() => achievements.value.filter((a) => a.unlocked))
const levelProgress = computed(() => {
  const level = profile.value?.level || 1
  const words = getWordsForLevel(level)
  const done = (profile.value?.completedWords || []).filter((key) => key.startsWith(`${level}:`)).length
  return words.length ? Math.min(100, Math.round((done / words.length) * 100)) : 0
})

async function loadProfile() {
  loading.value = true
  errorMsg.value = ''
  try {
    if (!route.params.uid) throw new Error('Profil topilmadi.')
    const data = await userStore.fetchUserProfile(route.params.uid)
    if (!data) throw new Error('Bu foydalanuvchi mavjud emas.')
    profile.value = data
    await userStore.refreshProfile()
  } catch (e) {
    console.error('Public profile load failed:', e)
    errorMsg.value = e?.message || 'Profilni yuklashda xatolik yuz berdi.'
  } finally {
    loading.value = false
  }
}

async function toggleFollow() {
  if (!route.params.uid || isSelf.value) return
  try {
    if (following.value) await userStore.unfollowUser(route.params.uid)
    else await userStore.followUser(route.params.uid)
  } catch (e) {
    errorMsg.value = e?.message || 'Kuzatishni o\'zgartirib bo\'lmadi.'
  }
}

onMounted(loadProfile)
watch(() => route.params.uid, loadProfile)
</script>

<style scoped>
.public-content { max-width:980px; padding:24px 24px 90px; }
.topbar { margin-bottom:14px; }
.back-btn { border:0; background:none; color:var(--text-secondary); font-weight:800; font-size:12px; cursor:pointer; display:inline-flex; align-items:center; gap:7px; padding:8px 0; }
.back-btn:hover { color:var(--accent); }
.state-card { min-height:220px; display:grid; place-items:center; align-content:center; gap:10px; color:var(--text-muted); font-size:13px; }
.state-card.error { color:#e5484d; }
.spinning { animation:spin 1s linear infinite; font-size:24px; }
@keyframes spin { to{ transform:rotate(360deg) } }
.public-hero { overflow:hidden; padding:0; margin-bottom:18px; }
.public-cover { height:145px; position:relative; overflow:hidden; background:linear-gradient(120deg,rgba(60,230,125,.17),rgba(111,124,255,.12),transparent); border-bottom:1px solid var(--border-glass); }
.public-cover div:first-child { position:absolute; width:310px; height:310px; border-radius:50%; background:rgba(60,230,125,.16); top:-190px; left:12%; filter:blur(8px); }
.public-cover div:last-child { position:absolute; width:230px; height:230px; border-radius:50%; background:rgba(111,124,255,.14); top:-110px; right:6%; filter:blur(10px); }
.public-main { display:grid; grid-template-columns:auto 1fr auto; gap:22px; align-items:center; margin-top:-46px; position:relative; padding:0 30px 28px; }
.public-avatar { width:96px; height:96px; border:4px solid var(--bg-void); border-radius:28px; background:var(--accent-soft); box-shadow:0 18px 42px rgba(0,0,0,.14); display:grid; place-items:center; overflow:hidden; font-size:40px; }
.public-avatar img { width:100%; height:100%; object-fit:cover; }
.public-identity { padding-top:44px; min-width:0; }
.name-line { display:flex; align-items:center; gap:9px; flex-wrap:wrap; }
.name-line h1 { margin:0; font-size:clamp(28px,5vw,40px); letter-spacing:-.04em; }
.pro-pill { display:inline-flex; align-items:center; gap:5px; background:rgba(232,152,58,.12); color:#b9791f; border:1px solid rgba(232,152,58,.18); border-radius:999px; padding:6px 9px; font-size:10px; font-weight:900; }
.public-identity p { margin:6px 0 12px; color:var(--text-muted); font-size:12px; }
.public-chips { display:flex; flex-wrap:wrap; gap:7px; }
.public-chips span { display:inline-flex; align-items:center; gap:6px; padding:7px 10px; border-radius:999px; background:var(--surface-glass); border:1px solid var(--border-glass); font-size:10px; font-weight:800; }
.public-chips i { color:var(--accent); }
.self-action { padding-top:44px; display:flex; flex-direction:column; gap:8px; }
.action-stack { min-width:135px; }
.primary-action,.secondary-action { display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:42px; padding:0 13px; border-radius:13px; text-decoration:none; border:1px solid var(--border-glass); font-size:11px; font-weight:900; cursor:pointer; }
.primary-action { border-color:transparent; background:var(--accent); color:#07140b; }
.primary-action.following { background:var(--surface-glass); color:var(--accent); border-color:rgba(60,230,125,.3); }
.secondary-action { background:var(--surface-glass); color:var(--text-secondary); }
.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:18px; }
.stat-card { padding:18px; display:flex; flex-direction:column; gap:4px; }
.stat-card span { color:var(--text-muted); font-size:10px; text-transform:uppercase; letter-spacing:.08em; font-weight:800; }
.stat-card strong { font-size:28px; line-height:1; margin-top:2px; }
.stat-card small { color:var(--text-muted); font-size:10px; }
.two-col { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px; }
.panel-card { padding:22px; }
.section-head { display:flex; justify-content:space-between; gap:10px; align-items:flex-start; margin-bottom:18px; }
.section-head span { font-size:10px; text-transform:uppercase; letter-spacing:.11em; font-weight:900; color:var(--accent); }
.section-head h2 { margin:4px 0 0; font-size:20px; letter-spacing:-.03em; }
.level-badge,.count { color:var(--accent); font-size:11px; font-weight:900; }
.progress-row { display:flex; justify-content:space-between; align-items:center; gap:16px; }
.progress-row strong { font-size:22px; }
.progress-row p { color:var(--text-muted); margin:4px 0 0; font-size:11px; }
.level-ring { width:68px; height:68px; border-radius:50%; display:grid; place-items:center; background:conic-gradient(var(--accent) var(--p),var(--border-glass) 0); position:relative; flex-shrink:0; }
.level-ring::before { content:''; position:absolute; inset:6px; background:var(--card-bg,var(--bg-void)); border-radius:50%; }
.level-ring b { position:relative; z-index:1; font-size:12px; }
.bar { margin-top:17px; height:8px; background:var(--surface-glass); border:1px solid var(--border-glass); border-radius:999px; overflow:hidden; }
.bar span { height:100%; display:block; border-radius:inherit; background:linear-gradient(90deg,var(--accent),#a5ec46); }
.achievement-mini-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
.achievement-mini { min-height:72px; border-radius:14px; border:1px solid var(--border-glass); background:var(--surface-glass); display:grid; place-items:center; gap:5px; padding:7px; text-align:center; }
.achievement-mini i { width:28px; height:28px; display:grid; place-items:center; border-radius:9px; background:var(--accent-soft); color:var(--accent); }
.achievement-mini span { font-size:9px; font-weight:800; line-height:1.1; }
.achievement-mini.locked { opacity:.28; filter:grayscale(1); }
.public-note { display:flex; gap:13px; align-items:flex-start; padding:16px 18px; }
.note-icon { width:38px; height:38px; border-radius:12px; background:var(--accent-soft); color:var(--accent); display:grid; place-items:center; flex-shrink:0; }
.public-note strong { font-size:12px; }
.public-note p { color:var(--text-muted); font-size:11px; line-height:1.5; margin:3px 0 0; }
@media (max-width: 820px) { .public-main { grid-template-columns:auto 1fr; } .self-action { grid-column:2; padding-top:0; flex-direction:row; } .stats-grid { grid-template-columns:repeat(2,1fr); } .two-col { grid-template-columns:1fr; } }
@media (max-width: 560px) { .public-content{padding:16px 14px 88px}.public-cover{height:115px}.public-main{grid-template-columns:1fr;justify-items:center;text-align:center;margin-top:-48px;padding:0 18px 22px}.public-identity{padding-top:0}.name-line{justify-content:center}.public-chips{justify-content:center}.self-action{grid-column:auto;width:100%;padding-top:0;display:grid;grid-template-columns:1fr 1fr}.stats-grid{gap:9px}.stat-card{padding:14px}.achievement-mini-grid{grid-template-columns:repeat(3,1fr)} }
</style>
