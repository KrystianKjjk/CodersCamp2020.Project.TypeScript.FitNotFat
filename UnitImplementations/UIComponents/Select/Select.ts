import selectOption from '../../../Src/UIComponents/Select/Select';

const options = [{
    key: "first",
    label: "First goal",
},
{
    key: "second",
    label: "Second goal",
}]



const saveFunc = (name: string) => alert(name);

document.body.appendChild(selectOption(options, saveFunc, "What is your weekly goal?"));