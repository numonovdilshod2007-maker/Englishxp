<template>
  <div class="min-h-screen relative">
    <AuroraBackground />
    <AppNav />

    <main class="container relative z-[1] max-w-[980px] pt-8 pb-24">
      <header class="glass rounded-[28px] p-6 md:p-8 mb-5 reveal">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[.08em]"
              style="background: var(--accent-soft); color: var(--accent);">
              <i class="ti ti-bulb"></i> MISTAKE BANK
            </span>
            <h1 class="font-[Manrope] text-[30px] md:text-[36px] font-bold mt-3 mb-2">Xatolaringizdan kuchga.</h1>
            <p class="text-sm max-w-[640px] m-0" style="color:var(--text-secondary);">
              Bu yerda faqat siz adashgan so‘zlar turadi. 2 daqiqalik smart review bilan ularni qayta ishlang.
            </p>
          </div>
          <router-link to="/lesson/review"
            class="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold text-sm shrink-0"
            style="background:var(--accent); color:#081109;">
            <i class="ti ti-refresh"></i>
            {{ mistakeWords.length ? `Review ${Math.min(mistakeWords.length, 5)} ta` : 'Smart Review' }}
          </router-link>
        </div>

        <div class="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
          <div class="rounded-2xl p-3" style="background:var(--surface-glass);">
            <strong class="block text-xl md:text-2xl">{{ mistakeWords.length }}</strong>
            <span class="text-[11px] font-bold uppercase tracking-[.05em]" style="color:var(--text-muted);">Faol xato</span>
          </div>
          <div class="rounded-2xl p-3" style="background:var(--surface-glass);">
            <strong class="block text-xl md:text-2xl">{{ userStore.profile?.mistakeFixes || 0 }}</strong>
            <span class="text-[11px] font-bold uppercase tracking-[.05em]" style="color:var(--text-muted);">Tuzatilgan</span>
          </div>
          <div class="rounded-2xl p-3" style="background:var(--surface-glass);">
            <strong class="block text-xl md:text-2xl">{{ userStore.dueWordsCount }}</strong>
            <span class="text-[11px] font-bold uppercase tracking-[.05em]" style="color:var(--text-muted);">Bugun due</span>
          </div>
        </div>
      </header>

      <section v-if="mistakeWords.length" class="space-y-3">
        <div class="flex items-center justify-between mb-2 px-1">
          <div>
            <span class="text-[11px] font-extrabold uppercase tracking-[.08em]" style="color:var(--text-muted);">YOUR WEAK WORDS</span>
            <h2 class="font-[Manrope] text-xl font-bold mt-1">Qayta ishlash kerak bo‘lganlar</h2>
          </div>
          <span class="text-xs font-bold px-3 py-1.5 rounded-full" style="background:var(--surface-glass); color:var(--text-secondary);">Eng past ease → yuqoridan</span>
        </div>

        <article v-for="item in mistakeWords.slice(0, 12)" :key="item.en" class="glass rounded-[22px] p-4 md:p-5 reveal flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="word-orb"><i class="ti ti-alert-circle"></i></div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <strong class="font-[Manrope] text-lg">{{ item.en }}</strong>
              <span class="text-[11px] font-extrabold px-2 py-1 rounded-full" :style="masteryStyle(item.card)">Qiyin so‘z</span>
            </div>
            <p class="m-0 mt-1 text-sm" style="color:var(--text-secondary);">{{ item.word?.uz || 'Review so‘z' }}</p>
            <p v-if="item.word?.example" class="m-0 mt-2 text-xs italic" style="color:var(--text-muted);">“{{ item.word.example }}”</p>
          </div>
          <div class="flex items-center gap-3 sm:flex-col sm:items-end">
            <span class="text-xs font-bold" style="color:var(--text-muted);">Ease {{ item.card.ef?.toFixed?.(1) || item.card.ef }}</span>
            <button class="tiny-review-btn" type="button" @click="startSingle(item.en)">
              Mashq <i class="ti ti-arrow-right"></i>
            </button>
          </div>
        </article>
      </section>

      <section v-else class="glass rounded-[28px] p-10 text-center reveal">
        <div class="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4" style="background:var(--accent-soft); color:var(--accent);">
          <i class="ti ti-sparkles"></i>
        </div>
        <h2 class="font-[Manrope] text-2xl font-bold mb-2">Hozircha xatolar banki toza ✨</h2>
        <p class="text-sm max-w-[520px] mx-auto mb-6" style="color:var(--text-secondary);">
          Darslarda xato qiling — EnglishXP ularni shu yerga olib keladi va keyin alohida qayta ishlaydi.
        </p>
        <router-link to="/lesson/1" class="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-extrabold text-sm" style="background:var(--accent); color:#081109;">
          Darsni boshlash <i class="ti ti-arrow-right"></i>
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import { findWordByEn } from '../data/vocabulary.js'
import AuroraBackground from '../components/AuroraBackground.vue'
import AppNav from '../components/AppNav.vue'

const router = useRouter()
const userStore = useUserStore()

const mistakeWords = computed(() => userStore.mistakeWords.map((item) => ({
  ...item,
  word: findWordByEn(item.en)
})))

function masteryStyle(card) {
  if ((card?.ef || 2.5) < 2) return { background: 'rgba(255, 91, 98, .12)', color: '#ff8f95' }
  return { background: 'rgba(255, 184, 77, .12)', color: '#ffd28a' }
}

function startSingle(en) {
  // Smart Review always includes the selected word; the small query flag is
  // only a visual anchor and does not change the shared SRS logic.
  router.push({ path: '/lesson/review', query: { word: en } })
}
</script>

<style scoped>
.word-orb { width:46px;height:46px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:rgba(255,91,98,.10);color:#ff8f95;flex:0 0 auto;font-size:20px; }
.tiny-review-btn { border:1px solid var(--border); background:var(--surface-glass); color:var(--text-primary); border-radius:12px; padding:8px 11px; font-size:12px; font-weight:800; }
</style>
