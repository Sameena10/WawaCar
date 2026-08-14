class PlaybooksPage {
    constructor(page) {
        this.page = page;

        this.playbooksLink = page.getByRole('link', {
            name: 'Playbooks'
        });

        this.newPlaybookButton = page.getByRole('button', {
            name: 'New Playbook'
        });

        this.nameInput = page.getByRole('textbox', {
            name: 'Name'
        });

        this.descriptionInput = page.getByRole('textbox', {
            name: 'Description'
        });

        this.typeDropdown = page
            .getByRole('combobox')
            .filter({ hasText: 'Custom' });

        this.styleDropdown = page
            .getByRole('combobox')
            .filter({ hasText: 'Natural' });

        this.createPlaybookButton = page.getByRole('button', {
            name: 'Create Playbook'
        });
    }

    async openPlaybooks() {
        await this.playbooksLink.click();
    }

    async clickNewPlaybook() {
        await this.newPlaybookButton.click();
    }

    async enterPlaybookDetails(name, description) {
        await this.nameInput.fill(name);
        await this.descriptionInput.fill(description);
    }

    async selectType(type) {
        await this.typeDropdown.click();

        await this.page.getByRole('option', {
            name: type
        }).click();
    }

    async selectStyle(style) {
        await this.styleDropdown.click();

        await this.page.getByRole('option', {
            name: style
        }).click();
    }

    async createPlaybook() {
        await this.createPlaybookButton.click();
    }
}

module.exports = { PlaybooksPage };