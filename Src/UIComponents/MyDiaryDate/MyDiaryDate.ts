import {createElement} from '../utils/utils';
import {ArrowDownIcon} from '../Select/Select';

const createDatePicker = (date: Date, onDateChange: (newDate: Date) => void) => {
    const container = createElement('div', 'date-container');
    const dateButton = createElement('div','date-button');
    const rightButton = createElement('div', ['arrow-button', 'right-arrow-button']);
    const leftButton = createElement('div', ['arrow-button', 'left-arrow-button']);
    const dateToString = date.toISOString().slice(0,10).replace(/-/g,"/");
    dateButton.appendChild(document.createTextNode(dateToString));

    leftButton.onclick = () => onClickButton(date, 'left', onDateChange, dateButton);
    rightButton.onclick = () => onClickButton(date, 'right', onDateChange, dateButton);
    
    rightButton.innerHTML = ArrowDownIcon;
    leftButton.innerHTML = ArrowDownIcon;
    
    container.append(leftButton, dateButton, rightButton);

    return container;
}

function onClickButton(date: Date, method: 'left' | 'right', onDateChange: (newDate: Date) => void, dateButton: HTMLElement) {
    const updatedDate = date.setDate(date.getDate() + (method === 'left' ? -1 : 1));
    onDateChange(new Date(updatedDate));

    dateButton.innerHTML = new Date(updatedDate).toISOString().slice(0,10).replace(/-/g,"/");
}

export {createDatePicker};