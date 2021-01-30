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
    textInput.placeholder = placeholder

    const findBtn = createStyledElement('button', ['find-btn'], "FIND");
    const addBtn = createStyledElement('button', ['add-btn'], "ADD");
    const cancelBtn = createStyledElement('button', ['cancel-btn'], "CANCEL");
    
    findBtn.addEventListener('click', (e) => {
        findCallback(textInput.value);
    });
    addBtn.addEventListener('click', (e) => {
        addCallback(table);
    });
    cancelBtn.addEventListener('click', (e) => {
        cancelCallback();
    });

    component.append(header, text, textInput, findBtn, addBtn, cancelBtn, table);
    return component;
}

export default addDiaryItem;