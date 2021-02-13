import dashboard from '../Src/UIComponents/Dashboard/Dashboard';
import { getByText } from '@testing-library/dom';
import { getLoggedInUser, setLoggedInUser, createElement } from '../Src/UIComponents/utils/utils';

const username = 'User5';
setLoggedInUser(username);
const overview = createElement('div', [], "Overview");
const myDiaryFood = createElement('div', [], "Food");
const myDiaryExercises = createElement('div', [], "Exercises");
const myGoals = createElement('div', [], "Goals");
const myWeights = createElement('div', [], "Weights");
const apiKey = createElement('div', [], "API Key");
const myProfile = createElement('div', [], "Profile");
const components = {
    'overview': overview, 
    'diary-food': myDiaryFood, 
    'diary-exercises': myDiaryExercises, 
    'goals': myGoals, 
    'weights': myWeights,
    'apiKey': apiKey,
    'profile': myProfile};
const testDashboard = dashboard(username, components);

const mainMenu = testDashboard.querySelector('.menu') as HTMLElement;
const overviewOpt = getByText(mainMenu, 'Overview');
const myDiaryOpt = getByText(mainMenu, 'My diary');
const myDiaryFoodOpt = getByText(mainMenu, 'Food');
const myDiaryExercisesOpt = getByText(mainMenu, 'Exercises');
const myGoalsOpt = getByText(mainMenu, 'My goals');
const myWeightsOpt = getByText(mainMenu, 'My weights');
const apiKeyOpt = getByText(mainMenu, 'API Key');
const logOutOpt = getByText(mainMenu, 'Log out');
const myProfileBtn = mainMenu.querySelector('.profile-btn') as HTMLElement;
const testedOptions = [overviewOpt, myDiaryOpt, myDiaryFoodOpt, myDiaryExercisesOpt, myGoalsOpt, myWeightsOpt, apiKeyOpt, myProfileBtn];

const chosenView = testDashboard.lastElementChild as HTMLElement;
let viewName: string;
let view: HTMLDivElement;
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
        })
        test('only displayed view is Overview', () => {
            const displayed = Object.values(components)
                .filter(comp => comp.style.display !== 'none');
            expect(displayed).toHaveLength(1);
            expect(displayed[0]).toBe(overview);
        })
    })

    testedOptions.forEach(opt => {
        describe(`after click option "${opt.textContent.trim()}" display ${viewName} component`, () => {
            beforeEach(() => {
                viewName = opt.getAttribute('data-component');
                view = components[viewName];
                myDiaryOpt.click();
                opt.click();
            })
            test('', () => {
                expect(chosenView.innerHTML.includes(`${view.innerHTML}`)).toBe(true);
            })
            test(`only active option is "${opt.textContent.trim()}"`, () => {
                expect(opt.classList).toContain('active');
            })
            test(`only displayed view is ${viewName}`, () => {
                const displayed = Object.values(components)
                    .filter(comp => comp.style.display !== 'none');
                expect(displayed).toHaveLength(1);
                expect(displayed[0]).toBe(view);
            })
        })
    })

    test('log out after click "Log out" option', () => {
        expect(getLoggedInUser()).toBe(username);
        logOutOpt.click();
        expect(getLoggedInUser()).toBe('');
    })

    test('menu button tests', () => {
        const menuBtn = testDashboard.querySelector('.menu-btn') as HTMLButtonElement;
        menuBtn.click();
        expect(mainMenu.style.display).toBe('flex');
        menuBtn.click();
        expect(mainMenu.style.display).toBe('none');
    })
})
