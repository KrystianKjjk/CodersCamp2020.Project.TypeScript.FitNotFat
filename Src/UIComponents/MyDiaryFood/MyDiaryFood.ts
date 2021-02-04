import addDiaryItem from '../../UIComponents/AddDiaryItem/AddDiaryItem';
import { readFromLocalStorage, saveInLocalStorage } from '../../Logic/LocalStorage/LocalStorage';
import { createTable, addRow } from '../../UIComponents/ReusableTable/ReusableTable';
import { fetchFoodDataAndApply, FoodDataFromResponse, fetchFoodData, FoodItemData } from '../../APIConnection/Food';
import { FoodDetails } from '../../../Models/FoodDetails.model';
import { generateWhiteButton } from '../Buttons/Buttons';
import { User } from '../../../Models/User.model';
import { createElement, createTextInput } from '../utils/utils';
import tile from '../TileComponent/TileComponent';

const identifierClasses = {
    mainContainer: '.my-diary-food',
    btnContainers: {
        onlyAdd: 'button-container-only-add',
        findCancel: 'button-container-find-cancel',
        find: 'button-container-find',
        addCancel: 'button-container-add-cancel',
    },
    tables: {
        main: 'main-table',
        api: 'table-api',
    },
    headers: {
        mealName: '.my-diary-food h3',
        inputLabel: '.my-diary-food h2',
    },
    input: 'my-diary-food-input',
};

