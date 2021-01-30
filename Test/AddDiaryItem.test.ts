import addDiaryItem from '../Src/UIComponents/AddDiaryItem/AddDiaryItem';
import { createTable, addRow } from '../Src/UIComponents/ReusableTable/ReusableTable';

describe('AddDiaryItem component ', () => {
    let component: HTMLElement;
    const table = createTable(['Exercise name', 'Met', 'Duration', 'Calories']);
    const addNewRow = addRow(table);
    addNewRow(['running', '9.8', '60 min', '686 kcal']);
    const findCallback = jest.fn();
    const addCallback = jest.fn();
    const cancelCallback = jest.fn();
    const headerStr = 'Exercises';
    const textStr = 'Your work out';
    const placeholder = 'ex. ran 3 miles or 30 min yoga';
    beforeEach(() => {
        component = addDiaryItem(table, findCallback, addCallback, cancelCallback, headerStr, textStr, placeholder);
    });
    test('contains passed header', () => {
        expect(component.querySelector('h3').textContent).toBe(headerStr);
    });
    test('contains passed text', () => {
        expect(component.textContent.includes(textStr)).toBe(true);
    });
    test('contains find text input', () => {
        expect(component.querySelectorAll('input[type=text]')).toHaveLength(1);
    });
    test('text input contains placeholder', () => {
        const input = component.querySelector('input[type=text]') as HTMLInputElement;
        expect(input.placeholder).toBe(placeholder);
    });
    test('contains input table', () => {
        expect(component.innerHTML.includes(table.innerHTML)).toBe(true);
    });
    test('after click "FIND" button findCallback is called once with input text', () => {
        const findBtn = component.querySelectorAll('button')[0] as HTMLButtonElement;
        const input = component.querySelector('input[type=text]') as HTMLInputElement;
        const text = 'ran 60 min';
        input.value = text;
        findBtn.click();
        expect(findBtn.innerText.includes("FIND")).toBe(true);
        expect(findCallback).toHaveBeenCalledTimes(1);
        expect(findCallback).toHaveBeenCalledWith(text);
    });
    test('after click "ADD" button addCallback is called once with input table', () => {
        const addBtn = component.querySelectorAll('button')[1] as HTMLButtonElement;
        addBtn.click();
        expect(addBtn.innerText.includes("ADD")).toBe(true);
        expect(addCallback).toHaveBeenCalledTimes(1);
        expect(addCallback).toHaveBeenCalledWith(table);
    });
    test('after click "CANCEL" button cancelCallback is called once without args', () => {
        const cancelBtn = component.querySelectorAll('button')[2] as HTMLButtonElement;
        cancelBtn.click();
        expect(cancelBtn.innerText.includes("CANCEL")).toBe(true);
        expect(cancelCallback).toHaveBeenCalledTimes(1);
        expect(cancelCallback).toHaveBeenCalledWith();
    });
});