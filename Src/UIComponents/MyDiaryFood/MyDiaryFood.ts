import { readFromLocalStorage, saveInLocalStorage } from '../../Logic/LocalStorage/LocalStorage';
import { createTable, addRow } from '../../UIComponents/ReusableTable/ReusableTable';
import { fetchFoodData } from '../../APIConnection/Food';
import { FoodDetails } from '../../../Models/FoodDetails.model';
import { generateWhiteButton } from '../Buttons/Buttons';
import { User } from '../../../Models/User.model';
import { createElement, createTextInput } from '../utils/utils';
import { sameDay, isUserAuthorizedToUseApi, getApiCredentialsForUser, prepareAPIData, prepareDataForTable, generateUniqueClassName } from './utils';
import tile from '../TileComponent/TileComponent';

export const identifierClasses = {
    mainContainer: '.my-diary-food',
    btnContainers: {
        btnAdd: 'button-container-add',
        btnFindCancel: 'button-container-find-cancel',
        btnFind: 'button-container-find',
        btnAddCancel: 'button-container-add-cancel',
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

    // temporary saving meals
    let meals: FoodDetails[] = [];
    const addMeals = (newMeal: FoodDetails) => meals = [...meals, newMeal];
    const resetMeals = () => meals = [];

    // building layout
    const container = createElement('div', 'my-diary-food');
    const header = createElement('h3', '', mealName);
    
    // creating first table (populated by local storage data)
    const mainTable = createTable(['Food', 'Qty', 'Unit', 'Calories']);
    mainTable.classList.add(generateUniqueClassName(mealName, identifierClasses.tables.main));
    const addNewRow = addRow(mainTable);
    populateMainTable(userName, mealName, showDate, addNewRow);

    // creating second table (results from api, before saving by user)
    const apiTable = createTable(['Food', 'Qty', 'Unit', 'Calories']);
    apiTable.classList.add(generateUniqueClassName(mealName, identifierClasses.tables.api));
    const addNewRowAPI = addRow(apiTable);
    const addNewRowAPIDetails = (meal: FoodDetails) => addNewRowAPI(prepareDataForTable(meal));

    // 1st btn container [ADD]
    const btnContainerAdd = createElement('div', ['button-container', generateUniqueClassName(mealName, identifierClasses.btnContainers.btnAdd)]);
    const btnAddFirst = generateWhiteButton('ADD', onClickFirstAdd(mealName));

    // 2nd btn container [FIND] [CANCEL]
    const btnContainerFindCancel = createElement('div', ['button-container', generateUniqueClassName(mealName, identifierClasses.btnContainers.btnFindCancel)]);
    const btnFind = generateWhiteButton('FIND', () => onClickFind(input.value, userData, [addNewRowAPIDetails, addMeals], mealName));
    const btnCancel = generateWhiteButton('CANCEL', onClickCancel(mealName, [resetMeals, resetTemporaryTable(mealName)]));
    btnContainerFindCancel.append(btnFind, btnCancel);

    // 3rd btn container [FIND]
    const btnContainerFind = createElement('div', ['button-container', generateUniqueClassName(mealName, identifierClasses.btnContainers.btnFind)]);
    const btnFindOnly = generateWhiteButton('FIND', () => onClickFind(input.value, userData, [addNewRowAPIDetails, addMeals], mealName));
    btnContainerFind.append(btnFindOnly);

    // 4th btn container [ADD] [CANCEL]
    const btnContainerAddCancel = createElement('div', ['button-container', generateUniqueClassName(mealName, identifierClasses.btnContainers.btnAddCancel)]);
    const btnAddSecond = generateWhiteButton('ADD', () => onClickAddMeal(userName, mealName, showDate, meals, addNewRow, [resetMeals, resetTemporaryTable(mealName)]));
    const btnCancelSecond = generateWhiteButton('CANCEL', onClickCancel(mealName, [resetMeals, resetTemporaryTable(mealName)]));
    btnContainerAddCancel.append(btnAddSecond, btnCancelSecond);

    // input for meal name
    const inputLabel = createElement('h2', '', 'Enter your meal');
    const input = createTextInput('ex. 2 bananas and 1 cup of milk', generateUniqueClassName(mealName, identifierClasses.input));

    // user logged in -> show button to add, not logged in -> show authorization message
    if (isUserAuthorizedToUseApi(userData)) {
        btnContainerAdd.append(btnAddFirst);
    } else {
        const authorizedFailed = createElement('p', 'failed-authorized');
        authorizedFailed.appendChild(document.createTextNode('Provide app key and app id to use this functionality.'));

        btnContainerAdd.append(authorizedFailed);
    }

    // bring whole layout together & hide elements not needed in the 1st view
    container.append(header, mainTable, btnContainerAdd, inputLabel, input, btnContainerFind, btnContainerFindCancel, apiTable, btnContainerAddCancel);
    hideElements(inputLabel, input, btnContainerFindCancel, apiTable, btnContainerAddCancel, btnContainerFind);

    return tile(container, 'tile-full-width');
}


function getMealDataFromUserData(userData: User, mealName: string, showDate: Date): FoodDetails[] {
    if (!userData || !userData.diaryFood) { return [];}
    
    const mealsOfTheDay = userData.diaryFood.find(food => sameDay(showDate, food.date));

    if (!mealsOfTheDay) { return [];}

    return mealsOfTheDay.meals[mealName] || [];
}

function populateMainTable(userName: string, mealName: string, showDate: Date, addNewRow: (rowData: string[]) => void) {
    const userData = readFromLocalStorage(userName);
    const mealsFromLocalStorage = getMealDataFromUserData(userData, mealName, showDate);

    const tableRows = document.querySelectorAll(`.${generateUniqueClassName(mealName, identifierClasses.tables.main)} tr:nth-child(n+2)`).forEach(e => e.parentNode.removeChild(e));
    mealsFromLocalStorage.forEach(meal => addNewRow(prepareDataForTable(meal)));
}

function resetTemporaryTable(mealName: string) {
    return function() {
        const tableRows = document.querySelectorAll(`.${generateUniqueClassName(mealName, identifierClasses.tables.api)} tr:nth-child(n+2)`).forEach(e => e.parentNode.removeChild(e));
    }
}

function onClickFirstAdd(mealName: string) {
    return function() {
        const {btnContainers, tables, input} = identifierClasses;

        hideElementsByClassNameWithSuffix(mealName, tables.main, btnContainers.btnAdd);
        showElementsByClassNameWithSuffix(mealName, input, btnContainers.btnFindCancel);
    }
}

function onClickCancel(mealName: string, onCancels: Array<() => void>) {
    return function() {
        const {btnContainers, tables, input} = identifierClasses;
        onCancels.forEach(onCancel => onCancel());
        hideElementsByClassNameWithSuffix(mealName, btnContainers.btnFindCancel, btnContainers.btnAddCancel, btnContainers.btnFind, tables.api, input);
        showElementsByClassNameWithSuffix(mealName, btnContainers.btnAdd, tables.main);
    }
}

function onClickAddMeal(
    userName: string, 
    mealName: string, 
    showDate: Date, 
    mealsToAdd: FoodDetails[], 
    addNewRow: (rowData: string[]) => void,
    onAdds: Array<() => void>
) {
    const {btnContainers, tables, input} = identifierClasses;

    hideElementsByClassNameWithSuffix(mealName, btnContainers.btnFindCancel, btnContainers.btnAddCancel, btnContainers.btnFind, tables.api, input);
    showElementsByClassNameWithSuffix(mealName, tables.main, btnContainers.btnAdd);
    addMealsToLocalStorage(userName, mealName, showDate, mealsToAdd);
    populateMainTable(userName, mealName, showDate, addNewRow);
    onAdds.forEach(onAdd => onAdd());
}

async function onClickFind(inputValue: string, userData: User, callbacks: Array<(data: FoodDetails) => void>, mealName: string) {
    const {btnContainers, tables, input} = identifierClasses;
    hideElementsByClassNameWithSuffix(mealName, btnContainers.btnFindCancel);
    showElementsByClassNameWithSuffix(mealName, input, btnContainers.btnFind, tables.api, btnContainers.btnAddCancel)
    const {appId, appKey} = getApiCredentialsForUser(userData);

    const foodDetails = await fetchFoodData(inputValue, appId, appKey);
    if (!foodDetails || !foodDetails.foods) return;

    foodDetails.foods.forEach(food => callbacks.forEach(callback => callback(prepareAPIData(food))));
}

function addMealsToLocalStorage(userName: string, mealName: string, showDate: Date, mealsToAdd: FoodDetails[]) {
    const currentState = readFromLocalStorage(userName);
    const currentDiaryFood = currentState.diaryFood || [];
    const currentDayMeals = currentDiaryFood.find(food => sameDay(showDate, food.date));

    let updatedDayMeals = {...currentDayMeals};
    const totalAddedKcal = mealsToAdd.reduce((prev, cur) => prev + cur.calories, 0);

    if (currentDayMeals) {
        let foodItems = currentDayMeals.meals[mealName] || [];
        foodItems = [...foodItems, ...mealsToAdd];
        let totalCalories = currentDayMeals.providedKcal || 0;
        updatedDayMeals.meals[mealName] = foodItems;
        updatedDayMeals.providedKcal = totalCalories + totalAddedKcal;
    } else {
        updatedDayMeals = {
            date: showDate,
            providedKcal: totalAddedKcal,
            meals: {
                [mealName]: mealsToAdd
            }
        }
    }

    const updatedUser: User = {
        ...currentState,
        diaryFood: [
            ...currentDiaryFood.filter(food => !sameDay(showDate, food.date)),
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

function hideElementsByClassNameWithSuffix(suffix: string, ...selectors: string[]) {
    hideElementsByClassName(...selectors.map(selector => generateUniqueClassName(suffix, selector)));
}

function showElementsByClassNameWithSuffix(suffix: string, ...selectors: string[]) {
    showElementsByClassName(...selectors.map(selector => generateUniqueClassName(suffix, selector)));
}

function hideElements(...elements: HTMLElement[]) {
    elements.forEach(el => el.style.display = 'none');
}

function showElements(...elements: HTMLElement[]) {
    elements.forEach(el => el.style.display = '');
}