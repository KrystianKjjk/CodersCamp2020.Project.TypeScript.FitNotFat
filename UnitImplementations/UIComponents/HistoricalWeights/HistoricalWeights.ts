import {createTable, addRow} from '../../../Src/UIComponents/ReusableTable/ReusableTable';
import generateTileComponent from '../../../Src/UIComponents/TileComponent/TileComponent';

const headers = ['Date', 'Weight'];
const historicalWeights = createTable(headers);

const container = document.createElement('div');
container.className = 'tile-container';

const title = document.createElement('p');
const titleContent = document.createTextNode('Historical Weights');
title.appendChild(titleContent);
title.className = 'tile-title';

container.appendChild(title);
container.appendChild(historicalWeights);

document.body.appendChild(generateTileComponent(container));
const addRowToHistoricalWeights = addRow(historicalWeights);

addRowToHistoricalWeights(['01/01/2021', '70kg']);
addRowToHistoricalWeights(['03/01/2021', '71kg']);
addRowToHistoricalWeights(['05/01/2021', '75kg']);
addRowToHistoricalWeights(['06/01/2021', '79kg']);
addRowToHistoricalWeights(['08/01/2021', '80kg']);
addRowToHistoricalWeights(['11/01/2021', '100kg']);