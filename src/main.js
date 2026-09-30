import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { useUserStore } from './stores/userStore.js'
import { useContentStore } from './stores/contentStore.js'
import { vPopIn } from './composables/vPopIn.js'
import { initReminders, notificationPermission } from './composables/useReminders.js'
import { initTheme } from './composables/useTheme.js'
import './style.css'

initTheme()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.directive('pop-in', vPopIn)

const userStore = useUserStore()
userStore.initAuthListener()

// Merge in any admin-added vocabulary/stories before the rest of the app
// reads from those static data modules.
useContentStore().fetchCustomContent()

// Register the service worker unconditionally so the app is installable as
// a PWA (Add to Home Screen); reminder notifications reuse the same worker.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {})
}

// If the user previously opted in (and the browser permission is still
// granted), silently resume the reminder schedule on every app load —
// no need to re-toggle it every session.
let remindersStarted = false
watch(
  () => userStore.profile,
  (profile) => {
    if (!profile || remindersStarted) return
    if (profile.remindersEnabled && notificationPermission() === 'granted') {
      remindersStarted = true
      initReminders(() => ({ dailyGoalReached: userStore.dailyGoalReached }))
    }
  },
  { immediate: true }
)

app.mount('#app')
