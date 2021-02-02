import {generateWhiteButton, generateRedButton} from '../../../Src/UIComponents/Buttons/Buttons';
import {generateTextInput} from '../../../Src/UIComponents/FormComponent/FormComponent';
import {createElement} from '../../../Src/UIComponents/utils/utils'
import loginButton from '../../../Src/Logic/LoginButton/LoginButton';
import {saveInLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import {ActivityLevel} from '../../../Models/ActivityLevel.model';
import {User} from '../../../Models/User.model';

const username = 'User3';
const user: User = {
  name: username,
  gender: 'Male',
  dateOfBirth: new Date(),
  height: 177,
  activityLevel: ActivityLevel.Low,
  goalWeight: 70,  
};
saveInLocalStorage(username, user);

const container = createElement('div', 'main-container');
const title = createElement('p', 'main-title'); 
title.appendChild(document.createTextNode('Log In'));

container.appendChild(title);
document.body.appendChild(container);

const input = generateTextInput('Nickname', 'name');
container.appendChild(input);

const failMsg = createElement('p');
failMsg.innerHTML = "Username does not exist";
let button: HTMLButtonElement;
button = generateRedButton('Log In', () => loginButton.call(button, input.value, generateWhiteButton('Hello '+input.value, () => {}), failMsg));

const containerButton = createElement('div', 'container-button'); 
containerButton.appendChild(button);
container.appendChild(containerButton);