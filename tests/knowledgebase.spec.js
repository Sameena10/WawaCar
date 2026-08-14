const { test } = require("@playwright/test");

const { users } = require("../Utils/User");
const {
    KnowledgeBasePage
} = require("../page/KnowledgeBasePage");


test(
    "Add FAQ, Text and URL to Knowledge Base",
    async ({ page }) => {

        const knowledgeBase =
            new KnowledgeBasePage(page);


        const testData = {

            faq: {
                question:
                    "What are your dealership opening hours?",

                answer:
                    "Our dealership is open Monday to Friday from 8:00 AM to 5:00 PM and Saturday from 9:00 AM to 1:00 PM. We are closed on Sundays and public holidays."
            },


            text: {
                title:
                    "Test Drive Information",

                content:
                    "You can book a test drive by contacting our dealership or submitting a test-drive request online. Please provide your preferred vehicle, date, and time."
            },


            url: {
                url:
                    "https://test2.logimeter.com/dealer-ui/knowledge-base",

                title:
                    "Knowledge Base Page"
            }

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




        await knowledgeBase.openKnowledgeBase();



        await knowledgeBase.addFAQ(
            testData.faq.question,
            testData.faq.answer
        );



        await knowledgeBase.addText(
            testData.text.title,
            testData.text.content
        );



        await knowledgeBase.addURL(
            testData.url.url,
            testData.url.title
        );




        console.log(
            "Upload section skipped."
        );
    }
);