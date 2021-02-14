import { ActivityLevel } from '../Models/ActivityLevel.model';
import { User } from '../Models/User.model';
import createExercisesDiary, {identifierClasses} from '../Src/UIComponents/Exercises/Exercises';
import * as LocalStorage from '../Src/Logic/LocalStorage/LocalStorage';
import * as ExercisesAPI from '../Src/APIConnection/Exercises';


describe('MyDiaryFood', () => {
    //@ts-ignore
    LocalStorage.readFromLocalStorage = jest.fn().mockReturnValue({
        diaryExercises: [{
            name: 'username',
            date: new Date(),
            exercises: {
                'exercise': [{
                    name: "test exercise",
                    met: 1,
                    duration: 1,
                    calories: 1
                }]
            }
        }]
    });
    const myExercisesComponent = createExercisesDiary('username', 'exercise', new Date());

    test('populates main table with local storage data', () => {
        //check if data was read
        expect(LocalStorage.readFromLocalStorage).toHaveBeenCalledTimes(2);
        //check if table contains the correct content
        const cells = myExercisesComponent.querySelectorAll('td');
        expect(cells[0].innerHTML).toBe('test exercise');
        expect(cells[1].innerHTML).toBe('1');
        expect(cells[2].innerHTML).toBe('1');
        expect(cells[3].innerHTML).toBe('1 kcal');
    });

    test('clicking add shows input with two buttons', () => {
        //@ts-ignore
        LocalStorage.readFromLocalStorage = jest.fn().mockReturnValue({
            detailsAPI: {
                key: 'key',
                id: 'id',
            }
        });
        const myExercisesComponent = createExercisesDiary('username', 'exercise', new Date());
        const addBtn: HTMLElement = myExercisesComponent.querySelector('.button-container-add > .button');

        // input and two buttons are hidden
        const inputBefore: HTMLElement = myExercisesComponent.querySelector(`.${identifierClasses.input}`);
        const btnContainerBefore: HTMLElement = myExercisesComponent.querySelector(`.${identifierClasses.btnContainers.btnFindCancel}`);
        expect(inputBefore.style.display).toEqual('none');
        expect(btnContainerBefore.style.display).toEqual('none');
        addBtn.click();

        // input and two buttons are visible
        const inputAfter: HTMLElement = myExercisesComponent.querySelector(`.${identifierClasses.input}`);
        const btnContainerAfter: HTMLElement = myExercisesComponent.querySelector(`.${identifierClasses.btnContainers.btnFindCancel}`);
        expect(inputAfter.style.display).toBeTruthy;
        expect(btnContainerAfter.style.display).toBeTruthy;
    });

    test('clicking find sends an api request', () => {
        //@ts-ignore
        LocalStorage.readFromLocalStorage = jest.fn().mockReturnValue({
            detailsAPI: {
                key: 'key',
                id: 'id',
            }
        });

        //@ts-ignore
        ExercisesAPI.fetchExercisesData = jest.fn();

        const myExercisesComponent = createExercisesDiary('username', 'exercise', new Date());
        const addBtn: HTMLElement = myExercisesComponent.querySelector(`.${identifierClasses.btnContainers.btnAdd}`);
        addBtn.click();

        const input: HTMLInputElement = myExercisesComponent.querySelector(`.${identifierClasses.input}`);
        input.value = 'jump';

        const findBtn: HTMLButtonElement = myExercisesComponent.querySelector(`.${identifierClasses.btnContainers.btnFindCancel} > .button`);
        findBtn.click();
        expect(ExercisesAPI.fetchExercisesData).toHaveBeenCalledTimes(1);
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

        const mockedAPIResponse: ExercisesAPI.ExerciseDataFromResponse = {
            exercises: [
                {name: 'testexercise', met: 1, duration_min: 10, nf_calories: 100}
            ]
        }

        //@ts-ignore
        ExercisesAPI.fetchExercisesData = jest.fn().mockResolvedValue(mockedAPIResponse);

        const myDiaryFoodComponent = createExercisesDiary('username', 'exercise', new Date());
        document.body.appendChild(myDiaryFoodComponent);
        const addBtn: HTMLElement = document.body.querySelector(`.${identifierClasses.btnContainers.btnAdd} button`);
        addBtn.click(); 

        const input: HTMLInputElement = document.body.querySelector(`.${identifierClasses.input}`);
        input.value = 'testexercise'

        const findBtn: HTMLButtonElement = document.body.querySelector(`.${identifierClasses.btnContainers.btnFindCancel} button:first-child`);
        findBtn.click();
        await tick(); // a way to ensure that mocked promise resolves inside after clicking find button (https://stackoverflow.com/questions/37408834/testing-with-reacts-jest-and-enzyme-when-simulated-clicks-call-a-function-that)

        const finalAddBtn: HTMLButtonElement = document.body.querySelector(`.${identifierClasses.btnContainers.btnAddCancel} button:first-child`);
        finalAddBtn.click();

        const passedArguments = saveMock.mock.calls[0];
        expect(passedArguments[0]).toBe('username');        
        const exerciseFromLocalStorage = passedArguments[1].diaryExercises[0].exercises.exercise[0];
        expect(exerciseFromLocalStorage.name).toEqual(mockedAPIResponse.exercises[0].name);
        expect(exerciseFromLocalStorage.met).toEqual(mockedAPIResponse.exercises[0].met);
        expect(exerciseFromLocalStorage.duration).toEqual(mockedAPIResponse.exercises[0].duration_min);
        expect(exerciseFromLocalStorage.calories).toEqual(mockedAPIResponse.exercises[0].nf_calories);
    });
})

function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    })
}