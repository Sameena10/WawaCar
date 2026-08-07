const { expect } = require("@playwright/test");

class TeamsPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.teamsLink = page.getByRole("link", {
            name: "Teams"
        });

        // Create Team
        this.newTeamButton = page.getByRole("button", {
            name: "New Team"
        });

        this.teamNameInput = page.getByRole("textbox", {
            name: "Team Name *"
        });

        this.descriptionInput = page.getByRole("textbox", {
            name: "Description"
        });

        this.intentSearchInput = page.getByRole("textbox", {
            name: "Search intents by name..."
        });

        this.createTeamButton = page.getByRole("button", {
            name: "Create Team"
        });

        // Callback Mode
        this.callbackModeDropdown = page.getByRole("combobox", {
            name: "Callback Mode"
        });

        // Search Team
        this.searchInput = page.getByRole("textbox").first();

        // Save
        this.saveChangesButton = page.getByRole("button", {
            name: "Save Changes"
        });
    }

    async openTeams() {

        await this.teamsLink.click();

        await expect(this.newTeamButton).toBeVisible({
            timeout: 30000
        });
    }

    async createTeam(teamData) {

        await this.newTeamButton.click();

        await expect(this.teamNameInput).toBeVisible();

        // Team Name
        await this.teamNameInput.fill(teamData.name);

        // Description
        await this.descriptionInput.fill(teamData.description);

        // ----------------------------
        // Select Handled Intent
        // ----------------------------

        await this.page.locator(".flex.flex-wrap.gap-2").click();

        await expect(this.intentSearchInput).toBeVisible();

        await this.intentSearchInput.fill(teamData.intent);

        // Wait for the intent to appear
        await expect(
            this.page.getByRole("button", {
                name: teamData.intent,
                exact: true
            })
        ).toBeVisible({
            timeout: 10000
        });

        await this.page
            .getByRole("button", {
                name: teamData.intent,
                exact: true
            })
            .click();

        // Continue
        await this.createTeamButton.click();

        // ----------------------------
        // Callback Mode
        // ----------------------------

        await expect(this.callbackModeDropdown).toBeVisible();

        await this.callbackModeDropdown.click();

        await this.page
            .getByText(teamData.callbackMode, {
                exact: false
            })
            .click();

        // Final Create
        await this.createTeamButton.click();

        await expect(
            this.page.getByText("Team created successfully")
        ).toBeVisible({
            timeout: 30000
        });
    }

    async searchTeam(teamName) {

        await this.searchInput.fill(teamName);

        await expect(this.searchInput).toHaveValue(teamName);

        await this.page.waitForTimeout(1500);
    }

    getTeam(teamName) {

        return this.page
            .locator("tbody tr")
            .filter({
                hasText: teamName
            })
            .first();
    }

    async openTeam(teamName) {

        const team = this.getTeam(teamName);

        await expect(team).toBeVisible({
            timeout: 30000
        });

        await team.click();
    }

    async updateTeam(teamName, callbackMode) {

        const team = this.getTeam(teamName);

        await expect(team).toBeVisible({
            timeout: 30000
        });

        // Open menu for the created team only
        await team
            .locator("button")
            .last()
            .click();

        await this.page
            .getByRole("menuitem", {
                name: "Team Settings"
            })
            .click();

        await expect(this.callbackModeDropdown).toBeVisible();

        await this.callbackModeDropdown.click();

        await this.page
            .getByText(callbackMode, {
                exact: false
            })
            .click();

        await this.saveChangesButton.click();

        await expect(
            this.page.getByText("Changes saved successfully")
        ).toBeVisible({
            timeout: 30000
        });
    }

    async pauseTeam(teamName) {

        const team = this.getTeam(teamName);

        await expect(team).toBeVisible({
            timeout: 30000
        });

        // Open menu for created team only
        await team
            .locator("button")
            .last()
            .click();

        await this.page
            .getByRole("menuitem", {
                name: "Pause Team"
            })
            .click();

        await expect(
            this.page.getByText("Paused")
        ).toBeVisible({
            timeout: 30000
        });
    }
}

module.exports = {
    TeamsPage
};