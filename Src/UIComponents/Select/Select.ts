const selectOption = (options: Record<string, string>, onSelect: (string) => void, placeholder: string = "") => {
    const select = document.createElement('select');
    select.onchange = event => onSelect((event.target as HTMLSelectElement).value);

    const option = document.createElement('option');
    option.appendChild(document.createTextNode(placeholder));
    option.value = "";
    option.selected = true;
    option.disabled = true;
    select.appendChild(option);
    
    Object.entries(options).forEach(entry => {
        const [value, label] = entry;
        const option = document.createElement('option')
        option.appendChild(document.createTextNode(label));
        option.value = value;
        select.appendChild(option);
    })

    return select;
}


export default selectOption;