import generateWeightTable from './GenerateWeightTable'
import { createElement } from '../utils/utils';
import { User } from '../../../Models/User.model';

export default function myWeightsComponent(user:User):HTMLDivElement{
    const container = createElement('div', 'my-weights-container') as HTMLDivElement;
    const weightsTile = generateWeightTable(user.weights);

    container.append(weightsTile);
    return container;
}

