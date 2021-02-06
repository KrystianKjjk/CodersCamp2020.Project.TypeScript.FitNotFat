import generateRegistrationForm from '../Src/Logic/Registration/Registration';
describe('registration tests', () => {
  test('should render first step form component', () => {
    const registrationForm = generateRegistrationForm(() => {});
    document.body.appendChild(registrationForm);
    const firstStep = document.querySelector('.first-step-form');
    expect(firstStep).toBeDefined();
    const secondStep = document.querySelector('.main-container');
    expect(secondStep).toBe(null);
  });

  test('should render second step form', () => {
    const registrationForm = generateRegistrationForm(() => {});
    document.body.appendChild(registrationForm);
    // const firstStep = document.querySelector(
    //   '.first-step-form',
    // ) as HTMLFormElement;
    const nameInput = document.querySelector('.name') as HTMLInputElement;
    nameInput.value = 'John';
    const dateInput = document.querySelector('.birth-date') as HTMLInputElement;
    dateInput.value = '2021-02-10';
    const heightInput=document.querySelector('.height') as HTMLInputElement;
    heightInput.value='160';
    const weightInput=document.querySelector('.current-weight') as HTMLInputElement;
    weightInput.value='80';
    const goalWeightInput=document.querySelector('.goal-weight') as HTMLInputElement;
    goalWeightInput.value='90';
    const radioButton=document.querySelector('input[name="gender"]') as HTMLInputElement;
    radioButton.value='Male';
    radioButton.click();
    // radioButton.checked=true;
    // radioButton.setAttribute
    
    document.querySelector('button').click();

    // expect(registrationForm).toMatchSnapshot();
    // name: nameInput.value,
    //   gender: gender.value as 'Male' | 'Female',
    //   dateOfBirth: new Date(dateInput.value),
    //   height: parseInt(heightInput.value),
    //   currentWeight: parseInt(weightInput.value),
    //   goalWeight: parseInt(goalWeightInput.value),
    // firstStep.submit();
    const secondStep = document.querySelector('.main-container');
    expect(secondStep).toBeDefined();
  });
});
