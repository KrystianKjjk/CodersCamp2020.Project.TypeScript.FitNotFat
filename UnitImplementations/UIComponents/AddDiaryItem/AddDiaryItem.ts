import addDiaryItem from '../../../Src/UIComponents/AddDiaryItem/AddDiaryItem';
import { createTable, addRow } from '../../../Src/UIComponents/ReusableTable/ReusableTable';

const placeholder = 'ex. ran 3 miles or 30 min yoga';
const table = createTable(['Exercise name', 'Met', 'Duration', 'Calories']);
const addNewRow = addRow(table);
addNewRow(['running', '9.8', '60 min', '686 kcal']);
const findCallback = (text: string) => {console.log(text);};
const addCallback = (table: HTMLElement) => {console.log(table);};
const cancelCallback = () => {console.log("CANCEL");};
const headerStr = 'Exercises';
const textStr = 'Your work out';

document.body.appendChild(document.createTextNode('Hello'));
document.body.appendChild(addDiaryItem(table, findCallback, addCallback, cancelCallback, headerStr, textStr, placeholder));