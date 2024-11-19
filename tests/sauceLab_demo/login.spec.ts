import {test, expect} from '@playwright/test';


test('Should display the product page after successful logging on',
    async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('[data-test="title"]')).toBeVisible();
    }
);