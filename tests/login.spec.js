// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage.js';

test('login and open WhatsApp link', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login('sales.mgr@wawacars.com', 'Manager123!');

  await loginPage.clickWhatsAppLink();
});
