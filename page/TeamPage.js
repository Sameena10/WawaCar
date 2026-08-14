const { expect } = require("@playwright/test");

class TeamsPage {

    constructor(page) {
        this.page = page;

        this.teamsLink = page.getByRole("link", {
            name: "Teams"
        });

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

        this.callbackModeDropdown = page.getByRole(
            "combobox",
            {
                name: "Callback Mode"
            }
        );

        this.createTeamButton = page.getByRole("button", {
            name: "Create Team"
        });

        this.saveChangesButton = page.getByRole(
            "button",
            {
                name: "Save Changes"
            }
        );

        this.searchInput = page.getByRole("textbox").first();
    }

    async openTeams() {
        await this.teamsLink.click();

        await expect(
            this.newTeamButton
        ).toBeVisible({
            timeout: 30000
        });
    }

    async createTeam(teamData) {

        await this.newTeamButton.click();

        await expect(
            this.teamNameInput
        ).toBeVisible({
            timeout: 10000
        });

        await this.teamNameInput.fill(
            teamData.name
        );

        await this.descriptionInput.fill(
            teamData.description
        );

        await this.intentSearchInput.click();

        await this.intentSearchInput.fill(
            teamData.intentSearch
        );

        const intentDropdown = this.page
            .locator("div.border.rounded-md.bg-background")
            .filter({
                has: this.page.getByText(
                    teamData.intentSearch,
                    {
                        exact: true
                    }
                )
            })
            .first();

        await expect(
            intentDropdown
        ).toBeVisible({
            timeout: 10000
        });

        const firstIntent = intentDropdown
            .locator("button")
            .first();

        await expect(
            firstIntent
        ).toBeVisible({
            timeout: 10000
        });

        await firstIntent.click();

        await this.callbackModeDropdown.click();

        const callbackOption = this.page.getByRole(
            "option",
            {
                name: teamData.callbackMode,
                exact: true
            }
        );

        await expect(
            callbackOption
        ).toBeVisible({
            timeout: 10000
        });

        await callbackOption.click();

        await this.createTeamButton.click();

        await expect(
            this.page.getByText(
                "Team created",
                {
                    exact: true
                }
            )
        ).toBeVisible({
            timeout: 30000
        });
    }

    async searchTeam(teamName) {

        await this.searchInput.fill(
            teamName
        );

        await expect(
            this.searchInput
        ).toHaveValue(teamName);

        await this.page.waitForTimeout(1000);
    }

    getTeam(teamName) {

        return this.page
            .locator("tbody tr")
            .filter({
                hasText: teamName
            })
            .first();
    }

    async updateTeam(
        teamName,
        callbackMode
    ) {

        const team = this.getTeam(
            teamName
        );

        await expect(
            team
        ).toBeVisible({
            timeout: 30000
        });

        await team
            .locator("button")
            .last()
            .click();

        await this.page
            .getByRole(
                "menuitem",
                {
                    name: "Team Settings"
                }
            )
            .click();

        await expect(
            this.callbackModeDropdown
        ).toBeVisible({
            timeout: 10000
        });

        await this.callbackModeDropdown.click();

        const callbackOption =
            this.page.getByRole(
                "option",
                {
                    name: callbackMode,
                    exact: true
                }
            );

        await expect(
            callbackOption
        ).toBeVisible({
            timeout: 10000
        });

        await callbackOption.click();

        await this.saveChangesButton.click();

        await expect(
            this.page.getByText(
                /Changes saved successfully|Team updated/i
            )
        ).toBeVisible({
            timeout: 30000
        });
    }
}

module.exports = {
    TeamsPage
};