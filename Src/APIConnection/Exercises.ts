import { User } from '../../Models/User.model'
import { getAge } from '../UIComponents/utils/utils'

export interface ExerciseItemFromAPI {
    name: string;
    met: number;
    duration_min: number;
    nf_calories: number;
}

export interface ExerciseDataFromResponse {
    foods: ExerciseItemFromAPI[];
}


async function fetchExercisesData(user: User, exercise: string, appId: string, appKey: string){
    const url = "https://trackapi.nutritionix.com/v2/natural/exercise";
    const requestJSON = {
        "query": exercise,
        "gender": user.gender,
        "weight_kg": user?.weights[0].weight ?? user.goalWeight, //fallback goalweight just in case the user has not provided us with anything, not sure if possible
        "height_cm": user.height,
        "age": getAge(user.dateOfBirth)
    }
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestJSON),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'x-app-id': appId,
            'x-app-key': appKey,
          },
    });
    
    return response.json();
}

export { fetchExercisesData };