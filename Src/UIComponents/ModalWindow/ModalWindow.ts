import { createElement } from '../utils/utils';

const modalWindow = (component: HTMLElement, closeWindow: () => void) => {
    const backgroundDiv = createElement('div', 'modal-window-bg');
    const modalWindowDiv = createElement('div', 'modal-window');

    backgroundDiv.appendChild(modalWindowDiv);
    modalWindowDiv.appendChild(component);

    backgroundDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target === backgroundDiv) {
            closeWindow();
        }
    })
    
    return backgroundDiv;
}

export default modalWindow;