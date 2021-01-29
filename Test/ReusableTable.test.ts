import {createTable, addRow} from '../Src/UIComponents/ReusableTable/ReusableTable';

describe('ReusableTable', () => {
    test('returns table element', () => {
        const table = createTable([]);
        expect(table).toBeInstanceOf(HTMLTableElement);
    })

    test('has as many columns as arguments', () => {
        const headers = ['1', '2', '3'];
        const table = createTable(headers);
        expect(table.querySelectorAll('th')).toHaveLength(headers.length);
    })

    test('has as many rows as addRow calls + header and twice as much cells', () => {
        const table = createTable(['Nazwa', 'Nazwa']);
        const addRowToTable = addRow(table);
        addRowToTable(['dane1', 'dane1']);
        addRowToTable(['dane2', 'dane2']);
        addRowToTable(['dane3', 'dane3']);
        expect(table.querySelectorAll('tr')).toHaveLength(3 + 1);
        expect(table.querySelectorAll('td')).toHaveLength(3 * 2);
    })
})