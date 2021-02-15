import { generateMyGoals } from '../Src/Logic/MyGoals/MyGoals';
import * as HistoricalWeeklyGoalsTable from '../Src/UIComponents/HistoricalWeeklyGoalsTable/HistoricalWeeklyGoalsTable';
import * as LocalStorage from '../Src/Logic/LocalStorage/LocalStorage';
import { User } from '../Models/User.model';
import { WeeklyGoal } from '../Models/WeeklyGoal.model';
import { Goal } from '../Models/Goal.model';
import { ActivityLevel } from '../Models/ActivityLevel.model';
import { Weight } from '../Models/Weight.model';



describe('my goals tests', () => {
  beforeEach(()=>{
    Date.now = jest.fn(() => new Date(2021, 2, 15).valueOf())
  })
  
  test('should render my goals component', () => {
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
  test('should create new goal, update previous as achieved and save to local storage', () => {
    const firstGoal: Goal = {
      date: new Date(2021,2,8),
      weeklyGoal: WeeklyGoal.Gain,
      startWeight: 80
    };

    const firstWeight: Weight={
      date: new Date(2021,2,8),
      weight: 80
    }
    const secondWeight: Weight={
      date: new Date(2021,2,15),
      weight: 85
    }

    const testUser: User = {
      name: 'TestUser',
      gender: 'Male',
      dateOfBirth: new Date(1995,7,7),
      height: 180,
      goalWeight: 90,
      activityLevel: ActivityLevel.Active,
      goals: [firstGoal],
      weights:[secondWeight, firstWeight]
    };
    jest.spyOn(LocalStorage, 'readFromLocalStorage').mockReturnValue(testUser);
    jest.spyOn(LocalStorage, 'saveInLocalStorage').mockImplementation(jest.fn());
    const myGoalsComponent = generateMyGoals(testUser.name);

    const saveButton = myGoalsComponent.querySelector(
      '.button-save',
    ) as HTMLButtonElement;

    saveButton.click();

    const expectedUpdatedFirstGoal: Goal = {
      date: new Date(2021,2,8),
      weeklyGoal: WeeklyGoal.Gain,
      startWeight: 80,
      endWeight:85,
      achieved: true
    };

    const secondGoal: Goal = {
      date: new Date(2021,2,15),
      weeklyGoal: WeeklyGoal.Gain,
      startWeight: 85
    };

    const expectedUser: User = {
    name: 'TestUser',
    gender: 'Male',
    dateOfBirth: new Date(1995,7,7),
    height: 180,
    goalWeight: 90,
    activityLevel: ActivityLevel.Active,
    goals: [secondGoal, expectedUpdatedFirstGoal],
    weights:[secondWeight, firstWeight]}
    
    expect(LocalStorage.saveInLocalStorage).toBeCalledWith(expectedUser.name, expectedUser);

  });

  test('should create new goal, update previous as not achieved and save to local storage', () => {
    const firstGoal: Goal = {
      date: new Date(2021,2,8),
      weeklyGoal: WeeklyGoal.Gain,
      startWeight: 80
    };

    const firstWeight: Weight={
      date: new Date(2021,2,8),
      weight: 80
    }
    const secondWeight: Weight={
      date: new Date(2021,2,15),
      weight: 75
    }

    const testUser: User = {
      name: 'TestUser',
      gender: 'Male',
      dateOfBirth: new Date(1995,7,7),
      height: 180,
      goalWeight: 90,
      activityLevel: ActivityLevel.Active,
      goals: [firstGoal],
      weights:[secondWeight, firstWeight]
    };
    jest.spyOn(LocalStorage, 'readFromLocalStorage').mockReturnValue(testUser);
    jest.spyOn(LocalStorage, 'saveInLocalStorage').mockImplementation(jest.fn());
    const myGoalsComponent = generateMyGoals(testUser.name);

    const saveButton = myGoalsComponent.querySelector(
      '.button-save',
    ) as HTMLButtonElement;

    saveButton.click();

    const expectedUpdatedFirstGoal: Goal = {
      date: new Date(2021,2,8),
      weeklyGoal: WeeklyGoal.Gain,
      startWeight: 80,
      endWeight:75,
      achieved: false
    };

    const secondGoal: Goal = {
      date: new Date(2021,2,15),
      weeklyGoal: WeeklyGoal.Gain,
      startWeight: 75
    };

    const expectedUser: User = {
    name: 'TestUser',
    gender: 'Male',
    dateOfBirth: new Date(1995,7,7),
    height: 180,
    goalWeight: 90,
    activityLevel: ActivityLevel.Active,
    goals: [secondGoal, expectedUpdatedFirstGoal],
    weights:[secondWeight, firstWeight]}
    
    expect(LocalStorage.saveInLocalStorage).toBeCalledWith(expectedUser.name, expectedUser);

  });
});
