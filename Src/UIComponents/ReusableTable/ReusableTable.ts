const createTable = (headers: string[]) => {
    const table = document.createElement('table');
    table.className = 'table-style';
    const headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    headers.forEach(header => {
        createCell(headerRow, header, "th")
    });

    return table;
}

const addRow = (table: HTMLTableElement) => (data: string[]) => {
    const row = document.createElement('tr');
    table.appendChild(row);

    data.forEach(column => {
        createCell(row, column, 'td')
    });
}

const createCell = (parent: HTMLTableRowElement, content: string, type: 'td' | 'th' = 'td') => {
    const cell = document.createElement(type);
    cell.innerHTML = content;
    parent.appendChild(cell);
}

export {createTable, addRow};