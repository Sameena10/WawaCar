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

        this.callbackModeDropdown = page.getByRole("combobox", {
            name: "Callback Mode"
        });

        this.createTeamButton = page.getByRole("button", {
            name: "Create Team"
        });

        this.saveChangesButton = page.getByRole("button", {
            name: "Save Changes"
        });

        // Search
        this.searchTeamInput = page.getByRole("textbox", {
            name: "Search teams..."
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

        await this.teamNameInput.fill(teamData.teamName);

        await this.descriptionInput.fill(teamData.description);

        await this.intentSearchInput.click();

        await this.page.getByRole("button", {
            name: teamData.intent,
            exact: true
        }).click();

        await this.callbackModeDropdown.click();

        await this.page
            .getByText(teamData.callbackMode, {
                exact: false
            })
            .click();

        await this.createTeamButton.click();

        await expect(
            this.page.getByText("Team created")
        ).toBeVisible({
            timeout: 30000
        });
    }

    async searchTeam(teamName) {
        await this.searchTeamInput.fill(teamName);

        await this.page.waitForTimeout(2000);
    }

    getTeam(teamName) {
        return this.page
            .locator("tbody tr")
            .filter({
                hasText: teamName
            })
            .first();
    }

    async openTeamSettings(teamName) {
        const team = this.getTeam(teamName);

        await expect(team).toBeVisible({
            timeout: 30000
        });

        await team.getByRole("button").last().click();

        await this.page.getByRole("menuitem", {
            name: "Team Settings"
        }).click();
    }

    async updateDescription(description) {
        await this.descriptionInput.clear();

        await this.descriptionInput.fill(description);

        await this.saveChangesButton.click();

        await expect(
            this.page.getByText("Team updated")
        ).toBeVisible({
            timeout: 30000
        });
    }

    async pauseTeam(teamName) {
        const team = this.getTeam(teamName);

        await expect(team).toBeVisible({
            timeout: 30000
        });

        await team.getByRole("button").last().click();

        await this.page.getByRole("menuitem", {
            name: "Pause Team"
        }).click();

        await expect(
            this.page.getByText("Team paused")
        ).toBeVisible({
            timeout: 30000
        });
    }
}

module.exports = {
    TeamsPage
};