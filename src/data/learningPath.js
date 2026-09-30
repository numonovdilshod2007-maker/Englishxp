// Maps the app's 15 internal vocabulary levels onto a familiar CEFR band,
// and generates a short "what to do today" plan from the user's profile.
// This is intentionally simple (pure functions over the existing profile
// shape) so it needs no new Firestore fields to get working.

export const CEFR_BANDS = [
  { code: 'A1', label: 'Boshlang\'ich', levels: [1, 2, 3] },
  { code: 'A2', label: 'Elementar', levels: [4, 5, 6] },
  { code: 'B1', label: 'O\'rta', levels: [7, 8, 9] },
  { code: 'B2', label: 'O\'rtadan yuqori', levels: [10, 11, 12] },
  { code: 'C1', label: 'Yuqori', levels: [13, 14] },
  { code: 'C2', label: 'Mukammal', levels: [15] }
]

export function cefrForLevel(levelNum) {
  return CEFR_BANDS.find((b) => b.levels.includes(levelNum)) || CEFR_BANDS[0]
}

// One row per skill the app already tracks. `check` reads straight off the
// pinia profile/getters so this stays in sync automatically.
export const PATH_SKILLS = [
  { id: 'vocabulary', label: 'Yangi so\'zlar', icon: 'ti-abc', route: (l) => `/lesson/${l}` },
  { id: 'review', label: 'Takrorlash (SRS)', icon: 'ti-refresh', route: () => '/lesson/review' },
  { id: 'grammar', label: 'Grammatika', icon: 'ti-abc-2', route: () => '/grammar-quiz' },
  { id: 'listening', label: 'Tinglash', icon: 'ti-headphones', route: () => '/listening' },
  { id: 'speaking', label: 'Gapirish (AI)', icon: 'ti-microphone', route: () => '/roleplay' },
  { id: 'writing', label: 'Yozish', icon: 'ti-pencil', route: () => '/writing' }
]

// Builds today's 3-item recommended plan, prioritizing: due SRS reviews,
// then whichever skill has the lowest logged activity this week, then the
// next unfinished vocabulary level.
export function buildTodayPlan({ level, dueWordsCount, mistakeWordsCount = 0, weeklyActivity, levelProgressPercent }) {
  const plan = []

  if (dueWordsCount > 0) {
    plan.push({
      id: 'review',
      title: `${dueWordsCount} ta so'zni takrorlang`,
      subtitle: 'Smart Review — bugun eslatilishi kerak bo‘lgan so‘zlar',
      icon: 'ti-refresh-alert',
      route: '/lesson/review'
    })
  } else if (mistakeWordsCount > 0) {
    plan.push({
      id: 'mistakes',
      title: `${Math.min(mistakeWordsCount, 5)} ta xatoni tuzating`,
      subtitle: 'Siz ko‘p adashgan so‘zlar uchun 2 daqiqalik review',
      icon: 'ti-bulb',
      route: '/mistakes'
    })
  }

  const activity = weeklyActivity || {}
  const weakestSkill = PATH_SKILLS
    .filter((s) => s.id !== 'review')
    .sort((a, b) => (activity[a.id] || 0) - (activity[b.id] || 0))[0]

  if (weakestSkill) {
    plan.push({
      id: weakestSkill.id,
      title: `${weakestSkill.label} mashqi`,
      subtitle: 'Bu haftada eng kam mashq qilingan ko\'nikma',
      icon: weakestSkill.icon,
      route: weakestSkill.route(level)
    })
  }

  if ((levelProgressPercent ?? 0) < 100) {
    plan.push({
      id: 'vocabulary',
      title: `${level}-daraja darsini davom ettiring`,
      subtitle: `Joriy daraja ${levelProgressPercent ?? 0}% tugallangan`,
      icon: 'ti-book',
      route: `/lesson/${level}`
    })
  } else {
    plan.push({
      id: 'grammar',
      title: 'Grammatika testidan o\'ting',
      subtitle: 'Bu darajadagi so\'zlar tugadi — grammatikani mustahkamlang',
      icon: 'ti-abc-2',
      route: '/grammar-quiz'
    })
  }

  // De-duplicate by id while preserving priority order, cap at 3.
  const seen = new Set()
  return plan.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true))).slice(0, 3)
}