export default function createMealDiary(userName: string, mealName: string, showDate: Date) {
    // from local storage
    const userData = readFromLocalStorage(userName);

    let meals: FoodDetails[] = [];
    const addMeals = (newMeal: FoodDetails) => meals = [...meals, newMeal];
    const resetMeals = () => meals = [];

    // building layout
    const container = createElement('div', 'my-diary-food');
    const header = createElement('h3', '', mealName);
    const table = createTable(['Food', 'Qty', 'Unit', 'Calories']);
    table.classList.add(identifierClasses.tables.main);
    const addNewRow = addRow(table);
    const addNewRowFoodDetails = (meal: FoodDetails) => addNewRow(prepareDataForTable(meal));
    const tableAPI = createTable(['Food', 'Qty', 'Unit', 'Calories']);
    tableAPI.classList.add(identifierClasses.tables.api);
    const addNewRowAPI = addRow(tableAPI);
    const addNewRowAPIDetails = (meal: FoodDetails) => addNewRowAPI(prepareDataForTable(meal));

    populateMainTable(userName, mealName, showDate, addNewRow);

    const btnContainerFirst = createElement('div', ['button-container', identifierClasses.btnContainers.onlyAdd]);
    const addFirstBtn = generateWhiteButton('ADD', onClickFirstAdd);

    const inputLabel = createElement('h2', '', 'Enter your meal');
    const input = createTextInput('ex. 2 bananas and 1 cup of milk', identifierClasses.input);
    const btnContainerSecond = createElement('div', ['button-container', identifierClasses.btnContainers.findCancel]);
    const btnFind = generateWhiteButton('FIND', () => onClickFind(input.value, [addNewRowAPIDetails, addMeals]));
    const btnFindOnly = generateWhiteButton('FIND', () => onClickFind(input.value, [addNewRowAPIDetails, addMeals]));
    const btnCancel = generateWhiteButton('CANCEL', onClickCancel);
    btnContainerSecond.append(btnFind, btnCancel);
    const btnContainerFourth = createElement('div', ['button-container', identifierClasses.btnContainers.find]);
    btnContainerFourth.append(btnFindOnly);

    const btnContainerThird = createElement('div', ['button-container', identifierClasses.btnContainers.addCancel]);
    const addSecondBtn = generateWhiteButton('ADD', () => onClickAddMeal(userName, mealName, showDate, meals, addNewRow));
    const cancelSecondBtn = generateWhiteButton('CANCEL', onClickCancel);
    btnContainerThird.append(addSecondBtn, cancelSecondBtn);

    container.append(header, table, btnContainerFirst, inputLabel, input, btnContainerFourth, btnContainerSecond, tableAPI, btnContainerThird);
    const authorizedFailed = createElement('p', 'failed-authorized');
    authorizedFailed.appendChild(document.createTextNode('PODAJ API KEY I API ID'));

    if (isUserAuthorized(userData)) {
        btnContainerFirst.append(addFirstBtn);
    } else {
        btnContainerFirst.append(authorizedFailed);
    }

    hideElements(inputLabel, input, btnContainerSecond, tableAPI, btnContainerThird, btnContainerFourth);

    return tile(container);
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

function populateMainTable(userName: string, mealName: string, showDate: Date, addNewRow: (rowData: string[]) => void) {
    const userData = readFromLocalStorage(userName);
    const mealsFromLocalStorage = getMealDataFromUserData(userData, mealName, showDate);

    const table = document.querySelector(`.${identifierClasses.tables.main}`);
    table && (table.innerHTML = '');
    
    mealsFromLocalStorage.forEach(meal => addNewRow(prepareDataForTable(meal)));
}

function prepareDataForTable(data: FoodDetails): string[] {
    return [
        data.name, 
        `${data.amount}`, 
        data.unit, 
        `${data.calories} kcal`
    ];
}

function prepareAPIData(itemFromAPI: FoodItemData): FoodDetails {
    return {
        name: itemFromAPI.food_name,
        amount: itemFromAPI.serving_qty,
        unit: itemFromAPI.serving_unit,
        calories: itemFromAPI.nf_calories
    };
}

function isUserAuthorized(userData: User): boolean {
    return !!(userData && userData.detailsAPI && userData.detailsAPI.id && userData.detailsAPI.key);
}

function onClickFirstAdd() {
    const {btnContainers, tables, input} = identifierClasses;

    hideElementsByClassName(tables.main, btnContainers.onlyAdd);
    showElementsByClassName(input, btnContainers.findCancel)
}

function onClickCancel() {
    const {btnContainers, tables, input} = identifierClasses;

    hideElementsByClassName(btnContainers.findCancel, btnContainers.addCancel, btnContainers.find, tables.api, input);
    showElementsByClassName(btnContainers.onlyAdd, tables.main);
}

function onClickAddMeal(
    userName: string, 
    mealName: string, 
    showDate: Date, 
    mealsToAdd: FoodDetails[], 
    addNewRow: (rowData: string[]) => void
) {
    const {btnContainers, tables, input} = identifierClasses;

    hideElementsByClassName(btnContainers.findCancel, btnContainers.addCancel, btnContainers.find, tables.api, input);
    showElementsByClassName(tables.main, btnContainers.onlyAdd);
    addMealsToLocalStorage(userName, mealName, showDate, mealsToAdd);
    populateMainTable(userName, mealName, showDate, addNewRow);
    
}

async function onClickFind(inputValue: string, callbacks: Array<(data: FoodDetails) => void>) {
    const {btnContainers, tables, input} = identifierClasses;
    hideElementsByClassName(btnContainers.findCancel);
    showElementsByClassName(input, btnContainers.find, tables.api, btnContainers.addCancel)

    const foodDetails = await fetchFoodData(inputValue);
    if (!foodDetails || !foodDetails.foods) return;

    foodDetails.foods.forEach(food => callbacks.forEach(callback => callback(prepareAPIData(food))));
}

function addMealsToLocalStorage(userName: string, mealName: string, showDate: Date, mealsToAdd: FoodDetails[]) {
    const currentState = readFromLocalStorage(userName);
    const currentDiaryFood = currentState.diaryFood || [];
    const currentDayMeals = currentDiaryFood.find(food => sameDay(showDate, food.date));

    let updatedDayMeals = {...currentDayMeals};

    if (currentDayMeals) {
        let foodItems = currentDayMeals.meals[mealName] || [];
        foodItems = [...foodItems, ...mealsToAdd];
        updatedDayMeals.meals[mealName] = foodItems;
    } else {
        updatedDayMeals = {
            date: showDate,
            meals: {
                [mealName]: mealsToAdd
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

// hide and show helpers
function hideElementsByClassName(...selectors: string[]) {
    hideElements(...selectors.map(selector => document.querySelector(`.${selector}`) as HTMLElement).filter(Boolean));
}

function showElementsByClassName(...selectors: string[]) {
    showElements(...selectors.map(selector => document.querySelector(`.${selector}`) as HTMLElement).filter(Boolean));
}

function hideElements(...elements: HTMLElement[]) {
    elements.forEach(el => el.style.display = 'none');
}

function showElements(...elements: HTMLElement[]) {
    elements.forEach(el => el.style.display = '');
}