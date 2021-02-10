import {createElement} from '../../../Src/UIComponents/utils/utils';
import {generateRedButton,generateWhiteButton} from '../../../Src/UIComponents/Buttons/Buttons';


export function generateHomePage():HTMLDivElement{
const homePageDiv=createElement('div','home-page-div')as HTMLDivElement;
const mainText=createElement('p','main-text','A little progress each day<br> adds up to big results')as HTMLParagraphElement;
const paragraph=createElement('p','features-text','Track calories<br>Break down ingredients<br>Log activities')as HTMLParagraphElement;

const signUpbutton = generateWhiteButton('Sign up', () => {
    //onclick
});
  const logInButton = generateRedButton('Log in', () => {
    //onclick
  });
  
  signUpbutton.style.width = '200px';
  signUpbutton.style.height = '50px';
  logInButton.style.width = '200px';
  logInButton.style.height = '50px';
  const containerButton = document.createElement('div');
  containerButton.classList.add('container-button');
  containerButton.append(signUpbutton, logInButton);

  homePageDiv.append(mainText,paragraph,containerButton);
  return homePageDiv;
}
// function generateParagraph():HTMLParagraphElement{
//     const paragraph = createElement('p', [], 'Join us') as HTMLParagraphElement;
//     return paragraph;
//   }
// 