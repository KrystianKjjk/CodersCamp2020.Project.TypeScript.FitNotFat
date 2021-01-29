import {generateRedButton} from '../Buttons/Buttons';

export default function generateForm() {
 const form=document.createElement('form');

 //paragraf
 const paragraph=document.createElement('p');
 const node=document.createTextNode('Join us');
 paragraph.appendChild(node);
 form.appendChild(paragraph);

 //progress-bar
const progressBar=document.createElement('div');
progressBar.className="progress-bar";
form.appendChild(progressBar);
const stepDiv=document.createElement('div');
stepDiv.className="first-step";
progressBar.appendChild(stepDiv);

//name input
const nameInput=document.createElement('input');
nameInput.setAttribute('type','text');
nameInput.setAttribute('placeholder','Nickname');
nameInput.setAttribute('minlength','4');
nameInput.required=true;
nameInput.className='name';
form.appendChild(nameInput);

//gender-selection
const genderSelectionDiv=document.createElement('div');
genderSelectionDiv.className='gender-selection';
form.appendChild(genderSelectionDiv);

//input and label male 
const maleInput=document.createElement('input');
maleInput.setAttribute('type','radio');
maleInput.setAttribute('name','gender');
maleInput.setAttribute('value','male');
maleInput.setAttribute('id','male');
maleInput.required=true;

const maleLabel=document.createElement('label');
maleLabel.setAttribute('for','male'); 
genderSelectionDiv.appendChild(maleInput);
genderSelectionDiv.appendChild(maleLabel);
maleLabel.innerHTML='Male'; 
const genderSelectionSpan=document.createElement('span');
genderSelectionDiv.appendChild(genderSelectionSpan);

// input and label female
const femaleInput=document.createElement('input');
femaleInput.setAttribute('type','radio');
femaleInput.setAttribute('name','gender');
femaleInput.setAttribute('value','female');
femaleInput.setAttribute('id','female');
femaleInput.required=true;

const femaleLabel=document.createElement('label');
femaleLabel.setAttribute('for','female'); 
genderSelectionDiv.appendChild(femaleInput);
genderSelectionDiv.appendChild(femaleLabel);
femaleLabel.innerHTML='Female';

//input birth date
const dateInput=document.createElement('input');
dateInput.setAttribute('type','text');
dateInput.setAttribute('placeholder','Date of birth');
dateInput.addEventListener('focus', (event)=>{
  dateInput.setAttribute('type','date');
})
dateInput.addEventListener('blur', (event)=>{
  dateInput.setAttribute('type','text');
})
dateInput.required=true;
dateInput.className='birth-date';
form.appendChild(dateInput);

//current values div
const heightAndWeightDiv=document.createElement('div');
heightAndWeightDiv.className='current-values';
form.appendChild(heightAndWeightDiv);

//height input (to i current weight są prawie identyczne)
const heightInput=document.createElement('input');
heightInput.setAttribute('type','number');
heightInput.setAttribute('placeholder','Height (cm)');
heightInput.setAttribute('min','0');
heightInput.required=true;
heightInput.className='height';
heightAndWeightDiv.appendChild(heightInput);

//current weight input
const weightInput=document.createElement('input');
weightInput.setAttribute('type','number');
weightInput.setAttribute('placeholder','Current weight (kg)');
weightInput.setAttribute('min','0');
weightInput.required=true;
weightInput.className='current-weight';
heightAndWeightDiv.appendChild(weightInput);

//goal weight input
const goalWeightInput=document.createElement('input');
goalWeightInput.setAttribute('type','number');
goalWeightInput.setAttribute('placeholder','Goal weight (kg)');
goalWeightInput.setAttribute('min','0');
goalWeightInput.required=true;
goalWeightInput.className='goal-weight';
form.appendChild(goalWeightInput);

//button 
const submitButton=generateRedButton('Next step', fn);
submitButton.style.height='50px';
submitButton.style.width='35%';
form.appendChild(submitButton);

function fn(){
  console.log('test');
}
return form;

//można zrobić funkcję required, która do każdego inputa dodaje
//required=true; 
}

