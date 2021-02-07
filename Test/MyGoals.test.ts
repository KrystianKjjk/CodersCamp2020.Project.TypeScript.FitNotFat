import { generateMyGoals } from '../Src/Logic/MyGoals/MyGoals';
import * as HistoricalWeeklyGoalsTable from '../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable';
import * as LocalStorage from '../Src/Logic/LocalStorage/LocalStorage';
import { User } from '../Models/User.model';
import { WeeklyGoal } from '../Models/WeeklyGoal.model';
import { Goal } from '../Models/Goal.model';
import { ActivityLevel } from '../Models/ActivityLevel.model';

describe('my goals tests', () => {
  test('should rendered my gols component', () => {
    const firstGoal: Goal = {
      date: new Date(),
      weeklyGoal: WeeklyGoal.Gain,
    };

    const testUser: User = {
      name: 'TestUser',
      gender: 'Male',
      dateOfBirth: new Date(),
      height: 180,
      goalWeight: 90,
      activityLevel: ActivityLevel.Active,
      goals: [firstGoal],
    };
    jest.spyOn(HistoricalWeeklyGoalsTable, 'createHistoricalWeeklyGoalsTable');
    jest.spyOn(LocalStorage, 'readFromLocalStorage').mockReturnValue(testUser);
    const myGoalsComponent = generateMyGoals(testUser.name);
    const weeklyGoalComponent = myGoalsComponent.querySelector(
      '.weekly-goal-component',
    );
    const historicalWeeklyGoalsTable = myGoalsComponent.querySelector(
      '.historical-weekly-goals-table',
    );

    expect(weeklyGoalComponent).toBeDefined();
    expect(historicalWeeklyGoalsTable).toBeDefined();
    expect(LocalStorage.readFromLocalStorage).toBeCalledTimes(1);
    expect(
      HistoricalWeeklyGoalsTable.createHistoricalWeeklyGoalsTable,
    ).toBeCalledWith(testUser.goals);
  });
  test('should save to local storage on save', () => {
    const firstGoal: Goal = {
      date: new Date(),
      weeklyGoal: WeeklyGoal.Gain,
    };

    const testUser: User = {
      name: 'TestUser',
      gender: 'Male',
      dateOfBirth: new Date(),
      height: 180,
      goalWeight: 90,
      activityLevel: ActivityLevel.Active,
      goals: [firstGoal],
    };
    jest.spyOn(LocalStorage, 'readFromLocalStorage').mockReturnValue(testUser);
    jest.spyOn(LocalStorage, 'saveInLocalStorage').mockImplementation(jest.fn());
    const myGoalsComponent = generateMyGoals(testUser.name);
    const saveButton = myGoalsComponent.querySelector(
      '.button-save',
    ) as HTMLButtonElement;

    saveButton.click();
    expect(LocalStorage.saveInLocalStorage).toBeCalledTimes(1);
  });
});
