const {
    test,
    expect
} = require('@playwright/test');

const {
    LoginPage
} = require('../page/LoginPage');

const {
    TagsPage
} = require('../page/TagsPage');

const {
    users
} = require('../Utils/User');


test(
    'Create VIP Tag',
    async ({ page }) => {

        const loginPage =
            new LoginPage(page);

        const tagsPage =
            new TagsPage(page);

        const admin =
            Object.values(users).find(
                user => user.role === 'Administrator'
            );

        await loginPage.goto();

        await loginPage.login(
            admin.email,
            admin.password
        );

        await tagsPage.openTags();

        await tagsPage.createTagWithDetails(
            'VIP',
            'Conversation',
            'Amber',
            'VIP hot leads'
        );

        await expect(
            page.getByText(
                'Tag "VIP" has been created.'
            )
        ).toBeVisible();
    }
);