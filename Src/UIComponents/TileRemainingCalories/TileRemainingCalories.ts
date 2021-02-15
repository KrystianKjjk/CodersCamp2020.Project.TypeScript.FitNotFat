import { createElement } from '../utils/utils';
import { createTable, addRow } from "../ReusableTable/ReusableTable";

const HEADERS = ['GOAL', '', 'EXERCISES', '', 'FOOD'];

export interface RemainingCalories {
    remaining: number,
    goal: number,
    exercises: number,
    food: number
}

export function createTileRemainingCalories(calories: RemainingCalories): HTMLElement {

    const containerRemCal = createElement('div', 'remaining-calories-tile');
    const header = createElement('header', 'remaining-calories-tile__header', 'REMAINING CALORIES');
    const numberRemCal = createElement('p', 'remaining-calories-tile__number');
    const detailsRemCal = createElement('section','remaining-calories-tile__section-details');

    numberRemCal.innerHTML = `${+calories.remaining.toFixed()} <span>kcal</span>`

    const detailsTable = createTable(HEADERS);
    detailsTable.classList.add('remaining-calories-tile__section-details--table');
    const detailsTableRow= addRow(detailsTable);
    detailsTableRow([calories.goal.toString(10),'+', calories.exercises.toFixed(),'-', calories.food.toFixed()]);

    detailsRemCal.append(detailsTable);

    containerRemCal.append(header, numberRemCal, detailsRemCal);

    return containerRemCal;
}
