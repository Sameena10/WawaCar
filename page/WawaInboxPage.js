class WaWaInboxPage {
    constructor(page) {
        this.page = page;

        // Inbox
        this.inboxLink = page.getByRole("link", {
            name: "Inbox"
        });
    }

    // Open Inbox
    async openInbox() {
        await this.inboxLink.click();
    }

    // Open a conversation using the intent displayed in the conversation list
    async openConversationByIntent(intentName) {
        const conversation = this.page
            .getByRole("button")
            .filter({
                hasText: intentName
            })
            .first();

        await conversation.waitFor({
            state: "visible",
            timeout: 30000
        });

        await conversation.click();
    }

    // Returns the intent locator from the selected conversation
    getIntentLocator(intentName) {
        return this.page.getByRole("button", {
            name: intentName,
            exact: true
        });
    }

    // Verify that the expected intent is visible
    async verifyIntent(intentName) {
        const intent = this.getIntentLocator(intentName);

        await intent.waitFor({
            state: "visible",
            timeout: 30000
        });

        return intent;
    }
}

module.exports = { WaWaInboxPage };