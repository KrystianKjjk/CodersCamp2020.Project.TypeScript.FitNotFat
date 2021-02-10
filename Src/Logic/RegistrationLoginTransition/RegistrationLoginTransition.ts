import generateInitialView from '../../../Src/UIComponents/InitialView/InitialView';
import {generateHomePage} from '../../../Src/UIComponents/HomePage/HomePage';
export function anauthorizedUserLogic(){
const homePage=generateInitialView(generateHomePage());
return homePage;
}