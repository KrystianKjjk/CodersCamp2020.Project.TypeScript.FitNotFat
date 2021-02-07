import { readFromLocalStorage, saveInLocalStorage } from '../../Logic/LocalStorage/LocalStorage';
import { createTable, addRow } from '../../UIComponents/ReusableTable/ReusableTable';
import { fetchFoodData } from '../../APIConnection/Food';
import { FoodDetails } from '../../../Models/FoodDetails.model';
import { generateWhiteButton } from '../Buttons/Buttons';
import { User } from '../../../Models/User.model';
import { createElement, createTextInput } from '../utils/utils';
import { sameDay, isUserAuthorizedToUseApi, getApiCredentialsForUser, prepareAPIData, prepareDataForTable } from './utils';
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
    mainTable.classList.add(identifierClasses.tables.main);
    const addNewRow = addRow(mainTable);
    populateMainTable(userName, mealName, showDate, addNewRow);

    // creating second table (results from api, before saving by user)
    const apiTable = createTable(['Food', 'Qty', 'Unit', 'Calories']);
    apiTable.classList.add(identifierClasses.tables.api);
    const addNewRowAPI = addRow(apiTable);
    const addNewRowAPIDetails = (meal: FoodDetails) => addNewRowAPI(prepareDataForTable(meal));

    // 1st btn container [ADD]
    const btnContainerAdd = createElement('div', ['button-container', identifierClasses.btnContainers.btnAdd]);
    const btnAddFirst = generateWhiteButton('ADD', onClickFirstAdd);

    // 2nd btn container [FIND] [CANCEL]
    const btnContainerFindCancel = createElement('div', ['button-container', identifierClasses.btnContainers.btnFindCancel]);
    const btnFind = generateWhiteButton('FIND', () => onClickFind(input.value, userData, [addNewRowAPIDetails, addMeals]));
    const btnCancel = generateWhiteButton('CANCEL', onClickCancel);
    btnContainerFindCancel.append(btnFind, btnCancel);

    // 3rd btn container [FIND]
    const btnContainerFind = createElement('div', ['button-container', identifierClasses.btnContainers.btnFind]);
    const btnFindOnly = generateWhiteButton('FIND', () => onClickFind(input.value, userData, [addNewRowAPIDetails, addMeals]));
    btnContainerFind.append(btnFindOnly);

    // 4th btn container [ADD] [CANCEL]
    const btnContainerAddCancel = createElement('div', ['button-container', identifierClasses.btnContainers.btnAddCancel]);
    const btnAddSecond = generateWhiteButton('ADD', () => onClickAddMeal(userName, mealName, showDate, meals, addNewRow));
    const btnCancelSecond = generateWhiteButton('CANCEL', onClickCancel);
    btnContainerAddCancel.append(btnAddSecond, btnCancelSecond);

    // input for meal name
    const inputLabel = createElement('h2', '', 'Enter your meal');
    const input = createTextInput('ex. 2 bananas and 1 cup of milk', identifierClasses.input);

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

    return tile(container);
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

    const tableRows = document.querySelectorAll(`.${identifierClasses.tables.main} tr:nth-child(n+2)`).forEach(e => e.parentNode.removeChild(e));
    mealsFromLocalStorage.forEach(meal => addNewRow(prepareDataForTable(meal)));
}

function onClickFirstAdd() {
    const {btnContainers, tables, input} = identifierClasses;

    hideElementsByClassName(tables.main, btnContainers.btnAdd);
    showElementsByClassName(input, btnContainers.btnFindCancel)
}

function onClickCancel() {
    const {btnContainers, tables, input} = identifierClasses;
    window.location.reload();
    
    hideElementsByClassName(btnContainers.btnFindCancel, btnContainers.btnAddCancel, btnContainers.btnFind, tables.api, input);
    showElementsByClassName(btnContainers.btnAdd, tables.main);
}

function onClickAddMeal(
    userName: string, 
    mealName: string, 
    showDate: Date, 
    mealsToAdd: FoodDetails[], 
    addNewRow: (rowData: string[]) => void
) {
    const {btnContainers, tables, input} = identifierClasses;

    hideElementsByClassName(btnContainers.btnFindCancel, btnContainers.btnAddCancel, btnContainers.btnFind, tables.api, input);
    showElementsByClassName(tables.main, btnContainers.btnAdd);
    addMealsToLocalStorage(userName, mealName, showDate, mealsToAdd);
    populateMainTable(userName, mealName, showDate, addNewRow);
}

async function onClickFind(inputValue: string, userData: User, callbacks: Array<(data: FoodDetails) => void>) {
    const {btnContainers, tables, input} = identifierClasses;
    hideElementsByClassName(btnContainers.btnFindCancel);
    showElementsByClassName(input, btnContainers.btnFind, tables.api, btnContainers.btnAddCancel)
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

function hideElements(...elements: HTMLElement[]) {
    elements.forEach(el => el.style.display = 'none');
}

function showElements(...elements: HTMLElement[]) {
    elements.forEach(el => el.style.display = '');
}