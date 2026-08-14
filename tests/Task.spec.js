const { test, expect } = require("@playwright/test");

const { users } = require("../Utils/User");

const {
    TasksPage
} = require("../page/TaskPage");

test(
    "Create, search, view, cancel and reopen the created task",
    async ({ page }) => {

        const tasksPage =
            new TasksPage(page);

        const uniqueTaskTitle =
            `Follow up for lead ${Date.now()}`;

        const taskData = {
            title: uniqueTaskTitle,
            description:
                "Added field for follow-up requirement",
            status: "To-Do",
            priority: "High",
            dueTime: "10:00",
            assignee: "James Patel",
            setReminder: true
        };

        // Open application
        await page.goto(
            "https://test2.logimeter.com/dealer-ui/"
        );

        // Login - same method as WaWa Inbox
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

        // Open Tasks
        await tasksPage.openTasks();

        // Create a new task
        await tasksPage.createTask(
            taskData
        );

        // Verify task created successfully
        await expect(
            page.getByText(
                "Task created successfully"
            )
        ).toBeVisible();

        // Search using the unique title
        await tasksPage.searchTask(
            uniqueTaskTitle
        );

        // Verify only the created task is visible
        const createdTask =
            tasksPage.getTask(
                uniqueTaskTitle
            );

        await expect(
            createdTask
        ).toBeVisible();

        // Open only the task created in this test
        await tasksPage.openTask(
            uniqueTaskTitle
        );

        // Open View Details
        await tasksPage.openViewDetails();

        // Verify the correct task details
        await expect(
            page.getByText(
                uniqueTaskTitle,
                {
                    exact: true
                }
            )
        ).toBeVisible();

        // Cancel the task
        await tasksPage.cancelTask();

        // Verify Cancelled status
        await expect(
            page.getByText(
                "Cancelled",
                {
                    exact: true
                }
            )
        ).toBeVisible();

        // Reopen the same task
        // Open the task menu first if required
        await tasksPage.reopenTask();

        // Verify task is reopened
        await expect(
            page.getByText(
                "To-Do",
                {
                    exact: true
                }
            )
        ).toBeVisible();
    }
);