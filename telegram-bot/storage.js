import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'users.json')

function readAll() {
  if (!fs.existsSync(DB_PATH)) return {}
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch {
    return {}
  }
}

function writeAll(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export function getUser(chatId) {
  const all = readAll()
  return all[chatId] || null
}

export function getAllUsers() {
  return readAll()
}

export function upsertUser(chatId, patch) {
  const all = readAll()
  const existing = all[chatId] || {
    chatId,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    createdAt: new Date().toISOString()
  }
  all[chatId] = { ...existing, ...patch }
  writeAll(all)
  return all[chatId]
}

// Call whenever the user does a "counts as practice" action (learns a word,
// answers a quiz). Handles the day-to-day streak increment/reset logic.
export function markActiveToday(chatId) {
  const today = new Date().toISOString().slice(0, 10)
  const user = getUser(chatId) || upsertUser(chatId, {})

  if (user.lastActiveDate === today) {
    return user // already counted today
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const newStreak = user.lastActiveDate === yesterday ? (user.streak || 0) + 1 : 1

  return upsertUser(chatId, { streak: newStreak, lastActiveDate: today })
}

// In-memory map for pending quiz polls: poll_id -> { chatId, correctOptionId }
// Doesn't need to survive restarts, so it's kept out of users.json.
export const pendingPolls = new Map()
