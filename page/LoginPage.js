// @ts-check

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByRole(
      'textbox',
      { name: 'Username' }
    );

    this.passwordInput = page.getByRole(
      'textbox',
      { name: 'Password' }
    );

    this.signInButton = page.getByRole(
      'button',
      { name: 'Sign in' }
    );

    this.whatsappLink = page.getByRole(
      'link',
      {
        name: 'Logimeter WhatsApp WhatsApp'
      }
    );
  }

  async goto() {
    await this.page.goto(
      'https://test2.logimeter.com/dealer-ui/login'
    );
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.signInButton.click();
  }

  async clickWhatsAppLink() {
    await this.whatsappLink.click();
  }
}

module.exports = { LoginPage };