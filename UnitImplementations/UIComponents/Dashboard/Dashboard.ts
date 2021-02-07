import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard'
import dashboardView from '../../../Src/UIComponents/DashboardView/DashboardView'
import {createElement} from '../../../Src/UIComponents/utils/utils'

const username = 'User';
const overview = dashboardView('Overview', createElement('div', [], 'overview content') as HTMLDivElement, `Hi ${username}!`);
const myDiaryFood = dashboardView('Food', createElement('div', [], 'food content') as HTMLDivElement);
const myDiaryExercises = dashboardView('Exercises', createElement('div', [], 'exercises content') as HTMLDivElement);
const myGoals = dashboardView('Goals', createElement('div', [], 'goals content') as HTMLDivElement);
const myWeights = dashboardView('Weights', createElement('div', [], 'weights content') as HTMLDivElement);
const apiKey = dashboardView('API Key', createElement('div', [], 'api key content') as HTMLDivElement);
const logOut = dashboardView('Log Out', createElement('div', [], 'log out content') as HTMLDivElement);
const myProfile = dashboardView('My profile', createElement('div', [], 'profile content') as HTMLDivElement);
document.body.appendChild(dashboard(username, {
    'overview': overview, 
    'diary-food': myDiaryFood, 
    'diary-exercises': myDiaryExercises, 
    'goals': myGoals, 
    'weights': myWeights,
    'apiKey': apiKey,
    'logOut': logOut,
    'profile': myProfile}));
