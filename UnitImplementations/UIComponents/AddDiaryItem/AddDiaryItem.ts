import addDiaryItem from '../../../Src/UIComponents/AddDiaryItem/AddDiaryItem';
import { createTable, addRow } from '../../../Src/UIComponents/ReusableTable/ReusableTable';

const container = document.createElement('div');
container.style.display = 'flex';
container.style.height = '700px';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.justifyContent = 'space-around';


const placeholder = 'ex. ran 3 miles or 30 min yoga';
const table = createTable(['Exercise name', 'Met', 'Duration', 'Calories']);
const addNewRow = addRow(table);
addNewRow(['running', '9.8', '60 min', '686 kcal']);
const findCallback = (text: string) => {console.log(text);};
const addCallback = (table: HTMLElement) => {console.log(table);};
const cancelCallback = () => {console.log("CANCEL");};
const headerStr = 'Exercises';
const textStr = 'Your work out';

const h1 = document.createElement('h1');
h1.innerHTML = "My diary";
container.appendChild(h1);
container.appendChild(addDiaryItem(table, findCallback, addCallback, cancelCallback, headerStr, textStr, placeholder));
document.body.appendChild(container);