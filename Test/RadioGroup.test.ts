import {createSingleRadio, createRadioGroup} from '../Src/UIComponents/RadioGroup/RadioGroup';

describe('Radio Group tests', () => {
    const singleOption = {
        key: "key",
        name: "name",
        label: "Test",
    };
    const myFunction = jest.fn();
    const input = createSingleRadio(singleOption, myFunction);

    test('returns radio input with correct properties', () => {
        expect(input.querySelectorAll('input')).toHaveLength(1);

        const createdInput = input.querySelector('input');
        expect(createdInput.type).toBe('radio');
        expect(createdInput.value).toBe('key');
        expect(createdInput.name).toBe('name');
    })

    test('calls function when input is clicked', () => {
        input.querySelector('input').click();
        expect(myFunction).toHaveBeenCalledWith('key');
    })

    test('creates as many inputs as options passed to the functions', () => {
        const options = [
            {key: "key1", name: "name", label: "Test 1"},
            {key: "key2", name: "name", label: "Test 2"},
            {key: "key3", name: "name", label: "Test 3"},
            {key: "key4", name: "name", label: "Test 4"},
            {key: "key5", name: "name", label: "Test 5"},
        ];
        const radioGroup = createRadioGroup(options, myFunction, 'Why?');
        expect(radioGroup.querySelectorAll('input')).toHaveLength(options.length);
    })

})