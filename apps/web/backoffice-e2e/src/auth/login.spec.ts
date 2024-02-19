import { test, expect } from '@playwright/test';

test('Has Button with Text Login With Google', async ({ page }) => {
  await page.goto('/auth/login');
  expect(await page.getByTestId('button-google').innerText()).toContain(
    'Login with Google'
  );
  expect(await page.getByTestId('button-github').innerText()).toContain(
    'Login with Github'
  );
});
