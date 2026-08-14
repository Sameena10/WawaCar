const { test } = require("@playwright/test");

const { users } = require("../Utils/User");
const { AiagentPage } = require("../page/AiagentPage");


test(
    "Create AI Agent",
    async ({ page }) => {

        const aiAgentsPage =
            new AiagentPage(page);


        const botData = {

            displayName:
                `Wawacar test bot ${Date.now()}`,

            primaryLanguage:
                "Spanish",



            configurationOptions: [
                ".w-3\\.5.h-3\\.5.rounded",
                ".space-y-2 > div:nth-child(3)",
                ".space-y-2 > div:nth-child(4)"
            ],


            tabs: [
                "Messages",
                "Handoff",
                "Knowledge",
                "Data Collection"
            ]
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



        await aiAgentsPage.openAIAgents();



        await aiAgentsPage.createBot(
            botData
        );
    }
);