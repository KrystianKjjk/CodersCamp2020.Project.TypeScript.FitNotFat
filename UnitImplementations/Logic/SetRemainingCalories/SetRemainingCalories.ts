import {SetRemainingCalories} from "../../../Src/Logic/SetRemainingCalories/SetRemainingCalories";
import generateTileComponent from "../../../Src/UIComponents/TileComponent/TileComponent";
import { setLoggedInUser } from "../../../Src/UIComponents/utils/utils";
import { saveInLocalStorage } from "../../../Src/Logic/LocalStorage/LocalStorage";
import { MyDiaryFood } from "../../../Models/DiaryFood.model"
import { User } from "../../../Models/User.model";
import { ActivityLevel } from "../../../Models/ActivityLevel.model";

const loggedInUser = 'testUser';
let testUser: User = {
  name: 'testUser',
  gender: 'Male',
  dateOfBirth: new Date(1995, 1, 22),
  height: 177,
  goalWeight: 75,
  activityLevel: ActivityLevel.Regular,

  diaryFood: [
    new MyDiaryFood({
      date: new Date(2021, 1, 11),
      providedKcal: 1000,
      recommendedKcal: 2500,
      meals: {}
    })],
  diaryExercises: [
    {
      date: new Date(2021, 1, 11),
      totalCalories: 2000,
      exercises: [
        {
          name: 'running',
          met: 9.8,
          duration: 60,
          calories: 686
        }]
    } ],
  weights: [
    {
      date: new Date(2021, 1, 4),
      weight: 68
    } ]
};

setLoggedInUser(loggedInUser);
saveInLocalStorage(loggedInUser, testUser);

const component = generateTileComponent(SetRemainingCalories());

document.body.append(component);





