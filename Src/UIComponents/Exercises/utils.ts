import { ExercisesDetails } from "../../../Models/ExercisesDetails.model";
import { User } from "../../../Models/User.model";
import { ExerciseItemFromAPI } from "../../APIConnection/Exercises";

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

export { prepareDataForTable, prepareAPIData };