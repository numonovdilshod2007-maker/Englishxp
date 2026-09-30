<template>
  <div class="glass reveal partner-widget" v-if="!loading">
    <!-- Incoming requests take priority -->
    <div v-if="incomingProfiles.length" class="partner-widget-requests">
      <p class="partner-widget-label"><i class="ti ti-handshake" aria-hidden="true"></i> Partner so'rovlari</p>
      <div v-for="p in incomingProfiles" :key="p.id" class="partner-widget-request-row">
        <div class="partner-widget-avatar">
          <img v-if="p.photoURL" :src="p.photoURL" alt="" />
          <span v-else>{{ p.avatar || '🙂' }}</span>
        </div>
        <span class="partner-widget-name">{{ p.displayName }}</span>
        <button class="partner-widget-accept" @click="accept(p)">Qabul qilish</button>
        <button class="partner-widget-decline" @click="decline(p)"><i class="ti ti-x" aria-hidden="true"></i></button>
      </div>
    </div>

    <!-- Active partner -->
    <router-link v-else-if="partner" to="/people" class="partner-widget-active">
      <div class="partner-widget-avatar partner-widget-avatar-lg">
        <img v-if="partner.photoURL" :src="partner.photoURL" alt="" />
        <span v-else>{{ partner.avatar || '🙂' }}</span>
      </div>
      <div class="partner-widget-info">
        <span class="partner-widget-label"><i class="ti ti-handshake" aria-hidden="true"></i> Sizning partneringiz</span>
        <span class="partner-widget-name-lg">{{ partner.displayName }}</span>
      </div>
      <span v-if="streak > 0" class="partner-widget-streak">🔥 {{ streak }}</span>
      <i class="ti ti-chevron-right" aria-hidden="true"></i>
    </router-link>

    <!-- No partner -->
    <router-link v-else to="/people" class="partner-widget-empty">
      <i class="ti ti-user-plus" aria-hidden="true"></i>
      <div>
        <strong>Study Partner toping</strong>
        <p>Kuzatgan do'stingiz bilan birga o'rganing va natijalaringizni solishtiring</p>
      </div>
      <i class="ti ti-chevron-right" aria-hidden="true"></i>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()
const loading = ref(true)
const partner = ref(null)
const incomingProfiles = ref([])

const streak = ref(0)

async function loadIncoming() {
  incomingProfiles.value = await userStore.fetchIncomingPartnerRequestProfiles()
}

async function accept(p) {
  await userStore.acceptPartnerRequest(p.id)
  incomingProfiles.value = incomingProfiles.value.filter((x) => x.id !== p.id)
  partner.value = await userStore.getActivePartnerProfile()
  streak.value = userStore.friendStreakWith(p.id)
}

async function decline(p) {
  await userStore.declinePartnerRequest(p.id)
  incomingProfiles.value = incomingProfiles.value.filter((x) => x.id !== p.id)
}

onMounted(async () => {
  if (userStore.hasActivePartner) {
    partner.value = await userStore.getActivePartnerProfile()
    streak.value = userStore.friendStreakWith(userStore.activePartnerId)
  } else {
    await loadIncoming()
  }
  loading.value = false
})
</script>

<style scoped>
.partner-widget {
  padding: 16px 20px;
  margin-bottom: 4px;
}

.partner-widget-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--text-muted);
  margin: 0 0 4px;
}

.partner-widget-active,
.partner-widget-empty {
  display: flex;
  align-items: center;
  gap: 14px;
}

.partner-widget-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  overflow: hidden;
  flex-shrink: 0;
}

.partner-widget-avatar-lg {
  width: 46px;
  height: 46px;
  font-size: 22px;
}

.partner-widget-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.partner-widget-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.partner-widget-name-lg {
  font-weight: 700;
  font-size: 15px;
}

.partner-widget-streak {
  font-size: 13px;
  font-weight: 700;
  color: #ff9500;
  flex-shrink: 0;
}

.partner-widget-empty i:first-child {
  font-size: 22px;
  color: var(--accent);
  flex-shrink: 0;
}

.partner-widget-empty strong {
  font-size: 14px;
  display: block;
}

.partner-widget-empty p {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--text-muted);
}

.partner-widget-empty > i:last-child,
.partner-widget-active > i:last-child {
  margin-left: auto;
  color: var(--text-muted);
  flex-shrink: 0;
}

.partner-widget-request-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

.partner-widget-name {
  font-size: 13px;
  font-weight: 600;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.partner-widget-accept {
  font-size: 12px;
  font-weight: 700;
  padding: 7px 14px;
  border-radius: 100px;
  background: var(--accent);
  color: #05130a;
  white-space: nowrap;
}

.partner-widget-decline {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: var(--surface-glass);
  flex-shrink: 0;
}
</style>
