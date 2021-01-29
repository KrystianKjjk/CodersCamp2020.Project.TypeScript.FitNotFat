import createSelectBox from '../Src/UIComponents/Select/Select';

describe('Select test', () => {
    const options = [{key: 'first', label: 'First goal'}];
    const myFunction = jest.fn();

    test('returns div container', () => {
        const select = createSelectBox(options, myFunction, 'Questions?')
        expect(select).toBeInstanceOf(HTMLDivElement);
    })

    test('populates options', () => {
        const select = createSelectBox(options, myFunction, 'Questions?')
        expect(select.querySelectorAll('.option')).toHaveLength(1);
        
        const option: HTMLDivElement = select.querySelector('.option');
        expect(option.dataset.key).toBe('first');
        expect(option.innerHTML).toBe('First goal');
    })

    test('clicking an option fires action and adds color to selected option', () => {
        const optionSelect = [
            {key: 'first', label: 'First goal'},
            {key: 'second', label: 'Second goal'},
            {key: 'third', label: 'Third goal'},
        ];
        const selectGroup = createSelectBox(optionSelect, myFunction, 'Why?');
        const optionFirst: HTMLDivElement = selectGroup.querySelector('.option');
        optionFirst.click();
        expect(myFunction).toHaveBeenCalledWith('first');
        expect(optionFirst.classList.contains('selected')).toBeTruthy();
    });

})

