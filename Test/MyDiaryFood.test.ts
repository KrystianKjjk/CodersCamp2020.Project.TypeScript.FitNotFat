import { ActivityLevel } from '../Models/ActivityLevel.model';
import { User } from '../Models/User.model';
import { getApiCredentialsForUser, isUserAuthorizedToUseApi, sameDay, generateUniqueClassName } from '../Src/UIComponents/MyDiaryFood/utils';
import createMealDiary, {identifierClasses} from '../Src/UIComponents/MyDiaryFood/MyDiaryFood';
import * as LocalStorage from '../Src/Logic/LocalStorage/LocalStorage';
import * as FoodAPI from '../Src/APIConnection/Food';

describe('MyDiaryFood', () => {
    test('should correctly determine two dates are the same', () => {
        expect(sameDay('2020-02-02', '2020-02-02')).toBeTruthy();
        expect(sameDay('2020-02-02', '2020-02-03')).toBeFalsy();
        expect(sameDay('2020-02-02 14:00', '2020-02-02 15:30')).toBeTruthy();
        expect(sameDay(new Date('2020-02-02'), '2020-02-02')).toBeTruthy();
        expect(sameDay(new Date('2020-02-02 09:00'), new Date('2020-02-02'))).toBeTruthy();
        expect(sameDay(new Date('2019-02-02 10:30'), new Date('2020-02-02 10:30'))).toBeFalsy();
    });
    test('should authorize user', () => {
        const unauthorizedUser: User = {
            name: 'Juan',
            activityLevel: ActivityLevel.Active,
            dateOfBirth: new Date(),
            gender: 'Female',
            height: 123,
            goalWeight: 122,
        };

        const authorizedUser: User = {
            ...unauthorizedUser,
            detailsAPI: {
                id: 'juan-123',
                key: 'secret-key',
            }
        }

        expect(isUserAuthorizedToUseApi(unauthorizedUser)).toBeFalsy();
        expect(isUserAuthorizedToUseApi(authorizedUser)).toBeTruthy();

        expect(getApiCredentialsForUser(unauthorizedUser)).toEqual(null);
        expect(getApiCredentialsForUser(authorizedUser)).toEqual({appId: 'juan-123', appKey: 'secret-key'});
    });
    test('populates main table with local storage data', () => {
        //@ts-ignore
        LocalStorage.readFromLocalStorage = jest.fn().mockReturnValue({
            diaryFood: [{
                date: new Date(),
                meals: {
                    'breakfast': [{
                        name: "pig feet", 
                        amount: 1, 
                        unit: "foot", 
                        calories: 207.06
                    }]
                }
            }]
        });
        
        const myDiaryFoodComponent = createMealDiary('juan', 'breakfast', new Date());
        expect(LocalStorage.readFromLocalStorage).toHaveBeenCalledTimes(2);
        const mainTable = myDiaryFoodComponent.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.tables.main)}`);
        expect(Array.from(mainTable.querySelectorAll('tr'))).toHaveLength(2); // header + 1 row
        expect(Array.from(mainTable.querySelectorAll('td'))).toHaveLength(4); // 4 cells in the 1st row
        expect(Array.from(mainTable.querySelectorAll('th'))).toHaveLength(4); // 4 cells in the header

        const cells = mainTable.querySelectorAll('td');
        expect(cells[0].innerHTML).toBe('pig feet');
        expect(cells[1].innerHTML).toBe('1');
        expect(cells[2].innerHTML).toBe('foot');
        expect(cells[3].innerHTML).toBe('207.06 kcal');
    });
    test('clicking add shows input with two buttons', () => {
        //@ts-ignore
        LocalStorage.readFromLocalStorage = jest.fn().mockReturnValue({
            detailsAPI: {
                key: 'key',
                id: 'id',
            }
        });

        const myDiaryFoodComponent = createMealDiary('juan', 'breakfast', new Date());
        document.body.appendChild(myDiaryFoodComponent);
        const addBtn: HTMLElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnAdd)} button`);
        
        // input and two buttons are hidden
        const inputBefore: HTMLElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.input)}`);
        const btnContainerBefore: HTMLElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnFindCancel)}`);
        expect(inputBefore.style.display).toEqual('none');
        expect(btnContainerBefore.style.display).toEqual('none');
        addBtn.click();
        const inputAfter: HTMLElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.input)}`);
        const btnContainerAfter: HTMLElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnFindCancel)}`);
        expect(inputAfter.style.display).toEqual('');
        expect(btnContainerAfter.style.display).toEqual('');
    });
    test('clicking find sends an api request and puts result in the table', () => {
        //@ts-ignore
        LocalStorage.readFromLocalStorage = jest.fn().mockReturnValue({
            detailsAPI: {
                key: 'key',
                id: 'id',
            }
        });

        //@ts-ignore
        FoodAPI.fetchFoodData = jest.fn();

        const myDiaryFoodComponent = createMealDiary('juan', 'breakfast', new Date());
        document.body.appendChild(myDiaryFoodComponent);
        const addBtn: HTMLElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnAdd)} button`);
        addBtn.click();

        const input: HTMLInputElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.input)}`);
        input.value = '1 slice of pepperoni pizza'

        const findBtn: HTMLButtonElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnFindCancel)} button:first-child`);
        findBtn.click();

        expect(FoodAPI.fetchFoodData).toHaveBeenCalledWith('1 slice of pepperoni pizza', 'id', 'key');
    });
    test('clicking the second add button persist the data in the local storage', async () => {
        //@ts-ignore
        LocalStorage.readFromLocalStorage = jest.fn().mockReturnValue({
            detailsAPI: {
                key: 'key',
                id: 'id',
            }
        });

        //@ts-ignore
        const saveMock = jest.fn();
        Object.defineProperty(LocalStorage, 'saveInLocalStorage', {value: saveMock});

        const mockedAPIResponse: FoodAPI.FoodDataFromResponse = {
            foods: [
                {nf_calories: 200, serving_qty: 1, serving_unit: 'slice', food_name: 'pepperoni pizza'}
            ]
        }

        //@ts-ignore
        FoodAPI.fetchFoodData = jest.fn().mockResolvedValue(mockedAPIResponse);

        const now = new Date();
        const myDiaryFoodComponent = createMealDiary('juan', 'breakfast', now);
        document.body.appendChild(myDiaryFoodComponent);
        const addBtn: HTMLElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnAdd)} button`);
        addBtn.click(); 

        const input: HTMLInputElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.input)}`);
        input.value = '1 slice of pepperoni pizza'

        const findBtn: HTMLButtonElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnFindCancel)} button:first-child`);
        findBtn.click();
        await tick(); // a way to ensure that mocked promise resolves inside after clicking find button (https://stackoverflow.com/questions/37408834/testing-with-reacts-jest-and-enzyme-when-simulated-clicks-call-a-function-that)

        const finalAddBtn: HTMLButtonElement = document.body.querySelector(`.${generateUniqueClassName('breakfast', identifierClasses.btnContainers.btnAddCancel)} button:first-child`);
        finalAddBtn.click();

        const passedArguments = saveMock.mock.calls[0];
        expect(passedArguments[0]).toBe('juan');
        expect(sameDay(passedArguments[1].diaryFood[0].date, new Date())).toBeTruthy()
        const breakfastFromLocalStorage = passedArguments[1].diaryFood[0].meals.breakfast;
        expect(breakfastFromLocalStorage[0].name).toBe(mockedAPIResponse.foods[0].food_name);
        expect(breakfastFromLocalStorage[0].amount).toBe(mockedAPIResponse.foods[0].serving_qty);
        expect(breakfastFromLocalStorage[0].unit).toBe(mockedAPIResponse.foods[0].serving_unit);
        expect(breakfastFromLocalStorage[0].calories).toBe(mockedAPIResponse.foods[0].nf_calories);
    });
})

function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    })
}