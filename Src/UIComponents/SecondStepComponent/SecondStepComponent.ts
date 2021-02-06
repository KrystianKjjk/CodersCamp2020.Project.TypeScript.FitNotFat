import {createRadioGroup} from '../../../Src/UIComponents/RadioGroup/RadioGroup';
import createSelectBox from '../../../Src/UIComponents/Select/Select';
import {generateRedButton, generateWhiteButton}from '../../../Src/UIComponents/Buttons/Buttons';
import {createElement} from '../../../Src/UIComponents/utils/utils';
import {WeightGoal,createWeightGoalSelect} from '../../../Src/UIComponents/WeeklyGoalComponent/WeeklyGoalComponent';

export function generateSecondStep(){
const secondStepDiv=createElement('div','main-container');
const title=createElement('p','main-title');
title.appendChild(document.createTextNode('Join us'));
const line=createElement('hr','main-hr');

let selectedValue;

function onWeightGoalSelect(selectedVal:WeightGoal){
selectedValue=selectedVal;
}

const select=createWeightGoalSelect(onWeightGoalSelect);

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

const radio=createRadioGroup(optionsRadio, functionRadio, "How active are you?");

const button1 = generateWhiteButton('Back', ()=>{});
const button2 = generateRedButton('Sign Up', ()=>{});

button1.style.width = "200px";
button2.style.width = "200px";

button1.style.height = "50px";
button2.style.height = "50px";

const containerButton = document.createElement('div');
containerButton.className = 'container-button';
containerButton.append(button1,button2);


secondStepDiv.append(title,line,select,radio,containerButton);


return secondStepDiv;
}

    


