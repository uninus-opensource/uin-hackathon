import { test, expect } from '@playwright/test';

test('Has Button with Text Login With Google', async ({ page }) => {
  await page.goto('/auth/login');
  expect(await page.getByTestId('btn-google').innerHTML()).toContain(
    'Masuk Dengan Google'
  );
});
