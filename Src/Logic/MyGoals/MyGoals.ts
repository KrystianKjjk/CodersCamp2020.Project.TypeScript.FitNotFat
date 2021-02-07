import {createHistoricalWeeklyGoalsTable} from '../../../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable';
import {generateWeeklyGoalComponent, WeightGoal} from '../../../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';
import {createElement} from '../../../Src/UIComponents/utils/utils';

export function generateMyGoals(){
const myGoalsContainer=createElement('div','my-goals-container');
const testDiv=createElement('div');
testDiv.style.height='40px';
testDiv.style.width='40px';
testDiv.style.backgroundColor='red';
myGoalsContainer.appendChild(testDiv);

// const weeklyGoalComponent=generateWeeklyGoalComponent();
// const HistoricalWeeklyGoalsTable=createHistoricalWeeklyGoalsTable();
return myGoalsContainer;
}