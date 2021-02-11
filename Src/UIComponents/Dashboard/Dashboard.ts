import {overviewSVG, myDiarySVG, myGoalsSVG, myWeightsSVG, userSVG, apiKeySVG, logOutSVG, arrowSVG} from './Icons';
import {createElement, clearLoggedInUser} from '../utils/utils';

function dashboard(username: string, components: {'overview': HTMLElement, 
                                'diary-food': HTMLElement, 
                                'diary-exercises': HTMLElement, 
                                'goals': HTMLElement, 
                                'weights': HTMLElement,
                                'apiKey': HTMLElement,
                                'profile': HTMLElement}): HTMLDivElement {
    const myDashboard = createElement('div', ['dashboard']) as HTMLDivElement;
    myDashboard.appendChild(createElement('div', ['ellipse1']));
    myDashboard.appendChild(createElement('div', ['ellipse2']));
    
    const mainMenu = createElement('div', ['main-menu'])
    mainMenu.appendChild(createElement('div', ['vertical-line']))
    const logo = createElement('div', ['logo'], '<span>Fit</span>NotFat');
    const overview = createElement('div', ['menu-option', 'active'], `${overviewSVG} Overview`, 'overview');
    const myDiary = createElement('div', ['menu-option'], `${myDiarySVG} My diary`, 'diary-food');
    const myDiarySubmenu = createElement('ul', ['my-diary-submenu']);
    const myDiaryFood = createElement('li', ['submenu-option'], `Food`, 'diary-food');
    const myDiaryExercises = createElement('li', ['submenu-option'], `Exercises`, 'diary-exercises');
    const myGoals = createElement('div', ['menu-option'], `${myGoalsSVG} My goals`, 'goals');
    const myWeights = createElement('div', ['menu-option'], `${myWeightsSVG} My weights`, 'weights');
    const apiKey = createElement('div', ['menu-option'], `${apiKeySVG} API Key`, 'apiKey');
    const logOut = createElement('div', ['menu-option'], `${logOutSVG} Log out`);
    logOut.addEventListener('click', e => {
        clearLoggedInUser();
        location.reload();
    })
    const profileBtn = createElement('button', ['profile-btn'], `${userSVG} ${username} ${arrowSVG}`, 'profile');
    const options = [overview, myDiary, myDiaryFood, myDiaryExercises, myGoals, myWeights, apiKey, profileBtn];

    options.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            element.parentElement.querySelectorAll(".active").forEach((elem) => elem.classList.remove('active'));
            element.classList.add('active');
            const suboption = element.querySelector('li');
            if(suboption) suboption.classList.add('active');
            Object.values(components).forEach((element => {
                element.style.display = 'none';
            }));
            components[element.getAttribute('data-component')].style.display = "block";
        });
        components[element.getAttribute('data-component')].style.display = "none";
    });
    
    components['overview'].style.display = "block";
    myDiarySubmenu.append(myDiaryFood, myDiaryExercises);
    myDiary.appendChild(myDiarySubmenu);
    mainMenu.append(logo, overview, myDiary, myGoals, myWeights, apiKey, logOut, profileBtn);
    myDashboard.appendChild(mainMenu);

    const dashboardView = document.createElement('div');
    dashboardView.append(...Object.values(components));
    myDashboard.appendChild(dashboardView)
    return myDashboard;
}

export default dashboard;
