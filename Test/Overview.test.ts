
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



describe('Overview full component check', () => {
    test('returns the overview component', () => {
        
    })

});
