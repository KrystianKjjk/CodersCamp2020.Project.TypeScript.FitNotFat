import dashboard from '../Src/UIComponents/Dashboard/Dashboard';
import { getByText } from '@testing-library/dom';

let overview = document.createElement('div');
overview.innerHTML = "Overview";
let myDiaryFood = document.createElement('div');
myDiaryFood.innerHTML = "Food";
let myDiaryExercises = document.createElement('div');
myDiaryExercises.innerHTML = "Exercises";
let myGoals = document.createElement('div');
myGoals.innerHTML = "Goals";
let myWeights = document.createElement('div');
myWeights.innerHTML = "Weights";
let myProfile = document.createElement('div');
myProfile.innerHTML = "Profile";

let testDashboard = dashboard({
    'overview': overview, 
    'diary-food': myDiaryFood, 
    'diary-exercises': myDiaryExercises, 
    'goals': myGoals, 
    'weights': myWeights, 
    'profile': myProfile});
let mainMenu = testDashboard.querySelector('.main-menu') as HTMLElement;
let overviewOpt = getByText(mainMenu, 'Overview');
let myDiaryOpt = getByText(mainMenu, 'My diary');
let myDiaryFoodOpt = getByText(mainMenu, 'Food');
let myDiaryExercisesOpt = getByText(mainMenu, 'Exercises');
let myGoalsOpt = getByText(mainMenu, 'My goals');
let myWeightsOpt = getByText(mainMenu, 'My weights');
let myProfileBtn = mainMenu.querySelector('.profile-btn') as HTMLElement;

let chosenView = testDashboard.lastElementChild as HTMLElement;
describe('Dashboard test', () => {

    test('returns div', () => {
        expect(testDashboard).toBeInstanceOf(HTMLDivElement);
    })

    describe('after create dashboard component display overview component', () => {
        test('', () => {
            expect(chosenView.innerHTML.includes('Overview')).toBe(true);
        })
        test('only active option is Overview', () => {
            expect(overviewOpt.classList).toContain('active');
            expect(myDiaryOpt.classList).not.toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Overview', () => {
            expect(overview.style.display).not.toBe('none');
            expect(myDiaryFood.style.display).toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(myProfile.style.display).toBe('none');
        })
    })

    describe('after click option "Overview" display overview component', () => {
        test('', () => {
            myWeightsOpt.click();
            overviewOpt.click();
            expect(chosenView.innerHTML.includes('Overview')).toBe(true);
        })
        test('only active option is Overview', () => {
            expect(overviewOpt.classList).toContain('active');
            expect(myDiaryOpt.classList).not.toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Overview', () => {
            expect(overview.style.display).not.toBe('none');
            expect(myDiaryFood.style.display).toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(myProfile.style.display).toBe('none');
        })
    })

    describe('after click option "My diary" display Food component', () => {        
        test('', () => {
            myDiaryOpt.click();
            expect(chosenView.innerHTML.includes('Food')).toBe(true);
        })
        test('only active option are My diary and Food', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).toContain('active');
            expect(myDiaryFoodOpt.classList).toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Food', () => {
            expect(overview.style.display).toBe('none');
            expect(myDiaryFood.style.display).not.toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(myProfile.style.display).toBe('none');
        })
    })

    describe('after click option "Food" display Food component', () => {        
        test('', () => {
            myDiaryOpt.click();
            myDiaryFoodOpt.click();
            expect(chosenView.innerHTML.includes('Food')).toBe(true);
        })
        test('only active option are My diary and Food', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).toContain('active');
            expect(myDiaryFoodOpt.classList).toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Food', () => {
            expect(overview.style.display).toBe('none');
            expect(myDiaryFood.style.display).not.toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(myProfile.style.display).toBe('none');
        })
    })

    describe('after click option "Exercises" display Exercises component', () => {        
        test('', () => {
            myDiaryOpt.click();
            myDiaryExercisesOpt.click();
            expect(chosenView.innerHTML.includes('Exercises')).toBe(true);
        })
        test('only active option are My diary and Exercises', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Exercises', () => {
            expect(overview.style.display).toBe('none');
            expect(myDiaryFood.style.display).toBe('none');
            expect(myDiaryExercises.style.display).not.toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(myProfile.style.display).toBe('none');
        })
    })

    describe('after click option "My goals" display My goals component', () => {        
        test('', () => {
            myGoalsOpt.click();
            expect(chosenView.innerHTML.includes('Goals')).toBe(true);
        })
        test('only active option is My goals', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).not.toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is My goals', () => {
            expect(overview.style.display).toBe('none');
            expect(myDiaryFood.style.display).toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).not.toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(myProfile.style.display).toBe('none');
        })
    })

    describe('after click option "My weights" display My weights component', () => {        
        test('', () => {
            myWeightsOpt.click();
            expect(chosenView.innerHTML.includes('Weights')).toBe(true);
        })
        test('only active option is My weights', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).not.toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is My weights', () => {
            expect(overview.style.display).toBe('none');
            expect(myDiaryFood.style.display).toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).not.toBe('none');
            expect(myProfile.style.display).toBe('none');
        })
    })

    describe('after click option "My profile" button display My profile component', () => {        
        test('', () => {
            myProfileBtn.click();
            expect(chosenView.innerHTML.includes('Profile')).toBe(true);
        })
        test('only active is My profile button', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).not.toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).toContain('active');
        })
        test('only displayed view is My profile', () => {
            expect(overview.style.display).toBe('none');
            expect(myDiaryFood.style.display).toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(myProfile.style.display).not.toBe('none');
        })
    })
})