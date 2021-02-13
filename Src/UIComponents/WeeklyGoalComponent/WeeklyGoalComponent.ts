import generateTileComponent from '../TileComponent/TileComponent';
import createSelectBox from '../Select/Select';
import { generateWhiteButton } from '../Buttons/Buttons';
import {WeeklyGoal} from '../../../Models/WeeklyGoal.model';

function generateWeeklyGoalComponent(date: string, onSaveButtonClick:(weightGoal:WeeklyGoal)=>void) {
  const component = document.createElement('div');
  component.className='weekly-goal-component';
  const title = document.createElement('p');
  title.className = 'tile-title';
  const titleContent = document.createTextNode(`Weekly goal`);
  title.appendChild(titleContent);
  component.appendChild(title);

  const dateParagraph = document.createElement('p');
  const dateParagraphContent = document.createTextNode(
    date
  );
  
  dateParagraph.className='paragraph-week';
  dateParagraph.appendChild(dateParagraphContent);
  component.appendChild(dateParagraph);
  let selectedValue:WeeklyGoal = null;

const onSelect=(selectedVal:WeeklyGoal)=>{
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

function createWeightGoalSelect(onSelect:(selectedValue:WeeklyGoal)=>void){
  const select = createSelectBox(
    [
      { key: WeeklyGoal[WeeklyGoal.Gain], label: 'Gain weight' },
      { key: WeeklyGoal[WeeklyGoal.Lose], label: 'Lose weight' },
      { key: WeeklyGoal[WeeklyGoal.Keep], label: 'Keep weight' },
    ],
    (weightGoalString) => {
      onSelect(WeeklyGoal[weightGoalString]);
    },
    'Select your weekly goal',
  );

  return select;
}

export { generateWeeklyGoalComponent, createWeightGoalSelect };
