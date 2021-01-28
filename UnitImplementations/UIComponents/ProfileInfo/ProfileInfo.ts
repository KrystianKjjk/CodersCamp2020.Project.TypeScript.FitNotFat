import {profileInfo} from '../../../Src/UIComponents/ProfileInfo/ProfileInfo';


document.body.appendChild(profileInfo({
    username: 'User',
    gender: 'Male',
    dateOfBirth: new Date(),
    height: 170,
    weight: 60,
    activityLevel: 'Active',
    weeklyGoal: 1,
    goalWeight: 70,
}));