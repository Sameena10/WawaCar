// @ts-check

import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage.js';
import { CustomerPage } from '../page/CustomerPage.js';

function generateDynamicCustomerData() {
  const uniqueId = Date.now() + Math.floor(Math.random() * 100);
  const randomMobile = Math.floor(7000000000 + Math.random() * 3000000000);
  const randomSuffix = Math.random().toString(36).substring(2, 6);

  return {
    name: `drey ${uniqueId}`,
    phone: `+91 ${randomMobile}`,
    email: `drey.${uniqueId}@example.com`,
    company: `A2Z ${randomSuffix.toUpperCase()}`,
    website: `https://a2z-${randomSuffix}.com`
  };
}

test.describe('Customer Contacts Management', () => {

  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'sales.mgr@wawacars.com',
      'Manager123!'
    );

    await loginPage.clickWhatsAppLink();

  });

  test('Create Customer Contact', async ({ page }) => {

    const customerPage = new CustomerPage(page);

    const customerData = generateDynamicCustomerData();

    await customerPage.navigateToCustomers();

    await customerPage.clickAddContact();

    await customerPage.fillContactDetails(customerData);

    await customerPage.selectLifecycleStage();

    await customerPage.createContact();

    await customerPage.verifySuccessMessage();

  });

  test('View Random Customer Details', async ({ page }) => {

    const customerPage = new CustomerPage(page);

    await customerPage.navigateToCustomers();

    const customerName = await customerPage.openRandomContactMenu();

    console.log(`Viewing customer: ${customerName}`);

    await customerPage.clickMenuOption('View Details');

    // Verify details page opened
    await expect(
      page.getByRole('button', { name: 'Back to Contacts' })
    ).toBeVisible();

    await customerPage.clickBackToContacts();

  });

  test('Create Task For Random Active Customer', async ({ page }) => {

    const customerPage = new CustomerPage(page);

    await customerPage.navigateToCustomers();

    const customerName = await customerPage.openRandomContactMenu();

    console.log(`Creating task for: ${customerName}`);

    await customerPage.clickMenuOption('Create Task');

    await customerPage.fillTaskDetails({
      title: 'Task Creation',
      description: 'Automation Task',
      priority: 'High',
      dueTime: '09:01',
      assignee: 'James Patel'
    });

    await customerPage.clickCreateTask();

    await customerPage.clickCreateTask();


    await expect(
      page.getByText('Task created successfully').first()
    ).toBeVisible();

  });

  test('Edit Random Active Customer', async ({ page }) => {

    const customerPage = new CustomerPage(page);

    await customerPage.navigateToCustomers();

    const customerName = await customerPage.openRandomContactMenu();

    console.log(`Editing customer: ${customerName}`);

    await customerPage.clickMenuOption('Edit');

    await expect(
      customerPage.getEditDialog()
    ).toBeVisible();

  });

});