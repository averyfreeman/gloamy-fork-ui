import type { DesktopCapabilities } from '@/lib/platformCapabilities'

/** The browser client has no authority to manage a local daemon process. */
export const desktopCapabilities: DesktopCapabilities | undefined = undefined

export const isDesktopApp = desktopCapabilities !== undefined
