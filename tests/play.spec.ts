import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://mighty-diff.vercel.app/dashboard');

    await expect(page.locator('main')).toHaveText('You are logged in!');
});
