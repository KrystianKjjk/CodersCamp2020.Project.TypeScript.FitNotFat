import { createTileAPIKey } from "../Src/UIComponents/TileAPIKey/TileAPIKey";
import {DetailsAPI} from "../Models/DetailsAPI.model";
import generateForm from "../Src/UIComponents/FormComponent/FormComponent";


describe('TileAPIKey component tests', ()=> {

    const PLACEHOLDER_KEY = 'ex. thisismyapikey';
    const PLACEHOLDER_ID = 'ex. thisismyID';
    const username = 'User'
    const getAPI = jest.fn(username => Promise.resolve({key: '', id: ''}));
    const setAPI = jest.fn(username => Promise.reject(''));

    test('if returns HTMLElement', () => {
        expect(createTileAPIKey(username, getAPI, setAPI)).toBeInstanceOf(HTMLElement);
    })
    test('if renders properly',()=>{
        const apiKey = createTileAPIKey(username, getAPI, setAPI);
        expect(apiKey).toMatchSnapshot();
    })
    test('if contains default placeholder', () => {
        let element = createTileAPIKey(username, getAPI, setAPI);
        expect((element.querySelectorAll('.api-key-tile__section--input')[0] as HTMLInputElement).placeholder).toBe(PLACEHOLDER_KEY);
        expect((element.querySelectorAll('.api-key-tile__section--input')[1] as HTMLInputElement).placeholder).toBe(PLACEHOLDER_ID);
    })
    test('if contains new values in inputs', async () => {
        const KEY_VALUE = 'newapiKEY';
        const ID_VALUE = 'newapiID';

        const getAPI = jest.fn(username => Promise.resolve({key: KEY_VALUE, id: ID_VALUE}));
        let element = await createTileAPIKey(username, getAPI, setAPI);
        expect((element.querySelectorAll('.api-key-tile__section--input')[0] as HTMLInputElement).value).toBe(KEY_VALUE);
        expect((element.querySelectorAll('.api-key-tile__section--input')[1] as HTMLInputElement).value).toBe(ID_VALUE);
    })
    test('if clicking button when inputs are empty displays information', async () => {
        const element = createTileAPIKey(username, getAPI, setAPI);

        (element.querySelector('.my-weight-tile__button-section--tile-btn') as HTMLButtonElement).click();
        expect((element.querySelector('.api-key-tile__section--error') as HTMLElement).innerText).toBe('KEY and ID must be filled out!');
    })
    test('if clicking save button when inputs are filled up updates values in input fields', async () => {
        const KEY_VALUE = 'newapiKEY';
        const ID_VALUE = 'newapiID';

        window.alert = jest.fn();
        const element = createTileAPIKey(username, getAPI, setAPI);
        (element.querySelectorAll('.api-key-tile__section--input')[0] as HTMLInputElement).value = KEY_VALUE;
        (element.querySelectorAll('.api-key-tile__section--input')[1] as HTMLInputElement).value = ID_VALUE;
        (element.querySelector('.my-weight-tile__button-section--tile-btn') as HTMLButtonElement).click();
        expect((element.querySelectorAll('.api-key-tile__section--input')[0] as HTMLInputElement).value).toBe(KEY_VALUE);
        expect((element.querySelectorAll('.api-key-tile__section--input')[1] as HTMLInputElement).value).toBe(ID_VALUE);
    })
});
