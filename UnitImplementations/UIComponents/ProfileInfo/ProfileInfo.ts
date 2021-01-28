import {profileInfo} from '../../../Src/UIComponents/ProfileInfo/ProfileInfo';

const header = document.createElement('h1');
header.innerHTML = 'Hello';
document.body.appendChild(header);
document.body.appendChild(profileInfo({
    username: 'Robert',
    gender: 'Male',
    dateOfBirth: new Date(),
    height: 170,
    weight: 60,
    activityLevel: 'Active',
    weeklyGoal: 1,
    goalWeight: 70,
}));