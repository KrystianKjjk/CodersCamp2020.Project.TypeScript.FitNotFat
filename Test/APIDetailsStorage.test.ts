import { getAPIDetails, setAPIDetails } from "../Src/Logic/APIDetailsStorage/APIDetailsStorage";
import {User} from "../Models/User.model";
import {ActivityLevel} from "../Models/ActivityLevel.model";
import {MyDiaryFood} from "../Models/DiaryFood.model";
import {Meal} from "../Models/Meal.model";
import {saveInLocalStorage} from "../Src/Logic/LocalStorage/LocalStorage";

const NO_USER_ERROR = `User doesn't exist!`;
const NO_API_DETAILS_ERROR = `User doesn't contain API details.`;
const SAVED_CORRECTLY_CONFIRM = 'API DETAILS saved correctly!';


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

saveInLocalStorage(username, user);

class LocalStorageMock {
    store: object;
    length: number;
    key: (index:number) => string;

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key];
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global["localStorage"] = new LocalStorageMock;
saveInLocalStorage(username,user);


describe('GET APIDetails tests', () => {

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

        test('SET - if user doesnt exist - get error', async () => {
            const username = 'iDONTexist';
            await expect(setAPIDetails(username,detailsAPI)).rejects.toEqual(Error(NO_USER_ERROR));
        });
    test('SET - user exists saved correctly', async () => {
        await expect(setAPIDetails(username,detailsAPI)).resolves.toEqual(SAVED_CORRECTLY_CONFIRM);
    });

    }
);
