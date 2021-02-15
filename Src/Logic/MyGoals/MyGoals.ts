import { createHistoricalWeeklyGoalsTable } from '../../../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable';
import { generateWeeklyGoalComponent } from '../../../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';
import { createElement } from '../../../Src/UIComponents/utils/utils';
import { Goal } from '../../../Models/Goal.model';
import { WeeklyGoal } from '../../../Models/WeeklyGoal.model';
import {
  readFromLocalStorage,
  saveInLocalStorage,
} from '../../../Src/Logic/LocalStorage/LocalStorage';
import { RefreshProfileInfo } from '../SetProfileInfo/SetProfileInfo';

export function generateMyGoals(username: string): HTMLDivElement {
  const myGoalsContainer = createElement(
    'div',
    'my-goals-container',
  ) as HTMLDivElement;
  const actualDate = new Date(Date.now());

  const weeklyGoalComponent = generateWeeklyGoalComponent(
    actualDate.toLocaleDateString('en-GB'),
    onSaveButtonClick,
  );
  const user = readFromLocalStorage(username);
  let historicalWeeklyGoalsTable = createHistoricalWeeklyGoalsTable(user.goals || []);
  myGoalsContainer.append(weeklyGoalComponent, historicalWeeklyGoalsTable);

  function onSaveButtonClick(weeklyGoalValue: WeeklyGoal) {
    const user = readFromLocalStorage(username);
    const currentWeight = user.weights[0].weight;
    const previousGoal = user.goals[0];
    previousGoal.endWeight=currentWeight;
    const newGoal: Goal = {
      date: actualDate,
      weeklyGoal: weeklyGoalValue,
      startWeight:currentWeight
    };

    user.goals.unshift(newGoal);

    previousGoal.achieved=checkIfGoalIsAchieved(previousGoal);
    saveInLocalStorage(username, user);
    const newhistoricalWeeklyGoalsTable = createHistoricalWeeklyGoalsTable(
      user.goals,
    );
    myGoalsContainer.replaceChild(
      newhistoricalWeeklyGoalsTable,
      historicalWeeklyGoalsTable,
    );
    historicalWeeklyGoalsTable = newhistoricalWeeklyGoalsTable;
    RefreshProfileInfo(user);
  }
  return myGoalsContainer;
}

function checkIfGoalIsAchieved(goal: Goal): boolean{
  const startWeight=goal.startWeight;
  const endWeight=goal.endWeight;
  if(goal.weeklyGoal===WeeklyGoal.Gain){
  return endWeight>startWeight; 
  }
  else if(goal.weeklyGoal===WeeklyGoal.Lose){
    return endWeight<startWeight;
    }
  else if(goal.weeklyGoal===WeeklyGoal.Keep){
    return endWeight===startWeight;
  }
}