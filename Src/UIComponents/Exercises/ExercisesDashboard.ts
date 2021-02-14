import {createDatePicker} from '../MyDiaryDate/MyDiaryDate'
import createExercisesDiary from './Exercises'
import { createElement, getLoggedInUser } from '../../../Src/UIComponents/utils/utils';

function createMyDiaryExercisesDashboard():HTMLElement {
    const container = createElement('div', 'exercises-container');
    const exercisesContainer = createElement('div', 'exercises');
    const today = new Date();
    const datePicker = createDatePicker(today, newDate => handleDateChange(newDate, exercisesContainer));
    
    const dateContainer = createElement('div', 'exercises-time');
    dateContainer.appendChild(datePicker);
    container.append(dateContainer, exercisesContainer);

    const diary = renderExercisesForDate(today); // render for the 1st time
    exercisesContainer.append(diary);    
    return container;
};

function renderExercisesForDate (date: Date) {
    const userName = getLoggedInUser();   
    const exercisesDiary = createExercisesDiary(userName, 'exercise', date);
    return exercisesDiary;    
};

function handleDateChange (date: Date, containerToUpdate: HTMLElement) {
    containerToUpdate.innerHTML = '';
    containerToUpdate.append(renderExercisesForDate(date));
}

export { createMyDiaryExercisesDashboard }