import {createElement} from '../utils/utils';
import {ArrowDownIcon} from '../Select/Select';

const createDate = (date: Date, onDateChange: (newDate: Date) => void) => {
    const container = createElement('div', 'date-container');
    const dateButton = createElement('div','date-button');
    const rightButton = createElement('div', ['arrow-button', 'right-arrow-button']);
    const leftButton = createElement('div', ['arrow-button', 'left-arrow-button']);
    const dateToString = date.toISOString().slice(0,10).replace(/-/g,"/");
    dateButton.appendChild(document.createTextNode(dateToString));

    leftButton.onclick = () => onClickButton(date, 'left');
    rightButton.onclick = () => onClickButton(date, 'right');
    
    rightButton.innerHTML = ArrowDownIcon;
    leftButton.innerHTML = ArrowDownIcon;

    
    container.append(leftButton, dateButton, rightButton);

    return container;
}

function onClickButton(date: Date, method: string) {
    const dateButton = document.querySelector('.date-button');
    
    if (method === 'left') {
        const dateBefore = date.setDate(date.getDate() - 1);
        dateButton.innerHTML = new Date(dateBefore).toISOString().slice(0,10).replace(/-/g,"/");;

    } else {
        const dateAfter = date.setDate(date.getDate() + 1);
        dateButton.innerHTML = new Date(dateAfter).toISOString().slice(0,10).replace(/-/g,"/");;
    } 
}

export {createDate};