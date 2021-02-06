import loginForm from '../../../Src/UIComponents/LogIn/LogIn';
import {createElement} from '../../../Src/UIComponents/utils/utils'
import loginButton from '../../../Src/Logic/LoginButton/LoginButton';
import {saveInLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import {ActivityLevel} from '../../../Models/ActivityLevel.model';
import {WeeklyGoal} from '../../../Models/WeeklyGoal.model';
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
    weight: user.weights[user.weights.length - 1].weight,
    activityLevel: user.activityLevel,
    weeklyGoal: user.goals[user.goals.length - 1].weeklyGoal,
    goalWeight: user.goalWeight,
  });
  return dashboard(user.name, {
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

const logForm = loginForm((button, username) => loginButton.call(button, username, createDashboard, createFailMsg(username)));
document.body.appendChild(logForm);

