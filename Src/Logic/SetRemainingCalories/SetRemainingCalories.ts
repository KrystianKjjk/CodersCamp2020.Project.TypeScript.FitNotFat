import generateTileComponent from "../../UIComponents/TileComponent/TileComponent";
import { createTileRemainingCalories, RemainingCalories } from "../../UIComponents/TileRemainingCalories/TileRemainingCalories";
import { calculateCalories } from "../../UIComponents/utils/utils";
import { getLoggedInUser } from "../../UIComponents/utils/utils";
import { readFromLocalStorage } from "../LocalStorage/LocalStorage";
import { getAge } from "../../UIComponents/Overview/Overview";

export function SetRemainingCalories(){

    const loggedUser = getLoggedInUser();
    if(!loggedUser) return;
    const userObject = readFromLocalStorage(loggedUser);
    if(!userObject) return;

    const userAge = getAge(userObject.dateOfBirth);

    const goalCalories = Math.floor(calculateCalories(userObject.gender, userObject.weights[0].weight, userObject.height, userAge, userObject.activityLevel));

    const dateDiaryExercises = userObject.diaryExercises?.[0]?.date;
    let exercisesCalories: number;

    if(dateDiaryExercises) {
        const diaryIsToday: boolean = _isToday(new Date(dateDiaryExercises));
        exercisesCalories = (userObject?.diaryExercises?.[0]?.totalCalories && diaryIsToday) ? userObject?.diaryExercises?.[0]?.totalCalories : 0;
    }
    else {
        exercisesCalories = 0;
    }

    const dateDiaryFood = userObject?.diaryFood?.[0]?.date;
    let foodCalories: number;

    if(dateDiaryFood) {
        const foodIsToday: boolean = _isToday(new Date(dateDiaryFood));
        foodCalories = (userObject?.diaryFood?.[0]?.providedKcal && foodIsToday) ? userObject?.diaryFood?.[0]?.providedKcal : 0;
    }
    else {
        foodCalories = 0;
    }

    const totalNeededCalories = goalCalories + exercisesCalories;
    const remainingCalories = totalNeededCalories - foodCalories;

    const remainingCaloriesObject: RemainingCalories = {
        remaining: remainingCalories,
        goal: goalCalories,
        exercises: exercisesCalories,
        food: foodCalories
    }

    return generateTileComponent(createTileRemainingCalories(remainingCaloriesObject));
}

function _isToday(dateToCheck: Date): boolean{

    const today = new Date();

    if(dateToCheck.getDay() !== today.getDay()
      || dateToCheck.getMonth() !== today.getMonth()
      || dateToCheck.getFullYear() !== today.getFullYear()) return false;

    return true;
}
