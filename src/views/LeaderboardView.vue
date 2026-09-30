<template>
  <div class="leaderboard-page">
    <AuroraBackground />
    <AppNav />

    <div class="container lb-content">
      <h1 class="lb-title reveal">
        <i class="ti ti-trophy" aria-hidden="true" style="color: var(--accent);"></i>
        Reyting jadvali
      </h1>
      <p class="lb-subtitle reveal">Eng ko'p XP yig'gan o'quvchilar</p>

      <div class="lb-tabs reveal">
        <button class="lb-tab" :class="{ 'lb-tab-active': tab === 'weekly' }" @click="switchTab('weekly')">
          <i class="ti ti-swords" aria-hidden="true"></i> Haftalik Liga
        </button>
        <button class="lb-tab" :class="{ 'lb-tab-active': tab === 'alltime' }" @click="switchTab('alltime')">
          <i class="ti ti-infinity" aria-hidden="true"></i> Umumiy
        </button>
      </div>

      <div v-if="leagueResultBanner" class="glass reveal league-result-banner" :class="leagueResultBanner.type">
        <span class="league-result-emoji">{{ leagueResultBanner.type === 'promoted' ? '🎉' : '📉' }}</span>
        <span>{{ leagueResultBanner.text }}</span>
        <button class="league-result-close" @click="dismissLeagueResult" aria-label="Yopish">
          <i class="ti ti-x" aria-hidden="true"></i>
        </button>
      </div>

      <div v-if="tab === 'weekly' && !loading" class="league-hint reveal">
        <span v-if="myLeague" class="league-badge">{{ myLeague.emoji }} {{ myLeague.name }} ligasi</span>
        Har hafta yakunida top {{ promotionZone }} yuqoriga, oxirgi {{ demotionZone }} pastga tushadi.
      </div>

      <div v-if="loading" class="lb-loading">Yuklanmoqda...</div>

      <div v-else class="lb-list">
        <div
          v-for="(player, idx) in leaderboard"
          :key="player.id"
          class="glass lb-row reveal"
          :class="{
            'lb-row-me': player.id === userStore.user?.uid,
            'lb-row-promotion': tab === 'weekly' && idx < promotionZone,
            'lb-row-demotion': tab === 'weekly' && leaderboard.length > promotionZone && idx >= leaderboard.length - demotionZone
          }"
        >
          <div class="lb-rank" :class="rankClass(idx)">
            <i v-if="idx === 0" class="ti ti-crown" aria-hidden="true"></i>
            <span v-else>{{ idx + 1 }}</span>
          </div>
          <router-link :to="`/user/${player.id}`" class="lb-profile-link" title="Profilni ko'rish">
            <div class="lb-avatar">
              <img v-if="player.photoURL" :src="player.photoURL" alt="" />
              <span v-else>{{ player.avatar || initials(player.displayName) }}</span>
            </div>
            <div class="lb-info">
              <span class="lb-name-row">
                <span class="lb-name">{{ player.displayName }}</span>
                <ProBadge v-if="player.isPro" size="sm" />
              </span>
            <span class="lb-level" v-if="tab === 'alltime'">Daraja {{ player.level || 1 }}</span>
            <span class="lb-level" v-else-if="tab === 'weekly' && idx < promotionZone" style="color: var(--accent);">Ko'tarilish zonasi ↑</span>
            <span class="lb-level" v-else-if="tab === 'weekly' && leaderboard.length > promotionZone && idx >= leaderboard.length - demotionZone" style="color: #e5484d;">Tushish zonasi ↓</span>
              <span class="lb-level" v-else-if="tab === 'weekly'">{{ myLeague?.emoji }} {{ myLeague?.name }}</span>
            </div>
          </router-link>
          <div class="lb-xp-wrap">
            <span class="lb-xp" style="color: var(--accent);">{{ tab === 'alltime' ? (player.xp || 0) : (player.weeklyXp || 0) }}</span>
            <span class="lb-xp-label">XP</span>
          </div>
        </div>

        <p v-if="leaderboard.length === 0" class="lb-empty">
          Hali hech kim reytingda yo'q. Birinchi bo'lib XP yig'ing!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore, LEAGUE_TIERS, LEAGUE_PROMOTION_ZONE, LEAGUE_DEMOTION_ZONE } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import ProBadge from '../components/ProBadge.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const leaderboard = ref([])
