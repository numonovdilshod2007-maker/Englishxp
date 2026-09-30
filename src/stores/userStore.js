import { defineStore } from 'pinia'
import { auth, db, googleProvider } from '../firebase/config'
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  getCountFromServer,
  serverTimestamp,
  runTransaction,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { getWordsForLevel, maxLevel, XP_REWARDS, getAllWords } from '../data/vocabulary.js'
import { createCard, reviewCard, isDue, overdueDays, masteryLabel } from '../data/srs.js'
import { ACHIEVEMENTS, getUnlockedAchievements } from '../data/achievements.js'
import { buildTodayPlan, cefrForLevel } from '../data/learningPath.js'

// Returns the Monday (as YYYY-MM-DD) of the ISO week containing the given date.
function getWeekStart(date = new Date()) {
  const d = new Date(date)
  const day = d.getDay() // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().slice(0, 10)
}

export const DEFAULT_DAILY_GOAL = 20
export const DAILY_GOAL_OPTIONS = [10, 20, 40, 60]
export const REFERRAL_BONUS_XP = 30

// Three small, varied daily quests (separate from the XP goal above) that
// reward finishing specific kinds of practice, not just accumulating XP.
export const DAILY_QUEST_DEFS = [
  { id: 'correctAnswers', label: '5 ta savolga to\'g\'ri javob bering', target: 5, xpReward: 10, icon: 'ti-check' },
  { id: 'lessonsCompleted', label: '1 ta darsni tugating', target: 1, xpReward: 15, icon: 'ti-book' },
  { id: 'grammarCompleted', label: '1 ta grammatika testini yeching', target: 1, xpReward: 10, icon: 'ti-abc-2' },
  { id: 'listeningCompleted', label: '1 ta tinglash mashqini tugating', target: 1, xpReward: 10, icon: 'ti-headphones' },
  { id: 'speakingCompleted', label: '1 ta gapirish (AI) mashqini qiling', target: 1, xpReward: 15, icon: 'ti-microphone' }
]

export const LEAGUE_TIERS = [
  { name: 'Olmos', emoji: '💎', minRank: 1, maxRank: 5 },
  { name: 'Oltin', emoji: '🥇', minRank: 6, maxRank: 15 },
  { name: 'Kumush', emoji: '🥈', minRank: 16, maxRank: 30 },
  { name: 'Bronza', emoji: '🥉', minRank: 31, maxRank: Infinity }
]

export function getLeagueForRank(rank) {
  return LEAGUE_TIERS.find((t) => rank >= t.minRank && rank <= t.maxRank) || LEAGUE_TIERS[LEAGUE_TIERS.length - 1]
}

// Real league cohorts (separate from the rank-based display above): every
// user belongs to one tier (index into LEAGUE_TIERS, 0 = Olmos highest,
// LEAGUE_TIERS.length - 1 = Bronza lowest/starting tier). Each week, the
// top finishers within their own tier move up, the bottom finishers move
// down — see resolveLeaguePromotion().
export const DEFAULT_LEAGUE_INDEX = LEAGUE_TIERS.length - 1
export const LEAGUE_PROMOTION_ZONE = 5
export const LEAGUE_DEMOTION_ZONE = 5

// A handful of simple, free-to-use avatar choices (emoji-based, no upload needed).
// Keeping this as a fixed list avoids needing Firebase Storage just for avatars.
export const AVATAR_OPTIONS = [
  '🦁', '🐯', '🐺', '🦊', '🐻', '🐼', '🐸', '🦉',
  '🐢', '🦅', '🐳', '🦄', '🐲', '🚀', '⚡', '🔥'
]

// Only selectable by Pro members — shown locked with an upgrade prompt otherwise.
export const PRO_AVATAR_OPTIONS = [
  '👑', '💎', '🌟', '🧙', '🦋', '🐉', '🎩', '🕶️'
]

export const PRO_MONTHLY_PRICE_UZS = 29000

// Energy/lives system: free users get MAX_LIVES attempts before they must
// wait for regeneration (or upgrade to Pro for unlimited). One life is
// regained every LIFE_REGEN_MINUTES. Pro members (including everyone during
// the promo window below) never lose lives — the whole system is a no-op
// for them by design, so it only actually restricts anyone once the promo
// ends or for users who opt out of Pro.
export const MAX_LIVES = 5
export const LIFE_REGEN_MINUTES = 30

// TEMPORARY PROMO: Pro is unlocked for every user (no payment, no isPro
// flag needed) until this date. After it passes, isPro falls back to each
// user's real (paid) status automatically — no code change needed to end
// the promo, and no writes are made to anyone's actual isPro/proSince
// fields, so real payment history stays untouched. To end the promo early,
// just set this to a past date and redeploy.
export const PRO_PROMO_ENDS_AT = new Date('2026-08-12T23:59:59+05:00')

// Fill these in with your real merchant IDs from the Payme business cabinet
// and Click merchant cabinet. Until then, checkout buttons will show a
// setup notice instead of redirecting.
export const PAYME_MERCHANT_ID = ''
export const CLICK_MERCHANT_ID = ''

