import { generateRedButton } from '../Buttons/Buttons';

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

  const nameInput = generateTextInput('Nickname', 'name');
  nameInput.setAttribute('minlength', '3');

  const genderSelectionDiv = generateGenderSelectionDiv();

  const dateInput = generateDateInput();

  const heightAndWeightDiv = document.createElement('div');
  heightAndWeightDiv.className = 'current-values';

  const heightInput = generateNumberInput('Height (cm)', 'height');

  const weightInput = generateNumberInput(
    'Current weight (kg)',
    'current-weight',
  );

  heightAndWeightDiv.append(heightInput, weightInput);

  const goalWeightInput = generateNumberInput(
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

function generateParagraph(): HTMLParagraphElement {
  const paragraph = document.createElement('p');
  const node = document.createTextNode('Join us');
  paragraph.appendChild(node);
  return paragraph;
}

function generateProgressBar(): HTMLDivElement {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const stepDiv = document.createElement('div');
  stepDiv.className = 'first-step';
  progressBar.appendChild(stepDiv);
  return progressBar;
}

function generateTextInput(
  placeholderValue: string,
  className: string,
): HTMLInputElement {
  const textInput = document.createElement('input');
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('placeholder', placeholderValue);
  textInput.required = true;
  textInput.className = className;
  return textInput;
}

function generateGenderSelectionDiv(): HTMLDivElement {
  const genderSelectionDiv = document.createElement('div');
  genderSelectionDiv.className = 'gender-selection';

  const maleInput = generateRadioInput('Male');
  const maleLabel = generateLabel('Male');
  genderSelectionDiv.append(maleInput, maleLabel);
  maleLabel.innerHTML = 'Male';

  const genderSelectionSpan = document.createElement('span');
  genderSelectionDiv.appendChild(genderSelectionSpan);

  const femaleInput = generateRadioInput('Female');
  const femaleLabel = generateLabel('Female');
  genderSelectionDiv.append(femaleInput, femaleLabel);
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

function generateLabel(id: string): HTMLLabelElement {
  const label = document.createElement('label');
  label.setAttribute('for', id);
  return label;
}

function generateDateInput(): HTMLInputElement {
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

export { generateTextInput };
