import { DetailsAPI } from "../../../Models/DetailsAPI.model";
import { saveInLocalStorage, readFromLocalStorage } from "../../../Src/Logic/LocalStorage/LocalStorage"
import { NO_USER_ERROR, NO_API_DETAILS_ERROR, SAVED_CORRECTLY_CONFIRM } from "../../../Constants/consts";

function getAPIDetails(userName: string) {
    return new Promise<DetailsAPI>( (resolve, reject) => {
        const user = readFromLocalStorage(userName);
        if(user) {
            if(user?.detailsAPI) {
                resolve(user.detailsAPI);
            }
            else {
                reject(new Error(NO_API_DETAILS_ERROR));
            }
        }
        else {
            reject(new Error(NO_USER_ERROR));
        }
    } );
}

function setAPIDetails(userName: string, detailsAPI: DetailsAPI){
    return new Promise<string>((resolve, reject) => {
        const user = readFromLocalStorage(userName);
        if(user) {
            user.detailsAPI = detailsAPI;
            saveInLocalStorage(userName, user);
            resolve(SAVED_CORRECTLY_CONFIRM);
        }
        else {
            reject(new Error(NO_USER_ERROR));
        }
    })
}

export { getAPIDetails, setAPIDetails };
