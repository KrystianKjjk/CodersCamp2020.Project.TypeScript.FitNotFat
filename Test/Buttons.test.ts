import {generateWhiteButton, generateRedButton} from '../Src/UIComponents/Buttons/Buttons'

describe('White button tests', () => {
    test('returns HTMLButtonElement', () => {
        const onClick = jest.fn();
        const button = generateWhiteButton('TEST', onClick);
        expect(button).toBeInstanceOf(HTMLButtonElement);
    })

    test('has correct class name applied', () => {
        const onClick = jest.fn();
        const button = generateWhiteButton('TEST', onClick);
        expect(button.className).toEqual('button');
    })

    test('fires onClick function on clicking component', () => {
        const onClick = jest.fn();
        const button = generateWhiteButton('TEST', onClick);
        button.click();
        expect(onClick).toHaveBeenCalledTimes(1);
    })
});

describe('Red button tests', () => {
    test('returns HTMLButtonElement', () => {
        const onClick = jest.fn();
        const button = generateRedButton('TEST', onClick);
        expect(button).toBeInstanceOf(HTMLButtonElement);
    })

    test('has correct class name applied', () => {
        const onClick = jest.fn();
        const button = generateRedButton('TEST', onClick);
        expect(button.className).toEqual('button');
    })

    test('fires onClick function on clicking component', () => {
        const onClick = jest.fn();
        const button = generateRedButton('TEST', onClick);
        button.click();
        expect(onClick).toHaveBeenCalledTimes(1);
    })
});