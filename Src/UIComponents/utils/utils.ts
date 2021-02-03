import { placeholder } from "@babel/types";

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

export function createInput(className: string, type: string, placeholder?: string): HTMLInputElement {
    const element = createElement('input', className) as HTMLInputElement;
    element.type = type;
    if(placeholder) element.placeholder = placeholder;
    return element;
}

export function createTextInput(placeholderValue: string, className: string):HTMLInputElement {
    const textInput = createInput(className, 'text', placeholderValue) as HTMLInputElement;
    textInput.required = true;
    return textInput;
}

export function createNumberInput(
    placeholderValue: string,
    className: string,
  ): HTMLInputElement {
    const numberInput = createInput(className, 'number', placeholderValue);
    numberInput.setAttribute('min', '0');
    numberInput.required = true;
    return numberInput;
}

export function createRadioInput(className: string, name: string, inputValue: string): HTMLInputElement {
    const radioInput = createElement('input', className) as HTMLInputElement;
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', name);
    radioInput.setAttribute('value', inputValue);
    radioInput.setAttribute('id', inputValue);
    radioInput.required = true;
    return radioInput;
  }