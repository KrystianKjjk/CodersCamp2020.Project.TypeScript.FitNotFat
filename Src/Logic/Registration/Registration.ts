import generateFirstStepForm from '../../UIComponents/FormComponent/FormComponent';
import { User } from '../../../Models/User.model';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';
import { FirstStepFormValues } from '../../../Src/UIComponents/FormComponent/FormComponent';
import {createElement} from '../../../Src/UIComponents/utils/utils';

export default function generateRegistrationForm(
  onRegistrationSuccess: Function,
): HTMLElement {
  // let name: string;
  // let gender: 'Male' | 'Female';
  // let dateOfBirth: Date;
  // let height: number;
  // let currentWeight: number;
  // let goalWeight: number;
  // let activityLevel: ActivityLevel;
const registrationDiv=createElement('div','div-registration');

  const firstStepForm = generateFirstStepForm(onNextStepClick);
  let firstStepValues;
  registrationDiv.appendChild(firstStepForm);

  function onNextStepClick(firstStepFormValues: FirstStepFormValues): void {
    firstStepValues = firstStepFormValues;
    console.log(firstStepValues);
  }


  return registrationDiv;
}
