const { test, expect } = require("@playwright/test");

// Import users from Utils/User.js
const { users } = require("../Utils/User");

const { LoginPage } = require("../page/LoginPage");

const {
    WaWaInboxPage
} = require("../page/WawaInboxPage");

test(
    "Verify Maintenance intent is displayed for the selected conversation",
    async ({ page }) => {

        const loginPage = new LoginPage(page);

        const waWaInboxPage =
            new WaWaInboxPage(page);

        await page.goto(
            "https://test2.logimeter.com/dealer-ui/login"
        );

        await loginPage.login(
            users.administrator.email,
            users.administrator.password
        );

        await waWaInboxPage.openInbox();

        await waWaInboxPage.openConversationByIntent(
            "Maintenance"
        );

        const intent =
            await waWaInboxPage.verifyIntent(
                "Maintenance"
            );

        await expect(intent)
            .toBeVisible();

        await expect(intent)
            .toHaveText("Maintenance");
    }
);