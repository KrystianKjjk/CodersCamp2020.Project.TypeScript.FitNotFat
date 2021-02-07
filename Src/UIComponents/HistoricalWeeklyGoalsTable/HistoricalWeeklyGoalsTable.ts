import { createTable, addRow } from '../ReusableTable/ReusableTable';
import generateTileComponent from '../TileComponent/TileComponent';
import { Goal } from '../../../Models/Goal.model';



function createHistoricalWeeklyGoalsTable(tableData: Goal[]): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'tile-container';
  const title = document.createElement('p');
  title.className = 'tile-title';
  const titleContent = document.createTextNode('Historical weekly goals');
  title.appendChild(titleContent);
  const tile = generateTileComponent(container);

  const table = createTable([
    'DATE',
    'WEEKLY GOAL',
    'START WEIGHT',
    'END WEIGHT',
    'ACHIEVED IN',
  ]);
  const addRowToHistoricalWeeklyGoalsTable = addRow(table);

  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];
    const date=new Date(row.date);
    const rowValues: string[] = [
      date.toLocaleDateString('en-GB'),
      row.weeklyGoal,
      row.startWeight?`${row.startWeight}`:"",
      row.endWeight? `${row.endWeight}`:"",
      row.achieved?`${row.achieved}`:"",
    ];
    addRowToHistoricalWeeklyGoalsTable(rowValues);
  }
  container.append(title, table);
  return tile;
}

export { createHistoricalWeeklyGoalsTable };
