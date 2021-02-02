import generateWeightTable from './GenerateWeightTable'
import { createElement } from '../utils/utils';
import { User } from '../../../Models/User.model';

export default function myWeightsComponent(user:User):HTMLDivElement{
    const container = createElement('div', 'my-weights-container') as HTMLDivElement;
    const weightsTile = generateWeightTable(user.weights);
    const header = createElement('div', 'myweights-header');
    const headerText = document.createTextNode('My weights');

    header.append(headerText);

    container.append(header, weightsTile);
    return container;
}

