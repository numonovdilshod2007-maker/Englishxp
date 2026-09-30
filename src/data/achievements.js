// Achievements are computed client-side from data already on the profile —
// no extra Firestore writes needed except a `claimedAchievements` list so we
// know which ones have already granted their one-time XP bonus.
export const ACHIEVEMENTS = [
  { id: 'first_lesson', label: 'Birinchi qadam', desc: '1-darsni tugating', icon: 'ti-flag', xp: 10, check: (p) => (p.completedWords || []).length >= 1 },
  { id: 'streak_3', label: 'Qizigan boshladi', desc: '3 kunlik streak', icon: 'ti-flame', xp: 15, check: (p) => (p.streak || 0) >= 3 },
  { id: 'streak_7', label: 'Bir hafta', desc: '7 kunlik streak', icon: 'ti-flame', xp: 30, check: (p) => (p.streak || 0) >= 7 },
  { id: 'streak_30', label: "Chin ko'ngildan", desc: '30 kunlik streak', icon: 'ti-flame', xp: 100, check: (p) => (p.streak || 0) >= 30 },
  { id: 'words_50', label: "So'z ustasi", desc: "50 ta so'z o'rgandi", icon: 'ti-abc', xp: 20, check: (p) => (p.completedWords || []).length >= 50 },
  { id: 'words_200', label: "So'z boyligi", desc: "200 ta so'z o'rgandi", icon: 'ti-abc', xp: 50, check: (p) => (p.completedWords || []).length >= 200 },
  { id: 'words_500', label: "Lug'at daho", desc: "500 ta so'z o'rgandi", icon: 'ti-abc', xp: 100, check: (p) => (p.completedWords || []).length >= 500 },
  { id: 'level_5', label: "Yarim yo'l", desc: '5-darajaga yetdi', icon: 'ti-stairs-up', xp: 40, check: (p) => (p.level || 1) >= 5 },
  { id: 'level_10', label: 'Til ustozi', desc: '10-darajani tugatdi', icon: 'ti-crown', xp: 150, check: (p) => (p.level || 1) >= 10 },
  { id: 'xp_500', label: 'Mehnatkash', desc: '500 XP yig\'di', icon: 'ti-bolt', xp: 20, check: (p) => (p.xp || 0) >= 500 },
  { id: 'xp_2000', label: 'Tinimsiz', desc: "2000 XP yig'di", icon: 'ti-bolt', xp: 50, check: (p) => (p.xp || 0) >= 2000 },
  { id: 'first_story', label: 'Kitobxon', desc: '1-hikoyani o\'qidi', icon: 'ti-book-2', xp: 10, check: (p) => (p.completedStories || []).length >= 1 },
  { id: 'stories_10', label: 'Hikoyanavis', desc: '10 ta hikoya o\'qidi', icon: 'ti-books', xp: 40, check: (p) => (p.completedStories || []).length >= 10 },
  { id: 'social', label: 'Ijtimoiy', desc: '3 ta odamni kuzatdi', icon: 'ti-users', xp: 15, check: (p) => (p.following || []).length >= 3 },
  { id: 'friend_streak', label: 'Birga kuchli', desc: 'Do\'st bilan Friend Streak boshladi', icon: 'ti-heart', xp: 20, check: (p) => Object.values(p.friendStreaks || {}).some((s) => (s.count || 0) >= 1) },
  { id: 'listening_started', label: 'Diqqatli quloq', desc: 'Tinglash mashqini boshladi', icon: 'ti-headphones', xp: 15, check: (p) => (p.listeningCompleted || 0) >= 1 }
]

export function getUnlockedAchievements(profile) {
  if (!profile) return []
  return ACHIEVEMENTS.filter((a) => a.check(profile))
}
