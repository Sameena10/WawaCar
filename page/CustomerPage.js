// @ts-check

import { expect } from '@playwright/test';

export class CustomerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;


    this.customerLink = page.getByRole('link', { name: 'Customer' });


    this.addContactButton = page.getByRole('button', {
      name: 'Add Contact'
    });

    this.customerTable = page.locator('table');

    this.tableRows = page.locator(
      'tbody tr[data-slot="table-row"]'
    );


    this.nameInput = page.getByRole('textbox', {
      name: 'Name *'
    });

    this.phoneInput = page.getByRole('textbox', {
      name: '+91 98765'
    });

    this.emailInput = page.getByRole('textbox', {
      name: 'john@example.com'
    });

    this.companyInput = page.getByRole('textbox', {
      name: 'Acme Inc.'
    });

    this.websiteInput = page.getByRole('textbox', {
      name: 'Website'
    });

    this.lifecycleCombobox = page.getByRole('combobox', {
      name: 'Lifecycle Stage'
    });

    this.subscriberOption = page
      .getByLabel('📧Subscriber')
      .getByText('📧Subscriber');

    this.createContactButton = page.getByRole('button', {
      name: 'Create Contact'
    });

    this.successMessage = page.getByText(
      'Contact created successfully'
    );

    // Task

    this.createTaskButton = page.getByRole('button', {
      name: 'Create Task'
    });
  }

  async navigateToCustomers() {

    await this.customerLink.click();

    await expect(this.addContactButton).toBeVisible({
      timeout: 15000
    });

    await expect(this.customerTable).toBeVisible({
      timeout: 15000
    });
  }

  async clickAddContact() {
    await this.addContactButton.click();
  }

  /**
   * @param {{
   * name:string,
   * phone:string,
   * email:string,
   * company:string,
   * website:string
   * }} details
   */
  async fillContactDetails(details) {

    await this.nameInput.fill(details.name);
    await this.phoneInput.fill(details.phone);
    await this.emailInput.fill(details.email);
    await this.companyInput.fill(details.company);
    await this.websiteInput.fill(details.website);
  }

  async selectLifecycleStage() {

    await this.lifecycleCombobox.click();
    await this.subscriberOption.click();
  }

  async createContact() {

    await this.createContactButton.click();
  }

  async verifySuccessMessage() {

    await expect(this.successMessage).toBeVisible({
      timeout: 10000
    });
  }

  /**
   * @param {string} contactName
   */
  async openContactMenu(contactName) {

    const row = this.page
      .locator('tbody tr')
      .filter({
        hasText: contactName
      })
      .first();

    await expect(row).toBeVisible();

    await row
      .locator('[data-slot="dropdown-menu-trigger"]')
      .click();
  }

  /**
   * Opens a random active customer's menu.
   *
   * @returns {Promise<string>}
   */
  async openRandomContactMenu() {

    await expect(this.tableRows.first()).toBeVisible({
      timeout: 15000
    });

    const totalRows = await this.tableRows.count();

    console.log(`Total Customers: ${totalRows}`);

    if (totalRows === 0) {

      await this.page.screenshot({
        path: 'customer-page.png',
        fullPage: true
      });

      throw new Error('No customers found.');
    }

    const indexes = [...Array(totalRows).keys()]
      .sort(() => Math.random() - 0.5);

    for (const index of indexes) {

      const row = this.tableRows.nth(index);

      const customerName = (
        await row
          .locator('td')
          .nth(1)
          .locator('p')
          .textContent()
      )?.trim() || '';

      const status = (
        await row
          .locator('td')
          .nth(4)
          .locator('span')
          .textContent()
      )?.trim() || '';

      console.log(
        `Checking ${customerName} | Status: ${status}`
      );

      if (status.toLowerCase() === 'blocked') {
        continue;
      }

      await row
        .locator('[data-slot="dropdown-menu-trigger"]')
        .click();

      console.log(`Selected: ${customerName}`);

      return customerName;
    }

    throw new Error('No active customer found.');
  }

  /**
   * @param {string} optionName
   */
  async clickMenuOption(optionName) {

    await this.page
      .getByRole('menuitem', {
        name: optionName
      })
      .click();
  }

  /**
   * @param {{
   * name:string,
   * phone:string,
   * email:string
   * }} details
   */
  async verifyContactDetails(details) {

    await expect(
      this.page.getByText(details.name, {
        exact: false
      })
    ).toBeVisible();

    await expect(
      this.page.getByText(details.phone, {
        exact: false
      })
    ).toBeVisible();

    await expect(
      this.page.getByText(details.email, {
        exact: false
      })
    ).toBeVisible();
  }

  async clickBackToContacts() {

    await this.page
      .getByRole('button', {
        name: 'Back to Contacts'
      })
      .click();
  }

  /**
   * @param {{
   * title:string,
   * description:string,
   * priority:string,
   * dueTime:string,
   * assignee:string
   * }} task
   */
  async fillTaskDetails(task) {

    await this.page
      .getByRole('textbox', {
        name: 'Title *'
      })
      .fill(task.title);

    await this.page
      .getByRole('textbox', {
        name: 'Description'
      })
      .fill(task.description);

    const categoryDropdown = this.page
      .getByRole('combobox')
      .filter({
        hasText: 'To-Do'
      });

    if (await categoryDropdown.isVisible()) {

      await categoryDropdown.click();

      await this.page
        .locator('[role="option"]')
        .first()
        .click();
    }

    const priorityDropdown = this.page
      .getByRole('combobox')
      .filter({
        hasText: 'Medium'
      });

    await priorityDropdown.click();

    await this.page
      .getByRole('option', {
        name: task.priority
      })
      .click();

    await this.page
      .getByRole('textbox', {
        name: 'Due Time'
      })
      .fill(task.dueTime);

    const assigneeDropdown = this.page
      .getByRole('combobox')
      .filter({
        hasText: 'Linda Botha'
      });

    await assigneeDropdown.click();

    await this.page
      .getByRole('option', {
        name: task.assignee
      })
      .click();

    const reminder = this.page.getByRole('checkbox', {
      name: 'Set Reminder'
    });

    if (!(await reminder.isChecked())) {
      await reminder.click();
    }
  }

  async clickCreateTask() {
    await this.createTaskButton.click();
  }

  getEditDialog() {
    return this.page.getByRole('dialog', {
      name: 'Contact Details'
    });
  }
}