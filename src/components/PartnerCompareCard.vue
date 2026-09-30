<template>
  <div class="glass reveal partner-compare">
    <!-- No partner yet: invite to set one up -->
    <div v-if="!userStore.hasActivePartner" class="partner-compare-empty">
      <i class="ti ti-handshake" aria-hidden="true"></i>
      <div>
        <strong>Study Partner qo'shing</strong>
        <p>Natijalaringizni do'stingiz bilan taqqoslab boring</p>
      </div>
      <router-link to="/people" class="partner-compare-link">Odamlar</router-link>
    </div>

    <!-- Loading partner's result -->
    <div v-else-if="loading" class="partner-compare-loading">Partner natijasi yuklanmoqda...</div>

    <!-- Compare -->
    <div v-else class="partner-compare-rows">
      <div class="partner-compare-side">
        <div class="partner-compare-avatar">
          <img v-if="userStore.profile?.photoURL" :src="userStore.profile.photoURL" alt="" />
          <span v-else>{{ userStore.profile?.avatar || '🙂' }}</span>
        </div>
        <span class="partner-compare-name">Siz</span>
        <span class="partner-compare-score">{{ myResult.correct }}/{{ myResult.total }}</span>
      </div>

      <div class="partner-compare-vs">
        <i class="ti ti-versus" aria-hidden="true"></i>
      </div>

      <div class="partner-compare-side">
        <div class="partner-compare-avatar">
          <img v-if="partner?.photoURL" :src="partner.photoURL" alt="" />
          <span v-else>{{ partner?.avatar || '🙂' }}</span>
        </div>
        <span class="partner-compare-name">{{ partner?.displayName || 'Partner' }}</span>
        <span v-if="partnerResult" class="partner-compare-score">{{ partnerResult.correct }}/{{ partnerResult.total }}</span>
        <span v-else class="partner-compare-score partner-compare-score-muted">hali yo'q</span>
      </div>
    </div>

    <p v-if="!loading && userStore.hasActivePartner && partnerResult" class="partner-compare-verdict">
      {{ verdictText }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/userStore.js'

const props = defineProps({
  // Which module this result belongs to, e.g. 'grammar' or 'writing'.
  subject: { type: String, required: true },
  myResult: { type: Object, required: true } // { correct, total, xp }
})

const userStore = useUserStore()
const loading = ref(true)
const partner = ref(null)
const partnerResult = ref(null)

const verdictText = computed(() => {
  if (!partnerResult.value) return ''
  const myPct = props.myResult.total ? props.myResult.correct / props.myResult.total : 0
  const theirPct = partnerResult.value.total ? partnerResult.value.correct / partnerResult.value.total : 0
  if (myPct > theirPct) return `Siz ${partner.value?.displayName || 'partneringiz'}dan oldindasiz! 🔥`
  if (myPct < theirPct) return `${partner.value?.displayName || 'Partneringiz'} sizdan oldinda — qaytarib bering!`
  return "Durrang! Ikkalangiz teng natija ko'rsatdingiz."
})

onMounted(async () => {
  // Save my result first so it's visible to the partner too, then pull theirs.
  await userStore.recordPracticeResult(props.subject, props.myResult)
  if (userStore.hasActivePartner) {
    const { partner: p, result } = await userStore.getPartnerResult(props.subject)
    partner.value = p
    partnerResult.value = result
  }
  loading.value = false
})
</script>

<style scoped>
.partner-compare {
  padding: 18px 20px;
  margin-top: 16px;
}

.partner-compare-empty {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
}

.partner-compare-empty i {
  font-size: 22px;
  color: var(--accent);
  flex-shrink: 0;
}

.partner-compare-empty strong {
  font-size: 14px;
  display: block;
}

.partner-compare-empty p {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--text-muted);
}

.partner-compare-link {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 100px;
  background: var(--accent);
  color: #05130a;
  white-space: nowrap;
}

.partner-compare-loading {
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
  padding: 8px;
}

.partner-compare-rows {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.partner-compare-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.partner-compare-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  overflow: hidden;
}

.partner-compare-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.partner-compare-name {
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.partner-compare-score {
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
}

.partner-compare-score-muted {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}

.partner-compare-vs {
  color: var(--text-muted);
  font-size: 13px;
  flex-shrink: 0;
}

.partner-compare-verdict {
  text-align: center;
  font-size: 12.5px;
  color: var(--text-secondary);
  margin: 12px 0 0;
}
</style>
