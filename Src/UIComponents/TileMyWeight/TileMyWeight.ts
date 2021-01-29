import { generateWhiteButton } from '../Buttons/Buttons';

const MONTH_DIFFERENCE = 1;

export function createTileMyWeight(currentWeight: number, date: Date, callback: (newWeight: number, newDate: Date) => void): HTMLElement {

  const myWeightTile = document.createElement('div') as HTMLElement;
  myWeightTile.classList.add('my-weight-tile');

  const dataSection = document.createElement('section') as HTMLElement;
  dataSection.classList.add('my-weight-tile__data-section');

  const buttonSection = document.createElement('section') as HTMLElement;
  buttonSection.classList.add('my-weight-tile__button-section');

  const headerDataSection = document.createElement('p') as HTMLElement;
  headerDataSection.classList.add('my-weight-tile__data-section--header');
  headerDataSection.innerText = 'MY WEIGHT';

  dataSection.appendChild(headerDataSection);

  _generateStepOne(dataSection, buttonSection, currentWeight, date, callback);

  myWeightTile.appendChild(dataSection);
  myWeightTile.appendChild(buttonSection);

  return myWeightTile;
}

function _generateStepOne(dataSection: HTMLElement, buttonSection: HTMLElement, currentWeight: number, date: Date, callback: (newWeight: number, newDate: Date) => void) {

  const mainDataSection = document.createElement('p') as HTMLElement;
  mainDataSection.classList.add('my-weight-tile__data-section--main-text');
  mainDataSection.innerText = <string><any>(currentWeight) + ' kg'

  const footerDataSection = document.createElement('p') as HTMLElement;
  footerDataSection.classList.add('my-weight-tile__data-section--footer');
  footerDataSection.innerText = `${date.getDate()}/${date.getMonth() + MONTH_DIFFERENCE}/${date.getFullYear()}`;

  dataSection.appendChild(mainDataSection);
  dataSection.appendChild(footerDataSection);

  const editButton = generateWhiteButton('EDIT', () => {
    mainDataSection.remove();
    footerDataSection.remove();
    editButton.remove();
    _generateStepTwo(dataSection, buttonSection, currentWeight, date, callback)}
    );
  editButton.classList.add('my-weight-tile__button-section--tile-btn');
  buttonSection.appendChild(editButton)

  return [dataSection, buttonSection];
}

function _generateStepTwo(dataSection: HTMLElement, buttonSection: HTMLElement, currentWeight: number, oldDate: Date, callback: (newWeight: number, newDate: Date) => void) {

  const newDate = new Date();

  const mainDataSectionContainer = document.createElement('div');
  mainDataSectionContainer.classList.add("my-weight-tile__data-section--container");

  const mainDataSectionInput = document.createElement('input') as HTMLInputElement;
  mainDataSectionInput.classList.add('my-weight-tile__data-section--input');
  mainDataSectionInput.type = 'number';
  mainDataSectionInput.placeholder = '61.5'

  const mainDataSectionText = document.createElement('p') as HTMLElement;
  mainDataSectionText.classList.add('my-weight-tile__data-section--main-text-step-two');
  mainDataSectionText.innerText = ' kg'

  var mainDataSectionIncorrect = document.createElement('p');
  mainDataSectionIncorrect.classList.add('my-weight-tile__data-section--incorrect');
  mainDataSectionIncorrect.innerText = 'Invalid value!';

  mainDataSectionContainer.appendChild(mainDataSectionInput);
  mainDataSectionContainer.appendChild(mainDataSectionText);

  const footerDataSection = document.createElement('p') as HTMLElement;
  footerDataSection.classList.add('my-weight-tile__data-section--footer');
  footerDataSection.innerText = `${newDate.getDate()}/${newDate.getMonth() + MONTH_DIFFERENCE}/${newDate.getFullYear()}`;


  dataSection.appendChild(mainDataSectionContainer);
  dataSection.appendChild(footerDataSection);

  const saveButton = generateWhiteButton('SAVE', ()=>{
    const newWeight: number = <number><any>mainDataSectionInput.value;
    if(newWeight<=0 || newWeight > 150) {
        if(!document.querySelector('.my-weight-tile__data-section--incorrect')) {
          mainDataSectionContainer.parentNode.insertBefore(mainDataSectionIncorrect,mainDataSectionContainer.nextElementSibling);
        }
      return;
    }
    callback(newWeight, newDate);
    mainDataSectionContainer.remove();
    mainDataSectionIncorrect.remove();
    footerDataSection.remove();
    saveButton.remove();
    cancelButton.remove();

    _generateStepOne(dataSection, buttonSection, newWeight, newDate, callback)
  });
  saveButton.classList.add('my-weight-tile__button-section--tile-btn');

  const cancelButton = generateWhiteButton('CANCEL', ()=>{
    mainDataSectionContainer.remove();
    footerDataSection.remove();
    mainDataSectionIncorrect.remove();
    saveButton.remove();
    cancelButton.remove();
    _generateStepOne(dataSection, buttonSection, currentWeight, oldDate, callback)
  });
  cancelButton.classList.add('my-weight-tile__button-section--tile-btn');

  buttonSection.appendChild(saveButton)
  buttonSection.appendChild(cancelButton)

  return [dataSection, buttonSection];
}
