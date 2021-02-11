import dashboard from '../Src/UIComponents/Dashboard/Dashboard';
import { getByText } from '@testing-library/dom';

const username = 'User5';
const overview = document.createElement('div');
overview.innerHTML = "Overview";
const myDiaryFood = document.createElement('div');
myDiaryFood.innerHTML = "Food";
const myDiaryExercises = document.createElement('div');
myDiaryExercises.innerHTML = "Exercises";
const myGoals = document.createElement('div');
myGoals.innerHTML = "Goals";
const myWeights = document.createElement('div');
myWeights.innerHTML = "Weights";
const apiKey = document.createElement('div');
apiKey.innerHTML = "API Key";
const myProfile = document.createElement('div');
myProfile.innerHTML = "Profile";
const components = {
    'overview': overview, 
    'diary-food': myDiaryFood, 
    'diary-exercises': myDiaryExercises, 
    'goals': myGoals, 
    'weights': myWeights,
    'apiKey': apiKey,
    'profile': myProfile};
const testDashboard = dashboard(username, components);

const mainMenu = testDashboard.querySelector('.main-menu') as HTMLElement;
const overviewOpt = getByText(mainMenu, 'Overview');
const myDiaryOpt = getByText(mainMenu, 'My diary');
const myDiaryFoodOpt = getByText(mainMenu, 'Food');
const myDiaryExercisesOpt = getByText(mainMenu, 'Exercises');
const myGoalsOpt = getByText(mainMenu, 'My goals');
const myWeightsOpt = getByText(mainMenu, 'My weights');
const apiKeyOpt = getByText(mainMenu, 'API Key');
const logOutOpt = getByText(mainMenu, 'Log out');
const myProfileBtn = mainMenu.querySelector('.profile-btn') as HTMLElement;
const options = [overviewOpt, myDiaryOpt, myDiaryFoodOpt, myDiaryExercisesOpt, myGoalsOpt, myWeightsOpt, apiKeyOpt, logOutOpt, myProfileBtn];

const chosenView = testDashboard.lastElementChild as HTMLElement;
describe('Dashboard test', () => {

    test('returns div', () => {
        expect(testDashboard).toBeInstanceOf(HTMLDivElement);
    })

    describe('after create dashboard component display overview component', () => {
        test('', () => {
            expect(chosenView.innerHTML.includes('Overview')).toBe(true);
        })
        test('only active option is Overview', () => {
            options.forEach(opt => {
                if (opt === overviewOpt) expect(overviewOpt.classList).toContain('active');
                else expect(opt.classList).not.toContain('active');
            });
        })
        test('only displayed view is Overview', () => {
            Object.values(components).forEach(comp => {
                if (comp === overview) expect(overview.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
        })
    })

    describe('after click option "Overview" display overview component', () => {
        test('', () => {
            myWeightsOpt.click();
            overviewOpt.click();
            expect(chosenView.innerHTML.includes('Overview')).toBe(true);
        })
        test('only active option is Overview', () => {
            options.forEach(opt => {
                if (opt === overviewOpt) expect(overviewOpt.classList).toContain('active');
                else expect(opt.classList).not.toContain('active');
            });
        })
        test('only displayed view is Overview', () => {
            Object.values(components).forEach(comp => {
                if (comp === overview) expect(overview.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
        })
    })

    describe('after click option "My diary" display Food component', () => {        
        test('', () => {
            myDiaryOpt.click();
            expect(chosenView.innerHTML.includes('Food')).toBe(true);
        })
        test('only active option are My diary and Food', () => {
            options.forEach(opt => {
                if (opt === myDiaryOpt) expect(opt.classList).toContain('active');
                else expect(opt.classList).not.toContain('active');
            });
        })
        test('only displayed view is Food', () => {
            Object.values(components).forEach(comp => {
                if (comp === myDiaryFood) expect(comp.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
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
            expect(apiKeyOpt.classList).not.toContain('active');
            expect(logOutOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Food', () => {
            Object.values(components).forEach(comp => {
                if (comp === myDiaryFood) expect(comp.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
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
            expect(apiKeyOpt.classList).not.toContain('active');
            expect(logOutOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Exercises', () => {
            Object.values(components).forEach(comp => {
                if (comp === myDiaryExercises) expect(comp.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
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
            expect(apiKeyOpt.classList).not.toContain('active');
            expect(logOutOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is My goals', () => {
            Object.values(components).forEach(comp => {
                if (comp === myGoals) expect(comp.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
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
            expect(apiKeyOpt.classList).not.toContain('active');
            expect(logOutOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is My weights', () => {
            Object.values(components).forEach(comp => {
                if (comp === myWeights) expect(comp.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
        })
    })

    describe('after click option API Key display API Key component', () => {
        test('', () => {
            apiKeyOpt.click();
            expect(chosenView.innerHTML.includes('API Key')).toBe(true);
        })
        test('only active option is API Key', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).not.toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(apiKeyOpt.classList).toContain('active');
            expect(logOutOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is API Key', () => {
            Object.values(components).forEach(comp => {
                if (comp === apiKey) expect(comp.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
        })
    })

    describe('after click option LogOut display LogOut component', () => {
        test('', () => {
            logOutOpt.click();
            expect(chosenView.innerHTML.includes('Log Out')).toBe(true);
        })
        test('only active option is Log out', () => {
            expect(overviewOpt.classList).not.toContain('active');
            expect(myDiaryOpt.classList).not.toContain('active');
            expect(myDiaryFoodOpt.classList).not.toContain('active');
            expect(myDiaryExercisesOpt.classList).not.toContain('active');
            expect(myGoalsOpt.classList).not.toContain('active');
            expect(myWeightsOpt.classList).not.toContain('active');
            expect(apiKeyOpt.classList).not.toContain('active');
            expect(logOutOpt.classList).toContain('active');
            expect(myProfileBtn.classList).not.toContain('active');
        })
        test('only displayed view is Log out', () => {
            Object.values(components).forEach(comp => {
                if (comp === myDiaryFood) expect(comp.style.display).not.toBe('none');
                else expect(comp.style.display).toBe('none');
            });
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
            expect(apiKeyOpt.classList).not.toContain('active');
            expect(logOutOpt.classList).not.toContain('active');
            expect(myProfileBtn.classList).toContain('active');
        })
        test('only displayed view is My profile', () => {
            expect(overview.style.display).toBe('none');
            expect(myDiaryFood.style.display).toBe('none');
            expect(myDiaryExercises.style.display).toBe('none');
            expect(myGoals.style.display).toBe('none');
            expect(myWeights.style.display).toBe('none');
            expect(apiKey.style.display).toBe('none');
            expect(logOut.style.display).toBe('none');
            expect(myProfile.style.display).not.toBe('none');
        })
    })
})
