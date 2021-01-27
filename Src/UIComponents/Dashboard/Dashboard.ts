import {overviewSVG, myDiarySVG, myGoalsSVG, myWeightsSVG, userSVG, arrowSVG} from './Icons';

function createStyledElement(tagName: string, classNames: string[], innerHTML?: string, dataComponent?: string): HTMLElement {
    let element = document.createElement(tagName);
    element.classList.add(...classNames);
    if(innerHTML) element.innerHTML = innerHTML;
    if(dataComponent) element.setAttribute('data-component', dataComponent);
    return element;
}

function dashboard(components: {'overview': HTMLElement, 
                                'diary-food': HTMLElement, 
                                'diary-exercises': HTMLElement, 
                                'goals': HTMLElement, 
                                'weights': HTMLElement, 
                                'profile': HTMLElement}): HTMLDivElement {
    let myDashboard = createStyledElement('div', ['dashboard']) as HTMLDivElement;
    myDashboard.appendChild(createStyledElement('div', ['ellipse1']));
    myDashboard.appendChild(createStyledElement('div', ['ellipse2']));
    
    let mainMenu = createStyledElement('div', ['main-menu'])
    mainMenu.appendChild(createStyledElement('div', ['vertical-line']))
    let logo = createStyledElement('div', ['logo'], '<span>Fit</span>NotFat');
    let menuList = createStyledElement('ul', ['menu']);
    let overview = createStyledElement('li', ['menu-option', 'active'], `${overviewSVG} Overview`, 'overview');
    let myDiary = createStyledElement('li', ['menu-option'], `${myDiarySVG} My diary`, 'diary-food');
    let myDiarySubmenu = createStyledElement('ul', ['my-diary-submenu']);
    let myDiaryFood = createStyledElement('li', ['submenu-option'], `Food`, 'diary-food');
    let myDiaryExercises = createStyledElement('li', ['submenu-option'], `Exercises`, 'diary-exercises');
    let myGoals = createStyledElement('li', ['menu-option'], `${myGoalsSVG} My goals`, 'goals');
    let myWeights = createStyledElement('li', ['menu-option'], `${myWeightsSVG} My weights`, 'weights');
    let profileBtn = createStyledElement('button', ['profile-btn'], `${userSVG} Username ${arrowSVG}`, 'profile');

    [overview, myGoals, myDiary, myDiaryFood, myDiaryExercises, myWeights, profileBtn].forEach((element) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            element.parentElement.querySelectorAll(".active").forEach((elem) => elem.classList.remove('active'));
            element.classList.add('active');
            element.querySelector('li').classList.add('active');
        });
    });

    [overview, myDiary, myDiaryFood, myDiaryExercises, myGoals, myWeights, profileBtn].forEach((element) => {
        element.addEventListener('click', (e) => {
            Object.values(components).forEach((element => {
                element.style.display = 'none';
                myDashboard.appendChild(element);
            }));
            components[element.getAttribute('data-component')].style.display = "initial";
        })
    });
    
    myDiarySubmenu.append(myDiaryFood, myDiaryExercises);
    myDiary.appendChild(myDiarySubmenu);
    menuList.append(overview, myDiary, myGoals, myWeights);
    mainMenu.append(logo, menuList, profileBtn);
    myDashboard.appendChild(mainMenu);
    Object.values(components).forEach((element => {
        element.style.display = 'none';
        myDashboard.appendChild(element);
    }))
    components['overview'].style.display = "initial";
    return myDashboard;
}

export default dashboard;