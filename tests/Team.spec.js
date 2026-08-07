const { test, expect } = require("@playwright/test");

const { users } = require("../Utils/User");

const {
    TeamsPage
} = require("../page/TeamPage");

test(
    "Create, update and pause the created team",
    async ({ page }) => {

        const teamsPage = new TeamsPage(page);

        const uniqueTeamName =
            `Sales ${Date.now()}`;

        const teamData = {
            name: uniqueTeamName,
            description: "sales description",
            intent: "Service Booking Customer",
            callbackMode:
                "Disabled — create task only,"
        };

        // Open application
        await page.goto(
            "https://test2.logimeter.com/dealer-ui/"
        );

        // Login
        await page
            .getByRole("button", {
                name: "Login"
            })
            .click();

        await page
            .getByRole("textbox", {
                name: "Username"
            })
            .fill(
                users.administrator.email
            );

        await page
            .getByRole("textbox", {
                name: "Password"
            })
            .fill(
                users.administrator.password
            );

        await page
            .getByRole("button", {
                name: "Sign in"
            })
            .click();

        // Open Teams page
        await teamsPage.openTeams();

        // Create Team
        await teamsPage.createTeam(teamData);

        // Verify success
        await expect(
            page.getByText(
                "Team created successfully"
            )
        ).toBeVisible();

        // Search the created team
        await teamsPage.searchTeam(
            uniqueTeamName
        );

        // Verify created team exists
        const createdTeam =
            teamsPage.getTeam(
                uniqueTeamName
            );

        await expect(
            createdTeam
        ).toBeVisible();

        // Open created team
        await teamsPage.openTeam(
            uniqueTeamName
        );

        // Update callback mode
        await teamsPage.updateTeam(
            teamData.callbackMode
        );

        // Verify update
        await expect(
            page.getByText(
                "Changes saved successfully"
            )
        ).toBeVisible();

        // Search again
        await teamsPage.searchTeam(
            uniqueTeamName
        );

        // Open same team
        await teamsPage.openTeam(
            uniqueTeamName
        );

        // Pause created team
        await teamsPage.pauseTeam();

        // Verify paused
        await expect(
            page.getByText(
                "Paused"
            )
        ).toBeVisible();
    }
);