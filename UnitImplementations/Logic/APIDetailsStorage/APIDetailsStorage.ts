import { createTileAPIKey } from '../../../Src/UIComponents/TileAPIKey/TileAPIKey';
import { getAPIDetails, setAPIDetails } from "../../../Src/Logic/APIDetailsStorage/APIDetailsStorage";
import  generateTileComponent  from '../../../Src/UIComponents/TileComponent/TileComponent'
import { saveInLocalStorage, readFromLocalStorage } from "../../../Src/Logic/LocalStorage/LocalStorage"

import { User } from "../../../Models/User.model";
import { ActivityLevel } from "../../../Models/ActivityLevel.model";
import { MyDiaryFood } from '../../../Models/DiaryFood.model'
import { Meal } from "../../../Models/Meal.model";

const username = 'TestUser';

const user : User = {
    name: 'TestUser',
    gender: 'Male',
    dateOfBirth: new Date(),
    height: 180,
    goalWeight: 75,
    activityLevel: ActivityLevel.Active,
    detailsAPI: {key: 'PrzykladAPIOdczytZLocalStorage', id: 'OrazOdczytanegoID'},
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
            })]
}

saveInLocalStorage(username, user);

const tileMyWeight = generateTileComponent(
    createTileAPIKey(username, getAPIDetails, setAPIDetails) );

document.body.appendChild(tileMyWeight);


