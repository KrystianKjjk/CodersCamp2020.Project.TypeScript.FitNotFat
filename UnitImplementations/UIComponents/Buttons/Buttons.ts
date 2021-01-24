import {generateWhiteButton, generateRedButton} from '../../../Src/UIComponents/Buttons/Buttons';

const button1 = generateWhiteButton('Test', ()=>{});
const button2 = generateRedButton('Test', ()=>{});

button1.style.width = "200px";
button2.style.width = "200px";

button1.style.height = "50px";
button2.style.height = "50px";

document.body.appendChild(button1);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(button2);