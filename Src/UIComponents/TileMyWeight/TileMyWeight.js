"use strict";
exports.__esModule = true;
exports.createTileMyWeight = void 0;
var Buttons_1 = require("../Buttons/Buttons");
var MONTH_DIFFERENCE = 1;
function createTileMyWeight(currentWeight, date, callback) {
    var myWeightTile = document.createElement('div');
    myWeightTile.classList.add('my-weight-tile');
    var dataSection = document.createElement('section');
    dataSection.classList.add('my-weight-tile__data-section');
    var buttonSection = document.createElement('section');
    buttonSection.classList.add('my-weight-tile__button-section');
    var headerDataSection = document.createElement('p');
    headerDataSection.classList.add('my-weight-tile__data-section--header');
    headerDataSection.innerText = 'MY WEIGHT';
    dataSection.appendChild(headerDataSection);
    _generateStepOne(dataSection, buttonSection, currentWeight, date, callback);
    myWeightTile.appendChild(dataSection);
    myWeightTile.appendChild(buttonSection);
    return myWeightTile;
}
exports.createTileMyWeight = createTileMyWeight;
function _generateStepOne(dataSection, buttonSection, currentWeight, date, callback) {
    var mainDataSection = document.createElement('p');
    mainDataSection.classList.add('my-weight-tile__data-section--main-text');
    mainDataSection.innerText = (currentWeight) + ' kg';
    var footerDataSection = document.createElement('p');
    footerDataSection.classList.add('my-weight-tile__data-section--footer');
    footerDataSection.innerText = date.getDate() + "/" + (date.getMonth() + MONTH_DIFFERENCE) + "/" + date.getFullYear();
    dataSection.appendChild(mainDataSection);
    dataSection.appendChild(footerDataSection);
    var editButton = Buttons_1.generateWhiteButton('EDIT', function () {
        mainDataSection.remove();
        footerDataSection.remove();
        editButton.remove();
        _generateStepTwo(dataSection, buttonSection, currentWeight, date, callback);
    });
    editButton.classList.add('my-weight-tile__button-section--tile-btn');
    buttonSection.appendChild(editButton);
    return [dataSection, buttonSection];
}
function _generateStepTwo(dataSection, buttonSection, currentWeight, oldDate, callback) {
    var newDate = new Date();
    var mainDataSectionContainer = document.createElement('div');
    mainDataSectionContainer.classList.add("my-weight-tile__data-section--container");
    var mainDataSectionInput = document.createElement('input');
    mainDataSectionInput.classList.add('my-weight-tile__data-section--input');
    mainDataSectionInput.type = 'number';
    mainDataSectionInput.placeholder = '61.5';
    var mainDataSectionText = document.createElement('p');
    mainDataSectionText.classList.add('my-weight-tile__data-section--main-text-step-two');
    mainDataSectionText.innerText = ' kg';
    var mainDataSectionIncorrect = document.createElement('p');
    mainDataSectionIncorrect.classList.add('my-weight-tile__data-section--incorrect');
    mainDataSectionIncorrect.innerText = 'Invalid value!';
    mainDataSectionContainer.appendChild(mainDataSectionInput);
    mainDataSectionContainer.appendChild(mainDataSectionText);
    var footerDataSection = document.createElement('p');
    footerDataSection.classList.add('my-weight-tile__data-section--footer');
    footerDataSection.innerText = newDate.getDate() + "/" + (newDate.getMonth() + MONTH_DIFFERENCE) + "/" + newDate.getFullYear();
    dataSection.appendChild(mainDataSectionContainer);
    dataSection.appendChild(footerDataSection);
    var saveButton = Buttons_1.generateWhiteButton('SAVE', function () {
        var newWeight = mainDataSectionInput.value;
        if (newWeight <= 0 || newWeight > 150) {
            if (!document.querySelector('.my-weight-tile__data-section--incorrect')) {
                mainDataSectionContainer.parentNode.insertBefore(mainDataSectionIncorrect, mainDataSectionContainer.nextElementSibling);
            }
            return;
        }
        callback(newWeight, newDate);
        mainDataSectionContainer.remove();
        mainDataSectionIncorrect.remove();
        footerDataSection.remove();
        saveButton.remove();
        cancelButton.remove();
        _generateStepOne(dataSection, buttonSection, newWeight, newDate, callback);
    });
    saveButton.classList.add('my-weight-tile__button-section--tile-btn');
    var cancelButton = Buttons_1.generateWhiteButton('CANCEL', function () {
        mainDataSectionContainer.remove();
        footerDataSection.remove();
        mainDataSectionIncorrect.remove();
        saveButton.remove();
        cancelButton.remove();
        _generateStepOne(dataSection, buttonSection, currentWeight, oldDate, callback);
    });
    cancelButton.classList.add('my-weight-tile__button-section--tile-btn');
    buttonSection.appendChild(saveButton);
    buttonSection.appendChild(cancelButton);
    return [dataSection, buttonSection];
}
