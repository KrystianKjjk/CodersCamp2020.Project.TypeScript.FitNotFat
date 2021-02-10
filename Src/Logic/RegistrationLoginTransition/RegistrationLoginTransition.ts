import generateInitialView from '../../../Src/UIComponents/InitialView/InitialView';
import { generateHomePageContent } from '../../../Src/UIComponents/HomePage/HomePage';
import { createElement } from '../../UIComponents/utils/utils';
import generateRegistrationForm from '../../../Src/Logic/Registration/Registration';
import generateLoginForm from '../../../Src/UIComponents/LogIn/LogIn';
export function unauthorizedUserLogic() {
  const container = createElement('div', 'unauthorized-user-container');
  const homePage = generateInitialView(
    generateHomePageContent(onSignUpClick, onLogInClick),
  );
  container.appendChild(homePage);


  function onSignUpClick() {
  const registrationForm=generateInitialView(generateRegistrationForm(()=>{/*tutaj podac funkcje wyswietlajaca logowanie*/}));
    container.replaceChild(registrationForm,homePage);
    
  }
  function onLogInClick() {
    console.log('log in');
  }





  return container;
}


