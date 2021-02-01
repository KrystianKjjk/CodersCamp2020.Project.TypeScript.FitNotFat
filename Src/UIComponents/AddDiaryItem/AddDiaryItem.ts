import tile from '../TileComponent/TileComponent';
import {generateWhiteButton} from '../Buttons/Buttons';
import { createElement, generateTextInput } from '../utils/utils';

function addDiaryItem(  table: HTMLTableElement, 
                        findCallback: (text: string) => void,
                        addCallback: (table: HTMLTableElement) => void,
                        cancelCallback: () => void,
                        headerStr: string,
                        textStr: string,
                        placeholder?: string): HTMLElement {
    const component = createElement('div', 'add-diary-item')
    
    const header = createElement('h3', [], headerStr);
    const text = createElement('h4', [], textStr);

    const textInput = generateTextInput(placeholder, 'item-input');

    const findBtn = generateWhiteButton('FIND', () => findCallback(textInput.value));
    const addBtn = generateWhiteButton('ADD', addCallback.bind(null, table));
    const cancelBtn = generateWhiteButton('CANCEL', cancelCallback);
    const bunttonsDiv = document.createElement('div');
    bunttonsDiv.append(addBtn, cancelBtn);

    component.append(header, text, textInput, findBtn, table, bunttonsDiv);
    return tile(component);
}

export default addDiaryItem;