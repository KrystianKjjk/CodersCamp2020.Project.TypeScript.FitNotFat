import generateFirstStepForm from '../../UIComponents/FormComponent/FormComponent';
import { User } from '../../../Models/User.model';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';
import { FirstStepFormValues } from '../../../Src/UIComponents/FormComponent/FormComponent';
import {createElement} from '../../../Src/UIComponents/utils/utils';
import {SecondStepValues,generateSecondStep} from '../../../Src/UIComponents/SecondStepComponent/SecondStepComponent';
import { Goal } from '../../../Models/Goal.model';
import { Weight } from '../../../Models/Weight.model';

export default function generateRegistrationForm(
  onRegistrationSuccess: Function,
): HTMLElement {
const registrationDiv=createElement('div','div-registration');

let firstStepValues;
const firstStepForm = generateFirstStepForm(onNextStepClick);
registrationDiv.appendChild(firstStepForm);
const secondStepForm=generateSecondStep(onBackClick,onSignUpClick);

function onNextStepClick(firstStepFormValues: FirstStepFormValues): void {
  firstStepValues = firstStepFormValues;
  registrationDiv.replaceChild(secondStepForm,firstStepForm);
}

function onBackClick() {
  registrationDiv.replaceChild(firstStepForm,secondStepForm);
}

function onSignUpClick(secondStepValues:SecondStepValues){
const weight:Weight={date:new Date(), weight:firstStepValues.currentWeight};
  const user:User={
  name: firstStepValues.name,
  gender: firstStepValues.gender,
  dateOfBirth: firstStepValues.dateOfBirth,
  height: firstStepValues.height,
  goalWeight: firstStepValues.goalWeight,
  activityLevel: secondStepValues.activityLevel,
  weights:[weight],
}
}
  return registrationDiv;
}
