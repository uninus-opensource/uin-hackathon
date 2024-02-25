import { test, expect } from '@playwright/test';

test('Has Register Text', async ({ page }) => {
  await page.goto('/auth/register');
  expect(await page.getByTestId('title').innerText()).toContain('Registrasi');
});
