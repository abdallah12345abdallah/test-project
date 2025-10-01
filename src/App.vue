<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BlankLayout from '@/layouts/BlankLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const route = useRoute()

// ------------------------------------
// the layout from route meta
const layout = computed(() => {
  return route.meta.layout || 'default'
})

// ------------------------------------
// Dynamic component for layout
const AppLayout = computed(() => {
  switch (layout.value) {
    case 'dashboard':
      return DashboardLayout
    default:
      return BlankLayout
  }
})
</script>

<template>
  <div class="relative">
    <component :is="AppLayout">
      <router-view />
    </component>
  </div>
</template>

<style scoped></style>
