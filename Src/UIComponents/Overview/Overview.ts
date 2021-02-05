import generateGoalTile from '../GoalTile/GoalTile';
import { createTileMyWeight } from '../TileMyWeight/TileMyWeight';
import { createElement, calculateCalories } from '../utils/utils';
import { User } from '../../../Models/User.model';
import {saveInLocalStorage, readFromLocalStorage} from '../../Logic/LocalStorage/LocalStorage';
import generateTileComponent from '../TileComponent/TileComponent';

 function overviewComponent(User: User):HTMLDivElement{
    const overviewContainer = createElement('div', 'overview-container') as HTMLDivElement;

    //create a header div
    const overviewHeader = createElement('div', 'overview-header');
    const overviewHeaderH1 = createElement('h1', '', 'Overview');
    const overviewHeaderH2 = createElement('h2', '');
    overviewHeaderH2.innerHTML = `Hi <span>${User.name}</span>, welcome back!`;
    overviewHeader.append(overviewHeaderH1, overviewHeaderH2);

    //create the 'goal weight' tile 
    const goalWeight = createElement('div', 'weight-goal');
    goalWeight.id = 'overviewGoalWeightTile';
    const weightTile = generateTileComponent(goalWeight);


    //create the 'today calories' tile
    const todayCalories = createElement('div', 'today-calories');
    todayCalories.id = 'overviewTodayCaloriesTile';
    const todayCaloriesTile = generateTileComponent(todayCalories);


    //create the 'remaining calories' tile and pass the arguments

    //TO BE ADDED

    //create the weight input tile, save the input to localstorage

    const myWeightInputTile = createTileMyWeight(User.weights[0].weight, new Date(), User, saveWeightInLocalStorage);

    overviewContainer.append(overviewHeader, weightTile, todayCaloriesTile, myWeightInputTile);
    document.body.appendChild(overviewContainer);

    generateGaugesContent(User);

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

function saveWeightInLocalStorage(weight: number, date: Date, user:User){
    user.weights.unshift({
        date: date,
        weight: weight
    });

    console.log(user);

    generateGaugesContent(user);
    saveInLocalStorage(user.name, user);
}

function generateGaugesContent(User: User){
    //calculate age and max calories
    const age = getAge(User.dateOfBirth);
    const maxCalories = calculateCalories(User.gender, User.weights[0].weight, User.height, age, User.activityLevel)
    
    //check if tile content exists - if yes, then clear it
    const weightTile = document.querySelector('#overviewGoalWeightTile');
    const todayCaloriesTile = document.querySelector('#overviewTodayCaloriesTile');
    if(weightTile)   weightTile.innerHTML='';
    if(todayCaloriesTile)   todayCaloriesTile.innerHTML='';

    
    const userMaxWeight = Math.max(...(User.weights.map(a => a.weight)));


    //generate tile content
    if(User.goalWeight < User.weights[0].weight){
        generateGoalTile("Weight Goal", "overviewGoalWeightTile", User.weights[0].weight, User.goalWeight, userMaxWeight, "kg", true);
    } else{
        generateGoalTile("Weight Goal", "overviewGoalWeightTile", User.weights[0].weight, userMaxWeight, User.goalWeight, "kg", false);
    }

    generateGoalTile("Today", "overviewTodayCaloriesTile", User.diaryFood[0].providedKcal, 0, maxCalories ,"kcal", false);
  
}