<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ConfigProvider } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { useMediaQuery } from '@vueuse/core'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import { TooltipProvider } from '@/components/ui/tooltip'

import { useAuthStore } from '@/stores/auth'
import { useUIStateStore } from '@/stores/uiState'

const router = useRouter()
const auth = useAuthStore()
const uiStore = useUIStateStore()
const isMobile = useMediaQuery('(max-width: 767px)')
const mobileSidebarOpen = ref(false)
const topbarRef = ref<InstanceType<typeof AppTopbar> | null>(null)
const sidebarRef = ref<InstanceType<typeof AppSidebar> | null>(null)

async function toggleSidebar() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
    if (mobileSidebarOpen.value)
      await sidebarRef.value?.focusMobileCloseButton()
    return
  }
  uiStore.toggleLeftSidebar()
}

function closeMobileSidebar(restoreFocus = true) {
  if (!mobileSidebarOpen.value)
    return
  mobileSidebarOpen.value = false
  if (restoreFocus)
    void nextTick(() => topbarRef.value?.focusSidebarToggle())
}

function handleSidebarKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMobileSidebar()
    return
  }
  if (event.key === 'Tab' && mobileSidebarOpen.value) {
    const sidebar = document.getElementById('app-navigation')
    const focusable = sidebar
      ? Array.from(sidebar.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(element => element.getClientRects().length > 0)
      : []
    const first = focusable[0]
    const last = focusable.at(-1)
    if (!first || !last) {
      event.preventDefault()
    }
    else if (event.shiftKey && (document.activeElement === first || !sidebar?.contains(document.activeElement))) {
      event.preventDefault()
      last.focus()
    }
    else if (!event.shiftKey && (document.activeElement === last || !sidebar?.contains(document.activeElement))) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(() => router.currentRoute.value.fullPath, () => closeMobileSidebar(false))
watch(isMobile, (mobile) => {
  if (!mobile)
    closeMobileSidebar(false)
})
watch(mobileSidebarOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(async () => {
  if (!auth.isLoaded)
    await auth.load()
})

// Watch for authentication state changes to handle logout/login redirection
watch(
  () => ({ authenticated: auth.isAuthenticated, loaded: auth.isLoaded }),
  ({ authenticated, loaded }) => {
    if (!loaded)
      return

    const currentPath = router.currentRoute.value.path
    if (!authenticated) {
      if (currentPath !== '/authentication') {
        router.replace('/authentication')
      }
    }
    else {
      if (currentPath === '/authentication') {
        const redirect = router.currentRoute.value.query.redirect
        const nextPath = typeof redirect === 'string' && redirect.trim().length > 0 ? redirect : '/'
        router.replace(nextPath)
      }
    }
  },
  { immediate: true },
)

const handleUnauthorized = () => {
  if (router.currentRoute.value.path !== '/authentication')
    router.push('/authentication')
}

function reloadWindow() {
  window.location.reload()
}

function focusMainContent() {
  document.getElementById('main-content')?.focus()
}

onMounted(() => {
  window.addEventListener('gloamy-unauthorized', handleUnauthorized)
})

onBeforeUnmount(() => {
  window.removeEventListener('gloamy-unauthorized', handleUnauthorized)
  window.removeEventListener('keydown', handleSidebarKeydown)
  document.body.style.overflow = ''
})

onMounted(() => window.addEventListener('keydown', handleSidebarKeydown))
</script>

<template>
  <ConfigProvider>
    <TooltipProvider>
      <div v-if="auth.isLoaded" class="h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
        <!-- Main Layout (Authenticated) -->
        <div v-if="auth.isAuthenticated && $route.path !== '/authentication'" class="relative flex h-full min-h-0 w-full min-w-0">
          <a
            href="#main-content"
            class="sr-only z-[60] rounded-md bg-background px-4 py-3 font-medium text-foreground focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            @click.prevent="focusMainContent"
          >
            Skip to main content
          </a>
          <button
            v-if="mobileSidebarOpen"
            type="button"
            class="fixed inset-0 z-40 cursor-default bg-black/45 md:hidden"
            aria-label="Dismiss navigation backdrop"
            @click="closeMobileSidebar()"
          />
          <AppSidebar ref="sidebarRef" :mobile-open="mobileSidebarOpen" @close="closeMobileSidebar()" />
          <main id="main-content" tabindex="-1" class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <AppTopbar
              ref="topbarRef"
              :mobile-open="mobileSidebarOpen"
              :expanded="!uiStore.state.leftSidebarCollapsed"
              @toggle-sidebar="toggleSidebar"
            />
            <div class="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
              <router-view v-slot="{ Component, route }">
                <component :is="Component" v-if="Component" :key="route.fullPath" />
                <div v-else class="h-full w-full flex items-center justify-center px-6">
                  <div class="max-w-md w-full p-6 rounded-[4px] border border-border/50 bg-card/20 text-center">
                    <h3 class="text-lg font-medium text-foreground mb-2">Page failed to mount</h3>
                    <p class="text-sm text-muted-foreground mb-6">
                      The route changed, but no page component was available for render. Reload the window to recover the view tree.
                    </p>
                    <button
                      class="px-4 py-2 bg-primary text-primary-foreground rounded-[4px] text-sm font-medium hover:opacity-90 transition-opacity"
                      @click="reloadWindow"
                    >
                      Reload Window
                    </button>
                  </div>
                </div>
              </router-view>
            </div>
          </main>
        </div>

        <!-- Auth/Lock Layout (Unauthenticated or Auth Page) -->
        <div v-else class="h-full w-full">
          <router-view v-if="$route.path === '/authentication'" v-slot="{ Component }">
            <component :is="Component" v-if="Component" />
            <div v-else class="h-full w-full flex items-center justify-center px-6">
              <div class="max-w-md w-full p-6 rounded-[4px] border border-border/50 bg-card/20 text-center">
                <h3 class="text-lg font-medium text-foreground mb-2">Authentication view unavailable</h3>
                <p class="text-sm text-muted-foreground mb-6">
                  The authentication route did not resolve to a page component. Reload the window to retry.
                </p>
                <button
                  class="px-4 py-2 bg-primary text-primary-foreground rounded-[4px] text-sm font-medium hover:opacity-90 transition-opacity"
                  @click="reloadWindow"
                >
                  Reload Window
                </button>
              </div>
            </div>
          </router-view>
          <div v-else class="h-full w-full flex items-center justify-center">
            <Icon icon="hugeicons:loading-03" class="size-6 animate-spin text-muted-foreground/40" />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="h-screen w-full flex items-center justify-center bg-background">
        <Icon icon="hugeicons:loading-03" class="size-6 animate-spin text-muted-foreground/40" />
      </div>
    </TooltipProvider>
  </ConfigProvider>
</template>
