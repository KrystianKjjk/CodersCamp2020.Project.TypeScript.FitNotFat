import {createRadioGroup} from '../../../Src/UIComponents/RadioGroup/RadioGroup';
import createSelectBox from '../../../Src/UIComponents/Select/Select';
import {generateRedButton, generateWhiteButton}from '../../../Src/UIComponents/Buttons/Buttons';
import {createElement} from '../../../Src/UIComponents/utils/utils';
//zrobic import weightGoal i selecta calego
// import {} from '../../../Src/UIComponents/'

export function generateSecondStep(){
const secondStepDiv=createElement('div','main-container');
const title=createElement('p','main-title');
title.appendChild(document.createTextNode('Join Us'));
const line=createElement('hr','main-hr');
secondStepDiv.append(title,line);

// const select = createSelectBox(
//     [
//       { key: WeightGoal[WeightGoal.GAIN], label: 'Gain weight' },
//       { key: WeightGoal[WeightGoal.LOSE], label: 'Lose weight' },
//       { key: WeightGoal[WeightGoal.KEEP], label: 'Keep weight' },
//     ],
//     (weightGoalString) => {
//       selectedValue=WeightGoal[weightGoalString];
//     },
//     'Select your weekly goal',
//   );
//   select.classList.add('select-weekly-goal');

return secondStepDiv;
}

    


