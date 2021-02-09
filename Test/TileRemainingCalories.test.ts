import { createTileRemainingCalories, RemainingCalories } from "../Src/UIComponents/TileRemainingCalories/TileRemainingCalories";

describe('Tests of remaining calories component', ()=>{
    let component: HTMLElement;
    let calories: RemainingCalories;

    beforeEach(()=>{
        calories = { remaining: 2500, goal: 2500, exercises: 1000, food: 1000 }
        component = createTileRemainingCalories(calories);
    })
    test('return HTML elements', ()=>{
        expect(component).toBeInstanceOf(HTMLElement);
    })
    test('contains header', () => {
        expect(component.querySelector('.remaining-calories-tile__header')).not.toBeNull();
    })
    test('contains number', () => {
        expect(component.querySelector('.remaining-calories-tile__number')).not.toBeNull();
    })
    test('contains details', () => {
        expect(component.querySelector('.remaining-calories-tile__section-details')).not.toBeNull();
    })
    test('contains modified table', () => {
        expect(component.querySelector('.remaining-calories-tile__section-details--table')).not.toBeNull();
    })
    test('remaining calories in line with object data', () => {
        expect(component.querySelector('.remaining-calories-tile__number').innerHTML).toBe(`${calories.remaining} <span>kcal</span>`)
    })
    test('goal, exercises, food calories in line with object data', () => {
        const pattern: string[] = [`${calories.goal}`,'+',`${calories.exercises}`, '-', `${calories.food}`];
        const nodeListRows = component.querySelectorAll('.remaining-calories-tile__section-details--table tr td');
        expect(nodeListRows[0].textContent).toEqual(pattern[0]);
        expect(nodeListRows[2].textContent).toEqual(pattern[2]);
        expect(nodeListRows[4].textContent).toEqual(pattern[4]);

    })

})
