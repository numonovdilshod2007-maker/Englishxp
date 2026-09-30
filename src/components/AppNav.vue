<template>
  <!-- Top bar: logo + grouped nav (desktop) + profile/theme -->
  <nav class="sticky top-0 z-20 backdrop-blur-xl backdrop-saturate-150 bg-[var(--bg-void)]/75 border-b border-[var(--border-glass)]">
    <div class="container">
      <div class="flex items-center justify-between h-16 gap-3">
        <router-link to="/dashboard" class="flex items-center gap-2 shrink-0">
          <i class="ti ti-bolt text-xl text-[var(--accent)]" aria-hidden="true"></i>
          <span class="font-[Manrope] text-[17px] font-bold text-[var(--text-primary)] hidden sm:inline">
            English<span class="text-gradient">XP</span>
          </span>
        </router-link>

        <!-- Grouped nav: desktop only -->
        <div class="hidden md:flex items-center gap-1 flex-1 justify-center">
          <div
            v-for="group in groups"
            :key="group.label"
            class="relative"
            @mouseenter="openGroup = group.label"
            @mouseleave="openGroup = null"
          >
            <button
              type="button"
              class="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors"
              :class="[
                groupIsActive(group)
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-glass)] hover:text-[var(--text-primary)]'
              ]"
            >
              <i :class="'ti ' + group.icon" aria-hidden="true"></i>
              <span>{{ group.label }}</span>
              <i class="ti ti-chevron-down text-xs opacity-60" aria-hidden="true"></i>
            </button>

            <!-- Dropdown -->
            <div
              v-show="openGroup === group.label"
              class="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 z-30"
            >
              <div class="glass !p-1.5 flex flex-col gap-0.5">
                <router-link
                  v-for="link in group.links"
                  :key="link.to"
                  :to="link.to"
                  class="flex items-center gap-2.5 px-3 py-2 rounded-[14px] text-sm font-medium transition-colors"
                  :class="[
                    route.path === link.to
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      : link.pro
                        ? 'text-[#b9791f] hover:bg-[rgba(232,152,58,0.12)]'
                        : link.admin
                          ? 'text-[#6f7cff] hover:bg-[rgba(111,124,255,0.12)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--surface-glass)] hover:text-[var(--text-primary)]'
                  ]"
                >
                  <i :class="'ti ' + link.icon" aria-hidden="true"></i>
                  <span>{{ link.label }}</span>
                  <i v-if="link.pro" class="ti ti-crown text-xs ml-auto" aria-hidden="true"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <LivesBar />
          <NotificationBell />
          <router-link
            to="/profile"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-glass)] hover:text-[var(--text-primary)] transition-colors"
            :class="{ '!bg-[var(--accent-soft)] !text-[var(--accent)]': route.path === '/profile' }"
          >
            <i class="ti ti-user text-base" aria-hidden="true"></i>
            <span class="hidden lg:inline">Profil</span>
          </router-link>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-full text-base text-[var(--text-primary)] bg-[var(--surface-glass)] hover:bg-[var(--surface-glass-hover)] hover:rotate-12 transition-all"
            @click="toggleTheme"
            :title="isDark ? 'Yorug\' rejim' : 'Tungi rejim'"
          >
            <i :class="isDark ? 'ti ti-sun' : 'ti ti-moon'" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Bottom tab bar: mobile only -->
  <nav
    class="md:hidden fixed bottom-0 left-0 right-0 z-20 backdrop-blur-xl backdrop-saturate-150 bg-[var(--bg-void)]/90 border-t border-[var(--border-glass)] pb-[env(safe-area-inset-bottom)]"
  >
    <div class="flex items-stretch justify-around">
      <button
        v-for="group in groups"
        :key="group.label"
        type="button"
        class="flex flex-col items-center justify-center gap-0.5 py-2 flex-1 text-[11px] font-medium"
        :class="groupIsActive(group) ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'"
        @click="mobileGroup = mobileGroup === group.label ? null : group.label"
      >
        <i :class="'ti ' + group.icon + ' text-lg'" aria-hidden="true"></i>
        <span>{{ group.label }}</span>
      </button>
    </div>
  </nav>

  <!-- Mobile group sheet -->
  <Transition name="sheet">
    <div v-if="mobileGroup" class="md:hidden fixed inset-0 z-30 flex items-end" @click.self="mobileGroup = null">
      <div class="absolute inset-0 bg-black/40" @click="mobileGroup = null"></div>
      <div class="relative w-full glass !rounded-b-none !rounded-t-[28px] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)] max-h-[70vh] overflow-y-auto">
        <div class="w-10 h-1 rounded-full bg-[var(--border-glass-strong)] mx-auto mb-4"></div>
        <div class="grid grid-cols-3 gap-2">
          <router-link
            v-for="link in activeMobileLinks"
            :key="link.to"
            :to="link.to"
            class="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-xs font-medium text-center"
            :class="[
              route.path === link.to
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : link.pro
                  ? 'text-[#b9791f]'
                  : link.admin
                    ? 'text-[#6f7cff]'
                    : 'text-[var(--text-secondary)]'
            ]"
            @click="mobileGroup = null"
          >
            <i :class="'ti ' + link.icon + ' text-xl'" aria-hidden="true"></i>
            <span>{{ link.label }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import { useTheme } from '../composables/useTheme.js'
import NotificationBell from './NotificationBell.vue'
import LivesBar from './LivesBar.vue'

const userStore = useUserStore()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const openGroup = ref(null)
const mobileGroup = ref(null)

// Links are grouped so the nav communicates structure instead of one flat
// row of 13+ equally-weighted pills.
const groups = computed(() => {
  const list = [
    {
      label: 'Bosh',
      icon: 'ti-home',
      links: [
        { to: '/dashboard', icon: 'ti-home', label: 'Bosh sahifa' },
        { to: '/learning-path', icon: 'ti-map-pin', label: "Mening yo'lim" },
        { to: '/daily-challenge', icon: 'ti-bolt', label: 'Kunlik Challenge' },
        { to: '/leaderboard', icon: 'ti-trophy', label: 'Reyting' },
        { to: '/analytics', icon: 'ti-chart-bar', label: 'Analitika' },
        { to: '/progress', icon: 'ti-report-analytics', label: 'Progress' }
      ]
    },
    {
      label: "O'rganish",
      icon: 'ti-school',
      links: [
        { to: '/stories', icon: 'ti-book-2', label: 'Hikoyalar' },
        { to: '/reading', icon: 'ti-book', label: "O'qish" },
        { to: '/flashcards', icon: 'ti-cards', label: 'Flashcardlar' },
        { to: '/grammar-quiz', icon: 'ti-abc', label: 'Grammar Quiz' },
        { to: '/listening', icon: 'ti-headphones', label: 'Tinglash' },
        { to: '/writing', icon: 'ti-pencil', label: 'Yozish' },
        { to: '/pronunciation', icon: 'ti-microphone', label: 'Talaffuz' },
      ]
    },
    {
      label: 'Amaliyot',
      icon: 'ti-target-arrow',
      links: [
        { to: '/roleplay', icon: 'ti-message-2-bolt', label: 'AI Roleplay', pro: true },
        { to: '/ai-teacher', icon: 'ti-school', label: 'AI Teacher' },
        { to: '/speaking', icon: 'ti-microphone-2', label: 'Nutq mashqi', pro: true },
        { to: '/match-madness', icon: 'ti-bolt', label: 'Match Madness' },
        { to: '/shop', icon: 'ti-diamond', label: "Do'kon" }
      ]
    },
    {
      label: 'Jamiyat',
      icon: 'ti-users',
      links: [
        { to: '/people', icon: 'ti-users', label: 'Odamlar' },
        { to: '/chat', icon: 'ti-message-circle', label: 'Chat' },
        { to: '/community', icon: 'ti-users-group', label: 'Community' }
      ]
    }
  ]

  if (userStore.isAdmin) {
    list.push({
      label: 'Admin',
      icon: 'ti-shield-lock',
      links: [{ to: '/admin', icon: 'ti-shield-lock', label: 'Admin', admin: true }]
    })
  }

  list.push({
    label: 'Pro',
    icon: 'ti-crown',
    links: [
      { to: '/upgrade', icon: 'ti-crown', label: userStore.isPro ? 'Pro sozlamalari' : "Pro'ga o'tish", pro: true }
    ]
  })

  return list
})

const activeMobileLinks = computed(() => {
  const group = groups.value.find((g) => g.label === mobileGroup.value)
  return group ? group.links : []
})

function groupIsActive(group) {
  return group.links.some((link) => route.path === link.to)
}
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.25s var(--ease-premium, ease);
}
.sheet-enter-active > div:last-child,
.sheet-leave-active > div:last-child {
  transition: transform 0.3s var(--ease-premium, ease);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from > div:last-child,
.sheet-leave-to > div:last-child {
  transform: translateY(100%);
}
</style>
