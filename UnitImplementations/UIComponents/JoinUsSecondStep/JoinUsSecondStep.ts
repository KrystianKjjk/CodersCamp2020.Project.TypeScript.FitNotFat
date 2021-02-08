import {createRadioGroup} from '../../../Src/UIComponents/RadioGroup/RadioGroup';
import createSelectBox from '../../../Src/UIComponents/Select/Select';
import {generateWhiteButton, generateRedButton} from '../../../Src/UIComponents/Buttons/Buttons';

const container = document.createElement('div');
container.className = 'main-container';
const title = document.createElement('p');
title.className = 'main-title';
title.appendChild(document.createTextNode('Join us'));

const line = document.createElement('hr');
line.className = 'main-hr';

container.appendChild(title);
container.appendChild(line);

document.body.appendChild(container);

const optionSelect = [{
    key: "first",
    label: "First goal",
},
{
    key: "second",
    label: "Second goal",
},
{
    key: "third",
    label: "Third goal",
}]

const functionSelect = (name: string) => alert(name);

container.appendChild(createSelectBox(optionSelect, functionSelect, "What is your weekly goal?"));

const optionsRadio = [{
    key: "sitting",
    name: "active",
    label: "Spend most of the day sitting",
},
{
    key: "onfeet",
    name: "active",
    label: "Spend significant part of the day on your feet",
},
{
    key: "ssd",
    name: "active",
    label: "Spend significant part of the day doing physical activities",
},
{
    key: "osds",
    name: "active",
    label: "Spend most of the day doing heavy physical activities",
}]

const functionRadio = (name: string) => alert(name);

container.appendChild(createRadioGroup(optionsRadio, functionRadio, "How active are you?"));

const button1 = generateWhiteButton('Back', ()=>{});
const button2 = generateRedButton('Sign Up', ()=>{});

button1.style.width = "200px";
button2.style.width = "200px";

button1.style.height = "50px";
button2.style.height = "50px";

const containerButton = document.createElement('div');
containerButton.className = 'container-button';
containerButton.appendChild(button1);
containerButton.appendChild(button2);

container.appendChild(containerButton);
