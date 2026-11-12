export interface DesktopRuntime {
  ready: boolean
  api_base_url: string | null
  desktop_managed: boolean
  gateway_version?: string | null
  error: string | null
}

export interface DesktopCapabilities {
  getDaemonStatus(): Promise<DesktopRuntime>
  requestPairingCode(): Promise<string>
  getKeepDaemonRunning(): Promise<boolean>
  setKeepDaemonRunning(keepRunning: boolean): Promise<void>
}
