import overviewComponent from '../Src/UIComponents/Overview/Overview';
import { User } from '../Models/User.model';
import { ActivityLevel } from '../Models/ActivityLevel.model';
import * as gauges from '../Src/UIComponents/GoalTile/Gauges'
jest.mock('../Src/UIComponents/GoalTile/Gauges');

let dummyobject: User = {
    name: "kotek",
    gender: 'Male',
    dateOfBirth: new Date,
    height: 180,
    goalWeight: 60,
    activityLevel: ActivityLevel.Low,
    weights:[
        {date: new Date(2021, 1, 2), weight: 70},
        {date: new Date(2021, 1, 3), weight: 75},
        {date: new Date(2021, 1, 4), weight: 80},
        {date: new Date(2021, 1, 5), weight: 85},
        {date: new Date(2021, 1, 6), weight: 90},
        {date: new Date(2021, 1, 7), weight: 95}
    ],
    diaryFood: [{
        date: new Date(),
        recommendedKcal: 1200,
        providedKcal: 1245,
        meals: {
            obiad: [{
                name: 'test',
                amount: 1,
                unit: 'kg',
                calories: 120
            }]
        }
    }]
};

const container = document.createElement('div');
container.className = 'target';
document.body.appendChild(container);

overviewComponent(dummyobject, 'target');

describe('Overview full component check', () => {
    test('returns the overview component', () => {
        expect(document.querySelector('.overview-container')).toBeTruthy;
    })
    test('returns the gaugescomponent', () => {
        expect(document.querySelectorAll('.goalgauge').length).toEqual(2);
    })
    test('returns the mytilecomponent', () => {
        expect(document.querySelectorAll('.my-weight-tile')).toBeTruthy;
    })
    test('returns the overview-header', () => {
        expect(document.querySelectorAll('.overview-header')).toBeTruthy;
    })
    //dont know how to write it :/
    // test('whan data is inputted tiles change the values', () => {
    //     const editButton = document.querySelector('section.my-weight-tile__button-section > button') as HTMLButtonElement;
    //     editButton.click();

    //     const inputField = document.querySelector('section.my-weight-tile__data-section > div > input') as HTMLInputElement;
    //     inputField.value = '100';

    //     const saveButton = document.querySelector('section.my-weight-tile__button-section > button:nth-child(1)') as HTMLButtonElement;
    //     saveButton.click();
        
    //     expect(gauges).toHaveBeenCalledTimes(2);
    // })
});

