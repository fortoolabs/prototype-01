import { test, expect } from '@playwright/test'

test('verify that prose view scrolls to the Resources section', async ({
  page,
}) => {
  await page.goto('/')
  const targetInput = page.locator('input')
  await expect(targetInput).toBeVisible()
  await targetInput.fill(
    'https://gitlab.com/formation.tools/eng/proto-01/-/raw/hack/README.org',
  )
  await targetInput.press('Enter')
  const resourcesLink = await page.locator(
    '//*[@id="headlessui-disclosure-panel-:r2:"]/li[3]/div/div[2]/span',
  )
  await expect(resourcesLink).toBeVisible()
  await resourcesLink.click()
  const resourceSectionHeader = await page.locator(
    '//*[@id="__next"]/div/div/main/aside/div/ul/li[2]/div[1]/div/span',
  )
  await expect(resourceSectionHeader).toBeVisible()
})