const loading = ref(true)
const tab = ref('weekly')
const promotionZone = LEAGUE_PROMOTION_ZONE
const demotionZone = LEAGUE_DEMOTION_ZONE

const myLeague = computed(() => LEAGUE_TIERS[userStore.leagueIndex])

const leagueResultBanner = computed(() => {
  const result = userStore.profile?.lastLeagueResult
  if (!result) return null
  const tier = myLeague.value
  return {
    type: result,
    text: result === 'promoted'
      ? `Tabriklaymiz! ${tier.emoji} ${tier.name} ligasiga ko'tarildingiz!`
      : `${tier.emoji} ${tier.name} ligasiga tushib qoldingiz. Bu hafta ko'proq mashq qiling!`
  }
})

function dismissLeagueResult() {
  userStore.clearLeagueResult()
}

function initials(name) {
  if (!name) return '?'
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function rankClass(idx) {
  if (idx === 0) return 'rank-gold'
  if (idx === 1) return 'rank-silver'
  if (idx === 2) return 'rank-bronze'
  return ''
}

const { refresh } = useScrollReveal()

async function loadTab() {
  loading.value = true
  leaderboard.value = tab.value === 'alltime'
    ? await userStore.fetchLeaderboard(20)
    : await userStore.fetchLeagueLeaderboard(30)
  loading.value = false
  refresh()
}

function switchTab(newTab) {
  if (tab.value === newTab) return
  tab.value = newTab
  loadTab()
}

onMounted(loadTab)
</script>

<style scoped>
.lb-content {
  padding: 36px 24px 80px;
  max-width: 640px;
}

.lb-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 6px;
}

.lb-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0 0 30px;
}

.lb-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.lb-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 100px;
  background: rgba(13, 17, 16, 0.035);
  border: 1px solid var(--card-border);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s var(--ease-premium), border-color 0.2s var(--ease-premium), color 0.2s var(--ease-premium);
}

.lb-tab:hover {
  background: rgba(60, 230, 125, 0.06);
}

.lb-tab-active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent-dim);
}

.league-result-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
}

.league-result-banner.promoted {
  border-color: var(--accent);
  background: rgba(60, 230, 125, 0.08);
  color: var(--accent-dim);
}

.league-result-banner.demoted {
  border-color: rgba(229, 72, 77, 0.4);
  background: rgba(229, 72, 77, 0.08);
  color: #e5484d;
}

.league-result-emoji {
  font-size: 18px;
}

.league-result-close {
  margin-left: auto;
  color: inherit;
  opacity: 0.6;
}

.league-result-close:hover {
  opacity: 1;
}

.lb-row-promotion {
  border-color: var(--accent);
}

.lb-row-demotion {
  border-color: rgba(229, 72, 77, 0.35);
}

.league-hint {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 20px;
}

.league-badge {
  background: var(--accent-soft);
  color: var(--accent-dim);
  padding: 5px 12px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 12px;
}

.lb-loading {
  color: var(--text-muted);
  text-align: center;
  padding: 40px;
}

.lb-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lb-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 20px;
}

.lb-row-me {
  border-color: var(--accent);
  background: rgba(60, 230, 125, 0.07);
}

.lb-rank {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(13, 17, 16, 0.045);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  flex-shrink: 0;
}

.rank-gold {
  background: linear-gradient(135deg, #ffc857, #ff9f4a);
  color: #1a1a0a;
}

.rank-silver {
  background: linear-gradient(135deg, #d0d0d8, #a0a0ad);
  color: #1a1a1f;
}

.rank-bronze {
  background: linear-gradient(135deg, #cd8a5c, #a8693f);
  color: #1a1208;
}

.lb-profile-link {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  color: inherit;
  text-decoration: none;
  border-radius: 14px;
}

.lb-profile-link:hover .lb-name { color: var(--accent); }

.lb-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: #060609;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
  overflow: hidden;
}

.lb-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lb-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.lb-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lb-name {
  font-weight: 600;
  font-size: 14px;
}

.lb-level {
  font-size: 12px;
  color: var(--text-muted);
}

.lb-xp-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.lb-xp {
  font-weight: 700;
  font-size: 16px;
}

.lb-xp-label {
  font-size: 11px;
  color: var(--text-muted);
}

.lb-empty {
  text-align: center;
  color: var(--text-muted);
  padding: 40px;
}
</style>
