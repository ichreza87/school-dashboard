import { test, expect } from '@playwright/test';

test('login + dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[placeholder*=""Username""]', 'admin');
  await page.fill('input[type=""password""]', 'admin123');
  await page.click('button:has-text(""Masuk"")');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('text=Dashboard')).toBeVisible();
});

test('kehadiran siswa massal', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  // ... login
  await page.goto('http://localhost:5173/kehadiran-siswa');
  await expect(page.locator('text=Kehadiran Siswa')).toBeVisible();
});

test('import wizard', async ({ page }) => {
  await page.goto('http://localhost:5173/siswa');
  await page.click('text=Import Excel');
  await expect(page.locator('text=Wizard')).toBeVisible();
});
