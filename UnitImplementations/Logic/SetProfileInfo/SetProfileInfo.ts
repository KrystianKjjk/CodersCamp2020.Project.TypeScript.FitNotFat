import { SetProfileInfo } from '../../../Src/Logic/SetProfileInfo/SetProfileInfo';
import { User } from '../../../Models/User.model';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';
import { MyDiaryFood } from '../../../Models/DiaryFood.model';
import { Meal } from '../../../Models/Meal.model';
import { WeeklyGoal } from '../../../Models/WeeklyGoal.model';

const myuser: User = {
  name: 'TestUser',
  gender: 'Male',
  dateOfBirth: new Date(),
  height: 180,
  goalWeight: 75,
  activityLevel: ActivityLevel.Active,
  weights: [{date: new Date(), weight: 77}],
  goals: [{
    date: new Date(),
    weeklyGoal: WeeklyGoal.Gain,
    startWeight: 66,
    endWeight: 68,
    achieved: 'Yes'
  }],
  diaryFood: [
    new MyDiaryFood({
      date: new Date(2021, 1, 25),
      providedKcal: 0,
      recommendedKcal: 2500,
      meals: {}
    })
      .addMeal(Meal.breakfast,{
        name: 'pancakes',
        amount: 2,
        unit: `pancake (5'')`,
        calories: 181.6
      })],

}
document.body.appendChild(SetProfileInfo(myuser))
