import { generateRedButton } from '../Buttons/Buttons';


export default function generateForm() {
  const form = document.createElement('form');

  //paragraf
  const paragraph = generateParagraph();
  form.appendChild(paragraph);

  //progress-bar
  const progressBar=generateProgressBar();
  form.appendChild(progressBar);

  //name input
  const nameInput = generateTextInput('Nickname', 'name');
  nameInput.setAttribute('minlength', '4');
  form.appendChild(nameInput);

  //gender-selection
  const genderSelectionDiv = generateGenderSelectionDiv();
  form.appendChild(genderSelectionDiv);

  //input birth date
  const dateInput = generateDateInput();
  form.appendChild(dateInput);

  //current values div
  const heightAndWeightDiv = document.createElement('div');
  heightAndWeightDiv.className = 'current-values';
  form.appendChild(heightAndWeightDiv);

  //height
  const heightInput = generateNumberInput('Height (cm)', 'height');
  heightAndWeightDiv.appendChild(heightInput);

  //weight
  const weightInput = generateNumberInput(
    'Current weight (kg)',
    'current-weight',
  );
  heightAndWeightDiv.appendChild(weightInput);

  //goal
  const goalWeightInput = generateNumberInput(
    'Goal weight (kg)',
    'goal-weight',
  );
  form.appendChild(goalWeightInput);

  //button
  const submitButton = generateRedButton('Next step', ()=>{});
  submitButton.style.height = '50px';
  submitButton.style.width = '35%';
  form.appendChild(submitButton);

  return form;

}

 //FUNCTIONS
 function generateParagraph():HTMLParagraphElement{
  const paragraph = document.createElement('p');
  const node = document.createTextNode('Join us');
  paragraph.appendChild(node);
  return paragraph;
  }

 function generateProgressBar():HTMLDivElement {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const stepDiv = document.createElement('div');
  stepDiv.className = 'first-step';
  progressBar.appendChild(stepDiv);
  return progressBar;
}

function generateTextInput(placeholderValue: string, className: string):HTMLInputElement {
  const textInput = document.createElement('input');
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('placeholder', placeholderValue);
  textInput.required = true;
  textInput.className = className;
  return textInput;
}

function generateGenderSelectionDiv():HTMLDivElement {
  const genderSelectionDiv = document.createElement('div');
  genderSelectionDiv.className = 'gender-selection';

  const maleInput = generateRadioInput('male');
  const maleLabel = generateLabel('male');
  genderSelectionDiv.appendChild(maleInput);
  genderSelectionDiv.appendChild(maleLabel);
  maleLabel.innerHTML = 'Male';

  const genderSelectionSpan = document.createElement('span');
  genderSelectionDiv.appendChild(genderSelectionSpan);

  const femaleInput = generateRadioInput('female');
  const femaleLabel = generateLabel('female');
  genderSelectionDiv.appendChild(femaleInput);
  genderSelectionDiv.appendChild(femaleLabel);
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
  const numberInput = document.createElement('input');
  numberInput.setAttribute('type', 'number');
  numberInput.setAttribute('placeholder', placeholderValue);
  numberInput.setAttribute('min', '0');
  numberInput.required = true;
  numberInput.className = className;
  return numberInput;
}