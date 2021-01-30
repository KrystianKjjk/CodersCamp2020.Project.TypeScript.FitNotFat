import generateInitialView from '../Src/UIComponents/InitialView/InitialView'

const testingDiv = document.createElement('div');
document.body.appendChild(generateInitialView(testingDiv));

describe('Initial View generator tests', () => {
    test('returns Initial View container', () => {
        expect(document.querySelector('.initial-view')).toBeTruthy;
    })

    test('Initial View container contains the injected component', () => {
        expect(document.querySelector('.initial-view-injected-component')).toBeTruthy;
    })

    test('Initial View container contains the app name text', () => {
        expect(document.querySelector('.app-name').innerHTML).toEqual("<span>Fit</span><span>notFat</span>");
    })

    test('Initial View container has the images', () => {
        expect(document.querySelector('initial-view-image')).toBeTruthy;
        expect(document.querySelector('initial-view-shape')).toBeTruthy;
    })

})