import generateInitialView from '../../../Src/UIComponents/InitialView/InitialView';
import { generateHomePageContent } from '../../../Src/UIComponents/HomePage/HomePage';
import { createElement } from '../../UIComponents/utils/utils';
import generateRegistrationForm from '../../../Src/Logic/Registration/Registration';
import generateLoginForm from '../../../Src/UIComponents/LogIn/LogIn';
import loginButton from '../../../Src/Logic/LoginButton/LoginButton';
// import {dashboardComponents} from '../../../UnitImplementations/UIComponents/Dashboard/Dashboard';
import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard';
import dashboardView from '../../../Src/UIComponents/DashboardView/DashboardView';
export function unauthorizedUserLogic() {
  const container = createElement('div', 'unauthorized-user-container');
  const homePage = generateInitialView(
    generateHomePageContent(onSignUpClick, onLogInClick),
  );
  container.appendChild(homePage);

  

  function onSignUpClick() {
  const registrationForm=generateInitialView(generateRegistrationForm(onRegistrationSuccess));
    container.replaceChild(registrationForm,homePage);
    
    function onRegistrationSuccess(){
      const logInForm=generateInitialView(generateLogIn());
      container.replaceChild(logInForm,registrationForm);
    }
  }
 
  
  function onLogInClick() {
    // const logInForm=generateLoginForm(loginBtnLogic());

 
  const logInForm=generateInitialView(generateLogIn());
  container.replaceChild(logInForm,homePage);
    
    // document.body.appendChild(logForm);
  }
  return container;
}

function generateLogIn(){
  const logForm = generateLoginForm((button, username) => {
    function createFailMsg(username: string): HTMLElement {
      const failMsg = createElement('p');
      failMsg.innerHTML = `User ${username} does not exist`;
      return failMsg;
    }
    
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


    loginButton.call(button, username, (user)=>dashboard(user,dashboardComponents), createFailMsg(username))})as HTMLDivElement;
return logForm;
 } 
