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
  const actualDate = new Date();

  const weeklyGoalComponent = generateWeeklyGoalComponent(
    actualDate.toLocaleDateString('en-GB'),
    onSaveButtonClick,
  );
  const user = readFromLocalStorage(username);
  let historicalWeeklyGoalsTable = createHistoricalWeeklyGoalsTable(user.goals || []);
  myGoalsContainer.append(weeklyGoalComponent, historicalWeeklyGoalsTable);

  function onSaveButtonClick(weeklyGoalValue: WeeklyGoal) {
    const user = readFromLocalStorage(username);
    const newGoal: Goal = {
      date: actualDate,
      weeklyGoal: weeklyGoalValue,
    };
    user.goals.unshift(newGoal);
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
