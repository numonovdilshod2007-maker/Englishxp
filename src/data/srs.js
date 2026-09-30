// A simplified SM-2 (SuperMemo-2) spaced repetition algorithm — the same
// family of algorithm used by Anki. Each vocabulary word gets a "card" that
// tracks how well the learner knows it, and the interval before it should
// be shown again grows every time they get it right, and shrinks (resets)
// when they get it wrong.

const MIN_EASE = 1.3
const DEFAULT_EASE = 2.5

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function createCard() {
  return {
    ef: DEFAULT_EASE,
    interval: 0,
    reps: 0,
    due: todayStr(),
    lastReviewed: null
  }
}

// Applies one review result to a card and returns the updated card.
// `correct` is a simple boolean since our exercises are pass/fail rather
// than SM-2's original 0-5 quality scale.
export function reviewCard(card, correct) {
  const c = card ? { ...card } : createCard()
  const today = todayStr()

  if (correct) {
    c.reps += 1
    if (c.reps === 1) {
      c.interval = 1
    } else if (c.reps === 2) {
      c.interval = 6
    } else {
      c.interval = Math.round(c.interval * c.ef)
    }
    c.ef = Math.max(MIN_EASE, c.ef + 0.1)
  } else {
    c.reps = 0
    c.interval = 1
    c.ef = Math.max(MIN_EASE, c.ef - 0.2)
  }

  c.lastReviewed = today
  c.due = addDays(today, c.interval)
  return c
}

export function isDue(card) {
  if (!card) return false
  return card.due <= todayStr()
}

// How many days overdue a card is (negative/0 = not due yet, used for sorting).
export function overdueDays(card) {
  if (!card) return -Infinity
  const due = new Date(card.due)
  const today = new Date(todayStr())
  return Math.round((today - due) / (1000 * 60 * 60 * 24))
}

// Rough mastery label for UI display, based on interval length.
export function masteryLabel(card) {
  if (!card || card.reps === 0) return 'yangi'
  if (card.interval < 4) return 'o\'rganilmoqda'
  if (card.interval < 21) return 'yaxshi'
  return 'mukammal'
}
