import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/LandingView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('../views/OnboardingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/upgrade',
    name: 'Upgrade',
    component: () => import('../views/UpgradeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/learning-path',
    name: 'LearningPath',
    component: () => import('../views/LearningPathView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/AnalyticsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/ShopView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/CommunityView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/daily-challenge',
    name: 'DailyChallenge',
    component: () => import('../views/DailyChallengeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/progress',
    name: 'ProgressDashboard',
    component: () => import('../views/ProgressDashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lesson/:level',
    name: 'Lesson',
    component: () => import('../views/LessonView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mistakes',
    name: 'MistakeBank',
    component: () => import('../views/MistakeBankView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/stories',
    name: 'Stories',
    component: () => import('../views/StoriesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/story-mode',
    name: 'StoryMode',
    component: () => import('../views/StoryModeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/story/:id',
    name: 'StoryReader',
    component: () => import('../views/StoryReaderView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../views/LeaderboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:uid',
    name: 'PublicProfile',
    component: () => import('../views/PublicProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/people',
    name: 'People',
    component: () => import('../views/PeopleView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/speaking',
    name: 'SpeakingTopics',
    component: () => import('../views/SpeakingTopicsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/match-madness',
    name: 'MatchMadness',
    component: () => import('../views/MatchMadnessView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/roleplay',
    name: 'Roleplay',
    component: () => import('../views/RoleplayView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pronunciation',
    name: 'Pronunciation',
    component: () => import('../views/PronunciationView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listening',
    name: 'Listening',
    component: () => import('../views/ListeningView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reading',
    name: 'Reading',
    component: () => import('../views/ReadingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/grammar-quiz',
    name: 'GrammarQuiz',
    component: () => import('../views/GrammarQuizView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/writing',
    name: 'Writing',
    component: () => import('../views/WritingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/flashcards',
    name: 'Flashcards',
    component: () => import('../views/FlashcardsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ai-teacher',
    name: 'AiTeacher',
    component: () => import('../views/AiTeacherView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/ChatView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chat/:uid',
    name: 'DirectMessage',
    component: () => import('../views/DirectMessageView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const decide = () => {
    if (!userStore.isLoggedIn) {
      if (to.meta.requiresAuth) next('/login')
      else next()
      return
    }
    if (userStore.needsOnboarding && to.meta.requiresAuth && to.name !== 'Onboarding') {
      next('/onboarding')
      return
    }
    if (!userStore.needsOnboarding && to.name === 'Onboarding') {
      next('/dashboard')
      return
    }
    if (to.meta.requiresAdmin && !userStore.isAdmin) {
      next('/dashboard')
      return
    }
    next()
  }

  if (to.meta.requiresAuth && !userStore.authReady) {
    // Wait for auth to be ready before deciding (simple approach: small poll)
    const unwatch = setInterval(() => {
      if (userStore.authReady) {
        clearInterval(unwatch)
        decide()
      }
    }, 50)
  } else {
    decide()
  }
})

export default router
