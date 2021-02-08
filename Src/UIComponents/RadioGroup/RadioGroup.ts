import { createElement, createRadioInput } from '../utils/utils';

interface RadioOption {
  key: string;
  name: string;
  label: string;
}

const createRadioGroup = (
  options: RadioOption[],
  onClick: (selected: string) => void,
  groupName: string,
) => {
  const mainContainer = createElement('div', 'radio-main-container');
  const prompt = createElement('p', 'radio-group-header');
  prompt.appendChild(document.createTextNode(groupName));
  mainContainer.appendChild(prompt);

  options.forEach((singleInput, index) => {
    const singleRadioOption = createSingleRadio(singleInput, onClick);
    if (index === 0) {
      const radioInput = singleRadioOption.querySelector(
        'input[type="radio"]',
      ) as HTMLInputElement;
      radioInput.click();
    }
    mainContainer.appendChild(singleRadioOption);
  });

  return mainContainer;
};

const createSingleRadio = (
  singleInput: RadioOption,
  onClick: (selected: string) => void,
) => {
  const { key, name, label } = singleInput;
  const singleRadioOption = createElement('div', 'radio-single-container');
  const labelRadioButton = createElement('label', 'radio-button');
  singleRadioOption.appendChild(labelRadioButton);

  const input = createRadioInput('radio-button', name, key);
  input.onclick = (event) => onClick((event.target as HTMLInputElement).value);

  labelRadioButton.appendChild(input);

  const spanVisible = createElement('div', 'label-visible');
  const fakeRadioButton = createElement('span', 'fake-radiobutton');
  const textButton = createElement('span', 'text-radio');
  textButton.innerText = label;

  spanVisible.append(fakeRadioButton, textButton);

  labelRadioButton.appendChild(spanVisible);

  return singleRadioOption;
};

export { createRadioGroup, createSingleRadio };
