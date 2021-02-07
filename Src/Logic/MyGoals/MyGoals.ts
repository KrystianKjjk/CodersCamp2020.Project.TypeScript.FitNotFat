import {createHistoricalWeeklyGoalsTable} from '../../../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable';
import {generateWeeklyGoalComponent, WeightGoal} from '../../../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';
import {createElement} from '../../../Src/UIComponents/utils/utils';
import {Goal} from '../../../Models/Goal.model';
import { now } from 'moment';

export function generateMyGoals(){
const myGoalsContainer=createElement('div','my-goals-container');
const actualDate=new Date();


function onSaveButtonClick(weeklyGoalValue:WeightGoal){
    console.log('save button clicked '+weeklyGoalValue);
    const goal:Goal={
        date:actualDate,
        weeklyGoal:weeklyGoalValue
    }
}

const weeklyGoalComponent=generateWeeklyGoalComponent(date.toLocaleDateString('en-GB'),onSaveButtonClick);
const historicalWeeklyGoalsTable=createHistoricalWeeklyGoalsTable([]);
myGoalsContainer.appendChild(weeklyGoalComponent);
myGoalsContainer.appendChild(historicalWeeklyGoalsTable);
return myGoalsContainer;
}