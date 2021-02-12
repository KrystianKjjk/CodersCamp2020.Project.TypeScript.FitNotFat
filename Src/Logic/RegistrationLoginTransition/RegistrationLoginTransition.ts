import generateInitialView from '../../../Src/UIComponents/InitialView/InitialView';
import { generateHomePageContent } from '../../../Src/UIComponents/HomePage/HomePage';
import { createElement } from '../../UIComponents/utils/utils';
import generateRegistrationForm from '../../../Src/Logic/Registration/Registration';
import generateLoginForm from '../../../Src/UIComponents/LogIn/LogIn';
import loginButton from '../../../Src/Logic/LoginButton/LoginButton';
import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard';
import dashboardView from '../../../Src/UIComponents/DashboardView/DashboardView';

export function unauthorizedUserLogic():HTMLDivElement{
  const container = createElement('div', 'unauthorized-user-container')as HTMLDivElement;
  const homePage = generateInitialView(
    generateHomePageContent(onSignUpClick, onLogInClick),
  );
  container.appendChild(homePage);

  function onSignUpClick():void {
  const registrationForm=generateInitialView(generateRegistrationForm(onRegistrationSuccess));
    container.replaceChild(registrationForm,homePage);
    
    function onRegistrationSuccess():void{
      const logInDiv=generateInitialView(generateLogIn());
      container.replaceChild(logInDiv,registrationForm);
    }
  }
 
  function onLogInClick():void {
  const logInDiv=generateInitialView(generateLogIn());
  container.replaceChild(logInDiv,homePage);
  }
  return container;
}

function generateLogIn():HTMLDivElement{
  const logInDiv = generateLoginForm((button, username) => {
    
    const overview = dashboardView('Overview', createElement('div', [], 'overview content') as HTMLDivElement, `Hi ${username}!`);
    const myDiaryFood = dashboardView('Food', createElement('div', [], 'food content') as HTMLDivElement);
    const myDiaryExercises = dashboardView('Exercises', createElement('div', [], 'exercises content') as HTMLDivElement);
    const myGoals = dashboardView('Goals', createElement('div', [], 'goals content') as HTMLDivElement);
    const myWeights = dashboardView('Weights', createElement('div', [], 'weights content') as HTMLDivElement);
    const apiKey = dashboardView('API Key', createElement('div', [], 'api key content') as HTMLDivElement);
    const logOut = dashboardView('Log Out', createElement('div', [], 'log out content') as HTMLDivElement);
    const myProfile = dashboardView('My profile', createElement('div', [], 'profile content') as HTMLDivElement);
    
    const dashboardComponents={'overview': overview, 
        'diary-food': myDiaryFood, 
        'diary-exercises': myDiaryExercises, 
        'goals': myGoals, 
        'weights': myWeights,
        'apiKey': apiKey,
        'logOut': logOut,
        'profile': myProfile}

loginButton.call(button, username, (user)=>dashboard(user,dashboardComponents))})as HTMLDivElement;
return logInDiv;
 } 
