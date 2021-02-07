import {createElement, createTextInput} from '../utils/utils';
import {generateRedButton} from '../Buttons/Buttons';

export default function loginForm(loginBtnLogic: (btn: HTMLButtonElement, username: string) => void): HTMLElement {
    const container = createElement('div', 'login-container');
    const title = createElement('h2', 'main-title', 'Log In'); 
    const input = createTextInput('Nickname', 'name');
    const button = generateRedButton('Log In', () => loginBtnLogic(button, input.value));
    const containerButton = createElement('div', 'container-button'); 
    containerButton.appendChild(button);
    container.append(title, input, containerButton);
    return container;
}