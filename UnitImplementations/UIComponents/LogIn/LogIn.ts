import loginForm from '../../../Src/UIComponents/LogIn/LogIn';
import {createElement} from '../../../Src/UIComponents/utils/utils'
import loginButton from '../../../Src/Logic/LoginButton/LoginButton';
import {saveInLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import {ActivityLevel} from '../../../Models/ActivityLevel.model';
import {WeeklyGoal} from '../../../Models/WeeklyGoal.model';
import {User} from '../../../Models/User.model';
import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard';
import {profileInfo} from '../../../Src/UIComponents/ProfileInfo/ProfileInfo';
import dashboardView from '../../../Src/UIComponents/DashboardView/DashboardView'

const username = 'User3';
const user: User = {
  name: username,
  gender: 'Male',
  dateOfBirth: new Date(),
  height: 177,
  activityLevel: ActivityLevel.Low,
  goalWeight: 70,  
  goals: [{
    date: new Date(),
    weeklyGoal: WeeklyGoal.Gain,
    startWeight: 60,
    endWeight: 71,
    achieved: 'No'
  }],
  weights: [{date: new Date(), weight: 60}]
};
saveInLocalStorage(username, user);

function createDashboard(user: User): HTMLElement {
  const overview = dashboardView('Overview', createElement('div', [], 'overview content') as HTMLDivElement, `Hi <b>${username}</b>, welcome back!`);
  const myDiaryFood = dashboardView('Food', createElement('div', [], 'food content') as HTMLDivElement);
  const myDiaryExercises = dashboardView('Exercises', createElement('div', [], 'exercises content') as HTMLDivElement);
  const myGoals = dashboardView('Goals', createElement('div', [], 'goals content') as HTMLDivElement);
  const myWeights = dashboardView('Weights', createElement('div', [], 'weights content') as HTMLDivElement);
  const apiKey = dashboardView('API Key', createElement('div', [], 'api key content') as HTMLDivElement);
  const logOut = dashboardView('Log Out', createElement('div', [], 'log out content') as HTMLDivElement);
  const profile = profileInfo({
    username: user.name,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    height: user.height,
    weight: user.weights[user.weights.length - 1].weight,
    activityLevel: user.activityLevel,
    weeklyGoal: user?.goals?.[user.goals.length - 1]?.weeklyGoal,
    goalWeight: user.goalWeight,
  });
  const myProfile = dashboardView('My profile', profile);
  return dashboard(user.name, {
    overview,
    'diary-food': myDiaryFood, 
    'diary-exercises': myDiaryExercises, 
    goals: myGoals, 
    weights: myWeights, 
    profile: myProfile,
    apiKey,
    logOut
  });
}

function createFailMsg(username: string): HTMLElement {
  const failMsg = createElement('p');
  failMsg.innerHTML = `User ${username} does not exist`;
  return failMsg;
}

const logForm = loginForm((button, username) => loginButton.call(button, username, createDashboard, createFailMsg(username)));
document.body.appendChild(logForm);

