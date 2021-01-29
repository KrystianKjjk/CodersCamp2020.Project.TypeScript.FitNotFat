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
    const placeholder = 'ex. ran 3 miles or 30 min yoga';
    beforeEach(() => {
        component = addDiaryItem(table, findCallback, addCallback, cancelCallback, placeholder);
    });
    test('contains find text input', () => {
        expect(component.querySelectorAll('input[type=text]')).toHaveLength(1);
    });
    test('text input contains placeholder', () => {
        const input = component.querySelector('input[type=text]') as HTMLInputElement;
        expect(input.placeholder).toBe(placeholder);
    });
    test('contains one "FIND" button', () => {
        const buttons = Array.from(component.querySelectorAll('button'));
        expect( buttons.filter((btn) => btn.innerHTML.includes("FIND")) ).toHaveLength(1);
    });
    test('contains one "ADD" button', () => {
        const buttons = Array.from(component.querySelectorAll('button'));
        expect( buttons.filter((btn) => btn.innerHTML.includes("ADD")) ).toHaveLength(1);
    });
    test('contains one "CANCEL" button', () => {
        const buttons = Array.from(component.querySelectorAll('button'));
        expect( buttons.filter((btn) => btn.innerHTML.includes("CANCEL")) ).toHaveLength(1);
    });
    test('contains input table', () => {
        expect(component.innerHTML.includes(table.innerHTML)).toBe(true);
    });
    test('after click "FIND" button findCallback is called once with input text', () => {
        const findBtn = component.querySelector('button.find-btn') as HTMLButtonElement;
        const input = component.querySelector('input[type=text]') as HTMLInputElement;
        const text = 'ran 60 min'
        input.value = text;
        findBtn.click();
        expect(findCallback).toHaveBeenCalledTimes(1);
        expect(findCallback).toHaveBeenCalledWith(text);
    });
    test('after click "ADD" button addCallback is called once with input table', () => {
        const addBtn = component.querySelector('button.add-btn') as HTMLButtonElement;
        addBtn.click();
        expect(addCallback).toHaveBeenCalledTimes(1);
        expect(addCallback).toHaveBeenCalledWith(table);
    });
    test('after click "CANCEL" button cancelCallback is called once without args', () => {
        const cancelBtn = component.querySelector('button.cancel-btn') as HTMLButtonElement;
        cancelBtn.click();
        expect(cancelCallback).toHaveBeenCalledTimes(1);
        expect(cancelCallback).toHaveBeenCalledWith();
    });
});