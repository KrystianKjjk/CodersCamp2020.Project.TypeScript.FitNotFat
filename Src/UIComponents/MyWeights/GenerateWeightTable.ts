import {createTable, addRow} from '../ReusableTable/ReusableTable';
import generateTileComponent from '../TileComponent/TileComponent';
import { Weight } from '../../../Models/Weight.model';
import { createElement } from '../utils/utils';
import * as moment from 'moment';

export default function generateWeightTable(weightTable:Weight[]):HTMLDivElement {
    //check if the table is not empty
    if(!weightTable || weightTable.length === 0){
        const emptyWeightsArrayMessage = createElement('div', 'empty-weights-error');        
        const titleContent = document.createTextNode('No weights to be displayed :(');
        emptyWeightsArrayMessage.append(titleContent);
        const tile = generateTileComponent(emptyWeightsArrayMessage);

        return tile;        
    }

    //if table not empty - generate the tile content
    const headers = ['Date', 'Weight'];
    const historicalWeights = createTable(headers);
    const tableContainer = createElement('div', 'weights-table');
    
    const container = createElement('div', 'tile-container') as HTMLDivElement;
    
    const title = createElement('p', 'tile-title');
    const titleContent = document.createTextNode('Historical Weights');
    title.appendChild(titleContent);
    
    tableContainer.append(historicalWeights);
    container.append(title,tableContainer);

    const addRowToHistoricalWeights = addRow(historicalWeights);   

    weightTable.forEach(e => {
        addRowToHistoricalWeights([e.date.toLocaleDateString('en-GB'), `${e.weight}kg`]);
    })

    const tile = generateTileComponent(container);

    return tile;
}


