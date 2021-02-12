import generateWeightTable from './GenerateWeightTable'
import { createElement, getLoggedInUser } from '../utils/utils';
import { User } from '../../../Models/User.model';
import { readFromLocalStorage } from '../../Logic/LocalStorage/LocalStorage';

export function myWeightsComponent(user: User):HTMLDivElement{
    const container = createElement('div', 'my-weights-container') as HTMLDivElement;
    const weightsTile = generateWeightTable(user.weights);

    container.append(weightsTile);
    return container;
}

export function refreshMyWeightsComponent(userObject) {
    for(let key in userObject.weights) {
        userObject.weights[key].date = new Date(userObject.weights[key].date);
    }
    const component = document.querySelector('.my-weights-container');
    if(component) {
        (component.parentNode).replaceChild(myWeightsComponent(userObject), component);
    }
}
