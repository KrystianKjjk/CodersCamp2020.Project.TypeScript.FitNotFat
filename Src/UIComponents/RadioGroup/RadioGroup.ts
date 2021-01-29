interface RadioOption {
    key: string,
    name: string;
    label: string,
} 

const radioGroup = (options: RadioOption[], onClick: (string) => void, groupName: string) => {
    const mainContainer = createElement('div', 'radio-main-container');
    const prompt = createElement('p', 'radio-group-header');
    prompt.appendChild(document.createTextNode(groupName));
    mainContainer.appendChild(prompt);

    options.forEach(singleInput => {
        const {key, name, label} = singleInput;
        const singleRadioOption = createElement('div', 'radio-single-container');
        const labelRadioButton = createElement('label', 'radio-button');
        singleRadioOption.appendChild(labelRadioButton);

        const input = document.createElement('input')
        input.type = 'radio';
        input.value = key;
        input.name = name;
        input.onclick = event => onClick((event.target as HTMLInputElement).value);

        labelRadioButton.appendChild(input);

        const spanVisible = createElement('span', 'label-visible');
        const fakeRadioButton = createElement('span', 'fake-radiobutton');
        const textButton = createElement('span', 'text-radio');
        textButton.innerText = label;

        spanVisible.appendChild(fakeRadioButton);
        spanVisible.appendChild(textButton);

        labelRadioButton.appendChild(spanVisible);

        mainContainer.appendChild(singleRadioOption);
    })

    return mainContainer;
}

const createElement = (type: string, className: string) => {
    const createdElement = document.createElement(type);
    createdElement.className = className;

    return createdElement;
}

export default radioGroup;