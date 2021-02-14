import generateInitialView from '../../../Src/UIComponents/InitialView/InitialView';
import { generateHomePageContent } from '../../../Src/UIComponents/HomePage/HomePage';
import { createElement } from '../../UIComponents/utils/utils';
import generateRegistrationForm from '../../../Src/Logic/Registration/Registration';
import generateLoginForm from '../../../Src/UIComponents/LogIn/LogIn';
import loginButton from '../../../Src/Logic/LoginButton/LoginButton';
import {viewDashboard} from "../../../Src/UIComponents/ViewDashboard/ViewDashboard";

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

function generateLogIn(): HTMLDivElement {
  const logInDiv = generateLoginForm((button, username) => loginButton.call(button, username, () => viewDashboard())) as HTMLDivElement;

  return logInDiv;
};

