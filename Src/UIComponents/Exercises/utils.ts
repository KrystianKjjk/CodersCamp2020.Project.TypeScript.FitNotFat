import { ExercisesDetails } from "../../../Models/ExercisesDetails.model";
import { User } from "../../../Models/User.model";
import { ExerciseItemFromAPI } from "../../APIConnection/Exercises";

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
function prepareDataForTable(data: ExercisesDetails): string[] {
    return [
        data.name, 
        `${data.met}`, 
        `${data.duration}`, 
        `${data.calories} kcal`
    ];
}

function prepareAPIData(itemFromAPI: ExerciseItemFromAPI): ExercisesDetails {
    return {
        name: itemFromAPI.name,
        met: itemFromAPI.met,
        duration: itemFromAPI.duration_min,
        calories: itemFromAPI.nf_calories
    };
}

export { sameDay, isUserAuthorizedToUseApi, getApiCredentialsForUser, prepareDataForTable, prepareAPIData };