import { ref } from 'vue'

const STORAGE_KEY = 'englishxp_theme'
const isDark = ref(false)

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
  isDark.value = dark
}

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    applyTheme(saved === 'dark')
  } else {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    applyTheme(!!prefersDark)
  }
}

export function useTheme() {
  function toggleTheme() {
    const next = !isDark.value
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
  }

  return { isDark, toggleTheme }
}
