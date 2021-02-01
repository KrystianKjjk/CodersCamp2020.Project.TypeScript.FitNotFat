import tile from '../TileComponent/TileComponent';
import {generateWhiteButton} from '../Buttons/Buttons';

function createStyledElement(tagName: string, classNames: string[], innerHTML?: string): HTMLElement {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    if(innerHTML) element.innerHTML = innerHTML;
    return element;
}

function addDiaryItem(  table: HTMLTableElement, 
                        findCallback: (text: string) => void,
                        addCallback: (table: HTMLTableElement) => void,
                        cancelCallback: () => void,
                        headerStr: string,
                        textStr: string,
                        placeholder?: string): HTMLElement {
    const component = createStyledElement('div', ['add-diary-item'])
    
    const header = createStyledElement('h3', [], headerStr);
    const text = createStyledElement('h4', [], textStr);

    const textInput = createStyledElement('input', ['item-input']) as HTMLInputElement;
    textInput.type = 'text';
    textInput.placeholder = placeholder;

    const findBtn = generateWhiteButton('FIND', () => findCallback(textInput.value));
    const addBtn = generateWhiteButton('ADD', addCallback.bind(null, table));
    const cancelBtn = generateWhiteButton('CANCEL', cancelCallback);
    const bunttonsDiv = document.createElement('div');
    bunttonsDiv.append(addBtn, cancelBtn);

    component.append(header, text, textInput, findBtn, table, bunttonsDiv);
    return tile(component);
}

export default addDiaryItem;