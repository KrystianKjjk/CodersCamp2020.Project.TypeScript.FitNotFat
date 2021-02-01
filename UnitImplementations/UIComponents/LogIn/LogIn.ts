import {generateWhiteButton, generateRedButton} from '../../../Src/UIComponents/Buttons/Buttons';
import {generateTextInput} from '../../../Src/UIComponents/FormComponent/FormComponent'
import {createElement} from '../../../Src/UIComponents/utils/utils'

const container = createElement('div', 'main-container');
const title = createElement('p', 'main-title'); 
title.appendChild(document.createTextNode('Log In'));

container.appendChild(title);
document.body.appendChild(container);

const input = generateTextInput('Nickname', 'name');
container.appendChild(input);

const button = generateRedButton('Log In', ()=>{});

const containerButton = createElement('div', 'container-button'); 
containerButton.appendChild(button);
container.appendChild(containerButton);