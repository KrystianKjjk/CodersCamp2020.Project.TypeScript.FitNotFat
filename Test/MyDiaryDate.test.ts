import { createDatePicker } from '../Src/UIComponents/MyDiaryDate/MyDiaryDate';
import { sameDay } from '../Src/UIComponents/MyDiaryFood/utils';

describe('MyDiaryFood', () => {
    test('will show formated date', () => {
        const date = new Date('2020-05-05');
        const datePicker = createDatePicker(date, console.log);
        const dateButton = datePicker.querySelector('.date-button');

        expect(dateButton.innerHTML).toEqual('2020/05/05');

    });
    test('click left button will change date to yesterday and fire onChange function', () => {
        const date = new Date('2020-12-05');
        const changeHandler = jest.fn();
        const datePicker = createDatePicker(date, changeHandler);
        document.body.appendChild(datePicker);
        const leftButton: HTMLElement = datePicker.querySelector('.left-arrow-button');
        leftButton.click();
        const dateButton = document.body.querySelector('.date-button');

        expect(dateButton.innerHTML).toEqual('2020/12/04');
        const passedArguments = changeHandler.mock.calls[0];
        expect(sameDay(passedArguments[0], new Date('2020-12-04'))).toBeTruthy();

    });
    test('click right button will change date to tomorrow and fire onChange function', () => {
        const date = new Date('2020-07-08');
        const changeHandler = jest.fn();
        const datePicker = createDatePicker(date, changeHandler);
        document.body.appendChild(datePicker);
        const rightButton: HTMLElement = datePicker.querySelector('.right-arrow-button');
        rightButton.click();
        const dateButton = document.body.querySelector('.date-button');

        expect(dateButton.innerHTML).toEqual('2020/07/09');
        const passedArguments = changeHandler.mock.calls[0];
        expect(sameDay(passedArguments[0], new Date('2020-07-09'))).toBeTruthy();
    });
})