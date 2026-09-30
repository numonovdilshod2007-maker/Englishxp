<template>
  <div class="dm-page">
    <AuroraBackground />
    <AppNav />

    <div class="container dm-content">
      <div class="dm-header reveal">
        <router-link to="/chat" class="back-link">
          <i class="ti ti-arrow-left"></i> Orqaga
        </router-link>
        <div class="dm-header-person" v-if="otherUser">
          <div class="dm-header-avatar">
            <img v-if="otherUser.photoURL" :src="otherUser.photoURL" alt="" />
            <span v-else>{{ otherUser.avatar || '🦁' }}</span>
          </div>
          <span class="dm-header-name">{{ otherUser.displayName }}</span>
        </div>
      </div>

      <div class="glass dm-box reveal">
        <div ref="messagesEl" class="dm-messages-scroll">
          <div v-if="loading" class="dm-status">Yuklanmoqda...</div>

          <div
            v-for="msg in messages"
            :key="msg.id"
            class="dm-row"
            :class="{ 'dm-row-me': msg.uid === userStore.user?.uid }"
          >
            <div class="dm-avatar">
              <img v-if="msg.photoURL" :src="msg.photoURL" alt="" />
              <span v-else>{{ msg.avatar || '🦁' }}</span>
            </div>
            <div class="dm-bubble" :class="{ 'dm-bubble-me': msg.uid === userStore.user?.uid }">
              <div class="dm-meta">
                <span class="dm-name">{{ msg.displayName }}</span>
                <span class="dm-time">{{ formatTime(msg.createdAt) }}</span>
              </div>
              <p class="dm-text">{{ msg.text }}</p>
            </div>
          </div>

          <p v-if="!loading && messages.length === 0" class="dm-status">
            Hali xabar yo'q. Birinchi bo'lib yozing!
          </p>
        </div>

        <form class="dm-input-row" @submit.prevent="sendMessage">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Xabar yozing..."
            maxlength="500"
          />
          <button type="submit" class="dm-send-btn" :disabled="!newMessage.trim()">
            <i class="ti ti-send"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import { db } from '../firebase/config.js'
import {
  collection, query, orderBy, limit,
  onSnapshot, addDoc, serverTimestamp
} from 'firebase/firestore'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const route = useRoute()
const userStore = useUserStore()
const otherUid = computed(() => route.params.uid)
const otherUser = ref(null)
const messages = ref([])
const newMessage = ref('')
const loading = ref(true)
const messagesEl = ref(null)
let unsubscribe = null

useScrollReveal()

// Stable conversation ID: always smaller UID first
const convId = computed(() => {
  const me = userStore.user?.uid || ''
  const them = otherUid.value || ''
  return [me, them].sort().join('_')
})

function formatTime(ts) {
  if (!ts?.toDate) return ''
  const d = ts.toDate()
  return d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

async function sendMessage() {
  const text = newMessage.value.trim()
  if (!text || !userStore.user) return
  newMessage.value = ''
  await addDoc(collection(db, 'dms', convId.value, 'messages'), {
    uid: userStore.user.uid,
    displayName: userStore.profile?.displayName || 'Foydalanuvchi',
    avatar: userStore.profile?.avatar || '🦁',
    photoURL: userStore.profile?.photoURL || null,
    text,
    createdAt: serverTimestamp()
  })
}

onMounted(async () => {
  otherUser.value = await userStore.fetchUserProfile(otherUid.value)

  const q = query(
    collection(db, 'dms', convId.value, 'messages'),
    orderBy('createdAt', 'asc'),
    limit(200)
  )

  unsubscribe = onSnapshot(q, (snap) => {
    messages.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    loading.value = false
    scrollToBottom()
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>

<style scoped>
.dm-content {
  padding: 36px 24px 80px;
  max-width: 700px;
}

.dm-header {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover { color: var(--text-primary); }

.dm-header-person {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dm-header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  overflow: hidden;
  flex-shrink: 0;
}

.dm-header-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dm-header-name {
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.dm-box {
  display: flex;
  flex-direction: column;
  height: 60vh;
  min-height: 420px;
  overflow: hidden;
}

.dm-messages-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dm-status {
  text-align: center;
  color: var(--text-muted);
  padding: 30px;
  margin: auto;
}

.dm-row {
  display: flex;
  gap: 10px;
  max-width: 80%;
}

.dm-row-me {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.dm-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  overflow: hidden;
}

.dm-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dm-bubble {
  background: rgba(13, 17, 16, 0.04);
  border: 1px solid var(--border-glass);
  border-radius: 14px;
  padding: 10px 14px;
  min-width: 0;
}

.dm-bubble-me {
  background: var(--accent-soft);
  border-color: rgba(60,230,125,0.3);
}

.dm-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.dm-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
}

.dm-time {
  font-size: 11px;
  color: var(--text-muted);
}

.dm-text {
  font-size: 14px;
  margin: 0;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.dm-input-row {
  display: flex;
  gap: 10px;
  padding: 14px 18px;
  border-top: 1px solid var(--border-glass);
}

.dm-input-row input {
  flex: 1;
  background: rgba(13, 17, 16, 0.035);
  border: 1px solid var(--border-glass);
  border-radius: 100px;
  padding: 11px 18px;
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.dm-input-row input:focus {
  border-color: var(--accent);
}

.dm-send-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--accent);
  color: #02110a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.dm-send-btn:hover:not(:disabled) { transform: scale(1.08); }
.dm-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
