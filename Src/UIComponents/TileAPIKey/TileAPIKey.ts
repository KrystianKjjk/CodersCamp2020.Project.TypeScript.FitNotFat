import { generateWhiteButton } from '../Buttons/Buttons';
import {createElement, createTextInput} from '../utils/utils';
import { DetailsAPI } from "../../../Models/DetailsAPI.model";

const PLACEHOLDER_KEY = 'ex. thisismyapikey';
const PLACEHOLDER_ID = 'ex. thisismyID';

type GetAPIDetails = (username: string) => Promise<DetailsAPI>;
type SetAPIDetails = (username: string, detailsAPI: DetailsAPI) => Promise<string>;

export function createTileAPIKey(username: string, getAPIDetails: GetAPIDetails, setAPIDetails: SetAPIDetails): HTMLElement {

    const containerAPIKey = createElement('div', 'api-key-tile');
    const header = createElement('header', 'api-key-tile__header', 'API KEY');
    const sectionKey = createElement('section', 'api-key-tile__section');
    const sectionKeyText = createElement('p','api-key-tile__section--text', 'ENTER API KEY');
    const sectionKeyInput = createTextInput(PLACEHOLDER_KEY, 'api-key-tile__section--input');
    const sectionID = createElement('section', 'api-key-tile__section');
    const sectionIDText = createElement('p','api-key-tile__section--text', 'ENTER ID');
    const sectionIDInput = createTextInput(PLACEHOLDER_ID, 'api-key-tile__section--input')
    const sectionError = createElement('p','api-key-tile__section--error');
    const saveButton = generateWhiteButton('SAVE', handleSaveButtonClick);
    saveButton.classList.add('my-weight-tile__button-section--tile-btn');

    sectionKey.append(sectionKeyText, sectionKeyInput);
    sectionID.append(sectionIDText, sectionIDInput);
    containerAPIKey.append(header, sectionKey, sectionID, sectionError, saveButton);

    getAPIDetails(username)
        .then((detailsAPI) => {
            sectionKeyInput.value = detailsAPI.key;
            sectionIDInput.value = detailsAPI.id;
        })
        .catch( msg => {});

    function handleSaveButtonClick(){
        const detailsAPI = {
            key: sectionKeyInput.value,
            id: sectionIDInput.value };

        if(detailsAPI.key && detailsAPI.id) {
            setAPIDetails(username, detailsAPI)
                .then( msg => {
                    sectionError.innerText = msg;
                    sectionKeyInput.value = detailsAPI.key;
                    sectionIDInput.value = detailsAPI.id;
                })
                .catch(alert => sectionError.innerText = alert);
        }
        else {
            sectionError.innerText = 'KEY and ID must be filled out!'
        }
    }
    return containerAPIKey;
}
