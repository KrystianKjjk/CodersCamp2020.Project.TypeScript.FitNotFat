import { createRadioGroup } from '../../../Src/UIComponents/RadioGroup/RadioGroup';
import createSelectBox from '../../../Src/UIComponents/Select/Select';
import {
  generateRedButton,
  generateWhiteButton,
} from '../../../Src/UIComponents/Buttons/Buttons';
import { createElement } from '../../../Src/UIComponents/utils/utils';
import {
  WeightGoal,
  createWeightGoalSelect,
} from '../../../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';

export interface SecondStepValues {
  weeklyGoal: WeightGoal;
  activityLevel: ActivityLevel;
}

export function generateSecondStep(
  onBackClick: () => void,
  onSignUpClick: (secondStepValues: SecondStepValues) => void,
) {
  const secondStepDiv = createElement('div', 'main-container');
  const title = createElement('p', 'main-title');
  title.appendChild(document.createTextNode('Join us'));
  const line = createElement('hr', 'main-hr');

  let selectedValue;
  let radioSelectedValue;

  function onWeightGoalSelect(selectedVal: WeightGoal) {
    selectedValue = selectedVal;
  }

  const select = createWeightGoalSelect(onWeightGoalSelect);

  const optionsRadio = [
    {
      key: ActivityLevel.Low,
      name: 'active',
      label: 'Spend most of the day sitting',
    },
    {
      key: ActivityLevel.Regular,
      name: 'active',
      label: 'Spend significant part of the day on your feet',
    },
    {
      key: ActivityLevel.Active,
      name: 'active',
      label: 'Spend significant part of the day doing physical activities',
    },
    {
      key: ActivityLevel.VeryActive,
      name: 'active',
      label: 'Spend most of the day doing heavy physical activities',
    },
  ];

  function onRadioSelect(radioOptionKey: string) {
    radioSelectedValue = radioOptionKey;
  }

  const radio = createRadioGroup(
    optionsRadio,
    onRadioSelect,
    'How active are you?',
  );

  const button1 = generateWhiteButton('Back', () => {
    onBackClick();
  });
  const button2 = generateRedButton('Sign Up', () => {
    const secondStepValues: SecondStepValues = {
      weeklyGoal: selectedValue,
      activityLevel: radioSelectedValue,
    };
    onSignUpClick(secondStepValues);
  });
  button2.classList.add('sign-up-button');

  button1.style.width = '200px';
  button2.style.width = '200px';

  button1.style.height = '50px';
  button2.style.height = '50px';

  const containerButton = document.createElement('div');
  containerButton.className = 'container-button';
  containerButton.append(button1, button2);

  secondStepDiv.append(title, line, select, radio, containerButton);

  return secondStepDiv;
}
