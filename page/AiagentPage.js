const { expect } = require("@playwright/test");

class AiagentPage {

    constructor(page) {
        this.page = page;

        // Navigation
        this.aiAgentsLink = page.getByRole("link", {
            name: "AI Agents"
        });

        // Create Bot
        this.newBotButton = page.getByRole("button", {
            name: "New Bot"
        });

        this.displayNameInput = page.getByRole("textbox", {
            name: "Display Name"
        });

        this.primaryLanguageDropdown = page.getByRole(
            "combobox",
            {
                name: "Primary Language"
            }
        );

        this.createBotButton = page.getByRole("button", {
            name: "Create Bot"
        });
    }


    async openAIAgents() {

        await this.aiAgentsLink.click();

        await expect(
            this.newBotButton
        ).toBeVisible({
            timeout: 30000
        });
    }


    async createBot(botData) {

        await this.newBotButton.click();

        await expect(
            this.displayNameInput
        ).toBeVisible({
            timeout: 10000
        });


        // -------------------------
        // Display Name
        // -------------------------

        await this.displayNameInput.fill(
            botData.displayName
        );


        // -------------------------
        // Primary Language
        // -------------------------

        await this.primaryLanguageDropdown.click();

        await this.page
            .getByRole("option", {
                name: botData.primaryLanguage,
                exact: true
            })
            .click();


        // -------------------------
        // Bot configuration
        // -------------------------

        /*
         * These are the configuration options
         * selected by the recorded script.
         *
         * The recorder generated CSS selectors
         * for these because they don't have
         * accessible names.
         */

        if (botData.configurationOptions) {

            for (
                const selector
                of botData.configurationOptions
            ) {

                const option =
                    this.page.locator(selector).first();

                await expect(
                    option
                ).toBeVisible({
                    timeout: 10000
                });

                await option.click();
            }
        }


        // -------------------------
        // Tabs
        // -------------------------

        if (botData.tabs) {

            for (
                const tabName
                of botData.tabs
            ) {

                const tab =
                    this.page.getByRole("tab", {
                        name: tabName,
                        exact: true
                    });

                await expect(
                    tab
                ).toBeVisible({
                    timeout: 10000
                });

                await tab.click();
            }
        }


        // -------------------------
        // Create Bot
        // -------------------------

        await expect(
            this.createBotButton
        ).toBeVisible({
            timeout: 10000
        });

        await this.createBotButton.click();


        // -------------------------
        // Verify creation
        // -------------------------

        await expect(
            this.page.getByText(
                "Bot created successfully",
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 30000
        });
    }
}


module.exports = {
    AiagentPage
};