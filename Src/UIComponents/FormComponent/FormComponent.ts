import { generateRedButton } from '../Buttons/Buttons';
import { createElement, createTextInput, createNumberInput, createRadioInput } from '../utils/utils';

export interface FirstStepFormValues {
  name: string;
  gender: 'Male' | 'Female';
  dateOfBirth: Date | string;
  height: number;
  currentWeight: number;
  goalWeight: number;
}


export default function generateForm(
  onNextStepClick: (firstStepFormValues: FirstStepFormValues) => void,
): HTMLFormElement {
  const form = document.createElement('form');

  const paragraph = generateParagraph();
  const progressBar = generateProgressBar();

  const nameInput = createTextInput('Nickname', 'name');
  nameInput.setAttribute('minlength', '3');

  const genderSelectionDiv = generateGenderSelectionDiv();

  const dateInput = generateDateInput();

  const heightAndWeightDiv = createElement('div', 'current-values');
  const heightInput = createNumberInput('Height (cm)', 'height');
  const weightInput = createNumberInput(
    'Current weight (kg)',
    'current-weight',
  );
  heightAndWeightDiv.append(heightInput,weightInput);

  const goalWeightInput = createNumberInput(
    'Goal weight (kg)',
    'goal-weight',
  );

  const submitButton = generateRedButton('Next step', () => {
    const gender = form.querySelector(
      'input[name="gender"]:checked',
    ) as HTMLInputElement;
    const formValues: FirstStepFormValues = {
      name: nameInput.value,
      gender: gender.value as 'Male' | 'Female',
      dateOfBirth: new Date(dateInput.value),
      height: parseInt(heightInput.value),
      currentWeight: parseInt(weightInput.value),
      goalWeight: parseInt(goalWeightInput.value),
    };
    console.log(formValues.dateOfBirth);
    onNextStepClick(formValues);
  });
  submitButton.style.height = '50px';
  submitButton.style.width = '35%';

  form.append(
    paragraph,
    progressBar,
    nameInput,
    genderSelectionDiv,
    dateInput,
    heightAndWeightDiv,
    goalWeightInput,
    submitButton,
  );
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

function generateGenderSelectionDiv():HTMLDivElement {
  const genderSelectionDiv = createElement('div', 'gender-selection') as HTMLDivElement;

  const maleInput = createRadioInput('', 'gender', 'Male');
  const maleLabel = generateLabel('Male');
  genderSelectionDiv.append(maleInput, maleLabel);
  maleLabel.innerHTML = 'Male';

  const genderSelectionSpan = document.createElement('span');
  genderSelectionDiv.appendChild(genderSelectionSpan);

  const femaleInput = createRadioInput('radio-button', 'gender', 'Female');
  const femaleLabel = generateLabel('Female');
  genderSelectionDiv.append(femaleInput,femaleLabel);
  femaleLabel.innerHTML = 'Female';
  return genderSelectionDiv;
}

function generateLabel(id: string):HTMLLabelElement {
  const label = document.createElement('label');
  label.setAttribute('for', id);
  return label;
}

function generateDateInput():HTMLInputElement{
  const dateInput = createTextInput('Date of birth', 'birth-date');
  dateInput.addEventListener('focus', () => {
    dateInput.setAttribute('type', 'date');
  });
  dateInput.addEventListener('blur', () => {
    dateInput.setAttribute('type', 'text');
  });
  return dateInput;
}
