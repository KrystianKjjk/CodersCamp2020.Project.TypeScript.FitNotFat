import { getAPIDetails, setAPIDetails } from "../Src/Logic/APIDetailsStorage/APIDetailsStorage";
import {User} from "../Models/User.model";
import {ActivityLevel} from "../Models/ActivityLevel.model";
import {MyDiaryFood} from "../Models/DiaryFood.model";
import {Meal} from "../Models/Meal.model";
import {saveInLocalStorage} from "../Src/Logic/LocalStorage/LocalStorage";
import { NO_USER_ERROR, NO_API_DETAILS_ERROR, SAVED_CORRECTLY_CONFIRM  } from "../Constants/consts";

const username = 'TestUser';

const user : User = {
    name: 'TestUser',
    gender: 'Male',
    dateOfBirth: new Date(),
    height: 180,
    goalWeight: 75,
    activityLevel: ActivityLevel.Active,
    diaryFood: [
        new MyDiaryFood({
            date: new Date(2021, 1, 25),
            providedKcal: 0,
            recommendedKcal: 2500,
            meals: {}
        })
            .addMeal(Meal.breakfast,{
                name: 'pancakes',
                amount: 2,
                unit: `pancake (5'')`,
                calories: 181.6
            })]
}
const detailsAPI = {key: 'PrzykladAPIOdczytZLocalStorage', id: 'OrazOdczytanegoID'};

saveInLocalStorage(username,user);

describe('GET APIDetails tests', () => {
    beforeEach(() => {
        window.alert = jest.fn();
      });

    test('GET - if user doesnt exist get error', async () => {
        const user = 'iDONTexist';
        await expect(getAPIDetails(user)).rejects.toEqual(Error(NO_USER_ERROR));
    });
    test('GET - user exist but no api details - get error', async () => {
        await expect(getAPIDetails(username)).rejects.toEqual(Error(NO_API_DETAILS_ERROR));
    });
    test('GET - user exist - get expected api details', async () => {
        user.detailsAPI = detailsAPI;
        saveInLocalStorage(username,user);
        await expect(getAPIDetails(username)).resolves.toEqual({key: 'PrzykladAPIOdczytZLocalStorage', id: 'OrazOdczytanegoID'});
        });
    }
);

describe('SET APIDetails tests', () => {
    beforeEach(() => {
        window.alert = jest.fn();
      });
      
        test('SET - if user doesnt exist - get error', async () => {
            const username = 'iDONTexist';
            await expect(setAPIDetails(username,detailsAPI)).rejects.toEqual(Error(NO_USER_ERROR));
        });
    test('SET - user exists saved correctly', async () => {
        await expect(setAPIDetails(username,detailsAPI)).resolves.toEqual(SAVED_CORRECTLY_CONFIRM);
    });

    }
);
