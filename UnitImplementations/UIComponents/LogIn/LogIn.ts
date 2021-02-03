import {generateWhiteButton, generateRedButton} from '../../../Src/UIComponents/Buttons/Buttons';
import {generateTextInput} from '../../../Src/UIComponents/FormComponent/FormComponent';
import {createElement} from '../../../Src/UIComponents/utils/utils'
import loginButton from '../../../Src/Logic/LoginButton/LoginButton';
import {saveInLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import {ActivityLevel} from '../../../Models/ActivityLevel.model';
import {User} from '../../../Models/User.model';
import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard';
import {profileInfo} from '../../../Src/UIComponents/ProfileInfo/ProfileInfo';

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

function createDashboard(user: User): HTMLElement {
  let overview = document.createElement('div');
  overview.innerHTML = "Overview";
  let myDiaryFood = document.createElement('div');
  myDiaryFood.innerHTML = "Food";
  let myDiaryExercises = document.createElement('div');
  myDiaryExercises.innerHTML = "Exercises";
  let myGoals = document.createElement('div');
  myGoals.innerHTML = "Goals";
  let myWeights = document.createElement('div');
  myWeights.innerHTML = "Weights";
  let myProfile = profileInfo({
    username: user.name,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    height: user.height,
    weight: 60,
    activityLevel: user.activityLevel,
    weeklyGoal: 1,
    goalWeight: user.goalWeight,
  });
  return dashboard({
    'overview': overview, 
    'diary-food': myDiaryFood, 
    'diary-exercises': myDiaryExercises, 
    'goals': myGoals, 
    'weights': myWeights, 
    'profile': myProfile
  });
}

function createFailMsg(username: string): HTMLElement {
  const failMsg = createElement('p');
  failMsg.innerHTML = `User ${username} does not exist`;
  return failMsg;
}
let button: HTMLButtonElement;
button = generateRedButton('Log In', () => loginButton.call(button, input.value, createDashboard, createFailMsg(input.value)));

const containerButton = createElement('div', 'container-button'); 
containerButton.appendChild(button);
container.appendChild(containerButton);