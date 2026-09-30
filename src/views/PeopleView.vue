<template>
  <div class="people-page">
    <AuroraBackground />
    <AppNav />

    <div class="container people-content">
      <h1 class="people-title reveal">
        <i class="ti ti-users" aria-hidden="true" style="color: var(--accent);"></i>
        Odamlar
      </h1>
      <p class="people-subtitle reveal">Boshqa o'quvchilarni kuzating, ular bilan birga o'rganing</p>

      <div v-if="errorMsg" class="glass people-error reveal">
        <i class="ti ti-alert-triangle" aria-hidden="true"></i>
        {{ errorMsg }}
      </div>

      <div v-if="loading" class="people-loading">Yuklanmoqda...</div>

      <div v-else class="people-list">
        <div
          v-for="person in people"
          :key="person.id"
          class="glass person-row reveal"
        >
          <router-link :to="`/user/${person.id}`" class="person-profile-link" title="Profilni ko'rish">
            <div class="person-avatar">
              <img v-if="person.photoURL" :src="person.photoURL" alt="" />
              <span v-else>{{ person.avatar || '🦁' }}</span>
            </div>
            <div class="person-info">
              <span class="person-name">{{ person.displayName }}</span>
              <span class="person-meta">Level {{ person.level || 1 }} &middot; {{ person.xp || 0 }} XP</span>
            </div>
          </router-link>
          <span
            v-if="userStore.isMutualFollow(person.id) && userStore.friendStreakWith(person.id) > 0"
            class="friend-streak-badge"
            title="Friend Streak"
          >
            🔥 {{ userStore.friendStreakWith(person.id) }}
          </span>

          <template v-if="person.id !== userStore.user?.uid">
            <button
              class="follow-btn"
              :class="{ 'follow-btn-active': userStore.isFollowing(person.id) }"
              @click="toggleFollow(person)"
            >
              <i :class="userStore.isFollowing(person.id) ? 'ti ti-user-check' : 'ti ti-user-plus'" aria-hidden="true"></i>
              {{ userStore.isFollowing(person.id) ? 'Kuzatilmoqda' : 'Kuzatish' }}
            </button>

            <!-- Partner controls: only meaningful once the follow is mutual -->
            <span v-if="userStore.isPartner(person.id)" class="partner-badge" title="Study Partner">
              🤝 Partner
              <button class="partner-remove-btn" title="Partnerlikni bekor qilish" @click="removePartner()">
                <i class="ti ti-x" aria-hidden="true"></i>
              </button>
            </span>

            <button
              v-else-if="userStore.hasIncomingRequestFrom(person.id)"
              class="partner-btn partner-btn-accept"
              @click="acceptRequest(person)"
            >
              <i class="ti ti-handshake" aria-hidden="true"></i>
              Qabul qilish
            </button>

            <button
              v-else-if="userStore.hasSentRequestTo(person.id)"
              class="partner-btn partner-btn-pending"
              @click="cancelRequest(person)"
            >
              So'rov yuborildi &middot; bekor qilish
            </button>

            <button
              v-else-if="userStore.isMutualFollow(person.id) && !userStore.hasActivePartner"
              class="partner-btn"
              @click="requestPartner(person)"
            >
              <i class="ti ti-handshake" aria-hidden="true"></i>
              Partner bo'lish
            </button>
          </template>
          <span v-else class="person-you-badge">Siz</span>
        </div>

        <p v-if="people.length === 0" class="people-empty">
          Hozircha boshqa foydalanuvchilar yo'q.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const people = ref([])
const loading = ref(true)
const errorMsg = ref('')

const { refresh } = useScrollReveal()

async function toggleFollow(person) {
  try {
    errorMsg.value = ''
    if (userStore.isFollowing(person.id)) {
      await userStore.unfollowUser(person.id)
    } else {
      await userStore.followUser(person.id)
    }
  } catch (e) {
    console.error('toggleFollow failed:', e)
    errorMsg.value = 'Xatolik yuz berdi: ' + (e.message || e)
  }
}

