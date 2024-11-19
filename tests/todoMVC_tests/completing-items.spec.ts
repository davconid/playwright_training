import {test, expect, Locator} from '@playwright/test';
import { TodoForm } from '../page-objects/todo-form';
import { TodoList } from '../page-objects/todo-list';
import { Navigate } from '../page-objects/navigate';

let gherkins: Locator;
let todoForm: TodoForm;
let todoList: TodoList;
let navigate: Navigate;


test.beforeEach(async ({ page }) => {
    //arrange

    todoForm = new TodoForm(page);
    todoList = new TodoList(page);
    navigate = new Navigate(page);

    await navigate.toHomePage();

    //act
    await todoForm.addItem('Cucumbers');
    await todoForm.addItem('Gherkins');

    gherkins = page.locator('.todo-list li', {hasText: 'Gherkins'});
    await gherkins.locator('.toggle').check();
});

test.describe('When completing some items', () => {
    test('Should be displayed as completed', async ({ page }) => {
        //assert
        await expect.soft(gherkins).toHaveClass(/completed/); //regex for contains completed
        await expect(gherkins).toHaveClass('completed '); //I know both are identical, it's just for practice and using soft assertion
    });

    test('Should update the number of remaining items', async ({ page }) => {
        //assert
        await expect(todoList.numberOfActiveItems).toHaveText('1 item left');
    });
});


test.describe('When completing all items', () => {
    let cucumbers: Locator;

    test.beforeEach(async ({ page }) => {
        cucumbers = page.locator('.todo-list li', {hasText: 'Cucumbers'});
        await cucumbers.locator('.toggle').check();
    });

    test('Should be displayed as completed', async ({ page }) => { //I already did this in the previous test but I keep going practice
        //assert
        await expect.soft(cucumbers).toHaveClass('completed ');
        await expect(gherkins).toHaveClass('completed ');
    });

    test('Should update the number of remaining items to 0', async ({ page }) => {
        //assert
        await expect(todoList.numberOfActiveItems).toHaveText('0 items left');//yes, there is a s at the end of items with 0...
    });
});
