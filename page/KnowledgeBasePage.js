const { expect } = require("@playwright/test");

class KnowledgeBasePage {

    constructor(page) {
        this.page = page;

        // Navigation
        this.knowledgeBaseLink = page.getByRole("link", {
            name: "Knowledge Base"
        });

        // FAQ
        this.addFAQButton = page.getByRole("button", {
            name: "Add FAQ"
        });

        this.faqQuestionInput = page.getByRole("textbox", {
            name: "What is your return policy?"
        });

        this.faqAnswerInput = page.getByRole("textbox", {
            name: "We offer a 30-day return"
        });

        // Text Content
        this.addTextButton = page.getByRole("button", {
            name: "Add Text"
        });

        this.textTitleInput = page.getByRole("textbox", {
            name: "About Our Company"
        });

        this.textContentInput = page.getByRole("textbox", {
            name: "Enter your content here..."
        });

        this.addContentButton = page.getByRole("button", {
            name: "Add Content"
        });

        // URL
        this.addURLButton = page.getByRole("button", {
            name: "Add URL"
        });

        this.urlInput = page.getByRole("textbox", {
            name: "https://example.com/about"
        });

        this.urlTitleInput = page.getByRole("textbox", {
            name: "About Us Page"
        });

        this.addURLConfirmButton = page.getByRole("button", {
            name: "Add URL"
        });
    }


    async openKnowledgeBase() {

        await this.knowledgeBaseLink.click();

        await expect(
            this.addFAQButton
        ).toBeVisible({
            timeout: 30000
        });
    }


    async addFAQ(question, answer) {

        await this.addFAQButton.click();

        await expect(
            this.faqQuestionInput
        ).toBeVisible({
            timeout: 10000
        });

        await this.faqQuestionInput.fill(
            question
        );

        await this.faqAnswerInput.fill(
            answer
        );

        // Click the Add FAQ button inside the dialog.
        // There can be two "Add FAQ" buttons:
        // one opens the dialog and one submits it.
        const dialog =
            this.page.getByRole("dialog");

        const submitFAQButton =
            dialog.getByRole("button", {
                name: "Add FAQ"
            });

        await submitFAQButton.click();

        await expect(
            this.page.getByText("FAQ added", {
                exact: true
            })
        ).toBeVisible({
            timeout: 30000
        });
    }


    async addText(title, content) {

        await this.addTextButton.click();

        await expect(
            this.textTitleInput
        ).toBeVisible({
            timeout: 10000
        });

        await this.textTitleInput.fill(
            title
        );

        await this.textContentInput.fill(
            content
        );

        await this.addContentButton.click();

        await expect(
            this.page.getByText(
                "Text content added",
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 30000
        });
    }


    async addURL(url, title) {

        await this.addURLButton.click();

        await expect(
            this.urlInput
        ).toBeVisible({
            timeout: 10000
        });

        await this.urlInput.fill(
            url
        );

        await this.urlTitleInput.fill(
            title
        );

        await this.addURLButton.last().click();

        await expect(
            this.page.getByText(
                "Webpage added for scraping",
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
    KnowledgeBasePage
};