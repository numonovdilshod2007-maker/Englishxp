// Picks a single vocabulary word to feature as "Word of the Day".
// No backend/Firestore write needed: the pick is a pure function of the
// calendar date, so every user sees the same word on the same day and it
// automatically changes tomorrow.
import { getAllWords } from './vocabulary.js'

function dayNumber(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function getWordOfTheDay(date = new Date()) {
  const words = getAllWords()
  if (!words.length) return null
  const idx = dayNumber(date) % words.length
  return words[idx]
}
