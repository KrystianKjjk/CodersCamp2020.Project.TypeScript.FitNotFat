import {createTable, addRow} from "../ReusableTable/ReusableTable";
import generateTileComponent from "../TileComponent/TileComponent";

interface HistoricalWeeklyGoalsRow {
    date: string;
    weeklyGoal: string;
    startWeight: string;
    endWeight: string;
    achievedIn: string;
  }

function createHistoricalWeeklyGoalsTable(tableData: HistoricalWeeklyGoalsRow[]):HTMLDivElement{

    const container = document.createElement('div');
    container.className = 'tile-container';
    const title = document.createElement('p');
    title.className = 'tile-title';
    const titleContent = document.createTextNode('Historical weekly goals');
    title.appendChild(titleContent);
    container.appendChild(title);
    const tile=generateTileComponent(container);

    const table=createTable(['DATE','WEEKLY GOAL','START WEIGHT','END WEIGHT','ACHIEVED IN']);
    const addRowToHistoricalWeeklyGoalsTable = addRow(table);

    for(let i=0; i<tableData.length; i++){
    const row=tableData[i];
    const rowValues=Object.values(row);
    addRowToHistoricalWeeklyGoalsTable(rowValues);
    }
    container.appendChild(table);
    return tile;
}

export {createHistoricalWeeklyGoalsTable};

