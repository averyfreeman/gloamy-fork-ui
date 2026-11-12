import { expect, test, type Page } from '@playwright/test'

async function openAuthenticatedApp(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('gloamy:auth.json', JSON.stringify({ token: 'test-token' }))
  })

  await page.route('**/health', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ paired: true }),
  }))

  await page.route('**/api/**', async (route) => {
    const pathname = new URL(route.request().url()).pathname
    const body = pathname.endsWith('/status')
      ? {
          provider: 'test-provider',
          model: 'test-model',
          temperature: 0.2,
          uptime_seconds: 1,
          gateway_port: 42617,
          locale: 'en',
          memory_backend: 'markdown',
          paired: true,
          channels: {},
          health: { pid: 1, updated_at: '', uptime_seconds: 1, components: {} },
        }
      : pathname.endsWith('/cost')
        ? {
            session_cost_usd: 0,
            daily_cost_usd: 0,
            monthly_cost_usd: 0,
            total_tokens: 0,
            request_count: 0,
            by_model: {},
          }
        : { timeline: [] }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(body),
    })
  })

  await page.goto('/')
  await expect(page.getByText('Runtime Overview')).toBeVisible()
}

test('collapses and expands the desktop navigation with an announced state', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 850 })
  await openAuthenticatedApp(page)

  const toggle = page.getByRole('button', { name: 'Toggle navigation sidebar' })
  const navigation = page.locator('#app-navigation')

  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(navigation.getByText('Dashboard', { exact: true })).toHaveCount(0)
  await expect(page.getByTitle('Dashboard')).toBeVisible()

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(navigation.getByText('Dashboard', { exact: true })).toBeVisible()
})

test('mobile navigation opens with focus inside and Escape returns focus to its toggle', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await openAuthenticatedApp(page)

  const toggle = page.getByRole('button', { name: 'Toggle navigation sidebar' })
  await toggle.click()

  const close = page.getByRole('button', { name: 'Close navigation menu' })
  await expect(close).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')

  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
})

test('browser settings do not expose desktop daemon controls', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 850 })
  await openAuthenticatedApp(page)
  await page.goto('/#/settings')

  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Desktop application' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Request one-time pairing code' })).toHaveCount(0)
})
