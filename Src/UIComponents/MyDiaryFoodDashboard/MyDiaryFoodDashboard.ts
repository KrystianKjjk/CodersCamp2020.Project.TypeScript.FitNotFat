import createMealDiary from '../../../Src/UIComponents/MyDiaryFood/MyDiaryFood';
import { createDatePicker } from '../../../Src/UIComponents/MyDiaryDate/MyDiaryDate';
import { createElement, getLoggedInUser } from '../../../Src/UIComponents/utils/utils';


function createMyDiaryFoodDashboard() {
    const mealsContainer = createElement('div', 'myfood-meals-container');
    const container = createElement('div', 'myfood-container');
    const today = new Date(); // initialize with today

    const datePicker = createDatePicker(today, newDate => handleDateChange(newDate, mealsContainer));
    const dateContainer = createElement('div', 'myfood-time');
    dateContainer.appendChild(datePicker);
    container.append(dateContainer, mealsContainer);

    const diaries = renderMealDiariesForDate(today); // render for the 1st time
    mealsContainer.append(...diaries);
    
    return container;
};

function renderMealDiariesForDate (date: Date) {
    const userName = getLoggedInUser();

    return ['breakfast', 'lunch', 'dinner', 'snacks'].map(mealName => {
        const mealDiary = createMealDiary(userName, mealName, date);
        const mealContainer = createElement('div', `myfood-${mealName}`);
        mealContainer.appendChild(mealDiary);

        return mealContainer;
    })
};

function handleDateChange (date: Date, containerToUpdate: HTMLElement) {
    containerToUpdate.innerHTML = '';
    containerToUpdate.append(...renderMealDiariesForDate(date));
}

export {createMyDiaryFoodDashboard}