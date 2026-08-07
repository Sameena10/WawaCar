const {
    test,
    expect
} = require('@playwright/test');

const {
    LoginPage
} = require('../page/LoginPage');

const {
    users
} = require('../Utils/User');


for (
    const user
    of Object.values(users)
) {

    test(
        `Verify login for ${user.role} - ${user.name}`,
        async ({ page }) => {

            const loginPage =
                new LoginPage(page);

            // Open login page
            await loginPage.goto();

            // Login using current user's credentials
            await loginPage.login(
                user.email,
                user.password
            );

            // Verify successful login
            await expect(
                page.getByText(
                    'Dashboard',
                    { exact: true }
                )
            ).toBeVisible();

        }
    );

}