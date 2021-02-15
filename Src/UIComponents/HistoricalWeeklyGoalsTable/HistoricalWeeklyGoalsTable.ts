import { createTable, addRow } from '../ReusableTable/ReusableTable';
import generateTileComponent from '../TileComponent/TileComponent';
import { Goal } from '../../../Models/Goal.model';
import { createElement } from '../../../Src/UIComponents/utils/utils';

function createHistoricalWeeklyGoalsTable(tableData: Goal[]): HTMLDivElement {
  const container = createElement('div', [
    'historical-weekly-goals-table',
    'tile-container',
  ]);
  const title = createElement('p', 'tile-title');
  const titleContent = document.createTextNode('Historical weekly goals');
  title.appendChild(titleContent);
  const tile = generateTileComponent(container);

  const table = createTable([
    'DATE',
    'WEEKLY GOAL',
    'START WEIGHT',
    'END WEIGHT',
    'ACHIEVED',
  ]);
  const addRowToHistoricalWeeklyGoalsTable = addRow(table);

  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];
    const date = new Date(row.date);
    
    const rowValues: string[] = [
      date.toLocaleDateString('en-GB'),
      row.weeklyGoal,
      row.startWeight ? `${row.startWeight}` : '',
      row.endWeight ? `${row.endWeight}` : '',
      calculateAchieved(row.achieved)
    ];
    addRowToHistoricalWeeklyGoalsTable(rowValues);
  }
  container.append(title, table);
  return tile;
}
function calculateAchieved(achieved?:boolean):string{
  if (achieved === undefined) {
    return '';
  } else if (achieved) {
    return 'Yes';
  } else {
    return 'No';
  }
}

export { createHistoricalWeeklyGoalsTable };
