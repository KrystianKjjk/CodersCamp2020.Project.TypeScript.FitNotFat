interface SelectOption {
    key: string,
    label: string,
} 

const selectOption = (options: SelectOption[], onSelect: (string) => void, placeholder: string = "") => {
    const select = document.createElement('select');
    select.onchange = event => onSelect((event.target as HTMLSelectElement).value);

    const option = document.createElement('option');
    option.appendChild(document.createTextNode(placeholder));
    option.value = "";
    option.selected = true;
    option.disabled = true;
    select.appendChild(option);

    options.forEach(singleOption => {
        const {key, label} = singleOption;
        const option = document.createElement('option')
        option.appendChild(document.createTextNode(label));
        option.value = key;
        select.appendChild(option);
    })

    return select;
}


export default selectOption;