<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[760px] pt-9 pb-20">
      <!-- Header: where am I -->
      <div class="text-center mb-7 reveal">
        <span
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3"
          style="background: var(--accent-soft); color: var(--accent);"
        >
          <i class="ti ti-map-pin" aria-hidden="true"></i>
          {{ cefrBand.code }} &middot; {{ cefrBand.label }}
        </span>
        <h1 class="font-[Manrope] text-[26px] font-bold m-0 mb-1.5">Sizning yo'lingiz</h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          {{ level }}-daraja, {{ cefrBand.code }} bosqichida &middot; A1 dan C2 gacha yo'lingizning
          {{ overallPercent }}% ini bosib o'tdingiz
        </p>
      </div>

      <!-- CEFR progress rail -->
      <div class="glass reveal rounded-[24px] p-6 mb-6 tour-progress-rail">
        <div class="flex items-center justify-between mb-3">
          <span class="flex" style="gap: 6px;">
            <span
              v-for="b in cefrBands"
              :key="b.code"
              class="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
              :style="bandStyle(b)"
            >{{ b.code }}</span>
          </span>
          <router-link to="/progress" class="text-xs font-semibold shrink-0" style="color: var(--accent);">
            To'liq progress &rarr;
          </router-link>
        </div>
        <div class="h-2 rounded-full overflow-hidden" style="background: var(--surface-glass);">
          <div class="h-full rounded-full" :style="{ width: overallPercent + '%', background: 'var(--accent)' }"></div>
        </div>
      </div>

      <!-- Today's plan: the main axis -->
      <div class="mb-2 reveal">
        <h2 class="font-[Manrope] text-lg font-bold m-0 mb-3 flex items-center gap-2">
          <i class="ti ti-sparkles" aria-hidden="true" style="color: var(--accent);"></i>
          Bugungi reja
        </h2>
      </div>
      <div class="space-y-3 mb-8">
        <router-link
          v-for="(item, i) in todayPlan"
          :key="item.id"
          :to="item.route"
          class="glass reveal flex items-center gap-4 rounded-[20px] p-4 transition-transform hover:scale-[1.01]"
          :class="{ 'tour-first-lesson': i === 0 }"
        >
          <span
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
            style="background: var(--accent-soft); color: var(--accent);"
          >{{ i + 1 }}</span>
          <span class="flex-1 min-w-0">
            <span class="block text-sm font-bold m-0">{{ item.title }}</span>
            <span class="block text-xs m-0" style="color: var(--text-secondary);">{{ item.subtitle }}</span>
          </span>
          <i class="ti ti-chevron-right shrink-0" aria-hidden="true" style="color: var(--text-muted);"></i>
        </router-link>
      </div>

      <!-- Unit checkpoint: a small mixed diagnostic after the learner has built some momentum -->
      <div v-if="(userStore.profile?.completedSprints || 0) > 0" class="glass reveal rounded-[22px] p-4 mb-7 flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style="background:var(--accent-soft); color:var(--accent);">
          <i class="ti ti-target-arrow"></i>
        </div>
        <div class="flex-1">
          <strong class="block text-sm font-extrabold">Mini checkpoint</strong>
          <p class="text-xs m-0 mt-1" style="color:var(--text-secondary);">{{ userStore.profile?.completedSprints || 0 }} ta sprintdan keyin aralash test bilan nimalar esda qolganini tekshiring.</p>
        </div>
        <router-link :to="{ path: `/lesson/${level}`, query: { checkpoint: '1' } }" class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold" style="background:var(--accent); color:#081109;">
          Checkpoint <i class="ti ti-arrow-right"></i>
        </router-link>
      </div>

      <!-- Supporting practice: helpers, not islands -->
      <div class="mb-3 reveal tour-supporting-activities">
        <h2 class="font-[Manrope] text-lg font-bold m-0 mb-1 flex items-center gap-2">
          <i class="ti ti-puzzle" aria-hidden="true" style="color: var(--text-secondary);"></i>
          Qo'shimcha mashqlar
        </h2>
        <p class="text-xs m-0" style="color: var(--text-muted);">
          Bular asosiy rejangizga yordam beradi — asosini yuqoridan boshlang
        </p>
      </div>
      <div class="grid gap-3 mb-4" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
        <router-link
          v-for="s in supportingActivities"
          :key="s.route"
          :to="s.route"
          class="glass reveal rounded-[18px] p-4 flex flex-col items-start gap-2 transition-transform hover:scale-[1.02]"
        >
          <i :class="'ti ' + s.icon" aria-hidden="true" class="text-lg" style="color: var(--accent);"></i>
          <span class="text-sm font-semibold">{{ s.label }}</span>
          <span class="text-xs" style="color: var(--text-muted);">{{ s.hint }}</span>
        </router-link>
      </div>
    </div>

    <GuidedTour v-if="userStore.needsGuidedTour" :steps="tourSteps" @finish="userStore.completeTour" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { CEFR_BANDS } from '../data/learningPath.js'
