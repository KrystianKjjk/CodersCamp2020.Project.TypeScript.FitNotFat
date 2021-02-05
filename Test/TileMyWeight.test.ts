import { createTileMyWeight } from '../Src/UIComponents/TileMyWeight/TileMyWeight';
const moment = require('moment');

describe('createTileMyWeight tests', () => {
  let createTileMyWeightTest;
  const callback = jest.fn((arg1, arg2) => {});
  const currentWeight = 65.7;
  const date = new Date(2020,0,22);

  beforeEach(() => {
    createTileMyWeightTest = createTileMyWeight(currentWeight,date,callback);
  });

  test('if returns HTMLElement', () => {
    expect(createTileMyWeightTest).toBeInstanceOf(HTMLElement);
  })
  test('if was properly created container', () => {
    expect(createTileMyWeightTest.className).toEqual('my-weight-tile');
  })
  test('if weight is displayed in correct form', () => {
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--main-text').innerHTML).toEqual(`${currentWeight} kg`);
  })
  test('if date is displayed in correct form', () => {
    const dateDisplayed = `22/01/2020`;
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--footer').innerHTML).toEqual(dateDisplayed);
  })
  test('if generate step two', () => {
    createTileMyWeightTest.querySelector('.my-weight-tile__button-section--tile-btn').click();
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--input')).not.toBeNull();
  })
  test('if is information about incorrect value', () => {
    createTileMyWeightTest.querySelector('.my-weight-tile__button-section--tile-btn').click();
    createTileMyWeightTest.querySelector('.my-weight-tile__data-section--input').value = -5;
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[0].click();
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--incorrect')).not.toBeNull();
  })
  test('if information about incorrect value does not appear', () => {
    createTileMyWeightTest.querySelector('.my-weight-tile__button-section--tile-btn').click();
    createTileMyWeightTest.querySelector('.my-weight-tile__data-section--input').value = 5;
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[0].click();
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--incorrect')).toBeNull();
  })
  test('check steps: 1. incorrect value of weight 2. save button 3. cancel button 4. is the WEIGHT not changed', () => {
    const weightWrongValue = -5;
    createTileMyWeightTest.querySelector('.my-weight-tile__button-section--tile-btn').click();
    createTileMyWeightTest.querySelector('.my-weight-tile__data-section--input').value = weightWrongValue;
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[0].click();
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[1].click();
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--main-text').innerHTML).toEqual(`${currentWeight} kg`);
  })
  test('check steps: 1. incorrect value of weight 2. save button 3. cancel button 4. is the DATE not changed', () => {
    const dateDisplayed = `22/01/2020`;
    const weightWrongValue = -5;
    createTileMyWeightTest.querySelector('.my-weight-tile__button-section--tile-btn').click();
    createTileMyWeightTest.querySelector('.my-weight-tile__data-section--input').value = weightWrongValue;
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[0].click();
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[1].click();
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--footer').innerHTML).toEqual(dateDisplayed);
  })
  test('check steps: 1. correct weight 2. save button 3. is the WEIGHT CHANGED', () => {
    const newWeight = 35.9;
    createTileMyWeightTest.querySelector('.my-weight-tile__button-section--tile-btn').click();
    createTileMyWeightTest.querySelector('.my-weight-tile__data-section--input').value = newWeight;
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[0].click();
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--main-text').innerHTML).toEqual(`${newWeight} kg`);
  })
  test('check steps: 1. correct weight 2. save button 3. is the DATE CHANGED', () => {
    const newWeight = 35.9;
    const newDate = moment(new Date()).format('DD/MM/YYYY')
    createTileMyWeightTest.querySelector('.my-weight-tile__button-section--tile-btn').click();
    createTileMyWeightTest.querySelector('.my-weight-tile__data-section--input').value = newWeight;
    createTileMyWeightTest.querySelectorAll('.my-weight-tile__button-section--tile-btn')[0].click();
    expect(createTileMyWeightTest.querySelector('.my-weight-tile__data-section--footer').innerHTML).toEqual(newDate);
  })
})
