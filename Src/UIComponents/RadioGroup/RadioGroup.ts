interface RadioOption {
    key: string,
    name: string;
    label: string,
} 

const radioGroup = (options: RadioOption[], onClick: (string) => void, groupName: string) => {
    const prompt = document.createElement('p');
    prompt.appendChild(document.createTextNode(groupName));
    prompt.className = 'radio-header';

    const radioInput = document.createElement('div');
    radioInput.appendChild(prompt);

    options.forEach(singleInput => {
        const {key, name, label} = singleInput;
        const singleRadioInput = document.createElement('div');
        
        const labelInput = document.createElement('label');
        labelInput.htmlFor = key;
        labelInput.className = 'radio-label-text'
        labelInput.appendChild(document.createTextNode(label));

        const input = document.createElement('input')
        input.type = 'radio';
        input.value = key;
        input.id = key;
        input.name = name;
        input.onclick = event => onClick((event.target as HTMLSelectElement).value);

        singleRadioInput.appendChild(input);
        singleRadioInput.appendChild(labelInput);
        radioInput.appendChild(singleRadioInput);
    })

    return radioInput;
}


export default radioGroup;