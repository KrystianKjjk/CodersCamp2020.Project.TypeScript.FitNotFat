import {generateWhiteButton} from '../Src/UIComponents/Buttons/Buttons'

describe('Button tests', () => {
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