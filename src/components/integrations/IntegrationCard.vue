<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { IntegrationCatalogEntry } from './types'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  integration: IntegrationCatalogEntry
  displayName: string
  setupInteractive: boolean
  icon: string
  iconClass: string
  iconStyle?: CSSProperties
  status: IntegrationCatalogEntry['status']
  statusLabel: string
}>()

const emit = defineEmits<{ setup: [event: MouseEvent] }>()

function statusIcon(status: IntegrationCatalogEntry['status']): string {
  if (status === 'Active')
    return 'hugeicons:tick-02'
  if (status === 'Available')
    return 'hugeicons:add-01'
  return 'hugeicons:clock-01'
}

function statusClass(status: IntegrationCatalogEntry['status']): string {
  if (status === 'Active')
    return 'text-emerald-500'
  if (status === 'Available')
    return 'text-sky-500'
  return 'text-muted-foreground'
}
</script>

<template>
  <component
    :is="props.setupInteractive ? 'button' : 'div'"
    :type="props.setupInteractive ? 'button' : undefined"
    :aria-haspopup="props.setupInteractive ? 'dialog' : undefined"
    :aria-label="props.setupInteractive ? `Set up ${props.displayName}. ${props.statusLabel}. ${props.integration.category}.` : undefined"
    class="w-full rounded-2xl border border-border/40 bg-card/20 p-4 transition-colors"
    :class="props.setupInteractive
      ? 'cursor-pointer text-left hover:border-border/60 hover:bg-card/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
      : ''"
    @click="props.setupInteractive && emit('setup', $event)"
  >
    <div class="mb-1 flex items-center gap-2 pr-2">
      <Icon
        :icon="props.icon"
        class="size-4 shrink-0"
        :class="props.iconClass"
        :style="props.iconStyle"
        aria-hidden="true"
      />
      <span class="truncate font-sans text-[15px] font-medium text-foreground">{{ props.displayName }}</span>
    </div>

    <p class="mb-3 line-clamp-2 text-[13px] text-muted-foreground">
      {{ props.integration.description }}
    </p>

    <div class="flex items-center justify-between gap-2">
      <span class="inline-flex items-center gap-1.5 text-[11px] font-medium" :class="statusClass(props.status)">
        <Icon :icon="statusIcon(props.status)" class="size-3.5 shrink-0" aria-hidden="true" />
        {{ props.statusLabel }}
      </span>
      <span class="truncate text-[11px] text-muted-foreground" :title="props.integration.category">
        {{ props.integration.category }}
      </span>
    </div>
  </component>
</template>
