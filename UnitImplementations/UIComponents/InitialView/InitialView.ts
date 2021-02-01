import generateInitialView from '../../../Src/UIComponents/InitialView/InitialView'


const test = document.createElement('div');
test.style.height = "500px";
test.style.width = "300px";
test.style.backgroundColor = "black";


const initialView = generateInitialView(test);
document.body.appendChild(initialView);

