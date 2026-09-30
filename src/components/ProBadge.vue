<template>
  <span class="pro-badge" :class="size === 'sm' ? 'pro-badge-sm' : ''">
    <i class="ti ti-crown" aria-hidden="true"></i>
    PRO
  </span>
</template>

<script setup>
defineProps({
  size: { type: String, default: 'md' }
})
</script>

<style scoped>
.pro-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  border-radius: 100px;
  background: linear-gradient(135deg, #f6c453, #e8983a);
  color: #4a2e00;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.pro-badge-sm {
  padding: 2px 6px;
  font-size: 9px;
}
</style>