import AuroraBackground from '../components/AuroraBackground.vue'
import AppNav from '../components/AppNav.vue'
import GuidedTour from '../components/GuidedTour.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
useScrollReveal()

const tourSteps = [
  {
    selector: '.tour-progress-rail',
    title: 'Sizning yo\'lingiz shu yerda',
    text: 'Bu chiziq A1 dan C2 gacha bo\'lgan butun yo\'lingizni ko\'rsatadi. Har bir dars uni bir qadam oldinga suradi.',
    placement: 'bottom'
  },
  {
    selector: '.tour-first-lesson',
    title: 'Shu yerdan boshlang! 👆',
    text: 'Bu — bugungi birinchi darsingiz. Har safar saytga kirganda, birinchi navbatda shu ro\'yxatdagi 1-band ustiga bosing.',
    placement: 'bottom'
  },
  {
    selector: '.tour-supporting-activities',
    title: 'Qo\'shimcha mashqlar',
    text: 'Bular asosiy darsni mustahkamlash uchun. Lekin har doim avval yuqoridagi "Bugungi reja"ni tugating.',
    placement: 'top'
  }
]

const level = computed(() => userStore.profile?.level || 1)
const cefrBand = computed(() => userStore.cefrBand)
const cefrBands = CEFR_BANDS
const todayPlan = computed(() => userStore.todayPlan)

// Rough overall position across the full A1->C2 range, used for the top rail.
const overallPercent = computed(() => {
  const maxLevelNum = 15
  const base = ((level.value - 1) / maxLevelNum) * 100
  const withinLevel = (userStore.levelProgressPercent || 0) / maxLevelNum
  return Math.min(100, Math.round(base + withinLevel))
})

function bandStyle(band) {
  const isCurrent = band.code === cefrBand.value.code
  const isPast = CEFR_BANDS.findIndex((b) => b.code === band.code) < CEFR_BANDS.findIndex((b) => b.code === cefrBand.value.code)
  if (isCurrent) return { background: 'var(--accent)', color: '#05130a' }
  if (isPast) return { background: 'var(--accent-soft)', color: 'var(--accent)' }
  return { background: 'var(--surface-glass)', color: 'var(--text-muted)' }
}

// Everything else in the app framed as support for the main path, not a
// separate destination competing for the user's attention.
const supportingActivities = [
  { label: 'Xatolarim', hint: 'Ko‘p adashgan so‘zlarni 2 daqiqada fix qiling', icon: 'ti-bulb', route: '/mistakes' },
  { label: 'Hikoyalar', hint: 'O\'qish orqali mustahkamlash', icon: 'ti-book-2', route: '/stories' },
  { label: 'Match Madness', hint: 'So\'zlarni o\'yin orqali takrorlash', icon: 'ti-cards', route: '/match-madness' },
  { label: 'Kunlik challenge', hint: 'Qo\'shimcha XP uchun', icon: 'ti-target-arrow', route: '/daily-challenge' }
]
</script>
