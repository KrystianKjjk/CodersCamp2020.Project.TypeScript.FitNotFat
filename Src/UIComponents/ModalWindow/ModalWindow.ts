const modalWindow = (component: HTMLElement, closeWindow: () => void) => {
    const backgroundDiv = document.createElement('div');
    const modalWindowDiv = document.createElement('div');

    backgroundDiv.appendChild(modalWindowDiv);
    modalWindowDiv.appendChild(component);

    backgroundDiv.className = 'modal-window-bg';
    modalWindowDiv.className = 'modal-window';

    backgroundDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target === backgroundDiv) {
            closeWindow();
        }
    })
    
    return backgroundDiv;
}

export default modalWindow;