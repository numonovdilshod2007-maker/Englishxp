<template>
  <div class="stories-page">
    <AuroraBackground />
    <AppNav />

    <div class="container stories-content">
      <div class="stories-header reveal">
        <div><h1 class="stories-title">Hikoyalar</h1><p class="stories-sub">Qisqa hikoyalarni o'qing, tarjimasini ko'ring va savollarga javob bering</p></div>
        <router-link to="/story-mode" class="story-mode-cta"><span>✨</span><span><b>Story Mode</b><small>5 min • Speak & choose</small></span><i class="ti ti-arrow-right"></i></router-link>
      </div>

      <div v-for="group in groupedStories" :key="group.cefr" class="cefr-section">
        <h2 class="cefr-heading reveal">{{ group.cefr }}</h2>
        <div class="stories-grid">
          <component
            :is="isUnlocked(story) ? 'router-link' : 'div'"
            v-for="story in group.items"
            :key="story.id"
            :to="isUnlocked(story) ? `/story/${story.id}` : undefined"
            class="glass story-card reveal"
            :class="{ 'story-card-locked': !isUnlocked(story) }"
          >
            <div class="story-card-top">
              <div class="story-icon" :class="{ 'story-icon-locked': !isUnlocked(story) }">
                <i v-if="!isUnlocked(story)" class="ti ti-lock" aria-hidden="true"></i>
                <i v-else :class="['ti', story.icon]" aria-hidden="true"></i>
              </div>
              <i
                v-if="isStoryDone(story.id)"
                class="ti ti-circle-check-filled story-done-icon"
                aria-hidden="true"
              ></i>
            </div>
            <h3>{{ story.title }}</h3>
            <p class="story-title-en">{{ story.titleEn }}</p>
            <div class="story-meta">
              <span><i class="ti ti-clock" aria-hidden="true"></i> {{ story.minutes }} daq</span>
              <span><i class="ti ti-star" aria-hidden="true"></i> Level {{ story.level }}</span>
            </div>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import { stories, isStoryUnlocked } from '../data/stories.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()

const userStore = useUserStore()

const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1']

const groupedStories = computed(() => {
  return CEFR_ORDER
    .map((cefr) => ({
      cefr,
      items: stories.filter((s) => (s.cefr || 'A1') === cefr)
    }))
    .filter((group) => group.items.length > 0)
})

function isUnlocked(story) {
  return isStoryUnlocked(story, userStore.level)
}

function isStoryDone(id) {
  return (userStore.profile?.completedStories || []).includes(id)
}
</script>

<style scoped>
.stories-content {
  padding: 36px 24px 80px;
}

.stories-header {
  margin-bottom: 32px; display:flex; justify-content:space-between; gap:20px; align-items:center;
}
.story-mode-cta { display:flex; align-items:center; gap:10px; padding:11px 14px; border:1px solid var(--border); background:var(--accent-soft); border-radius:15px; color:var(--text-primary); text-decoration:none; }
.story-mode-cta span:nth-child(2) { display:flex; flex-direction:column; gap:2px; }
.story-mode-cta small { font-size:10px; color:var(--text-muted); }
.story-mode-cta i { color:var(--accent); }

.stories-title {
  font-family: 'Manrope', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 6px;
}

.stories-sub {
  color: var(--text-secondary);
  margin: 0;
  font-size: 14px;
}

.cefr-section {
  margin-bottom: 36px;
}

.cefr-heading {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: var(--accent-dim);
  margin: 0 0 16px;
  letter-spacing: 0.5px;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

@media (max-width: 900px) {
  .stories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stories-header { align-items:flex-start; flex-direction:column; }
  .stories-grid {
    grid-template-columns: 1fr;
  }
}

.story-card {
  padding: 26px;
  display: block;
  position: relative;
}

.story-card-locked {
  opacity: 0.45;
  cursor: not-allowed;
}

.story-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.story-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.story-icon-locked {
  background: rgba(13, 17, 16, 0.06);
  color: var(--text-muted);
}

.story-done-icon {
  font-size: 22px;
  color: var(--accent);
}

.story-card h3 {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px;
}

.story-title-en {
  font-size: 13px;
  color: var(--text-secondary);
  font-style: italic;
  margin: 0 0 16px;
}

.story-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.story-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
