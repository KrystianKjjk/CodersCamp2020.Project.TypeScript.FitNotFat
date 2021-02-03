import {createElement} from '../utils/utils';

const createTable = (headers: string[]) => {
    const table = createElement('table', 'table-style') as HTMLTableElement;
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
    const cell = createElement(type, [], content);
    parent.appendChild(cell);
}

export {createTable, addRow};