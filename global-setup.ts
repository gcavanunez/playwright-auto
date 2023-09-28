import { chromium, FullConfig } from '@playwright/test';

// const LOGIN_ENDPOINT = `${process.env.VITE_APP_API_BASE_URL}/v2/auth/login`;
async function globalSetup(config: FullConfig) {
    const { storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://mighty-diff.vercel.app/auth/login', {
        timeout: 300000,
    });

    await page.fill('#email', process.env.TEST_EMAIL || '', {
        timeout: 300000,
    });
    await page.fill('#password', process.env.TEST_PASSWORD || '', {
        timeout: 300000,
    });

    await page.locator('form button').click();
    await page.waitForTimeout(2000);
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;
