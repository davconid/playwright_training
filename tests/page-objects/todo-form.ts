import { Locator, Page } from '@playwright/test';

export class TodoForm {
    readonly page: Page;
    readonly newTodoFields: Locator;
    readonly displayedTodoItems: Locator;


    constructor(page: Page) {
        this.page = page;
        this.newTodoFields = page.locator('.new-todo');
    }

    async addItem(item: string) {
        await this.newTodoFields.fill(item);
        await this.newTodoFields.press('Enter');
    }

}