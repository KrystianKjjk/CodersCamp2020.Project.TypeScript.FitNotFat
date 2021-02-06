import generateTileComponent from '../TileComponent/TileComponent';
import createSelectBox from '../Select/Select';
import { generateWhiteButton } from '../Buttons/Buttons';

export enum WeightGoal {
  GAIN = 'GAIN',
  LOSE = 'LOSE',
  KEEP = 'KEEP',
}

function generateWeeklyGoalComponent(weekNumber: string, onSaveButtonClick:(weightGoal:WeightGoal)=>void) {
  const component = document.createElement('div');
  component.className='weekly-goal-component';
  const title = document.createElement('p');
  title.className = 'tile-title';
  const titleContent = document.createTextNode(`Weekly goal`);
  title.appendChild(titleContent);
  component.appendChild(title);

  const weekNumberParagraph = document.createElement('p');
  const weekNumberParagraphContent = document.createTextNode(
    `Week ${weekNumber}`,
  );
  weekNumberParagraph.className='paragraph-week';
  weekNumberParagraph.appendChild(weekNumberParagraphContent);
  component.appendChild(weekNumberParagraph);
  let selectedValue:WeightGoal = null;

const onSelect=(selectedVal:WeightGoal)=>{
  selectedValue=selectedVal;
};

const select=createWeightGoalSelect(onSelect);
  select.classList.add('select-weekly-goal');
  select.style.width='300px';
  component.appendChild(select);
 
  const saveButton = generateWhiteButton('SAVE', () => onSaveButtonClick(selectedValue));
  saveButton.classList.add('button-save');
  component.appendChild(saveButton);
  const weeklyGoalComponent = generateTileComponent(component);
  return weeklyGoalComponent;
}

function createWeightGoalSelect(onSelect:(selectedValue:WeightGoal)=>void){
  
  const select = createSelectBox(
    [
      { key: WeightGoal[WeightGoal.GAIN], label: 'Gain weight' },
      { key: WeightGoal[WeightGoal.LOSE], label: 'Lose weight' },
      { key: WeightGoal[WeightGoal.KEEP], label: 'Keep weight' },
    ],
    (weightGoalString) => {
      // selectedValue=WeightGoal[weightGoalString];
      onSelect(WeightGoal[weightGoalString]);
    },
    'What is your weekly goal',
  )
  return select;
}

export { generateWeeklyGoalComponent, createWeightGoalSelect };
