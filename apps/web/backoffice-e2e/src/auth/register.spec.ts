import { test, expect } from '@playwright/test';

test('Has title', async ({ page }) => {
  await page.goto('/auth/register');
  expect(page.getByTestId('title')).toBeDefined();
});
