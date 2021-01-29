import tile from '../TileComponent/TileComponent';
import {userIcon} from './User';
const moment = require('moment');

function createStyledElement(tagName: string, classNames: string[], innerHTML?: string): HTMLElement {
    const element = document.createElement(tagName);
    if(classNames.length) element.classList.add(...classNames);
    if(innerHTML) element.innerHTML = innerHTML;
    return element;
}

function profileInfo(profileData: {
    username: string,
    gender: 'Male' | 'Female',
    dateOfBirth: Date,
    height: number, // cm
    weight: number, // kg
    activityLevel: 'Low' | 'Regular' | 'Active' | 'Very Active',
    weeklyGoal: number, // kg
    goalWeight: number, // kg
}): HTMLDivElement{
    const component = createStyledElement('div', ['user-profile']);

    const usernameDiv = createStyledElement('div', ['username']);
    usernameDiv.appendChild(createStyledElement('div', [], userIcon));
    usernameDiv.appendChild(createStyledElement('div', [], profileData['username']));

    const profile = createStyledElement('div', ['user-info']);
    profile.appendChild(createStyledElement('h3', [], 'User profile'));
    profile.appendChild(createStyledElement('div', ['info'], `<span>Gender:</span>${profileData['gender']}`));
    const dateOfBirth = moment(profileData['dateOfBirth']).format('DD/MM/YYYY');
    profile.appendChild(createStyledElement('div', ['info'], `<span>Date of birth:</span>${dateOfBirth}`));
    
    const health = createStyledElement('div', ['health-info']);
    health.appendChild(createStyledElement('h3', [], 'Health information')); 
    health.appendChild(createStyledElement('div', ['info'], `<span>Height:</span>${profileData['height']}cm`));
    health.appendChild(createStyledElement('div', ['info'], `<span>Weight:</span>${profileData['weight']}kg`));
    health.appendChild(createStyledElement('div', ['info'], `<span>Activity level:</span>${profileData['activityLevel']}`));

    const goals = createStyledElement('div', ['goals-info']);
    goals.appendChild(createStyledElement('h3', [], 'Goals'));
    const signWeeklyGoal = profileData['weeklyGoal'] > 0 ? '+' : '';
    goals.appendChild(createStyledElement('div', ['info'], `<span>Weekly goal:</span>${signWeeklyGoal}${profileData['weeklyGoal']}kg`));
    goals.appendChild(createStyledElement('div', ['info'], `<span>Goal weight:</span>${profileData['goalWeight']}kg`));
    
    component.append(usernameDiv, profile, health, goals);
    
    return tile(component);
}

export { profileInfo };