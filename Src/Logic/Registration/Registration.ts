import generateFirstStepForm from '../../UIComponents/FormComponent/FormComponent';
import { User } from '../../../Models/User.model';
import { FirstStepFormValues } from '../../../Src/UIComponents/FormComponent/FormComponent';
import { createElement } from '../../../Src/UIComponents/utils/utils';
import {
  SecondStepValues,
  generateSecondStep,
} from '../../../Src/UIComponents/SecondStepComponent/SecondStepComponent';
import { Weight } from '../../../Models/Weight.model';
import {
  readFromLocalStorage,
  saveInLocalStorage,
} from '../../../Src/Logic/LocalStorage/LocalStorage';
import showModalWindow from '../../UIComponents/ModalWindow/ModalWindow';
import { Goal } from '../../../Models/Goal.model';

export default function generateRegistrationForm(
  onRegistrationSuccess: () => void,
): HTMLDivElement {
  const registrationDiv = createElement('div', 'div-registration');

  let firstStepValues: FirstStepFormValues;
  const firstStepForm = generateFirstStepForm(onNextStepClick);
  firstStepForm.className = 'first-step-form';
  registrationDiv.appendChild(firstStepForm);
  const secondStepForm = generateSecondStep(onBackClick, onSignUpClick);

  function onNextStepClick(firstStepFormValues: FirstStepFormValues): void {
    firstStepValues = firstStepFormValues;
    registrationDiv.replaceChild(secondStepForm, firstStepForm);
  }

  function onBackClick() {
    registrationDiv.replaceChild(firstStepForm, secondStepForm);
  }

  function onSignUpClick(secondStepValues: SecondStepValues) {
    const currentDate=new Date();
    const weight: Weight = {
      date: currentDate,
      weight: firstStepValues.currentWeight
    };
    const goal:Goal={
      date:currentDate, 
      weeklyGoal:secondStepValues.weeklyGoal,
      startWeight:firstStepValues.currentWeight
    }
    const user: User = {
      name: firstStepValues.name,
      gender: firstStepValues.gender,
      dateOfBirth: firstStepValues.dateOfBirth,
      height: firstStepValues.height,
      goalWeight: firstStepValues.goalWeight,
      activityLevel: secondStepValues.activityLevel,
      weights: [weight],
      goals:[goal]
    };

    const userFromLocalStorage = readFromLocalStorage(user.name);
    if (userFromLocalStorage) {
      showModalWindow('This nickname is taken. Please select another.');
    } else {
      saveInLocalStorage(user.name, user);
      onRegistrationSuccess();
    }
  }

  return registrationDiv as HTMLDivElement;
}
