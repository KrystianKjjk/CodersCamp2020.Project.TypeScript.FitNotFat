export function createElement(tagName: string, classNames?: string[] | string, innerHTML?: string, dataComponent?: string): HTMLElement {
    const element = document.createElement(tagName);
    if(classNames){
        if(classNames instanceof(Array)) element.classList.add(...classNames);
        else element.classList.add(classNames);
    }
    if(innerHTML) element.innerHTML = innerHTML;
    if(dataComponent) element.setAttribute('data-component', dataComponent);
    return element;
}

export function generateTextInput(placeholderValue: string, className: string):HTMLInputElement {
    const textInput = createElement('input', className) as HTMLInputElement;
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('placeholder', placeholderValue);
    textInput.required = true;
    return textInput;
}

export function createElementInput(name: string, className: string, type: string, placeholder: string): HTMLInputElement {
    const element = createElement(name, className) as HTMLInputElement;
    if(type) element.type = type;
    if(placeholder) element.placeholder = placeholder;
    return element;
}