async function requestPartner(person) {
  try {
    errorMsg.value = ''
    await userStore.sendPartnerRequest(person.id)
  } catch (e) {
    console.error('sendPartnerRequest failed:', e)
    errorMsg.value = e.message || 'Partner so\'rovini yuborib bo\'lmadi. Birozdan so\'ng qayta urinib ko\'ring.'
  }
}

async function cancelRequest(person) {
  try {
    errorMsg.value = ''
    await userStore.cancelPartnerRequest(person.id)
  } catch (e) {
    console.error('cancelPartnerRequest failed:', e)
    errorMsg.value = 'Xatolik yuz berdi: ' + (e.message || e)
  }
}

async function acceptRequest(person) {
  try {
    errorMsg.value = ''
    await userStore.acceptPartnerRequest(person.id)
  } catch (e) {
    console.error('acceptPartnerRequest failed:', e)
    errorMsg.value = 'Xatolik yuz berdi: ' + (e.message || e)
  }
}

async function removePartner() {
  try {
    errorMsg.value = ''
    await userStore.removePartner()
  } catch (e) {
    console.error('removePartner failed:', e)
    errorMsg.value = 'Xatolik yuz berdi: ' + (e.message || e)
  }
}

onMounted(async () => {
  await userStore.refreshProfile() // pick up any follows/requests that happened since last load
  people.value = await userStore.fetchLeaderboard(50)
  loading.value = false
  refresh()
})
</script>

<style scoped>
.people-content {
  padding: 36px 24px 80px;
  max-width: 640px;
}

.people-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 6px;
}

.people-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0 0 30px;
}

.people-loading {
  color: var(--text-muted);
  text-align: center;
  padding: 40px;
}

.people-error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #e5484d;
  background: rgba(229, 72, 77, 0.1);
}

.people-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.person-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 20px;
}

.person-profile-link {
  display:flex;
  align-items:center;
  gap:14px;
  flex:1;
  min-width:0;
  color:inherit;
  text-decoration:none;
  border-radius:14px;
}

.person-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  overflow: hidden;
}

.person-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-profile-link:hover .person-name { color: var(--accent); }

.person-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.person-name {
  font-weight: 600;
  font-size: 14px;
}

.person-meta {
  font-size: 12px;
  color: var(--text-muted);
}

.friend-streak-badge {
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 100px;
  background: rgba(255, 149, 0, 0.12);
  color: #ff9500;
  white-space: nowrap;
  flex-shrink: 0;
}

.follow-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  background: var(--text-primary);
  color: var(--bg-void);
  white-space: nowrap;
  transition: background 0.25s var(--ease-premium), transform 0.2s var(--ease-spring);
}

.follow-btn:hover {
  transform: scale(1.04);
}

.follow-btn-active {
  background: var(--surface-glass);
  color: var(--accent);
  border: 1px solid rgba(60, 230, 125, 0.3);
}

.partner-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  background: rgba(60, 230, 125, 0.14);
  color: #1f9d55;
  white-space: nowrap;
  transition: background 0.25s var(--ease-premium), transform 0.2s var(--ease-spring);
}

.partner-btn:hover {
  transform: scale(1.04);
}

.partner-btn-pending {
  background: rgba(13, 17, 16, 0.06);
  color: var(--text-muted);
  font-weight: 500;
  font-size: 12px;
}

.partner-btn-accept {
  background: #1f9d55;
  color: #fff;
}

.partner-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 8px 6px 14px;
  border-radius: 100px;
  background: rgba(60, 230, 125, 0.14);
  color: #1f9d55;
  white-space: nowrap;
  flex-shrink: 0;
}

.partner-remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s var(--ease-premium), background 0.2s var(--ease-premium);
}

.partner-remove-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.08);
}

.person-you-badge {
  font-size: 12px;
  color: var(--text-muted);
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(13, 17, 16, 0.04);
}

.people-empty {
  text-align: center;
  color: var(--text-muted);
  padding: 40px;
}
</style>
