import addDiaryItem from '../../UIComponents/AddDiaryItem/AddDiaryItem';
import { readFromLocalStorage, saveInLocalStorage } from '../../Logic/LocalStorage/LocalStorage';
import { createTable, addRow } from '../../UIComponents/ReusableTable/ReusableTable';
import { foodData, FoodDataFromResponse, fetchFoodData } from '../../APIConnection/Food';
import { FoodDetails } from '../../../Models/FoodDetails.model';
import { generateWhiteButton } from '../Buttons/Buttons';
import { User } from '../../../Models/User.model';
import { createElement } from '../utils/utils';

export default function createMealDiary(userName: string, mealName: string, showDate: Date) {
    const userData = readFromLocalStorage(userName);
    const table = createTable(['Food', 'Qty', 'Unit', 'Calories']);
    const addNewRow = addRow(table);
    const mealsFromLocalStorage = getMealDataFromUserData(userData, mealName, showDate);
    mealsFromLocalStorage.forEach(meal => addNewRow(prepareDataForTable(meal)));
    
    const container = createElement('div', 'container');
    container.append(table);
    const addBtn = generateWhiteButton('ADD', () => {console.log('ADD')});
    const authorizedFailed = createElement('p', 'failed-authorized');
    authorizedFailed.appendChild(document.createTextNode('PODAJ API KEY I API ID'));

    if (isUserAuthorized(userData)) {
        container.append(addBtn);
    } else {
        container.append(authorizedFailed);
    }

    return container;
}

function getMealDataFromUserData(userData: User, mealName: string, showDate: Date): FoodDetails[] {
    if (!userData || !userData.diaryFood) { return [];}
    
    const mealsOfTheDay = userData.diaryFood.find(food => sameDay(showDate, food.date));

    if (!mealsOfTheDay) { return [];}

    return mealsOfTheDay.meals[mealName] || [];
}

function sameDay(d1: Date | string, d2: Date | string) {
    const date1 = d1 instanceof Date ? d1 : new Date(d1);
    const date2 = d2 instanceof Date ? d2 : new Date(d2);
    
    return date1.getFullYear() === date2.getFullYear() 
        && date1.getMonth() === date2.getMonth() 
        && date1.getDate() === date2.getDate();
}

function prepareDataForTable(data: FoodDetails): string[] {
    return [
        data.name, 
        `${data.amount}`, 
        data.unit, 
        `${data.calories} kcal`
    ];
}

function isUserAuthorized(userData: User): boolean {
    return !!(userData && userData.detailsAPI && userData.detailsAPI.id && userData.detailsAPI.key);
}

function addMealsToLocalStorage(userName: string, mealName: string, showDate: Date, mealsToAdd: FoodDataFromResponse) {
    const currentState = readFromLocalStorage(userName);
    const currentDiaryFood = currentState.diaryFood || [];
    const currentDayMeals = currentDiaryFood.find(food => sameDay(showDate, food.date));
    
    const responseDataMapped: FoodDetails[] = mealsToAdd.foods.map(({food_name, serving_qty, serving_unit, nf_calories}) => ({
        name: food_name,
        amount: serving_qty,
        unit: serving_unit,
        calories: nf_calories
    }));

    let updatedDayMeals = {...currentDayMeals};

    if (currentDayMeals) {
        let foodItems = currentDayMeals.meals[mealName] || [];
        foodItems = [...foodItems, ...responseDataMapped];
        updatedDayMeals.meals[mealName] = foodItems;
    } else {
        updatedDayMeals = {
            date: showDate,
            meals: {
                [mealName]: responseDataMapped
            }
        }
    }

    const updatedUser: User = {
        ...currentState,
        diaryFood: [
            ...currentState.diaryFood.filter(food => !sameDay(showDate, food.date)),
            updatedDayMeals
        ]
    };

    saveInLocalStorage(userName, updatedUser);
}