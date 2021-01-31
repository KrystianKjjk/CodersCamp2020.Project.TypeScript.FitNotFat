import {generateWhiteButton, generateRedButton} from '../../../Src/UIComponents/Buttons/Buttons';


const container = document.createElement('div');
container.className = 'main-container';
const title = document.createElement('p');
title.className = 'main-title';
title.appendChild(document.createTextNode('Log In'));

container.appendChild(title);
document.body.appendChild(container);

const button = generateRedButton('Log In', ()=>{});

button.style.width = "200px";
button.style.height = "50px";

const containerButton = document.createElement('div');
containerButton.className = 'container-button';
containerButton.appendChild(button);
container.appendChild(containerButton);