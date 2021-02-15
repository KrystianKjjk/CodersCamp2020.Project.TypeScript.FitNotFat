import {ActivityLevel} from '../../../Models/ActivityLevel.model';
import {WeeklyGoal} from '../../../Models/WeeklyGoal.model';
import tile from '../TileComponent/TileComponent';
import {userIcon} from './User';
import {createElement} from '../utils/utils';
const moment = require('moment');

function profileInfo(profileData: {
    username: string,
    gender: 'Male' | 'Female',
    dateOfBirth: Date,
    height: number, // cm
    weight: number, // kg
    activityLevel: ActivityLevel,
    weeklyGoal: WeeklyGoal,
    goalWeight: number, // kg
}): HTMLDivElement{
    const component = createElement('div', ['user-profile']);

    const usernameDiv = createElement('div', ['username']);
    usernameDiv.appendChild(createElement('div', [], userIcon));
    usernameDiv.appendChild(createElement('div', [], profileData.username));

    const profile = createElement('div', ['user-info']);
    profile.appendChild(createElement('h3', [], 'User profile'));
    profile.appendChild(createElement('div', ['info'], `<span>Gender:</span>${profileData.gender}`));
    const dateOfBirth = moment(profileData['dateOfBirth']).format('DD/MM/YYYY');
    profile.appendChild(createElement('div', ['info'], `<span>Date of birth:</span>${dateOfBirth}`));
    
    const health = createElement('div', ['health-info']);
    health.appendChild(createElement('h3', [], 'Health information')); 
    health.appendChild(createElement('div', ['info'], `<span>Height:</span>${profileData.height}cm`));
    health.appendChild(createElement('div', ['info'], `<span>Weight:</span>${profileData.weight}kg`));
    health.appendChild(createElement('div', ['info'], `<span>Activity level:</span>${profileData.activityLevel}`));

    const goals = createElement('div', ['goals-info']);
    goals.appendChild(createElement('h3', [], 'Goals'));
    goals.appendChild(createElement('div', ['info'], `<span>Weekly goal:</span>${profileData.weeklyGoal}`));
    goals.appendChild(createElement('div', ['info'], `<span>Goal weight:</span>${profileData.goalWeight}kg`));
    
    component.append(usernameDiv, profile, health, goals);
    
    const profileTile = tile(component);
    profileTile.classList.add('profile-tile');
    return profileTile;
}

export { profileInfo };