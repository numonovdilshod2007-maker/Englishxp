<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <AppNav />

    <div class="container relative z-[1] max-w-[680px] pt-9 pb-20">
      <div class="text-center mb-6 reveal">
        <h1 class="font-[Manrope] text-[28px] font-bold m-0 mb-1.5 flex items-center justify-center gap-2.5">
          <i class="ti ti-users-group" aria-hidden="true" style="color: var(--accent);"></i>
          Community
        </h1>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Savol bering, tajriba almashing, birga o'rganing
        </p>
      </div>

      <!-- Group tabs -->
      <div class="community-tabs reveal">
        <button
          v-for="g in GROUPS"
          :key="g.id"
          class="community-tab"
          :class="{ 'community-tab-active': activeGroup === g.id }"
          @click="switchGroup(g.id)"
        >
          <i :class="'ti ' + g.icon" aria-hidden="true"></i>
          {{ g.label }}
        </button>
      </div>

      <!-- Composer -->
      <div class="glass reveal rounded-[20px] p-4 mb-5 mt-5">
        <textarea
          v-model="draft"
          class="community-composer"
          rows="2"
          :placeholder="`${activeGroupLabel} bo'limida savol yoki fikringizni yozing...`"
          maxlength="1000"
        ></textarea>
        <div class="flex items-center justify-between mt-2">
          <span class="text-xs" style="color: var(--text-muted);">{{ draft.length }}/1000</span>
          <button class="btn-primary community-post-btn" :disabled="!draft.trim() || posting" @click="submitPost">
            <i class="ti ti-send-2" aria-hidden="true"></i> {{ posting ? 'Yuborilmoqda...' : 'Yuborish' }}
          </button>
        </div>
        <p v-if="loadError" class="text-xs mt-2" style="color: #ef4444;">{{ loadError }}</p>
      </div>

      <!-- Feed -->
      <div v-if="loading" class="text-center py-10" style="color: var(--text-muted);">Yuklanmoqda...</div>
      <div v-else-if="loadError && !posts.length" class="glass reveal rounded-[24px] p-8 text-center">
        <i class="ti ti-alert-circle text-4xl mb-3" aria-hidden="true" style="color: #ef4444;"></i>
        <p class="text-sm m-0 mb-3" style="color: var(--text-secondary);">{{ loadError }}</p>
        <button class="btn-secondary" style="padding: 8px 18px;" @click="loadPosts">Qayta urinish</button>
      </div>
      <div v-else-if="!posts.length" class="glass reveal rounded-[24px] p-8 text-center">
        <i class="ti ti-message-2 text-4xl mb-3" aria-hidden="true" style="color: var(--text-muted);"></i>
        <p class="text-sm m-0" style="color: var(--text-secondary);">
          Bu bo'limda hali post yo'q. Birinchi bo'lib yozing!
        </p>
      </div>
      <div v-else class="space-y-4">
        <div v-for="post in posts" :key="post.id" class="glass reveal rounded-[20px] p-5">
          <div class="flex items-start gap-3 mb-3">
            <router-link :to="`/user/${post.authorId}`" class="community-author-link" title="Profilni ko'rish">
              <div class="community-avatar">
                <img v-if="post.authorPhotoURL" :src="post.authorPhotoURL" alt="" />
                <span v-else>{{ post.authorAvatar || '🦁' }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold m-0">{{ post.authorName }}</p>
                <p class="text-xs m-0" style="color: var(--text-muted);">{{ formatTime(post.createdAt) }}</p>
              </div>
            </router-link>
            <button
              v-if="post.authorId === userStore.user?.uid"
              class="community-delete-btn"
              title="O'chirish"
              @click="removePost(post.id)"
            >
              <i class="ti ti-trash" aria-hidden="true"></i>
            </button>
          </div>
          <p class="text-sm m-0 mb-3 community-post-text">{{ post.text }}</p>
          <div class="flex items-center gap-4">
            <button class="community-action" :class="{ 'community-action-active': post.likedByMe }" @click="toggleLike(post)">
              <i :class="post.likedByMe ? 'ti ti-heart-filled' : 'ti ti-heart'" aria-hidden="true"></i>
              {{ post.likeCount || 0 }}
            </button>
            <button class="community-action" @click="toggleComments(post)">
              <i class="ti ti-message-circle" aria-hidden="true"></i>
              {{ post.commentCount || 0 }}
            </button>
          </div>

          <!-- Comments -->
          <div v-if="expandedPostId === post.id" class="community-comments" v-pop-in>
            <div v-if="commentsLoading" class="text-xs py-2" style="color: var(--text-muted);">Yuklanmoqda...</div>
            <div v-else-if="!comments.length" class="text-xs py-2" style="color: var(--text-muted);">Hali izoh yo'q.</div>
            <div v-else class="space-y-2 mb-3">
              <div v-for="c in comments" :key="c.id" class="community-comment">
                <router-link :to="`/user/${c.authorId}`" class="community-comment-avatar comment-profile-link" title="Profilni ko'rish">{{ c.authorAvatar || '🦁' }}</router-link>
                <div class="flex-1 min-w-0">
                  <router-link :to="`/user/${c.authorId}`" class="community-comment-author">{{ c.authorName }}</router-link>
                  <p class="text-xs m-0" style="color: var(--text-secondary);">{{ c.text }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input
                v-model="commentDraft"
                class="community-comment-input"
                type="text"
                placeholder="Izoh yozing..."
                maxlength="500"
                @keyup.enter="submitComment(post)"
              />
              <button class="community-comment-send" :disabled="!commentDraft.trim()" @click="submitComment(post)">
                <i class="ti ti-send-2" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'
import AuroraBackground from '../components/AuroraBackground.vue'
import AppNav from '../components/AppNav.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const userStore = useUserStore()
const { refresh } = useScrollReveal()

const GROUPS = [
  { id: 'general', label: 'Umumiy', icon: 'ti-message-2' },
  { id: 'grammar', label: 'Grammar', icon: 'ti-abc' },
  { id: 'speaking', label: 'Speaking', icon: 'ti-microphone' },
  { id: 'vocabulary', label: "Vocabulary", icon: 'ti-abc-2' }
]

const activeGroup = ref('general')
const activeGroupLabel = computed(() => GROUPS.find((g) => g.id === activeGroup.value)?.label || '')
const posts = ref([])
const loading = ref(true)
const draft = ref('')
const posting = ref(false)

const expandedPostId = ref(null)
const comments = ref([])
const commentsLoading = ref(false)
const commentDraft = ref('')

const loadError = ref('')

async function loadPosts() {
  loading.value = true
  loadError.value = ''
  expandedPostId.value = null
  try {
    posts.value = await userStore.fetchCommunityPosts(activeGroup.value)
  } catch (err) {
    // Without this catch, a Firestore error (e.g. a missing composite
    // index for the groupId + createdAt query) rejected the promise and
    // left `loading` stuck at true forever — an endless "Yuklanmoqda..."
    // with no posts and no way to post/refresh.
    console.error('Community fetch failed:', err)
    posts.value = []
    loadError.value = "Postlarni yuklab bo'lmadi. Internetni tekshirib, qayta urinib ko'ring."
  } finally {
    loading.value = false
    refresh()
  }
}

function switchGroup(id) {
  if (activeGroup.value === id) return
  activeGroup.value = id
  loadPosts()
}

async function submitPost() {
  if (!draft.value.trim() || posting.value) return
  posting.value = true
  try {
    await userStore.createCommunityPost(activeGroup.value, draft.value)
    draft.value = ''
    await loadPosts()
  } catch (err) {
    console.error('Community post failed:', err)
    loadError.value = "Post yuborilmadi. Qayta urinib ko'ring."
  } finally {
    posting.value = false
  }
}

async function removePost(postId) {
  await userStore.deleteCommunityPost(postId)
  posts.value = posts.value.filter((p) => p.id !== postId)
}

async function toggleLike(post) {
  const wasLiked = post.likedByMe
  post.likedByMe = !wasLiked
  post.likeCount = (post.likeCount || 0) + (wasLiked ? -1 : 1)
  await userStore.toggleLikePost(post.id, wasLiked)
}

async function toggleComments(post) {
  if (expandedPostId.value === post.id) {
    expandedPostId.value = null
    return
  }
  expandedPostId.value = post.id
  commentDraft.value = ''
  commentsLoading.value = true
  comments.value = await userStore.fetchComments(post.id)
  commentsLoading.value = false
}

async function submitComment(post) {
  if (!commentDraft.value.trim()) return
  const text = commentDraft.value
  commentDraft.value = ''
  await userStore.createComment(post.id, text)
  comments.value = await userStore.fetchComments(post.id)
  post.commentCount = (post.commentCount || 0) + 1
}

function formatTime(ts) {
  if (!ts?.toDate) return ''
  const date = ts.toDate()
  const diffMs = Date.now() - date.getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'hozirgina'
  if (mins < 60) return `${mins} daqiqa oldin`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} soat oldin`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} kun oldin`
  return date.toLocaleDateString('uz-UZ')
}

onMounted(loadPosts)
</script>

<style scoped>
.community-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.community-tab {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--surface-glass);
  background: var(--surface-glass);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.community-tab-active {
  background: var(--accent);
  color: #05130a;
  border-color: var(--accent);
}

.community-composer {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  color: var(--text-primary, inherit);
  font-family: inherit;
}

.community-post-btn {
  padding: 8px 18px !important;
  font-size: 13px !important;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.community-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--accent-soft, rgba(34,197,94,0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  overflow: hidden;
}
.community-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.community-delete-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}

.community-post-text {
  white-space: pre-wrap;
  line-height: 1.5;
}

.community-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.community-action-active {
  color: #ef4444;
}

.community-comments {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--surface-glass);
}
.community-comment {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.community-comment-avatar {
  font-size: 15px;
  flex-shrink: 0;
}
.community-comment-input {
  flex: 1;
  background: var(--surface-glass);
  border: none;
  outline: none;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 13px;
  color: inherit;
}
.community-comment-send {
  background: var(--accent);
  color: #05130a;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.community-comment-send:disabled {
  opacity: 0.5;
  cursor: default;
}

.community-author-link {
  display:flex;
  align-items:center;
  gap:12px;
  min-width:0;
  flex:1;
  color:inherit;
  text-decoration:none;
  border-radius:14px;
}
.community-author-link:hover p:first-child { color:var(--accent); }
.comment-profile-link { text-decoration:none; }
.community-comment-author {
  display:block;
  width:max-content;
  max-width:100%;
  color:var(--text-primary);
  text-decoration:none;
  font-size:12px;
  font-weight:800;
}
.community-comment-author:hover { color:var(--accent); }
</style>
