const { test } = require("@playwright/test");

const { users } = require("../Utils/User");
const { TeamsPage } = require("../page/TeamPage");

test(
    "Create team successfully",
    async ({ page }) => {

        const teamsPage = new TeamsPage(page);

        const uniqueTeamName =
            `Technical support ${Date.now()}`;

        const teamData = {
            name: uniqueTeamName,

            description:
                "Technical support team created by automation",

            intentSearch:
                "Accessories",

            callbackMode:
                "Disabled — create task only, no auto-call"
        };

        await page.goto(
            "https://test2.logimeter.com/dealer-ui/"
        );

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

        await teamsPage.openTeams();

        // Create team.
        // createTeam() itself validates "Team created".
        await teamsPage.createTeam(teamData);
    }
);