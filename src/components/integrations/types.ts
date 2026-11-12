import type { Component } from 'vue'

export type IntegrationSetupCapability = 'oauth_device_code'
export type IntegrationType = 'ai_provider' | 'communication_channel' | 'remote_service' | 'local_runtime'

export interface IntegrationCatalogEntry {
  id?: string
  name: string
  description: string
  category: string
  status: 'Available' | 'Active' | 'ComingSoon'
  implementation_type?: IntegrationType
  setup_capability?: IntegrationSetupCapability | string
  connected?: boolean
}

export interface IntegrationSetupRegistration {
  capability: IntegrationSetupCapability
  component: Component
}

export type IntegrationSetupRegistry = Partial<Record<string, IntegrationSetupRegistration>>
