import { readFromLocalStorage, saveInLocalStorage } from '../../Logic/LocalStorage/LocalStorage';
import { createTable, addRow } from '../../UIComponents/ReusableTable/ReusableTable';
import { fetchExercisesData } from '../../APIConnection/Exercises';
import { ExercisesDetails } from '../../../Models/ExercisesDetails.model';
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

export default function createExercisesDiary(userName: string, exerciseName: string, showDate: Date) {
    // from local storage
    const userData = readFromLocalStorage(userName);

    // temporary saving exercises
    let exercises: ExercisesDetails[] = [];
    const addExercises = (newExercise: ExercisesDetails) => exercises = [...exercises, newExercise];
    const resetExercises = () => exercises = [];


    // building layout
    const container = createElement('div', 'my-diary-food');
    const header = createElement('h3', '', exerciseName);
    
    // creating first table (populated by local storage data)
    const mainTable = createTable(['Exercise', 'Met', 'Duration', 'Calories']);
    mainTable.classList.add(identifierClasses.tables.main);
    const addNewRow = addRow(mainTable);
    populateMainTable(userName, exerciseName, showDate, addNewRow);

    // creating second table (results from api, before saving by user)
    const apiTable = createTable(['Exercise', 'Met', 'Duration', 'Calories']);
    apiTable.classList.add(identifierClasses.tables.api);
    const addNewRowAPI = addRow(apiTable);
    const addNewRowAPIDetails = (exercise: ExercisesDetails) => addNewRowAPI(prepareDataForTable(exercise));

    // 1st btn container [ADD]
    const btnContainerAdd = createElement('div', ['button-container', identifierClasses.btnContainers.btnAdd]);
    const btnAddFirst = generateWhiteButton('ADD', onClickFirstAdd);

    // 2nd btn container [FIND] [CANCEL]
    const btnContainerFindCancel = createElement('div', ['button-container', identifierClasses.btnContainers.btnFindCancel]);
    const btnFind = generateWhiteButton('FIND', () => onClickFind(input.value, userData, [resetExercises, addNewRowAPIDetails, addExercises]));
    const btnCancel = generateWhiteButton('CANCEL', onClickCancel);
    btnContainerFindCancel.append(btnFind, btnCancel);

    // 3rd btn container [FIND]
    const btnContainerFind = createElement('div', ['button-container', identifierClasses.btnContainers.btnFind]);
    const btnFindOnly = generateWhiteButton('FIND', () => onClickFind(input.value, userData, [addNewRowAPIDetails, addExercises]));
    btnContainerFind.append(btnFindOnly);
    
    // 4th btn container [ADD] [CANCEL]
    const btnContainerAddCancel = createElement('div', ['button-container', identifierClasses.btnContainers.btnAddCancel]);
    const btnAddSecond = generateWhiteButton('ADD', () => onClickAddExercise(userName, exerciseName, showDate, exercises, addNewRow));
    
    const btnCancelSecond = generateWhiteButton('CANCEL', onClickCancel);
    btnContainerAddCancel.append(btnAddSecond, btnCancelSecond);

    // input for exercise name
    const inputLabel = createElement('h2', '', 'Enter your exercise');
    const input = createTextInput('ex. run 5 miles, 30 min weightlifting', identifierClasses.input);

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


function getExercisesDataFromUserData(userData: User, exerciseName: string, showDate: Date): ExercisesDetails[] {
    if (!userData || !userData.diaryExercises) { return [];}
    
    const exercisesOfTheDay = userData.diaryExercises.find(exercises => sameDay(showDate, exercises.date));

    if (!exercisesOfTheDay) { return [];}

    return exercisesOfTheDay.exercises[exerciseName] || [];
}

function populateMainTable(userName: string, exerciseName: string, showDate: Date, addNewRow: (rowData: string[]) => void) {
    const userData = readFromLocalStorage(userName);
    const exercisesFromLocalStorage = getExercisesDataFromUserData(userData, exerciseName, showDate);

    const tableRows = document.querySelectorAll(`.${identifierClasses.tables.main} tr:nth-child(n+2)`).forEach(e => e.parentNode.removeChild(e));
    exercisesFromLocalStorage.forEach(exercise => addNewRow(prepareDataForTable(exercise)));
}

function onClickFirstAdd() {
    const {btnContainers, tables, input} = identifierClasses;

    hideElementsByClassName(tables.main, btnContainers.btnAdd);
    showElementsByClassName(input, btnContainers.btnFindCancel);
}

function onClickCancel() {
    const {btnContainers, tables, input} = identifierClasses;
    window.location.reload();
    
    hideElementsByClassName(btnContainers.btnFindCancel, btnContainers.btnAddCancel, btnContainers.btnFind, tables.api, input);
    showElementsByClassName(btnContainers.btnAdd, tables.main);
}

function onClickAddExercise(
    userName: string, 
    exerciseName: string, 
    showDate: Date, 
    exercisesToAdd: ExercisesDetails[], 
    addNewRow: (rowData: string[]) => void) {

    const {btnContainers, tables, input} = identifierClasses;
    

    hideElementsByClassName(btnContainers.btnFindCancel, btnContainers.btnAddCancel, btnContainers.btnFind, tables.api, input);
    showElementsByClassName(tables.main, btnContainers.btnAdd);
    addExercisesToLocalStorage(userName, exerciseName, showDate, exercisesToAdd);
    populateMainTable(userName, exerciseName, showDate, addNewRow);  
}

async function onClickFind(inputValue: string, userData: User, callbacks: Array<(data: ExercisesDetails) => void>) {
    const {btnContainers, tables, input} = identifierClasses;
    hideElementsByClassName(btnContainers.btnFindCancel);
    showElementsByClassName(input, btnContainers.btnFind, tables.api, btnContainers.btnAddCancel)
    const {appId, appKey} = getApiCredentialsForUser(userData);


    const exercisesDetails = await fetchExercisesData(userData, inputValue, appId, appKey);
    if (!exercisesDetails || !exercisesDetails.exercises) return;

    exercisesDetails.exercises.forEach(exercise => callbacks.forEach(callback => callback(prepareAPIData(exercise))));
}

function addExercisesToLocalStorage(userName: string, exerciseName: string, showDate: Date, exercisesToAdd: ExercisesDetails[]) {
    const currentState = readFromLocalStorage(userName);
    const currentDiaryExercise = currentState.diaryExercises || [];
    const currentDayExercises = currentDiaryExercise.find(exercise => sameDay(showDate, exercise.date));
    let updatedDayExercises = {...currentDayExercises};

    console.log(currentDayExercises?.totalCalories);
    
    if (currentDayExercises) {
        let exerciseItems = currentDayExercises.exercises[exerciseName] || [];
        exerciseItems = [...exerciseItems, ...exercisesToAdd];
        updatedDayExercises.exercises[exerciseName] = exerciseItems;
        updatedDayExercises.totalCalories = exercisesToAdd.reduce(function(acc, val) { return acc + val.calories }, currentDayExercises.totalCalories)
    } else {
        updatedDayExercises = {
            date: showDate,
            totalCalories: exercisesToAdd.reduce(function(acc, val) { return acc + val.calories }, 0),
            exercises: {
                [exerciseName]: exercisesToAdd
            }
        }
    }

    const updatedUser: User = {
        ...currentState,
        diaryExercises: [
            ...currentDiaryExercise.filter(exercises => !sameDay(showDate, exercises.date)),
            updatedDayExercises
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