import radioGroup from '../../../Src/UIComponents/RadioGroup/RadioGroup';

const optionsRadio = [{
    key: "sitting",
    name: "active",
    label: "Spend most of the day sitting",
},
{
    key: "onfeet",
    name: "active",
    label: "Spend significant part of the day on your feet",
}]

const saveFunc = (name: string) => alert(name);

document.body.appendChild(radioGroup(optionsRadio, saveFunc, "How active are you?"));