// Fill in with your bot's @username after creating it via @BotFather.
// Used only to build the "open this bot" instructions on the Profile page.
export const CLICK_SERVICE_ID = ''

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null,
    loading: true,
    authReady: false,
    notifications: []
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,

    level: (state) => state.profile?.level || 1,

    currentLevelWords: (state) => getWordsForLevel(state.profile?.level || 1),

    completedInCurrentLevel: (state) => {
      const level = state.profile?.level || 1
      const words = getWordsForLevel(level)
      const completed = state.profile?.completedWords || []
      return words.filter((w) => completed.includes(`${level}:${w.en}`)).length
    },

    levelProgressPercent: (state) => {
      const level = state.profile?.level || 1
      const words = getWordsForLevel(level)
      const completed = state.profile?.completedWords || []
      const done = words.filter((w) => completed.includes(`${level}:${w.en}`)).length
      return words.length > 0 ? Math.round((done / words.length) * 100) : 0
    },

    isMaxLevel: (state) => (state.profile?.level || 1) >= maxLevel,

    needsOnboarding: (state) => state.profile != null && state.profile.onboardingCompleted === false,
    // Shows the spotlight walkthrough once — for brand-new accounts right
    // after onboarding, and once for existing accounts that predate this
    // feature (their profile simply won't have the field yet).
    needsGuidedTour: (state) => state.profile != null && state.profile.onboardingCompleted !== false && state.profile.tourCompleted !== true,

    remindersEnabled: (state) => !!state.profile?.remindersEnabled,

    // During the promo window, every logged-in user is treated as Pro
    // regardless of payment status. `realIsPro` still reflects the actual
    // paid/granted status (used e.g. to decide whether to show "trial" vs
    // "your plan" messaging). No Firestore writes happen for this — it's
    // purely a client-side unlock that expires automatically.
    realIsPro: (state) => !!state.profile?.isPro,
    isPromoActive: () => Date.now() < PRO_PROMO_ENDS_AT.getTime(),
    isPro(state) {
      if (Date.now() < PRO_PROMO_ENDS_AT.getTime()) return true
      return !!state.profile?.isPro
    },

    // There is no self-service way to become admin — this flag must be set
    // manually on the user's Firestore document (users/{uid}.isAdmin = true)
    // from the Firebase console. Keeping it out of the client-writable
    // profile fields is intentional.
    isAdmin: (state) => !!state.profile?.isAdmin,

    streakCount: (state) => state.profile?.streak || 0,

    followingCount: (state) => state.profile?.following?.length || 0,
    followersCount: (state) => state.profile?.followers?.length || 0,

    hasActivePartner: (state) => !!state.profile?.activePartnerId,
    activePartnerId: (state) => state.profile?.activePartnerId || null,
    incomingPartnerRequests: (state) => state.profile?.partnerRequestsIncoming || [],
    sentPartnerRequests: (state) => state.profile?.partnerRequestsSent || [],

    dailyGoal: (state) => state.profile?.dailyGoal || DEFAULT_DAILY_GOAL,

    weeklyActivity: (state) => {
      const weekStart = getWeekStart()
      return state.profile?.weeklyActivityWeek === weekStart ? (state.profile.weeklyActivity || {}) : {}
    },

    todayPlan(state) {
      return buildTodayPlan({
        level: state.profile?.level || 1,
        dueWordsCount: this.dueWordsCount,
        mistakeWordsCount: this.mistakeWordsCount,
        weeklyActivity: this.weeklyActivity,
        levelProgressPercent: this.levelProgressPercent
      })
    },

    cefrBand: (state) => cefrForLevel(state.profile?.level || 1),

    unreadNotificationCount: (state) => state.notifications.filter((n) => !n.read).length,

    // Best band achieved per IELTS skill so far, plus a simple average
    // across whichever skills have been attempted at least once.
    ieltsScores: (state) => state.profile?.ieltsScores || {},
    ieltsOverallBand(state) {
      const scores = state.profile?.ieltsScores || {}
      const values = Object.values(scores).filter((v) => typeof v === 'number')
      if (!values.length) return null
      const avg = values.reduce((a, b) => a + b, 0) / values.length
      return Math.round(avg * 2) / 2 // round to nearest 0.5, IELTS band step
    },

    // Last 7 days of XP (oldest first), each { date, label, xp }, used by
    // the Progress Dashboard's weekly bar chart. Falls back to 0 for days
    // with no logged activity.
    last7DaysXp(state) {
      const log = state.profile?.dailyXpLog || {}
      const days = []
      const dayLabels = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan']
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const key = d.toISOString().slice(0, 10)
        days.push({ date: key, label: dayLabels[d.getDay()], xp: log[key] || 0 })
      }
      return days
    },

    // Last ~30 days of XP grouped into ISO weeks (oldest first), each
    // { weekStart, xp }, used by the Progress Dashboard's monthly trend.
    last30DaysWeeklyXp(state) {
      const log = state.profile?.dailyXpLog || {}
      const buckets = {}
      for (let i = 29; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const key = d.toISOString().slice(0, 10)
        const weekStart = getWeekStart(d)
        buckets[weekStart] = (buckets[weekStart] || 0) + (log[key] || 0)
      }
      return Object.entries(buckets)
        .sort((a, b) => (a[0] < b[0] ? -1 : 1))
        .map(([weekStart, xp]) => ({ weekStart, xp }))
    },

    // Weak/strong-point analytics for the Progress Dashboard: per-skill
    // activity share (relative, out of the busiest skill this week) plus
    // the words the learner struggles with most (lowest SRS ease factor =
    // most often gotten wrong).
    analytics(state) {
      const activity = this.weeklyActivity
      const skillIds = ['vocabulary', 'grammar', 'listening', 'speaking', 'writing', 'aiTeacher']
      const max = Math.max(1, ...skillIds.map((id) => activity[id] || 0))
      const skillPercents = skillIds.reduce((acc, id) => {
        acc[id] = Math.round(((activity[id] || 0) / max) * 100)
        return acc
      }, {})

      const cards = state.profile?.srsCards || {}
      const weakWords = Object.entries(cards)
        .filter(([, c]) => c.reps > 0)
        .sort((a, b) => a[1].ef - b[1].ef)
        .slice(0, 5)
        .map(([word, card]) => ({ word, ef: card.ef, label: masteryLabel(card) }))

      const totalReviewed = Object.values(cards).filter((c) => c.reps > 0).length

      return { skillPercents, weakWords, totalReviewed }
    },

    achievements: (state) => {
      if (!state.profile) return []
      const claimed = state.profile.claimedAchievements || []
      const unlockedIds = new Set(getUnlockedAchievements(state.profile).map((a) => a.id))
      return ACHIEVEMENTS.map((a) => ({
        ...a,
        unlocked: unlockedIds.has(a.id),
        claimed: claimed.includes(a.id)
      }))
    },

    dailyQuests: (state) => {
      const today = new Date().toDateString()
      const stats = state.profile?.dailyStats?.date === today ? state.profile.dailyStats : {}
      const claimed = stats.claimed || []
      return DAILY_QUEST_DEFS.map((q) => {
        const progress = Math.min(stats[q.id] || 0, q.target)
        return {
          ...q,
          progress,
          completed: progress >= q.target,
          claimed: claimed.includes(q.id)
        }
      })
    },
    dailyXpToday: (state) => (state.profile?.dailyXpDate === new Date().toDateString() ? state.profile?.dailyXpToday || 0 : 0),
    dailyGoalPercent: (state) => {
      const goal = state.profile?.dailyGoal || DEFAULT_DAILY_GOAL
      const today = state.profile?.dailyXpDate === new Date().toDateString() ? state.profile?.dailyXpToday || 0 : 0
      return goal > 0 ? Math.min(100, Math.round((today / goal) * 100)) : 0
    },
    dailyGoalReached: (state) => {
      const goal = state.profile?.dailyGoal || DEFAULT_DAILY_GOAL
      const today = state.profile?.dailyXpDate === new Date().toDateString() ? state.profile?.dailyXpToday || 0 : 0
      return today >= goal
    },

    streakFreezeAvailable: (state) => !!state.profile?.streakFreezeAvailable || (state.profile?.streakFreezeCount || 0) > 0,
    streakFreezeCount: (state) => state.profile?.streakFreezeCount || 0,
    gems: (state) => state.profile?.gems || 0,

    leagueIndex: (state) => state.profile?.leagueIndex ?? DEFAULT_LEAGUE_INDEX,
    myLeagueTier(state) {
      return LEAGUE_TIERS[state.profile?.leagueIndex ?? DEFAULT_LEAGUE_INDEX]
    },

    // Pro members (real or promo) always show a full heart and never lose
    // lives — computed lazily, no Firestore write needed just to read this.
    currentLives(state) {
      if (this.isPro) return MAX_LIVES
      const raw = state.profile?.lives ?? MAX_LIVES
      if (raw >= MAX_LIVES) return MAX_LIVES
      const updatedAt = state.profile?.livesUpdatedAt
      if (!updatedAt) return raw
      const elapsedMs = Date.now() - updatedAt
      const gained = Math.floor(elapsedMs / (LIFE_REGEN_MINUTES * 60 * 1000))
      return Math.min(MAX_LIVES, raw + gained)
    },

    hasLives() {
      return this.isPro || this.currentLives > 0
    },

    // Milliseconds until the next life regenerates (0 if full or Pro).
    msUntilNextLife(state) {
      if (this.isPro || this.currentLives >= MAX_LIVES) return 0
      const updatedAt = state.profile?.livesUpdatedAt || Date.now()
      const cycleMs = LIFE_REGEN_MINUTES * 60 * 1000
      const remainder = (Date.now() - updatedAt) % cycleMs
      return cycleMs - remainder
    },

    weeklyXp: (state) => state.profile?.weeklyXp || 0,

    srsCards: (state) => state.profile?.srsCards || {},

    dueWords: (state) => {
      const cards = state.profile?.srsCards || {}
      const due = Object.entries(cards)
        .filter(([, card]) => isDue(card))
        .map(([en, card]) => ({ en, card, overdue: overdueDays(card) }))
        .sort((a, b) => b.overdue - a.overdue)
      return due
    },

    dueWordsCount() {
      return this.dueWords.length
    },

    // Words that were actually reviewed incorrectly. New/unreviewed cards are
    // excluded so the mistake bank only shows things the learner struggled with.
    mistakeWords(state) {
      const cards = state.profile?.srsCards || {}
      return Object.entries(cards)
        .filter(([, card]) => card?.lastReviewed && card?.reps === 0)
        .sort((a, b) => (a[1].ef || 2.5) - (b[1].ef || 2.5))
        .map(([en, card]) => ({ en, card, overdue: overdueDays(card) }))
    },

    mistakeWordsCount() {
      return this.mistakeWords.length
    },

    smartReviewWords() {
      const due = this.dueWords.map((item) => item.en)
      const mistakes = this.mistakeWords.map((item) => item.en)
      const tracked = Object.entries(state.profile?.srsCards || {})
        .filter(([en, card]) => !due.includes(en) && !mistakes.includes(en) && (card?.interval || 0) > 0 && (card?.ef || 2.5) < 2.35)
        .sort((a, b) => (a[1].ef || 2.5) - (b[1].ef || 2.5))
        .map(([en]) => en)
      return [...new Set([...due, ...mistakes, ...tracked])].slice(0, 8)
    },

    totalTrackedWords: (state) => Object.keys(state.profile?.srsCards || {}).length,

    masteredWordsCount: (state) => {
      const cards = state.profile?.srsCards || {}
      return Object.values(cards).filter((c) => c.interval >= 21).length
    }
  },

  actions: {
    initAuthListener() {
      onAuthStateChanged(auth, async (firebaseUser) => {
        this.user = firebaseUser
        try {
          if (firebaseUser) {
            await this.loadOrCreateProfile(firebaseUser)
            await this.checkAndResetWeekly()
          } else {
            this.profile = null
          }
        } catch (error) {
          console.error('EnglishXP auth initialization failed:', error)
        } finally {
          this.loading = false
          this.authReady = true
        }
      })
    },

    async loadOrCreateProfile(firebaseUser) {
      const ref = doc(db, 'users', firebaseUser.uid)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        const data = snap.data()
        this.profile = {
          level: 1,
          following: [],
          followers: [],
          activePartnerId: null,
          partnerRequestsIncoming: [],
          partnerRequestsSent: [],
          avatar: '🦁',
          dailyGoal: DEFAULT_DAILY_GOAL,
          dailyXpToday: 0,
          dailyXpDate: null,
          streakFreezeAvailable: false,
          streakFreezeCount: 0,
          gems: 0,
          xpBoostUntil: 0,
          shopWelcomeBonusClaimed: false,
          weeklyXp: 0,
          weekStart: null,
          leagueIndex: DEFAULT_LEAGUE_INDEX,
          lastLeagueResult: null,
          lives: MAX_LIVES,
          livesUpdatedAt: null,
          srsCards: {},
          onboardingCompleted: true,
          tourCompleted: false,
          remindersEnabled: false,
          isPro: false,
          proSince: null,
          proExpiresAt: null,
          topicStats: {},
          skillScores: {},
          completedSprints: 0,
          completedCheckpoints: [],
          mistakeFixes: 0,
          ...data
        }
      } else {
        const newProfile = {
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Foydalanuvchi',
          email: firebaseUser.email,
          avatar: '🦁',
          xp: 0,
          level: 1,
          streak: 0,
          lastActiveDate: null,
          completedWords: [],
          following: [],
          followers: [],
          activePartnerId: null,
          partnerRequestsIncoming: [],
          partnerRequestsSent: [],
          dailyGoal: DEFAULT_DAILY_GOAL,
          dailyXpToday: 0,
          dailyXpDate: null,
          streakFreezeAvailable: false,
          streakFreezeCount: 0,
          gems: 0,
          xpBoostUntil: 0,
          shopWelcomeBonusClaimed: false,
          weeklyXp: 0,
          weekStart: getWeekStart(),
          leagueIndex: DEFAULT_LEAGUE_INDEX,
          lastLeagueResult: null,
          lives: MAX_LIVES,
          livesUpdatedAt: null,
          srsCards: {},
          onboardingCompleted: false,
          tourCompleted: false,
          remindersEnabled: false,
          isPro: false,
          proSince: null,
          proExpiresAt: null,
          topicStats: {},
          skillScores: {},
          completedSprints: 0,
          completedCheckpoints: [],
          mistakeFixes: 0,
          createdAt: serverTimestamp()
        }
        await setDoc(ref, newProfile)
        this.profile = newProfile
      }
    },

    // Re-pulls MY OWN doc from Firestore and merges it into local state.
    // Needed because we don't use onSnapshot listeners: if someone else
    // writes to a cross-user field on my doc (follows me back, accepts my
    // partner request, ...), my in-memory profile doesn't know about it
    // until this runs. Call this whenever stale social state could cause a
    // wrong decision (e.g. opening the People page, or right before
    // sending a partner request that depends on mutual-follow being true).
    async refreshProfile() {
      if (!this.user) return
      const snap = await getDoc(doc(db, 'users', this.user.uid))
      if (snap.exists()) {
        this.profile = { ...this.profile, ...snap.data() }
      }
    },

    // Call this when a wrong answer is submitted in a lesson/quiz. No-op
    // (and no Firestore write) for Pro members, including everyone during
    // the promo window — the whole system quietly does nothing until the
    // promo ends or a specific user isn't Pro.
    async loseLife() {
      if (!this.user || !this.profile) return
      if (this.isPro) return
      const effective = this.currentLives
      const newLives = Math.max(0, effective - 1)
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { lives: newLives, livesUpdatedAt: Date.now() })
      this.profile.lives = newLives
      this.profile.livesUpdatedAt = Date.now()
    },

    // Settles any regen owed into Firestore (e.g. when opening a lesson),
    // so the stored count stays roughly in sync instead of only ever being
    // computed client-side. Cheap no-op if already full or nothing changed.
    async syncLives() {
      if (!this.user || !this.profile) return
      if (this.isPro) return
      const effective = this.currentLives
      const stored = this.profile.lives ?? MAX_LIVES
      if (effective === stored && this.profile.livesUpdatedAt) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { lives: effective, livesUpdatedAt: Date.now() })
      this.profile.lives = effective
      this.profile.livesUpdatedAt = Date.now()
    },

    // Streaks represent real learning activity, not simply opening the app.
    // The first completed learning action of the day calls this helper.
    async recordLearningActivity() {
      if (!this.profile || !this.user) return
      return this.checkAndUpdateStreak()
    },

    async checkAndUpdateStreak() {
      if (!this.profile || !this.user) return

      const today = new Date().toDateString()
      const lastActive = this.profile.lastActiveDate

      if (lastActive === today) return

      let newStreak = 1
      let usedFreeze = false
      // Freezes can come from the old boolean flag (legacy accounts) or the
      // new purchasable/earned count — treat them as one combined stock.
      let freezeStock = (this.profile.streakFreezeAvailable ? 1 : 0) + (this.profile.streakFreezeCount || 0)

      if (lastActive) {
        const lastDate = new Date(lastActive)
        const diffDays = Math.round((new Date(today) - lastDate) / (1000 * 60 * 60 * 24))
        if (diffDays === 1) {
          newStreak = (this.profile.streak || 0) + 1
        } else if (diffDays === 2 && freezeStock > 0) {
          // Missed exactly one day but had a freeze saved — streak survives.
          newStreak = (this.profile.streak || 0) + 1
          usedFreeze = true
          freezeStock -= 1
        }
      }

      // Grant a free streak freeze every 7-day milestone, capped at 3 in stock
      // so gem-bought ones (see buyStreakFreeze) still feel worth paying for.
      if (!usedFreeze && newStreak > 0 && newStreak % 7 === 0 && freezeStock < 3) {
        freezeStock += 1
      }

      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, {
        streak: newStreak,
        lastActiveDate: today,
        streakFreezeAvailable: false,
        streakFreezeCount: freezeStock
      })
      this.profile.streak = newStreak
      this.profile.lastActiveDate = today
      this.profile.streakFreezeAvailable = false
      this.profile.streakFreezeCount = freezeStock
      this.syncFriendStreaks()
      this.checkAchievements()

      return { usedFreeze }
    },

    // Shop: spend gems to buy one extra Streak Freeze. All shop purchases
    // use a Firestore transaction so two quick clicks/tabs cannot overwrite
    // each other and accidentally duplicate/spend the wrong gem balance.
    async buyStreakFreeze() {
      if (!this.user || !this.profile) return { success: false, reason: 'no-profile' }
      const price = 200
      const cap = 3
      const ref = doc(db, 'users', this.user.uid)

      const result = await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref)
        if (!snap.exists()) return { success: false, reason: 'no-profile' }
        const data = snap.data()
        const currentStock = (data.streakFreezeAvailable ? 1 : 0) + (data.streakFreezeCount || 0)
        const gems = data.gems || 0
        if (currentStock >= cap) return { success: false, reason: 'max-stock' }
        if (gems < price) return { success: false, reason: 'not-enough-gems' }

        const newStock = currentStock + 1
        tx.update(ref, {
          gems: gems - price,
          streakFreezeAvailable: false,
          streakFreezeCount: newStock
        })
        return { success: true, gems: gems - price, stock: newStock }
      })

      if (!result?.success) return result
      this.profile.gems = result.gems
      this.profile.streakFreezeAvailable = false
      this.profile.streakFreezeCount = result.stock
      return { success: true }
    },

    // Shop: refill the learner's five hearts instantly.
    async buyLivesRefill() {
      if (!this.user || !this.profile) return { success: false, reason: 'no-profile' }
      const price = 120
      if (this.currentLives >= MAX_LIVES || this.isPro) return { success: false, reason: 'full-lives' }
      const ref = doc(db, 'users', this.user.uid)

      const result = await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref)
        if (!snap.exists()) return { success: false, reason: 'no-profile' }
        const data = snap.data()
        const gems = data.gems || 0
        if (gems < price) return { success: false, reason: 'not-enough-gems' }
        const now = Date.now()
        tx.update(ref, { gems: gems - price, lives: MAX_LIVES, livesUpdatedAt: now })
        return { success: true, gems: gems - price, livesUpdatedAt: now }
      })

      if (!result?.success) return result
      this.profile.gems = result.gems
      this.profile.lives = MAX_LIVES
      this.profile.livesUpdatedAt = result.livesUpdatedAt
      return { success: true }
    },

    // Shop: activate a temporary XP multiplier. Buying again extends the
    // current boost instead of throwing away the remaining time.
    async buyXpBoost(minutes = 30) {
      if (!this.user || !this.profile) return { success: false, reason: 'no-profile' }
      const price = 150
      const ref = doc(db, 'users', this.user.uid)

      const result = await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref)
        if (!snap.exists()) return { success: false, reason: 'no-profile' }
        const data = snap.data()
        const gems = data.gems || 0
        if (gems < price) return { success: false, reason: 'not-enough-gems' }
        const now = Date.now()
        const currentUntil = Number(data.xpBoostUntil || 0)
        const xpBoostUntil = Math.max(now, currentUntil) + minutes * 60 * 1000
        tx.update(ref, { gems: gems - price, xpBoostUntil })
        return { success: true, gems: gems - price, xpBoostUntil }
      })

      if (!result?.success) return result
      this.profile.gems = result.gems
      this.profile.xpBoostUntil = result.xpBoostUntil
      return { success: true }
    },

    // One-time onboarding bonus so the Shop is immediately testable and a
    // brand-new learner doesn't see every item disabled with 0 gems.
    async claimShopStarterBonus() {
      if (!this.user || !this.profile) return { success: false, reason: 'no-profile' }
      const ref = doc(db, 'users', this.user.uid)
      const bonus = 250

      const result = await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref)
        if (!snap.exists()) return { success: false, reason: 'no-profile' }
        const data = snap.data()
        if (data.shopWelcomeBonusClaimed === true) return { success: false, reason: 'already-claimed' }
        const gems = data.gems || 0
        tx.update(ref, { gems: gems + bonus, shopWelcomeBonusClaimed: true })
        return { success: true, gems: gems + bonus }
      })

      if (!result?.success) return result
      this.profile.gems = result.gems
      this.profile.shopWelcomeBonusClaimed = true
      return { success: true, bonus }
    },

    // Mystery Chest: a small, deterministic set of reward types with a
    // transaction-backed gem charge. The reward is granted immediately so
    // there is no second save step after the chest animation.
    async openMysteryChest() {
      if (!this.user || !this.profile) return { success: false, reason: 'no-profile' }
      const price = 250
      const ref = doc(db, 'users', this.user.uid)
      const roll = Math.floor(Math.random() * 3)

      const result = await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref)
        if (!snap.exists()) return { success: false, reason: 'no-profile' }
        const data = snap.data()
        const gems = data.gems || 0
        if (gems < price) return { success: false, reason: 'not-enough-gems' }

        const patch = { gems: gems - price }
        let reward
        if (roll === 0) {
          reward = { type: 'gems', amount: 350, label: '+350 gems 💎' }
          patch.gems = gems - price + reward.amount
        } else if (roll === 1) {
          reward = { type: 'freeze', amount: 1, label: '+1 Streak Freeze 🔥' }
          const currentStock = (data.streakFreezeAvailable ? 1 : 0) + (data.streakFreezeCount || 0)
          if (currentStock >= 3) {
            reward = { type: 'gems', amount: 220, label: '+220 gems 💎' }
            patch.gems = gems - price + reward.amount
          } else {
            patch.streakFreezeAvailable = false
            patch.streakFreezeCount = currentStock + 1
          }
        } else {
          reward = { type: 'boost', amount: 20, label: '+20 min XP Boost ⚡' }
          const now = Date.now()
          const base = Math.max(now, Number(data.xpBoostUntil || 0))
          patch.xpBoostUntil = base + 20 * 60 * 1000
        }

        tx.update(ref, patch)
        return { success: true, gems: patch.gems, xpBoostUntil: patch.xpBoostUntil, streakFreezeCount: patch.streakFreezeCount, reward }
      })

      if (!result?.success) return result
      this.profile.gems = result.gems
      if (result.streakFreezeCount != null) {
        this.profile.streakFreezeCount = result.streakFreezeCount
        this.profile.streakFreezeAvailable = false
      }
      if (result.xpBoostUntil != null) this.profile.xpBoostUntil = result.xpBoostUntil
      return result
    },

    async checkAndResetWeekly() {
      if (!this.profile || !this.user) return
      const currentWeekStart = getWeekStart()
      if (this.profile.weekStart === currentWeekStart) return

      const previousXp = this.profile.weeklyXp || 0
      await this.resolveLeaguePromotion()

      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { weeklyXp: 0, weekStart: currentWeekStart })
      this.profile.weeklyXp = 0
      this.profile.weekStart = currentWeekStart

      if (previousXp > 0 && this.profile.weekStart) {
        await this.pushNotification({
          id: `weeklyreport-${this.profile.weekStart}`,
          type: 'weekly_report',
          title: `O'tgan hafta ${previousXp} XP yig'dingiz!`,
          body: 'Progress Dashboard sahifasida batafsil hisobotni ko\'ring.',
          link: '/progress'
        })
      }
    },

    // Runs once per user, right before their weeklyXp resets for the new
    // week. Ranks this user among everyone still in the SAME league tier
    // (using the XP they just finished the week with), then promotes the
    // top LEAGUE_PROMOTION_ZONE finishers up a tier and demotes the bottom
    // LEAGUE_DEMOTION_ZONE finishers down a tier. Requires a Firestore
    // composite index on (leagueIndex asc, weeklyXp desc) — Firestore will
    // print a direct "create index" link in the console the first time this
    // query runs if it's missing.
    async resolveLeaguePromotion() {
      if (!this.profile || !this.user) return
      const myIndex = this.profile.leagueIndex ?? DEFAULT_LEAGUE_INDEX
      const myXp = this.profile.weeklyXp || 0

      try {
        const q = query(
          collection(db, 'users'),
          where('leagueIndex', '==', myIndex),
          orderBy('weeklyXp', 'desc'),
          limit(50)
        )
        const snap = await getDocs(q)
        const cohort = snap.docs.map((d) => ({ id: d.id, weeklyXp: d.data().weeklyXp || 0 }))

        // Make sure I'm represented even if my doc hasn't caught up yet.
        if (!cohort.find((c) => c.id === this.user.uid)) {
          cohort.push({ id: this.user.uid, weeklyXp: myXp })
          cohort.sort((a, b) => b.weeklyXp - a.weeklyXp)
        }

        const myRank = cohort.findIndex((c) => c.id === this.user.uid) + 1
        const cohortSize = cohort.length

        let newIndex = myIndex
        let result = null

        if (myRank > 0 && myRank <= LEAGUE_PROMOTION_ZONE && myIndex > 0) {
          newIndex = myIndex - 1
          result = 'promoted'
        } else if (
          cohortSize > LEAGUE_PROMOTION_ZONE &&
          myRank > cohortSize - LEAGUE_DEMOTION_ZONE &&
          myIndex < LEAGUE_TIERS.length - 1
        ) {
          newIndex = myIndex + 1
          result = 'demoted'
        }

        const ref = doc(db, 'users', this.user.uid)
        await updateDoc(ref, { leagueIndex: newIndex, lastLeagueResult: result })
        this.profile.leagueIndex = newIndex
        this.profile.lastLeagueResult = result

        if (result) {
          const tier = LEAGUE_TIERS[newIndex]
          await this.pushNotification({
            id: `league-${result}-${getWeekStart()}`,
            type: 'league_result',
            title: result === 'promoted'
              ? `Tabriklaymiz! ${tier.emoji} ${tier.name} ligasiga ko'tarildingiz!`
              : `${tier.emoji} ${tier.name} ligasiga tushib qoldingiz`,
            body: result === 'promoted'
              ? "O'tgan hafta yaxshi natija ko'rsatdingiz — davom eting!"
              : "Bu hafta ko'proq mashq qiling, qaytadan ko'tarilasiz!",
            link: '/leaderboard'
          })
        }
      } catch (err) {
        // Missing composite index or offline — don't block the weekly
        // reset over this, just skip promotion for this cycle.
        console.warn('League promotion check failed:', err)
      }
    },

    // Call from the Leaderboard page once the banner has been shown, so it
    // doesn't reappear on every visit.
    async clearLeagueResult() {
      if (!this.user || !this.profile?.lastLeagueResult) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { lastLeagueResult: null })
      this.profile.lastLeagueResult = null
    },

    async setDailyGoal(amount) {
      if (!this.user || !this.profile) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { dailyGoal: amount })
      this.profile.dailyGoal = amount
    },

    // Called after the placement test (or when the user skips it). Sets the
    // starting level based on the test result and marks onboarding as done
    // so the user is never shown the test again.
    async completeOnboarding(level) {
      if (!this.user || !this.profile) return
      const clamped = Math.min(Math.max(1, level), maxLevel)
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { level: clamped, onboardingCompleted: true })
      this.profile.level = clamped
      this.profile.onboardingCompleted = true
    },

    async skipOnboarding() {
      if (!this.user || !this.profile) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { onboardingCompleted: true })
      this.profile.onboardingCompleted = true
    },

    // Marks the one-time spotlight walkthrough as seen, whether the learner
    // finished it or tapped "O'tkazib yuborish".
    async completeTour() {
      if (!this.user || !this.profile) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { tourCompleted: true })
      this.profile.tourCompleted = true
    },

    async setRemindersEnabled(enabled) {
      if (!this.user || !this.profile) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { remindersEnabled: enabled })
      this.profile.remindersEnabled = enabled
    },

    // DEV/TEST ONLY: this direct write now fails against firestore.rules in
    // any real deployment (isPro can only flip true via the Payme/Click
    // Cloud Functions using the Admin SDK). Kept only so local emulator
    // testing without live payment credentials still has a way to simulate
    // success; it will silently no-op (permission-denied) in production.
    async upgradeToPro() {
      if (!this.user || !this.profile) return
      try {
        const ref = doc(db, 'users', this.user.uid)
        const now = new Date().toISOString()
        await updateDoc(ref, { isPro: true, proSince: now })
        this.profile.isPro = true
        this.profile.proSince = now
      } catch (err) {
        console.warn('Direct isPro grant blocked by security rules (expected in production):', err.code)
        throw err
      }
    },

    async cancelPro() {
      if (!this.user || !this.profile) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { isPro: false })
      this.profile.isPro = false
    },

    // Bumps one daily-quest counter (correctAnswers, lessonsCompleted,
    // matchMadnessWins). Resets automatically when the date rolls over, and
    // auto-awards the quest's XP the moment its target is first reached.
    async incrementDailyStat(key, amount = 1) {
      if (!this.user || !this.profile) return
      const today = new Date().toDateString()
      const sameDay = this.profile.dailyStats?.date === today
      const stats = sameDay ? { ...this.profile.dailyStats } : { date: today, claimed: [] }
      stats[key] = (stats[key] || 0) + amount

      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { dailyStats: stats })
      this.profile.dailyStats = stats

      const quest = DAILY_QUEST_DEFS.find((q) => q.id === key)
      if (quest && stats[key] >= quest.target && !(stats.claimed || []).includes(key)) {
        await this.claimDailyQuest(key)
      }
    },

    async claimDailyQuest(questId) {
      if (!this.user || !this.profile) return
      const quest = DAILY_QUEST_DEFS.find((q) => q.id === questId)
      if (!quest) return
      const today = new Date().toDateString()
      const stats = this.profile.dailyStats?.date === today ? { ...this.profile.dailyStats } : { date: today, claimed: [] }
      const claimed = stats.claimed || []
      if (claimed.includes(questId) || (stats[questId] || 0) < quest.target) return

      stats.claimed = [...claimed, questId]
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { dailyStats: stats })
      this.profile.dailyStats = stats
      await this.addXp(quest.xpReward)
    },

    // Call after any action that could unlock an achievement (XP gain, level
    // up, streak update, etc). Auto-claims any newly-unlocked one and pays
    // out its one-time XP bonus.
    async checkAchievements() {
      if (!this.user || !this.profile) return []
      const claimed = this.profile.claimedAchievements || []
      const newlyUnlocked = getUnlockedAchievements(this.profile).filter((a) => !claimed.includes(a.id))
      if (!newlyUnlocked.length) return []

      const updatedClaimed = [...claimed, ...newlyUnlocked.map((a) => a.id)]
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { claimedAchievements: updatedClaimed })
      this.profile.claimedAchievements = updatedClaimed

      for (const a of newlyUnlocked) {
        await this.addXp(a.xp)
      }
      return newlyUnlocked
    },

    async addXp(baseAmount, skillId = null) {
      if (!this.user || !this.profile) return
      const proMultiplier = this.isPro ? 2 : 1
      const boostMultiplier = Number(this.profile.xpBoostUntil || 0) > Date.now() ? 1.5 : 1
      const amount = Math.round(baseAmount * proMultiplier * boostMultiplier)
      // Gems trickle in alongside XP — a slower, separate currency spent in
      // the shop (streak freezes, etc.), never on lesson progress itself.
      const gemsEarned = Math.max(1, Math.round(amount / 5))
      const ref = doc(db, 'users', this.user.uid)
      const today = new Date().toDateString()
      const sameDay = this.profile.dailyXpDate === today
      const newDailyXp = (sameDay ? this.profile.dailyXpToday || 0 : 0) + amount

      const patch = {
        xp: increment(amount),
        weeklyXp: increment(amount),
        gems: increment(gemsEarned),
        dailyXpToday: newDailyXp,
        dailyXpDate: today
      }

      // Lightweight per-skill weekly counters, reset whenever the ISO week
      // changes, used to drive the Learning Path "weakest skill" suggestion.
      // Reuses the existing weekStart helper so it stays aligned with the
      // rest of the weekly-reset logic (weeklyXp etc.).
      // Rolling daily XP log (last 35 days), keyed by YYYY-MM-DD, powers the
      // Progress Dashboard's weekly/monthly charts. Trimmed on every write
      // so the document never grows unbounded.
      const dateKey = new Date().toISOString().slice(0, 10)
      const existingLog = { ...(this.profile.dailyXpLog || {}) }
      existingLog[dateKey] = (existingLog[dateKey] || 0) + amount
      const trimmedEntries = Object.entries(existingLog)
        .sort((a, b) => (a[0] < b[0] ? 1 : -1))
        .slice(0, 35)
      const dailyXpLog = Object.fromEntries(trimmedEntries)
      patch.dailyXpLog = dailyXpLog
      this.profile.dailyXpLog = dailyXpLog

      if (skillId) {
        const weekStart = getWeekStart()
        const sameWeek = this.profile.weeklyActivityWeek === weekStart
        const current = sameWeek ? { ...(this.profile.weeklyActivity || {}) } : {}
        current[skillId] = (current[skillId] || 0) + 1
        patch.weeklyActivity = current
        patch.weeklyActivityWeek = weekStart
        this.profile.weeklyActivity = current
        this.profile.weeklyActivityWeek = weekStart
      }

      await updateDoc(ref, patch)
      this.profile.xp += amount
      this.profile.weeklyXp = (this.profile.weeklyXp || 0) + amount
      this.profile.gems = (this.profile.gems || 0) + gemsEarned
      this.profile.dailyXpToday = newDailyXp
      this.profile.dailyXpDate = today
      return amount
    },

    // Records the outcome of a single review (right or wrong) into the
    // word's spaced-repetition card and reschedules its next due date.
    async recordMistakeFixed() {
      if (!this.user || !this.profile) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { mistakeFixes: increment(1) })
      this.profile.mistakeFixes = (this.profile.mistakeFixes || 0) + 1
    },

    async reviewWord(wordEn, correct) {
      if (!this.user || !this.profile || !wordEn) return
      const cards = this.profile.srsCards || {}
      const updatedCard = reviewCard(cards[wordEn], correct)
      const updatedCards = { ...cards, [wordEn]: updatedCard }

      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { srsCards: updatedCards })
      this.profile.srsCards = updatedCards
      return updatedCard
    },

    // Tracks per-topic right/wrong counts for a subject (e.g. subject
    // 'grammar', topicId the grammar level number, topicLabel the display
    // title). Powers the Analytics page's "weakest topics" list. Cheap to
    // call per-question since it's a single small nested object write.
    async recordTopicResult(subject, topicId, topicLabel, correct) {
      if (!this.user || !this.profile || !subject || topicId == null) return
      const allStats = { ...(this.profile.topicStats || {}) }
      const subjectStats = { ...(allStats[subject] || {}) }
      const key = String(topicId)
      const prev = subjectStats[key] || { label: topicLabel, correct: 0, wrong: 0 }
      subjectStats[key] = {
        label: topicLabel || prev.label,
        correct: prev.correct + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1)
      }
      allStats[subject] = subjectStats

      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { topicStats: allStats })
      this.profile.topicStats = allStats
    },

    // Appends one session result (correct/total) to a skill's rolling score
    // history, capped at the last 20 sessions, used by Analytics to show
    // per-skill accuracy % and trend (listening, writing, speaking, grammar).
    async recordSkillScore(subject, correct, total) {
      if (!this.user || !this.profile || !subject || !total) return
      const allScores = { ...(this.profile.skillScores || {}) }
      const history = [...(allScores[subject] || [])]
      history.push({ correct, total, date: new Date().toISOString() })
      allScores[subject] = history.slice(-20)

      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { skillScores: allScores })
      this.profile.skillScores = allScores
    },

    async markListeningCompleted() {
      if (!this.user || !this.profile) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { listeningCompleted: increment(1) })
      this.profile.listeningCompleted = (this.profile.listeningCompleted || 0) + 1
      this.checkAchievements()
    },

    async markStoryCompleted(storyId) {
      if (!this.user || !this.profile) return
      const completed = this.profile.completedStories || []
      if (completed.includes(storyId)) return
      const updated = [...completed, storyId]
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { completedStories: updated })
      this.profile.completedStories = updated
      this.checkAchievements()
    },

    // Called when the learner taps an unfamiliar word while reading a story.
    // Adds it to the SRS deck (so it shows up in review/flashcards later)
    // if it isn't tracked yet — this is the Reading section's "auto-save
    // vocabulary" behavior. Returns 'new', 'already-tracked', or 'unknown'.
    async saveWordFromReading(wordEn) {
      if (!this.user || !this.profile || !wordEn) return 'unknown'
      const cards = this.profile.srsCards || {}
      if (cards[wordEn]) return 'already-tracked'

      const updatedCards = { ...cards, [wordEn]: createCard() }
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { srsCards: updatedCards })
      this.profile.srsCards = updatedCards
      return 'new'
    },

    async markWordCompleted(wordEn, levelNum) {
      if (!this.user || !this.profile) return false
      const level = levelNum || this.profile.level || 1
      const key = `${level}:${wordEn}`
      if (this.profile.completedWords?.includes(key)) return false

      const updated = [...(this.profile.completedWords || []), key]
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { completedWords: updated })
      this.profile.completedWords = updated
      await this.addXp(XP_REWARDS.newWordLearned)

      await this.checkLevelCompletion(level)
      return true
    },

    async recordCheckpoint(level, correct, total) {
      if (!this.user || !this.profile || !total) return
      const existing = [...(this.profile.completedCheckpoints || [])]
      const entry = { level: Number(level), correct: Number(correct), total: Number(total), date: new Date().toISOString() }
      const updated = [...existing, entry].slice(-20)
      await updateDoc(doc(db, 'users', this.user.uid), { completedCheckpoints: updated })
      this.profile.completedCheckpoints = updated
      return entry
    },

    async incrementSprintCount() {
      if (!this.user || !this.profile) return 0
      const next = (this.profile.completedSprints || 0) + 1
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { completedSprints: next })
      this.profile.completedSprints = next
      return next
    },

    async checkLevelCompletion(levelNum) {
      const level = levelNum || this.profile.level || 1
      if (level >= maxLevel || level !== (this.profile.level || 1)) return false

      const words = getWordsForLevel(level)
      const completed = this.profile.completedWords || []
      const allDone = words.every((w) => completed.includes(`${level}:${w.en}`))

      if (allDone) {
        const nextLevel = level + 1
        const ref = doc(db, 'users', this.user.uid)
        await updateDoc(ref, { level: nextLevel })
        this.profile.level = nextLevel
        this.checkAchievements()
        await this.pushNotification({
          id: `levelup-${nextLevel}`,
          type: 'level_up',
          title: `Tabriklaymiz! Siz ${nextLevel}-darajaga chiqdingiz`,
          body: 'Yangi so\'zlar va mashqlar sizni kutmoqda.',
          link: `/lesson/${nextLevel}`
        })
        return true
      }
      this.checkAchievements()
      return false
    },

    async updateDisplayName(newName) {
      if (!this.user || !newName?.trim()) return
      const trimmed = newName.trim()
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { displayName: trimmed })
      this.profile.displayName = trimmed
      try {
        await updateProfile(this.user, { displayName: trimmed })
      } catch {
        // Non-fatal
      }
    },

    async updateAvatar(emoji) {
      if (!this.user || !emoji) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { avatar: emoji })
      this.profile.avatar = emoji
    },

    async followUser(targetUid) {
      if (!this.user || targetUid === this.user.uid) return
      const myRef = doc(db, 'users', this.user.uid)
      const theirRef = doc(db, 'users', targetUid)
      await updateDoc(myRef, { following: arrayUnion(targetUid) })
      await updateDoc(theirRef, { followers: arrayUnion(this.user.uid) })
      if (!this.profile.following) this.profile.following = []
      if (!this.profile.following.includes(targetUid)) {
        this.profile.following.push(targetUid)
      }
      this.checkAchievements()
    },

    async unfollowUser(targetUid) {
      if (!this.user) return
      const myRef = doc(db, 'users', this.user.uid)
      const theirRef = doc(db, 'users', targetUid)
      await updateDoc(myRef, { following: arrayRemove(targetUid) })
      await updateDoc(theirRef, { followers: arrayRemove(this.user.uid) })
      this.profile.following = (this.profile.following || []).filter((id) => id !== targetUid)
    },

    isFollowing(targetUid) {
      return (this.profile?.following || []).includes(targetUid)
    },

    isMutualFollow(targetUid) {
      const following = this.profile?.following || []
      const followers = this.profile?.followers || []
      return following.includes(targetUid) && followers.includes(targetUid)
    },

    // --- Community discussion boards ---
    // Posts are grouped by a fixed topic id (see COMMUNITY_GROUPS below).
    // Kept intentionally simple: no edit, no pagination cursor beyond a
    // fixed recent-N limit, likes are a small subcollection so a user can
    // only like once per post.

    async fetchCommunityPosts(groupId, max = 30) {
      const q = query(
        collection(db, 'discussions'),
        where('groupId', '==', groupId),
        orderBy('createdAt', 'desc'),
        limit(max)
      )
      const snap = await getDocs(q)
      const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }))

      // Attach like count + whether the current user liked each post.
      await Promise.all(posts.map(async (post) => {
        const likesSnap = await getCountFromServer(collection(db, 'discussions', post.id, 'likes'))
        post.likeCount = likesSnap.data().count
        if (this.user) {
          const mineSnap = await getDoc(doc(db, 'discussions', post.id, 'likes', this.user.uid))
          post.likedByMe = mineSnap.exists()
        }
        const commentsSnap = await getCountFromServer(collection(db, 'discussions', post.id, 'comments'))
        post.commentCount = commentsSnap.data().count
      }))
      return posts
    },

    async createCommunityPost(groupId, text) {
      if (!this.user || !this.profile || !text?.trim()) return null
      const ref = await addDoc(collection(db, 'discussions'), {
        groupId,
        authorId: this.user.uid,
        authorName: this.profile.displayName || 'Foydalanuvchi',
        authorAvatar: this.profile.avatar || '🦁',
        authorPhotoURL: this.profile.photoURL || null,
        text: text.trim().slice(0, 1000),
        createdAt: serverTimestamp()
      })
      return ref.id
    },

    async deleteCommunityPost(postId) {
      if (!this.user) return
      await deleteDoc(doc(db, 'discussions', postId))
    },

    async fetchComments(postId) {
      const q = query(collection(db, 'discussions', postId, 'comments'), orderBy('createdAt', 'asc'), limit(100))
      const snap = await getDocs(q)
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    },

    async createComment(postId, text) {
      if (!this.user || !this.profile || !text?.trim()) return null
      const ref = await addDoc(collection(db, 'discussions', postId, 'comments'), {
        authorId: this.user.uid,
        authorName: this.profile.displayName || 'Foydalanuvchi',
        authorAvatar: this.profile.avatar || '🦁',
        text: text.trim().slice(0, 500),
        createdAt: serverTimestamp()
      })
      return ref.id
    },

    async toggleLikePost(postId, currentlyLiked) {
      if (!this.user) return
      const ref = doc(db, 'discussions', postId, 'likes', this.user.uid)
      if (currentlyLiked) {
        await deleteDoc(ref)
      } else {
        await setDoc(ref, { likedAt: serverTimestamp() })
      }
    },

    // --- In-app notifications ---
    // Stored per-user at users/{uid}/notifications/{id}. Most notification
    // types use a deterministic doc id (e.g. `practice-2026-07-12`) via
    // setDoc so re-triggering the same event on the same day never creates
    // duplicates — no server-side cron needed.
    // Keeps the learner's BEST band per IELTS skill (reading/listening/
    // writing/speaking), not the most recent, so retaking a test never
    // makes their overall band look worse.
    async recordIeltsScore(skill, band) {
      if (!this.user || !this.profile || typeof band !== 'number') return
      const scores = { ...(this.profile.ieltsScores || {}) }
      if (!scores[skill] || band > scores[skill]) {
        scores[skill] = band
        const ref = doc(db, 'users', this.user.uid)
        await updateDoc(ref, { ieltsScores: scores })
        this.profile.ieltsScores = scores
      }
    },

    async fetchNotifications() {
      if (!this.user) return
      const q = query(
        collection(db, 'users', this.user.uid, 'notifications'),
        orderBy('createdAt', 'desc'),
        limit(20)
      )
      const snap = await getDocs(q)
      this.notifications = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    },

    async pushNotification({ id, type, title, body, link }) {
      if (!this.user) return
      const ref = id
        ? doc(db, 'users', this.user.uid, 'notifications', id)
        : doc(collection(db, 'users', this.user.uid, 'notifications'))
      if (id) {
        const existing = await getDoc(ref)
        if (existing.exists()) return // already sent today/this week — skip
      }
      await setDoc(ref, { type, title, body, link: link || null, read: false, createdAt: serverTimestamp() })
      this.notifications = [{ id: ref.id, type, title, body, link: link || null, read: false, createdAt: { toDate: () => new Date() } }, ...this.notifications].slice(0, 20)
    },

    async markAllNotificationsRead() {
      if (!this.user) return
      const unread = this.notifications.filter((n) => !n.read)
      if (!unread.length) return
      await Promise.all(unread.map((n) => updateDoc(doc(db, 'users', this.user.uid, 'notifications', n.id), { read: true })))
      this.notifications = this.notifications.map((n) => ({ ...n, read: true }))
    },

    // Checked once per app load: if the learner hasn't earned any XP today
    // yet, gently nudge them. Deduped per calendar day.
    async checkPracticeReminder() {
      if (!this.user || !this.profile) return
      if (this.dailyXpToday > 0) return
      const today = new Date().toISOString().slice(0, 10)
      const streak = this.profile.streak || 0
      await this.pushNotification({
        id: `practice-${today}`,
        type: 'practice_reminder',
        title: streak > 0 ? `${streak} kunlik streak'ingizni saqlab qoling!` : "Bugungi mashqni unutmang",
        body: "Hali bugun mashq qilmadingiz — bir necha daqiqa ajrating.",
        link: '/daily-challenge'
      })
    },

    async fetchMutualFollows() {
      if (!this.profile) return []
      const following = this.profile?.following || []
      const followers = this.profile?.followers || []
      const mutualIds = following.filter((id) => followers.includes(id))
      if (!mutualIds.length) return []
      const profiles = await Promise.all(mutualIds.map((id) => this.fetchUserProfile(id)))
      return profiles.filter(Boolean)
    },

    // Friend Streak: for each mutual-follow friend, if both people practiced
    // "today", bump a shared consecutive-day counter. Written to both users'
    // docs so the number matches on either side.
    async syncFriendStreaks() {
      if (!this.user || !this.profile) return
      const following = this.profile.following || []
      const followers = this.profile.followers || []
      const mutualIds = following.filter((id) => followers.includes(id))
      if (!mutualIds.length) return

      const today = new Date().toDateString()
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const myStreaks = { ...(this.profile.friendStreaks || {}) }
      let changed = false

      for (const friendId of mutualIds) {
        const friendSnap = await getDoc(doc(db, 'users', friendId))
        if (!friendSnap.exists()) continue
        const friendData = friendSnap.data()
        if (friendData.lastActiveDate !== today) continue // friend hasn't practiced today yet

        const existing = myStreaks[friendId] || { count: 0, lastDate: null }
        if (existing.lastDate === today) continue // already counted today

        const newCount = existing.lastDate === yesterday ? existing.count + 1 : 1
        myStreaks[friendId] = { count: newCount, lastDate: today }
        changed = true

        // Mirror the same value onto the friend's doc so both sides match.
        const friendStreaksField = { ...(friendData.friendStreaks || {}) }
        friendStreaksField[this.user.uid] = { count: newCount, lastDate: today }
        await updateDoc(doc(db, 'users', friendId), { friendStreaks: friendStreaksField })
      }

      if (changed) {
        await updateDoc(doc(db, 'users', this.user.uid), { friendStreaks: myStreaks })
        this.profile.friendStreaks = myStreaks
      }
    },

    friendStreakWith(targetUid) {
      return this.profile?.friendStreaks?.[targetUid]?.count || 0
    },

    // ---------------------------------------------------------------
    // Study Partner: a single "main" partner (mutual-follow only) that
    // every learning module (grammar, writing, flashcards, ...) can look
    // up via `activePartnerId` to build shared/compare features on top of.
    // Flow: request -> accept -> active. Either side can remove a partner
    // at any time, which clears the field on both docs.
    // ---------------------------------------------------------------

    isPartner(targetUid) {
      return this.profile?.activePartnerId === targetUid
    },

    hasIncomingRequestFrom(targetUid) {
      return (this.profile?.partnerRequestsIncoming || []).includes(targetUid)
    },

    hasSentRequestTo(targetUid) {
      return (this.profile?.partnerRequestsSent || []).includes(targetUid)
    },

    async sendPartnerRequest(targetUid) {
      if (!this.user || targetUid === this.user.uid) return
      // My local `followers` array can be stale if the other person followed
      // me back after my profile was last loaded (we don't use realtime
      // listeners) — refresh from Firestore before checking mutual-follow.
      await this.refreshProfile()
      if (!this.isMutualFollow(targetUid)) {
        throw new Error('Partner bo\'lish uchun avval bir-biringizni kuzatishingiz kerak (mutual follow).')
      }
      if (this.hasActivePartner) {
        throw new Error('Sizda allaqachon faol partner bor. Avval uni olib tashlang.')
      }
      if (this.hasSentRequestTo(targetUid) || this.hasIncomingRequestFrom(targetUid)) return

      const myRef = doc(db, 'users', this.user.uid)
      const theirRef = doc(db, 'users', targetUid)
      await updateDoc(theirRef, { partnerRequestsIncoming: arrayUnion(this.user.uid) })
      await updateDoc(myRef, { partnerRequestsSent: arrayUnion(targetUid) })

      if (!this.profile.partnerRequestsSent) this.profile.partnerRequestsSent = []
      if (!this.profile.partnerRequestsSent.includes(targetUid)) {
        this.profile.partnerRequestsSent.push(targetUid)
      }
    },

    async cancelPartnerRequest(targetUid) {
      if (!this.user) return
      const myRef = doc(db, 'users', this.user.uid)
      const theirRef = doc(db, 'users', targetUid)
      await updateDoc(theirRef, { partnerRequestsIncoming: arrayRemove(this.user.uid) })
      await updateDoc(myRef, { partnerRequestsSent: arrayRemove(targetUid) })
      this.profile.partnerRequestsSent = (this.profile.partnerRequestsSent || []).filter((id) => id !== targetUid)
    },

    async declinePartnerRequest(fromUid) {
      if (!this.user) return
      const myRef = doc(db, 'users', this.user.uid)
      const theirRef = doc(db, 'users', fromUid)
      await updateDoc(myRef, { partnerRequestsIncoming: arrayRemove(fromUid) })
      await updateDoc(theirRef, { partnerRequestsSent: arrayRemove(this.user.uid) })
      this.profile.partnerRequestsIncoming = (this.profile.partnerRequestsIncoming || []).filter((id) => id !== fromUid)
    },

    async acceptPartnerRequest(fromUid) {
      if (!this.user || this.hasActivePartner) return
      const myRef = doc(db, 'users', this.user.uid)
      const theirRef = doc(db, 'users', fromUid)

      await updateDoc(myRef, {
        activePartnerId: fromUid,
        partnerRequestsIncoming: arrayRemove(fromUid)
      })
      await updateDoc(theirRef, {
        activePartnerId: this.user.uid,
        partnerRequestsSent: arrayRemove(this.user.uid)
      })

      this.profile.activePartnerId = fromUid
      this.profile.partnerRequestsIncoming = (this.profile.partnerRequestsIncoming || []).filter((id) => id !== fromUid)
      this.checkAchievements()
    },

    async removePartner() {
      if (!this.user || !this.profile?.activePartnerId) return
      const partnerId = this.profile.activePartnerId
      const myRef = doc(db, 'users', this.user.uid)
      const theirRef = doc(db, 'users', partnerId)
      await updateDoc(myRef, { activePartnerId: null })
      await updateDoc(theirRef, { activePartnerId: null })
      this.profile.activePartnerId = null
    },

    async getActivePartnerProfile() {
      if (!this.profile?.activePartnerId) return null
      return this.fetchUserProfile(this.profile.activePartnerId)
    },

    // Saves the outcome of a practice session (grammar quiz, writing drill,
    // ...) onto MY OWN doc under a fixed key per subject. This is a normal
    // own-doc write (no rules change needed) — a partner can then read it
    // straight off my profile, since /users/{id} is readable by any signed
    // in user. That's what powers the "compare with partner" screens.
    async recordPracticeResult(subject, { correct, total, xp } = {}) {
      if (!this.user || !subject) return
      const result = { correct: correct || 0, total: total || 0, xp: xp || 0, date: new Date().toISOString() }
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { [`lastResults.${subject}`]: result })
      if (!this.profile.lastResults) this.profile.lastResults = {}
      this.profile.lastResults[subject] = result
    },

    // Fetches the partner's profile and pulls out their last saved result
    // for the given subject (or null if they have no partner / no result yet).
    async getPartnerResult(subject) {
      const partner = await this.getActivePartnerProfile()
      if (!partner) return { partner: null, result: null }
      return { partner, result: partner.lastResults?.[subject] || null }
    },

    // Resolves display profiles for everyone who has sent me a partner
    // request, for rendering in a "Partner so'rovlari" list.
    async fetchIncomingPartnerRequestProfiles() {
      const ids = this.profile?.partnerRequestsIncoming || []
      if (!ids.length) return []
      const profiles = await Promise.all(ids.map((id) => this.fetchUserProfile(id)))
      return profiles.filter(Boolean)
    },

    async updatePhotoURL(downloadURL) {
      if (!this.user || !downloadURL) return
      const ref = doc(db, 'users', this.user.uid)
      await updateDoc(ref, { photoURL: downloadURL })
      this.profile.photoURL = downloadURL
      try {
        await updateProfile(this.user, { photoURL: downloadURL })
      } catch {
        // non-fatal
      }
    },

    async fetchUserProfile(uid) {
      const snap = await getDoc(doc(db, 'users', uid))
      return snap.exists() ? { id: uid, ...snap.data() } : null
    },

    async signUpWithEmail(email, password, displayName, referredBy) {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const ref = doc(db, 'users', cred.user.uid)
      await setDoc(ref, {
        displayName: displayName || email.split('@')[0],
        email,
        avatar: '🦁',
        xp: 0,
        level: 1,
        streak: 0,
        lastActiveDate: null,
        completedWords: [],
        following: [],
        followers: [],
        activePartnerId: null,
        partnerRequestsIncoming: [],
        partnerRequestsSent: [],
        referredBy: referredBy || null,
        referralCount: 0,
        createdAt: serverTimestamp()
      })

      // Reward both sides of a valid referral with a small one-time XP bonus.
      if (referredBy && referredBy !== cred.user.uid) {
        try {
          const referrerRef = doc(db, 'users', referredBy)
          const referrerSnap = await getDoc(referrerRef)
          if (referrerSnap.exists()) {
            await updateDoc(referrerRef, {
              xp: increment(REFERRAL_BONUS_XP),
              referralCount: increment(1)
            })
            await updateDoc(ref, { xp: increment(REFERRAL_BONUS_XP) })
          }
        } catch (err) {
          console.error('Referral bonus failed:', err)
        }
      }

      return cred.user
    },

    async signInWithEmail(email, password) {
      return await signInWithEmailAndPassword(auth, email, password)
    },

    async signInWithGoogle() {
      return await signInWithPopup(auth, googleProvider)
    },

    async logout() {
      await signOut(auth)
      this.user = null
      this.profile = null
    },

    async fetchLeaderboard(limitCount = 20) {
      const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(limitCount))
      const snap = await getDocs(q)
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    },

    async fetchWeeklyLeaderboard(limitCount = 30) {
      const q = query(collection(db, 'users'), orderBy('weeklyXp', 'desc'), limit(limitCount))
      const snap = await getDocs(q)
      return snap.docs.map((d, idx) => ({ id: d.id, rank: idx + 1, ...d.data() }))
    },

    // Same as above, but scoped to just my current league tier — this is
    // what the "Haftalik Liga" tab should actually show, so promotion/
    // demotion zones reflect who I'm really competing against this week.
    async fetchLeagueLeaderboard(limitCount = 30) {
      if (!this.profile) return []
      const myIndex = this.profile.leagueIndex ?? DEFAULT_LEAGUE_INDEX
      try {
        const q = query(
          collection(db, 'users'),
          where('leagueIndex', '==', myIndex),
          orderBy('weeklyXp', 'desc'),
          limit(limitCount)
        )
        const snap = await getDocs(q)
        return snap.docs.map((d, idx) => ({ id: d.id, rank: idx + 1, ...d.data() }))
      } catch (err) {
        console.warn('League leaderboard query failed (missing index?):', err)
        return []
      }
    }
  }
})
