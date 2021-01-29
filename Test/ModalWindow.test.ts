import modalWindow from '../Src/UIComponents/ModalWindow/ModalWindow';

describe('Modal Window test', () => {
    const component = document.createElement('p');

    test('return HTMLElement', () => {
        const closeWindow = () => console.log('closeWindow');
        expect(modalWindow(component, closeWindow)).toBeInstanceOf(HTMLElement);
    })

    test('when background clicked, run function closeWindow()', () => {
        const closeWin = jest.fn();
        modalWindow(component, closeWin).click();
        expect(closeWin).toHaveBeenCalled();
    })

    test('when window clicked, dont run function closeWindow()', () => {
        const closeWin = jest.fn();
        const firstChild = modalWindow(component, closeWin).children[0] as HTMLElement;
        firstChild.click();
        expect(closeWin).not.toHaveBeenCalled();
    })

})