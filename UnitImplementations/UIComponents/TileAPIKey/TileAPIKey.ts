import { createTileAPIKey } from '../../../Src/UIComponents/TileAPIKey/TileAPIKey';
import  generateTileComponent  from '../../../Src/UIComponents/TileComponent/TileComponent'
import { DetailsAPI } from "../../../Models/DetailsAPI.model";
import { User } from "../../../Models/User.model";


const username: string = 'User';
type GetAPIDetails = (username: string) => Promise<DetailsAPI>;
type SetAPIDetails = (username: string, detailsAPI: DetailsAPI) => Promise<string>;

let getAPIDetails: GetAPIDetails = function(username) {
    return new Promise( (resolve, reject)=>{reject(new Error(`User doesn't exist!`));} );
}
let setAPIDetails: SetAPIDetails = function(username, detailsAPI) {
    return new Promise( (resolve, reject)=>{ resolve('API DETAILS saved correctly!');} );
}

const tileMyWeight = generateTileComponent(
    createTileAPIKey(username, getAPIDetails, setAPIDetails));

document.body.appendChild(tileMyWeight);


