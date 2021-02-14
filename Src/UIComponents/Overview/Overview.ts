import generateGoalTile from '../GoalTile/GoalTile';
import { createTileMyWeight } from '../TileMyWeight/TileMyWeight';
import { createElement, calculateCalories } from '../utils/utils';
import { User } from '../../../Models/User.model';
import { saveInLocalStorage, readFromLocalStorage } from '../../Logic/LocalStorage/LocalStorage';
import generateTileComponent from '../TileComponent/TileComponent';
import { SetRemainingCalories } from '../../Logic/SetRemainingCalories/SetRemainingCalories';
import { createTileRemainingCalories } from '../TileRemainingCalories/TileRemainingCalories';
import { saveWeightInLocalStorage } from '../../Logic/SaveWeightInLocalStorage/SaveWeightInLocalStorage';

//to call this function (due to the nature of how the gauges are created by the library)
// please first create a target container in body (make sure it's already in DOM) and only then call the function
export function overviewComponent(User: User, targetDivClass: string): void{
    const overviewContainer = createElement('div', 'overview-container') as HTMLDivElement;

    //create the 'goal weight' tile 
    const goalWeight = createElement('div', 'weight-goal');
    goalWeight.id = 'overviewGoalWeightTile';
    const weightTile = generateTileComponent(goalWeight);

    //create the 'today calories' tile
    const todayCalories = createElement('div', 'today-calories');
    todayCalories.id = 'overviewTodayCaloriesTile';
    const todayCaloriesTile = generateTileComponent(todayCalories);

    //create the 'remaining calories' tile and pass the arguments
    const remainingCalories = SetRemainingCalories();

    //create the weight input tile, save the input to localstorage
    const myWeightInputTile = createTileMyWeight(User.weights?.[0]?.weight || 0, new Date(), User, saveWeightInLocalStorage);

    overviewContainer.append(weightTile, todayCaloriesTile, remainingCalories, myWeightInputTile);
    document.querySelector(`.${targetDivClass}`).appendChild(overviewContainer);
    generateGaugesContent(User);
}

export function getAge(date: Date) {
    return ((new Date(Date.now() - date.getTime()).getFullYear()) - 1970);
}

export function generateGaugesContent(User: User){
    //calculate age and max calories
    const age = getAge(User.dateOfBirth);
    const maxCalories = calculateCalories(User.gender, User.weights?.[0]?.weight, User.height, age, User.activityLevel)
    
    //calculate the highest and lowest weight values 
    const userMaxWeight = Math.max(...(User.weights.map(a => a.weight)));
    const userMinWeight = Math.min(...(User.weights.map(a => a.weight)));

    //check if tile content exists - if yes, then clear it
    const weightTile = document.querySelector('#overviewGoalWeightTile');
    const todayCaloriesTile = document.querySelector('#overviewTodayCaloriesTile');
    if(weightTile)   weightTile.innerHTML='';
    if(todayCaloriesTile)   todayCaloriesTile.innerHTML='';    

    //generate tile content
    //if user is heavier than goal
    if (User.goalWeight <= User.weights[0].weight){
        generateGoalTile("Weight Goal", "overviewGoalWeightTile", User.weights?.[0]?.weight, User.goalWeight, userMaxWeight, "kg", true);
    } 
    //if user is lighter than goal
    else{
        generateGoalTile("Weight Goal", "overviewGoalWeightTile", User.weights?.[0]?.weight,  userMinWeight, User.goalWeight,  "kg", false);
    }

    generateGoalTile("Today Calories", "overviewTodayCaloriesTile", User.diaryFood?.[0]?.providedKcal || 0, 0, maxCalories ,"kcal", false);
}
