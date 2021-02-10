import generateRegistrationForm from '../Src/Logic/Registration/Registration';
import * as LocalStorage from '../Src/Logic/LocalStorage/LocalStorage';

describe('registration tests', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  test('should render first step form component', () => {
    const registrationForm = generateRegistrationForm(() => {});
    const firstStep = registrationForm.querySelector('.first-step-form');
    expect(firstStep).toBeDefined();
  });

  test('should render second step form', () => {
    const registrationForm = generateRegistrationForm(() => {});

    const nameInput = registrationForm.querySelector(
      '.name',
    ) as HTMLInputElement;
    nameInput.value = 'John';
    const dateInput = registrationForm.querySelector(
      '.birth-date',
    ) as HTMLInputElement;
    dateInput.value = '2021-02-10';
    const heightInput = registrationForm.querySelector(
      '.height',
    ) as HTMLInputElement;
    heightInput.value = '160';
    const weightInput = registrationForm.querySelector(
      '.current-weight',
    ) as HTMLInputElement;
    weightInput.value = '80';
    const goalWeightInput = registrationForm.querySelector(
      '.goal-weight',
    ) as HTMLInputElement;
    goalWeightInput.value = '90';
    const radioButton = registrationForm.querySelector(
      'input[name="gender"]',
    ) as HTMLInputElement;
    radioButton.value = 'Male';
    radioButton.click();

    registrationForm.querySelector('button').click();
    const secondStep = registrationForm.querySelector('.main-container');
    expect(secondStep).toBeDefined();
  });

  test('should sign up', () => {
    jest
      .spyOn(LocalStorage, 'saveInLocalStorage')
      .mockImplementation(jest.fn());

    const registrationForm = generateRegistrationForm(() => {});
    document.body.appendChild(registrationForm);

    const nameInput = document.body.querySelector('.name') as HTMLInputElement;
    nameInput.value = 'John';
    const dateInput = document.body.querySelector(
      '.birth-date',
    ) as HTMLInputElement;
    dateInput.value = '2021-02-10';
    const heightInput = document.body.querySelector(
      '.height',
    ) as HTMLInputElement;
    heightInput.value = '160';
    const weightInput = document.body.querySelector(
      '.current-weight',
    ) as HTMLInputElement;
    weightInput.value = '80';
    const goalWeightInput = document.body.querySelector(
      '.goal-weight',
    ) as HTMLInputElement;
    goalWeightInput.value = '90';
    const radioButton = document.body.querySelector(
      'input[name="gender"]',
    ) as HTMLInputElement;
    radioButton.value = 'Male';
    radioButton.click();

    const nextStepButton = document.body.querySelector('button');
    nextStepButton.click();

    const signUpbutton = document.body.querySelector(
      '.sign-up-button',
    ) as HTMLButtonElement;
    signUpbutton.click();
    expect(LocalStorage.saveInLocalStorage).toHaveBeenCalledWith('John', {
      activityLevel: 'Low',
      dateOfBirth: new Date('2021-02-10T00:00:00.000Z'),
      gender: 'Male',
      goalWeight: 90,
      height: 160,
      name: 'John',
      weights: [{ date: expect.any(Date), weight: 80 }],
    });
  });
});
