function showModalWindow(message: string) {
    const modeNotSelectedMessage = document.createElement('div');
    modeNotSelectedMessage.innerHTML = message;
    modeNotSelectedMessage.style.padding = "30px";
    modeNotSelectedMessage.style.color = "#4A484E";
    modeNotSelectedMessage.style.backgroundColor = "white";
    modeNotSelectedMessage.style.textAlign = "center";
    modeNotSelectedMessage.style.fontSize = "1.1rem";
    document.body.appendChild(modalWindow(modeNotSelectedMessage, removeModalWindow));
}


function removeModalWindow() {
    document.body.removeChild(document.querySelector('.modal-window-bg'));
}
 
function modalWindow(component, closeWindow) {
    if ( !(component instanceof HTMLElement) ){
        throw Error('First argument should be HTMLElement.');
    }
    if ( !(typeof closeWindow === 'function') ){
        throw Error('Second argument should be Function.');
    }
    const backgroundDiv = document.createElement('div');
    const modalWindowDiv = document.createElement('div');
    backgroundDiv.appendChild(modalWindowDiv);
    modalWindowDiv.appendChild(component);
    backgroundDiv.className = 'modal-window-bg';
    modalWindowDiv.classList.add('border', 'modal-window');
    backgroundDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        if(e.target === backgroundDiv){
            closeWindow();
        }
    })
    return backgroundDiv;
}

export default showModalWindow;
export {modalWindow};