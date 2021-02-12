import { placeholder } from "@babel/types";
import { User } from '../../../Models/User.model'
import { KEY_LOGGED_USER } from "../../../Constants/consts";

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

  //to calculate max calories per day
export function calculateCalories(gender: User["gender"], weight: number, height: number, age: number, activityLevel: User["activityLevel"]):number{
    let calories: number;

    if (gender === "Male") {
        calories = 66.47 + 13.7*weight + 5.0*height - 6.76*age; 

        switch (activityLevel){
            case 'Low':
                calories*=1.3;
                break;
            case 'Regular':
                calories*=1.6;
                break;
            case 'Active':
                calories*=1.7;
                break;
            case 'Very Active':
                calories*=2.1;
                break;
        }  
    } else {
        calories = 665.1 + 9.567*weight + 1.85*height - 4.68*age; 

        switch (activityLevel){
            case 'Low':
                calories*=1.3;
                break;
            case 'Regular':
                calories*=1.5;
                break;
            case 'Active':
                calories*=1.6;
                break;
            case 'Very Active':
                calories*=1.9;
                break;
        }  
    }   

    return calories;
}

export function getAge(date: Date) {     
    return ((new Date(Date.now() - date.getTime()).getFullYear()) - 1970);
}
export function getLoggedInUser(): string{
    return localStorage.getItem(KEY_LOGGED_USER) || '';
}

export function setLoggedInUser(loggedUser: string): string{
    const loggedInUser = getLoggedInUser();
    if(loggedInUser) return loggedInUser;
    localStorage.setItem(KEY_LOGGED_USER, loggedUser);
    return loggedUser;
}

export function clearLoggedInUser(): boolean{
    localStorage.setItem(KEY_LOGGED_USER, '');
    return true;
}
