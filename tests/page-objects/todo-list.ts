import { Locator, Page } from '@playwright/test';

export class TodoList {
    static numberOfActiveItems(numberOfActiveItems: any) {
        throw new Error('Method not implemented.');
    }
    readonly page: Page;
    readonly todoItems: Locator;
    readonly numberOfActiveItems: Locator;
    readonly displayedTodoItems: Locator;
    
    constructor(page: Page) {
        this.page = page;

        this.displayedTodoItems = page.locator('.todo-list label');
        this.todoItems = page.locator('.todo-list li');
        this.numberOfActiveItems = page.locator('.todo-count');
    }
}