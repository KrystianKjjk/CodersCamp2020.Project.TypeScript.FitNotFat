import { FoodDetails } from "../../../Models/FoodDetails.model";
import { User } from "../../../Models/User.model";
import { FoodItemFromAPI } from "../../APIConnection/Food";

function sameDay(d1: Date | string, d2: Date | string) {
    const date1 = d1 instanceof Date ? d1 : new Date(d1);
    const date2 = d2 instanceof Date ? d2 : new Date(d2);
    
    return date1.getFullYear() === date2.getFullYear() 
        && date1.getMonth() === date2.getMonth() 
        && date1.getDate() === date2.getDate();
}

function isUserAuthorizedToUseApi(userData: User): boolean {
    return !!(userData && userData.detailsAPI && userData.detailsAPI.id && userData.detailsAPI.key);
}

function getApiCredentialsForUser(userData: User): {appKey: string, appId: string} | null {
    if (!isUserAuthorizedToUseApi(userData)) return null;

    return {
        appKey: userData.detailsAPI.key,
        appId: userData.detailsAPI.id,
    };
}

// data transforms
function prepareDataForTable(data: FoodDetails): string[] {
    return [
        data.name, 
        `${data.amount}`, 
        data.unit, 
        `${data.calories} kcal`
    ];
}

function prepareAPIData(itemFromAPI: FoodItemFromAPI): FoodDetails {
    return {
        name: itemFromAPI.food_name,
        amount: itemFromAPI.serving_qty,
        unit: itemFromAPI.serving_unit,
        calories: itemFromAPI.nf_calories
    };
}

function generateUniqueClassName(mealName: string, className: string) {
    return `${className}-${mealName}`;
}

export { sameDay, isUserAuthorizedToUseApi, getApiCredentialsForUser, prepareDataForTable, prepareAPIData, generateUniqueClassName };