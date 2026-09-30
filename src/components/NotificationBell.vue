<template>
  <div class="notif-wrap">
    <button class="notif-bell" @click="toggleOpen" title="Bildirishnomalar">
      <i class="ti ti-bell" aria-hidden="true"></i>
      <span v-if="userStore.unreadNotificationCount > 0" class="notif-badge">
        {{ userStore.unreadNotificationCount > 9 ? '9+' : userStore.unreadNotificationCount }}
      </span>
    </button>

    <div v-if="open" class="notif-panel" v-pop-in>
      <div class="notif-panel-header">
        <span>Bildirishnomalar</span>
        <button
          v-if="userStore.unreadNotificationCount > 0"
          class="notif-mark-read"
          @click="userStore.markAllNotificationsRead()"
        >
          Hammasini o'qildi qilish
        </button>
      </div>
      <div v-if="!userStore.notifications.length" class="notif-empty">
        Hozircha bildirishnoma yo'q
      </div>
      <router-link
        v-for="n in userStore.notifications"
        :key="n.id"
        :to="n.link || '/dashboard'"
        class="notif-item"
        :class="{ 'notif-item-unread': !n.read }"
        @click="open = false"
      >
        <i :class="'ti ' + iconFor(n.type)" aria-hidden="true" class="notif-item-icon"></i>
        <div class="min-w-0">
          <p class="notif-item-title">{{ n.title }}</p>
          <p class="notif-item-body">{{ n.body }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()
const open = ref(false)

function iconFor(type) {
  if (type === 'level_up') return 'ti-trophy'
  if (type === 'weekly_report') return 'ti-calendar-stats'
  if (type === 'practice_reminder') return 'ti-flame'
  return 'ti-bell'
}

function toggleOpen() {
  open.value = !open.value
  if (open.value && userStore.unreadNotificationCount > 0) {
    // Give the user a moment to see the badge before clearing it.
    setTimeout(() => userStore.markAllNotificationsRead(), 1500)
  }
}

function closeOnOutsideClick(e) {
  if (!e.target.closest('.notif-wrap')) open.value = false
}

onMounted(() => {
  userStore.fetchNotifications()
  userStore.checkPracticeReminder()
  document.addEventListener('click', closeOnOutsideClick)
})
</script>

<style scoped>
.notif-wrap {
  position: relative;
}
.notif-bell {
  position: relative;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-glass);
  color: var(--text-primary, inherit);
  border: none;
  cursor: pointer;
  font-size: 16px;
}
.notif-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}

.notif-panel {
  position: absolute;
  top: 42px;
  right: 0;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  background: var(--card-bg, #0b1210);
  border: 1px solid var(--surface-glass);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  z-index: 50;
}
.notif-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 700;
  border-bottom: 1px solid var(--surface-glass);
}
.notif-mark-read {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.notif-empty {
  padding: 24px 14px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}
.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--surface-glass);
}
.notif-item:last-child {
  border-bottom: none;
}
.notif-item-unread {
  background: var(--accent-soft, rgba(34, 197, 94, 0.08));
}
.notif-item-icon {
  color: var(--accent);
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}
.notif-item-title {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 2px;
}
.notif-item-body {
  font-size: 12px;
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.4;
}
</style>
