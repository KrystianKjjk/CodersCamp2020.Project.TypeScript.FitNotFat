import {profileInfo} from '../../../Src/UIComponents/ProfileInfo/ProfileInfo';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';

const container = document.createElement('div');
container.style.height = '500px';
container.style.display = 'flex';
container.style.alignItems = 'center';
container.style.justifyContent = 'space-around';
container.style.flexDirection = 'column';
const header = document.createElement('h1');
header.innerHTML = 'My profile';
container.appendChild(header);
container.appendChild(profileInfo({
    username: 'Robert',
    gender: 'Male',
    dateOfBirth: new Date(),
    height: 170,
    weight: 60,
    activityLevel: ActivityLevel.Active,
    weeklyGoal: 1,
    goalWeight: 70,
}));
document.body.appendChild(container);