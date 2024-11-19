import {test, expect, Locator} from '@playwright/test';
import { TodoForm } from '../page-objects/todo-form';
import { TodoList } from '../page-objects/todo-list';
import { Navigate } from '../page-objects/navigate';

let todoForm: TodoForm;
let todoList: TodoList;
let navigate: Navigate;

test.beforeEach(async ({ page }) => {
    //arrange
    todoForm = new TodoForm(page);
    todoList = new TodoList(page);
    navigate = new Navigate(page);

    await navigate.toHomePage();
});


test('The todo input field should display an helpful message', async ({ page }) => {
    await expect(page.getByPlaceholder('What needs to be done?')).toHaveAttribute('placeholder','What needs to be done?');
    await expect(todoForm.newTodoFields).toHaveAttribute('placeholder','What needs to be done?');
}); 


test.describe('When adding a single item', () => {
    test.beforeEach(async ({ page }) => {
        //act
        await todoForm.addItem('Potatoes');
    });

    test('Should add an item', async ({ page }) => {
        //assert
        await expect(todoList.displayedTodoItems).toHaveText('Potatoes');

    });

    test('Should show the number of remaining item', async ({ page }) => {
       //assert
        await expect.soft(todoList.numberOfActiveItems).toHaveText('1 item left');
    }); 
})


test.describe('When adding multiple items', () => {
    test.beforeEach(async ({ page }) => {
        //act
        await todoForm.addItem('Cucumbers');
        await todoForm.addItem('Gherkins');
    })

    test('Should display all the added items', async ({ page }) => {
        //assert
        await expect(todoList.displayedTodoItems).toHaveText(['Cucumbers', 'Gherkins']);
    });

    test('Should show the number of items', async ({ page }) => {
        //assert
        await expect.soft(todoList.numberOfActiveItems).toHaveText('2 items left');
    }); 
});
