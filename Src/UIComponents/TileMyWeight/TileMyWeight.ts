import { generateWhiteButton } from '../Buttons/Buttons';
import { createElement, createInput } from '../utils/utils';
import { User } from '../../../Models/User.model'

const moment = require('moment');

const MIN_WEIGHT: number = 1;
const MAX_WEIGHT: number = 150;

export function createTileMyWeight(currentWeight: number, date: Date, user:User, callback: (newWeight: number, newDate: Date, user:User) => void): HTMLElement {
  const myWeightTileContainer = createElement('div','my-weight-tile');
  const dataSection = createElement('section','my-weight-tile__data-section');
  const dataSectionHeader = createElement('p','my-weight-tile__data-section--header', 'MY WEIGHT');
  const buttonSection = createElement('section','my-weight-tile__button-section');

  dataSection.appendChild(dataSectionHeader);
  myWeightTileContainer.append(dataSection, buttonSection);

  _generateStepOne(dataSection, buttonSection, currentWeight, date, user, callback);

  return myWeightTileContainer;
}

function _generateStepOne(dataSection: HTMLElement, buttonSection: HTMLElement, currentWeight: number, date: Date, user:User, callback: (newWeight: number, newDate: Date, user:User) => void) {

  const dataSectionMain = createElement('p','my-weight-tile__data-section--main-text',`${currentWeight} kg`);
  const dataSectionFooter = createElement('p', 'my-weight-tile__data-section--footer', moment(date).format('DD/MM/YYYY'));

  const editButton = generateWhiteButton('EDIT', handleEditButtonClick);
  editButton.classList.add('my-weight-tile__button-section--tile-btn');

  dataSection.append(dataSectionMain, dataSectionFooter);
  buttonSection.appendChild(editButton);

  function handleEditButtonClick() {
    _removeElements([dataSectionMain, dataSectionFooter, editButton]);
    _generateStepTwo(dataSection, buttonSection, currentWeight, date, user, callback);
  }

}

function _generateStepTwo(dataSection: HTMLElement, buttonSection: HTMLElement, currentWeight: number, oldDate: Date, user:User, callback: (newWeight: number, newDate: Date, user:User) => void) {

  const newDate = new Date();

  const dataSectionMainContainer = createElement('div','my-weight-tile__data-section--container');
  const dataSectionMainInput = createInput('my-weight-tile__data-section--input', 'number', `${currentWeight}`);
  const dataSectionMainText = createElement('p','my-weight-tile__data-section--main-text-step-two', ' kg');
  const dataSectionMainIncorrect = createElement('p','my-weight-tile__data-section--incorrect', 'Invalid value!');

  dataSectionMainContainer.append(dataSectionMainInput, dataSectionMainText);

  const dataSectionFooter = createElement('p', 'my-weight-tile__data-section--footer', moment(newDate).format('DD/MM/YYYY') );

  dataSection.append(dataSectionMainContainer, dataSectionFooter);

  const saveButton = generateWhiteButton('SAVE', handleSaveButtonClick);
  saveButton.classList.add('my-weight-tile__button-section--tile-btn');

  const cancelButton = generateWhiteButton('CANCEL', handleCancelButtonClick);
  cancelButton.classList.add('my-weight-tile__button-section--tile-btn');

  const elementsRemove = [dataSectionMainContainer, dataSectionMainIncorrect, dataSectionFooter, saveButton, cancelButton];

  buttonSection.append(saveButton, cancelButton)

  function handleSaveButtonClick() {
    const newWeight: number = <number><any>dataSectionMainInput.value;

    if(newWeight < MIN_WEIGHT || newWeight > MAX_WEIGHT) {
      if(!document.querySelector('.my-weight-tile__data-section--incorrect')) {
        dataSectionMainContainer.parentNode.insertBefore(dataSectionMainIncorrect,dataSectionMainContainer.nextElementSibling);
      }
      return;
    }
    callback(newWeight, newDate, user);
    _removeElements(elementsRemove);
    _generateStepOne(dataSection, buttonSection, newWeight, newDate, user, callback)
  }

  function handleCancelButtonClick() {
    _removeElements(elementsRemove);
    _generateStepOne(dataSection, buttonSection, currentWeight, oldDate, user, callback)
  }
}

function _removeElements(elements: HTMLElement[]): void{
  elements.forEach( element => element.remove());
}
