import { generateRedButton } from '../Buttons/Buttons';
import { createElement } from '../utils/utils';

export default function generateForm():HTMLFormElement{
  const form = document.createElement('form');

  const paragraph = generateParagraph();
  const progressBar = generateProgressBar();

  const nameInput = generateTextInput('Nickname', 'name');
  nameInput.setAttribute('minlength', '3');

  const genderSelectionDiv = generateGenderSelectionDiv();

  const dateInput = generateDateInput();

  const heightAndWeightDiv = createElement('div', 'current-values');
  const heightInput = generateNumberInput('Height (cm)', 'height');
  const weightInput = generateNumberInput(
    'Current weight (kg)',
    'current-weight',
  );
  heightAndWeightDiv.append(heightInput,weightInput);

  const goalWeightInput = generateNumberInput(
    'Goal weight (kg)',
    'goal-weight',
  );

  const submitButton = generateRedButton('Next step', ()=>{});
  submitButton.style.height = '50px';
  submitButton.style.width = '35%';

  form.append(paragraph,progressBar,nameInput, genderSelectionDiv, dateInput, heightAndWeightDiv,goalWeightInput, submitButton);
  return form;
}

 
 function generateParagraph():HTMLParagraphElement{
  const paragraph = createElement('p', [], 'Join us') as HTMLParagraphElement;
  return paragraph;
  }

 function generateProgressBar():HTMLDivElement {
  const progressBar = createElement('div', 'progress-bar') as HTMLDivElement;
  const stepDiv = createElement('div', 'first-step');
  progressBar.appendChild(stepDiv);
  return progressBar;
}

function generateTextInput(placeholderValue: string, className: string):HTMLInputElement {
  const textInput = createElement('input', className) as HTMLInputElement;
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('placeholder', placeholderValue);
  textInput.required = true;
  return textInput;
}

function generateGenderSelectionDiv():HTMLDivElement {
  const genderSelectionDiv = createElement('div', 'gender-selection') as HTMLDivElement;

  const maleInput = generateRadioInput('male');
  const maleLabel = generateLabel('male');
  genderSelectionDiv.append(maleInput, maleLabel);
  maleLabel.innerHTML = 'Male';

  const genderSelectionSpan = document.createElement('span');
  genderSelectionDiv.appendChild(genderSelectionSpan);

  const femaleInput = generateRadioInput('female');
  const femaleLabel = generateLabel('female');
  genderSelectionDiv.append(femaleInput,femaleLabel);
  femaleLabel.innerHTML = 'Female';
  return genderSelectionDiv;
}

function generateRadioInput(inputValue: string): HTMLInputElement {
  const radioInput = document.createElement('input');
  radioInput.setAttribute('type', 'radio');
  radioInput.setAttribute('name', 'gender');
  radioInput.setAttribute('value', inputValue);
  radioInput.setAttribute('id', inputValue);
  radioInput.required = true;
  return radioInput;
}

function generateLabel(id: string):HTMLLabelElement {
  const label = document.createElement('label');
  label.setAttribute('for', id);
  return label;
}

function generateDateInput():HTMLInputElement{
  const dateInput = generateTextInput('Date of birth', 'birth-date');
  dateInput.addEventListener('focus', () => {
    dateInput.setAttribute('type', 'date');
  });
  dateInput.addEventListener('blur', () => {
    dateInput.setAttribute('type', 'text');
  });
  return dateInput;
}

function generateNumberInput(
  placeholderValue: string,
  className: string,
): HTMLInputElement {
  const numberInput = createElement('input', className) as HTMLInputElement;
  numberInput.setAttribute('type', 'number');
  numberInput.setAttribute('placeholder', placeholderValue);
  numberInput.setAttribute('min', '0');
  numberInput.required = true;
  return numberInput;
}

export {generateTextInput};