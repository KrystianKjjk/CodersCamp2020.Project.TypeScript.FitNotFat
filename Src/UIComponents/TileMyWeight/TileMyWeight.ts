import { generateWhiteButton } from '../Buttons/Buttons';

const MONTH_DIFFERENCE: number = 1;
const EXAMPLE_PLACEHOLDER_WEIGHT: string = '61.5';
const MIN_WEIGHT: number = 1;
const MAX_WEIGHT: number = 150;

export function createTileMyWeight(currentWeight: number, date: Date, callback: (newWeight: number, newDate: Date) => void): HTMLElement {

  const myWeightTileContainer = _createElement('div','my-weight-tile');
  const dataSection = _createElement('section','my-weight-tile__data-section');
  const dataSectionHeader = _createElement('p','my-weight-tile__data-section--header', 'MY WEIGHT');
  const buttonSection = _createElement('section','my-weight-tile__button-section');

  dataSection.appendChild(dataSectionHeader);

  myWeightTileContainer.appendChild(dataSection);
  myWeightTileContainer.appendChild(buttonSection);

  _generateStepOne(dataSection, buttonSection, currentWeight, date, callback);

  return myWeightTileContainer;
}

function _generateStepOne(dataSection: HTMLElement, buttonSection: HTMLElement, currentWeight: number, date: Date, callback: (newWeight: number, newDate: Date) => void) {

  const dataSectionMain = _createElement('p','my-weight-tile__data-section--main-text',`${currentWeight} kg`);
  const dataSectionFooter = _createElement('p', 'my-weight-tile__data-section--footer',
    `${date.getDate()}/${date.getMonth() + MONTH_DIFFERENCE}/${date.getFullYear()}`);

  dataSection.appendChild(dataSectionMain);
  dataSection.appendChild(dataSectionFooter);

  const editButton = generateWhiteButton('EDIT', handleEditButtonClick);
  editButton.classList.add('my-weight-tile__button-section--tile-btn');

  buttonSection.appendChild(editButton);

  function handleEditButtonClick() {
    _removeElements([dataSectionMain, dataSectionFooter, editButton]);
    _generateStepTwo(dataSection, buttonSection, currentWeight, date, callback);
  }

}

function _generateStepTwo(dataSection: HTMLElement, buttonSection: HTMLElement, currentWeight: number, oldDate: Date, callback: (newWeight: number, newDate: Date) => void) {

  const newDate = new Date();

  const dataSectionMainContainer = _createElement('div','my-weight-tile__data-section--container');
  const dataSectionMainInput = _createElementInput('input','my-weight-tile__data-section--input', 'number', EXAMPLE_PLACEHOLDER_WEIGHT);
  const dataSectionMainText = _createElement('p','my-weight-tile__data-section--main-text-step-two', ' kg');
  const dataSectionMainIncorrect = _createElement('p','my-weight-tile__data-section--incorrect', 'Invalid value!');

  dataSectionMainContainer.appendChild(dataSectionMainInput);
  dataSectionMainContainer.appendChild(dataSectionMainText);

  const dataSectionFooter = _createElement('p', 'my-weight-tile__data-section--footer',
    `${newDate.getDate()}/${newDate.getMonth() + MONTH_DIFFERENCE}/${newDate.getFullYear()}` );

  dataSection.appendChild(dataSectionMainContainer);
  dataSection.appendChild(dataSectionFooter);

  const saveButton = generateWhiteButton('SAVE', handleSaveButtonClick);
  saveButton.classList.add('my-weight-tile__button-section--tile-btn');

  const cancelButton = generateWhiteButton('CANCEL', handleCancelButtonClick);
  cancelButton.classList.add('my-weight-tile__button-section--tile-btn');

  const elementsRemove = [dataSectionMainContainer, dataSectionMainIncorrect, dataSectionFooter, saveButton, cancelButton];

  buttonSection.appendChild(saveButton)
  buttonSection.appendChild(cancelButton)


  function handleSaveButtonClick() {
    const newWeight: number = <number><any>dataSectionMainInput.value;

    if(newWeight <= MIN_WEIGHT || newWeight > MAX_WEIGHT) {
      if(!document.querySelector('.my-weight-tile__data-section--incorrect')) {
        dataSectionMainContainer.parentNode.insertBefore(dataSectionMainIncorrect,dataSectionMainContainer.nextElementSibling);
      }
      return;
    }

    callback(newWeight, newDate);
    _removeElements(elementsRemove);
    _generateStepOne(dataSection, buttonSection, newWeight, newDate, callback)
  }

  function handleCancelButtonClick() {
    _removeElements(elementsRemove);
    _generateStepOne(dataSection, buttonSection, currentWeight, oldDate, callback)
  }
}

function _createElement(name: string, className: string, innerText?: string): HTMLElement {
  const element = document.createElement(name) as HTMLElement;
  element.classList.add(className);
  if(innerText) element.innerText = innerText;
  return element;
}

function _createElementInput(name: string, className: string, type: string, placeholder: string): HTMLInputElement {
  const element = _createElement(name, className) as HTMLInputElement;
  if(type) element.type = type;
  if(placeholder) element.placeholder = placeholder;
  return element;
}

function _removeElements(elements: HTMLElement[]): void{
  elements.forEach( element => element.remove());
}
