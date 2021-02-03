import myWeightsComponent from '../Src/UIComponents/MyWeights/MyWeights'
import { User } from '../Models/User.model';
import { ActivityLevel } from '../Models/ActivityLevel.model';

let dummyobject: User = {
    name: "kotek",
    gender: 'Male',
    dateOfBirth: new Date,
    height: 180,
    goalWeight: 90,
    activityLevel: ActivityLevel.Low,
    weights:[
        {date: new Date(2021, 1, 2), weight: 70},
        {date: new Date(2021, 1, 3), weight: 75}
    ]
};
const myWeights = myWeightsComponent(dummyobject);
document.body.appendChild(myWeights);


describe('My Weights full component check', () => {
    test('returns the myweights component', () => {
        expect(document.querySelector('.my-weights-container')).toBeTruthy;
    })

    test('component contains header', () => {
        expect(document.querySelector('.myweights-header')).toBeTruthy;
    })

    test('component contains table with values', () => {
        expect(document.querySelectorAll('.table-style tr').length).toEqual(3);
    })

    test('displays error if there is no weight provided', () => {
        delete dummyobject.weights;
        document.body.replaceChild(myWeightsComponent(dummyobject), myWeights);
        expect(document.querySelector('.empty-weights-error').innerHTML).toBe('No weights to be displayed :(');
    })
});
