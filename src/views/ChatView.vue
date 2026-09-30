<template>
  <div class="chat-list-page">
    <AuroraBackground />
    <AppNav />
    <div class="container chat-list-content">
      <div class="reveal" style="margin-bottom:28px">
        <h1 style="font-family:Manrope,sans-serif;font-size:28px;font-weight:700;margin:0 0 6px;display:flex;align-items:center;gap:10px;">
          <i class="ti ti-messages" style="color:var(--accent)"></i> Suhbatlar
        </h1>
        <p style="color:var(--text-secondary);font-size:14px;margin:0">Faqat o'zaro follow qilganlar bilan yozishish mumkin</p>
      </div>
      <div v-if="loading" style="text-align:center;color:var(--text-muted);padding:40px">Yuklanmoqda...</div>
      <div v-else-if="mutuals.length === 0" class="glass reveal" style="padding:52px 28px;text-align:center">
        <i class="ti ti-user-heart" style="font-size:48px;color:var(--accent);display:block;margin-bottom:16px"></i>
        <h3 style="font-family:Manrope,sans-serif;font-size:20px;font-weight:700;margin:0 0 10px">Hali suhbatlar yo'q</h3>
        <p style="color:var(--text-secondary);font-size:14px;margin:0 0 24px;line-height:1.6">"Odamlar" sahifasida kimnidir follow qiling. U ham sizni follow qilsa, suhbat ochiladi.</p>
        <router-link to="/people" class="btn-primary" style="display:inline-flex">Odamlarni ko'rish</router-link>
      </div>
      <div v-else style="display:flex;flex-direction:column;gap:10px">
        <router-link
          v-for="person in mutuals"
          :key="person.id"
          :to="`/chat/${person.id}`"
          class="glass reveal"
          style="display:flex;align-items:center;gap:14px;padding:16px 20px;text-decoration:none"
        >
          <div style="width:48px;height:48px;border-radius:50%;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;overflow:hidden">
            <img v-if="person.photoURL" :src="person.photoURL" style="width:100%;height:100%;object-fit:cover" alt="" />
            <span v-else>{{ person.avatar || '🦁' }}</span>
          </div>
          <div style="flex:1;min-width:0">
            <p style="font-weight:600;font-size:15px;margin:0">{{ person.displayName }}</p>
            <p style="font-size:12px;color:var(--text-muted);margin:2px 0 0">Level {{ person.level || 1 }} · {{ person.xp || 0 }} XP</p>
          </div>
          <i class="ti ti-chevron-right" style="font-size:16px;color:var(--text-muted)"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import AppNav from '../components/AppNav.vue'
import AuroraBackground from '../components/AuroraBackground.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const mutuals = ref([])
const loading = ref(true)
const { refresh } = useScrollReveal()

onMounted(async () => {
  mutuals.value = await userStore.fetchMutualFollows()
  loading.value = false
  refresh()
})
</script>

<style scoped>
.chat-list-content { padding: 36px 24px 80px; max-width: 640px; }
</style>
