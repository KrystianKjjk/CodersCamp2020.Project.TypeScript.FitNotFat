import {
  generateWeeklyGoalComponent
} from '../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';
import { WeeklyGoal } from '../Models/WeeklyGoal.model';

describe('Tests for Weekly goal component', () => {
  test('should render weekly goal component', () => {
    const weeklyGoalComponent=generateWeeklyGoalComponent('1',()=>{});  
    expect(weeklyGoalComponent).toMatchSnapshot();
  });

  test('should save selected goal',()=>{
    const onClickFunction=jest.fn();
    const weeklyGoalComponent=generateWeeklyGoalComponent('1',onClickFunction);  
    const firstOption:HTMLDivElement=weeklyGoalComponent.querySelector('.select-weekly-goal .option');
    firstOption.click();
    const saveButton:HTMLButtonElement=weeklyGoalComponent.querySelector('.button-save');
    saveButton.click();
    expect(onClickFunction).toHaveBeenCalledWith(WeeklyGoal.Gain);
})
});
