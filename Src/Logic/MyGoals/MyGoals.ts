import { createHistoricalWeeklyGoalsTable } from '../../../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable';
import {
  generateWeeklyGoalComponent
} from '../../../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';
import { createElement } from '../../../Src/UIComponents/utils/utils';
import { Goal } from '../../../Models/Goal.model';
import { WeeklyGoal } from '../../../Models/WeeklyGoal.model';
import {
  readFromLocalStorage,
  saveInLocalStorage,
} from '../../../Src/Logic/LocalStorage/LocalStorage';

export function generateMyGoals(username: string) {
  const myGoalsContainer = createElement('div', 'my-goals-container');
  const actualDate = new Date();

  const weeklyGoalComponent = generateWeeklyGoalComponent(
    actualDate.toLocaleDateString('en-GB'),
    onSaveButtonClick
  );
  let user = readFromLocalStorage(username);
  let historicalWeeklyGoalsTable = createHistoricalWeeklyGoalsTable(user.goals);
  myGoalsContainer.append(weeklyGoalComponent,historicalWeeklyGoalsTable);

  function onSaveButtonClick(weeklyGoalValue: WeeklyGoal) {
    let user = readFromLocalStorage(username);
    const newGoal: Goal = {
      date: actualDate,
      weeklyGoal: weeklyGoalValue
    };
    user.goals.unshift(newGoal);
    saveInLocalStorage(username,user);
    user=readFromLocalStorage(username);
    const newhistoricalWeeklyGoalsTable = createHistoricalWeeklyGoalsTable(user.goals);
    myGoalsContainer.replaceChild(newhistoricalWeeklyGoalsTable,historicalWeeklyGoalsTable);
    historicalWeeklyGoalsTable = newhistoricalWeeklyGoalsTable;
  }

  return myGoalsContainer;
}
