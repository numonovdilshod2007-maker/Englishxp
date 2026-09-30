// Client-side daily practice reminders. There is no push server in this
// project, so this works "best effort": while the app (or its registered
// service worker) is alive in the browser, it periodically checks whether
// the user has hit their daily XP goal yet, and if not — and it's evening —
// shows a local notification once per day. This is not a true server push
// (it can't wake a fully closed browser), but it covers the common case of
// a tab or the OS-level PWA being open in the background.

const CHECK_INTERVAL_MS = 15 * 60 * 1000 // re-check every 15 minutes
const REMIND_AFTER_HOUR = 19 // don't nag before 7 PM local time
const STORAGE_KEY = 'englishxp_last_reminder_date'

let intervalId = null

export function isNotificationSupported() {
  return typeof window !== 'undefined' && 'Notification' in window
}

export function notificationPermission() {
  return isNotificationSupported() ? Notification.permission : 'unsupported'
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return 'unsupported'
  if (Notification.permission === 'default') {
    return await Notification.requestPermission()
  }
  return Notification.permission
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return null
  try {
    return await navigator.serviceWorker.register('/sw.js')
  } catch {
    return null
  }
}

function alreadyRemindedToday() {
  return localStorage.getItem(STORAGE_KEY) === new Date().toDateString()
}

function markRemindedToday() {
  localStorage.setItem(STORAGE_KEY, new Date().toDateString())
}

async function showReminder() {
  const title = "EnglishXP — bugun mashq qilmadingiz!"
  const options = {
    body: "Streak'ingizni saqlab qolish uchun bir necha daqiqa ajrating 🔥",
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'daily-reminder'
  }
  const reg = await navigator.serviceWorker?.getRegistration?.()
  if (reg) {
    await reg.showNotification(title, options)
  } else {
    new Notification(title, options)
  }
  markRemindedToday()
}

// `getState` is a function returning { dailyGoalReached, streak } so this
// module stays framework-agnostic (no direct Pinia dependency).
function checkAndRemind(getState) {
  if (notificationPermission() !== 'granted') return
  if (alreadyRemindedToday()) return

  const hour = new Date().getHours()
  if (hour < REMIND_AFTER_HOUR) return

  const state = getState()
  if (state.dailyGoalReached) return

  showReminder()
}

export async function initReminders(getState) {
  if (!isNotificationSupported()) return
  await registerServiceWorker()

  if (intervalId) clearInterval(intervalId)
  checkAndRemind(getState)
  intervalId = setInterval(() => checkAndRemind(getState), CHECK_INTERVAL_MS)
}

export function stopReminders() {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
}
