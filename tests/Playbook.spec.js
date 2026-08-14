const {
    test,
    expect
} = require('@playwright/test');

const {
    LoginPage
} = require('../page/LoginPage');

const {
    PlaybooksPage
} = require('../page/PlaybooksPage');

const {
    users
} = require('../Utils/User');

const {
    playbooks
} = require('../Utils/playbookData');


const admin = Object.values(users).find(
    user => user.role === 'Administrator'
);


for (const playbook of playbooks) {

    test(
        `Create Playbook - ${playbook.name}`,
        async ({ page }) => {

            const loginPage =
                new LoginPage(page);

            const playbooksPage =
                new PlaybooksPage(page);

            // Login
            await loginPage.goto();

            await loginPage.login(
                admin.email,
                admin.password
            );

            // Open Playbooks
            await playbooksPage.openPlaybooks();

            // New Playbook
            await playbooksPage.clickNewPlaybook();

            // Dynamic Playbook data
            await playbooksPage.enterPlaybookDetails(
                playbook.name,
                playbook.description
            );

            await playbooksPage.selectType(
                playbook.type
            );

            await playbooksPage.selectStyle(
                playbook.style
            );

            // Create
            await playbooksPage.createPlaybook();

            // Verify
            await expect(
                page.getByText(
                    playbook.name,
                    { exact: true }
                )
            ).toBeVisible();
        }
    );
}