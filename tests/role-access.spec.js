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


test(
    'Create Vehicle Test Drive Booking Playbook',
    async ({ page }) => {

        const loginPage =
            new LoginPage(page);

        const playbooksPage =
            new PlaybooksPage(page);

        const admin =
            Object.values(users).find(
                user => user.role === 'Administrator'
            );

        await loginPage.goto();

        await loginPage.login(
            admin.email,
            admin.password
        );

        await playbooksPage.openPlaybooks();

        await playbooksPage.clickNewPlaybook();

        await playbooksPage.enterPlaybookDetails(
            'Vehicle Test Drive Booking',
            'Guide the AI to assist customers with booking a vehicle test drive and collect the required customer and vehicle information.'
        );

        // Select Type
        await playbooksPage.selectType(
            'Support Triage'
        );

        // Select Style
        await playbooksPage.selectStyle(
            'Opportunistic'
        );

        // Create Playbook
        await playbooksPage.createPlaybook();

        // Verify Playbook is created
        await expect(
            page.getByText(
                'Vehicle Test Drive Booking',
                { exact: true }
            )
        ).toBeVisible();
    }
);