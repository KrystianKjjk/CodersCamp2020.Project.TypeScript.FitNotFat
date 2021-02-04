import generateGoalTile from '../GoalTile/GoalTile';
import { createTileMyWeight } from '../TileMyWeight/TileMyWeight';
import { createElement, calculateCalories } from '../utils/utils';
import { User } from '../../../Models/User.model';
import {saveInLocalStorage, readFromLocalStorage} from '../../Logic/LocalStorage/LocalStorage';
import generateTileComponent from '../TileComponent/TileComponent';

 function overviewComponent(User: User):HTMLDivElement{
    const overviewContainer = createElement('div', 'overview-container') as HTMLDivElement;

    //calculate age
    const age = getAge(User.dateOfBirth);
    //calculate max calories
    const maxCalories = calculateCalories(User.gender, User.weights[0].weight, User.height, age, User.activityLevel)
      
    //create the 'goal weight' tile and pass the arguments
    const goalWeight = createElement('div', 'weight-goal');
    goalWeight.id = 'overviewGoalWeightTile';
    const weightTile = generateTileComponent(goalWeight);


    //create the 'today calories' tile and pass the arguments
    const todayCalories = createElement('div', 'today-calories');
    todayCalories.id = 'overviewTodayCaloriesTile';
    const todayCaloriesTile = generateTileComponent(todayCalories);


    //create the 'remaining calories' tile and pass the arguments

    //create the weight input tile, save the input to localstorage



    overviewContainer.append(weightTile, todayCaloriesTile);
    document.body.appendChild(overviewContainer);
    generateGoalTile("Weight Goal", "overviewGoalWeightTile", User.weights[0].weight, User.weights[User.weights.length-1].weight, User.goalWeight, "kg");
    generateGoalTile("Today", "overviewTodayCaloriesTile", User.diaryFood[0].providedKcal, 0, maxCalories ,"kcal");
    return overviewContainer;
}

export default overviewComponent;

function getAge(date: Date) {
    var today = new Date();
    var birthDate = date;
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}