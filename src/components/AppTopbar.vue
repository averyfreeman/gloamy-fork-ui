<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useMediaQuery } from '@vueuse/core'

const props = defineProps<{ mobileOpen: boolean; expanded: boolean }>()
const emit = defineEmits<{ toggleSidebar: [] }>()

const route = useRoute()
const isMobile = useMediaQuery('(max-width: 767px)')
const toggleButton = ref<HTMLButtonElement | null>(null)

const pageLabelMap: Record<string, string> = {
  dashboard: 'Runtime Overview',
  cowork: 'Cowork Session',
  tools: 'Tool Controls',
  'cron-jobs': 'Cron Schedules',
  integrations: 'Integration Catalog',
  memory: 'Memory Records',
  configuration: 'System Config',
  'cost-tracking': 'Cost Tracking',
  logs: 'System Logs',
  doctor: 'Runtime Doctor',
  authentication: 'Access Pairing',
  settings: 'Theme Settings',
}

const pageDescriptor = computed(() => {
  const routeName = typeof route.name === 'string' ? route.name : ''
  return pageLabelMap[routeName] ?? 'Page Overview'
})
const sidebarExpanded = computed(() => isMobile.value ? props.mobileOpen : props.expanded)

function focusSidebarToggle() {
  toggleButton.value?.focus()
}

defineExpose({ focusSidebarToggle })
</script>

<template>
  <header class="h-12 px-3 sm:px-4 shrink-0 flex items-center gap-3">
    <button
      ref="toggleButton"
      type="button"
      class="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      aria-label="Toggle navigation sidebar"
      aria-controls="app-navigation"
      :aria-expanded="sidebarExpanded"
      @click="emit('toggleSidebar')"
    >
      <Icon :icon="props.mobileOpen ? 'hugeicons:cancel-01' : 'hugeicons:menu-01'" class="size-5" aria-hidden="true" />
    </button>
    <span class="text-[12px] font-medium tracking-wide text-muted-foreground/90">
      {{ pageDescriptor }}
    </span>
  </header>
</template>
