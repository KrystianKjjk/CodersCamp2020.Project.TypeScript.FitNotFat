import overviewComponent from '../../../Src/UIComponents/Overview/Overview';
import { User } from '../../../Models/User.model';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';
import { saveInLocalStorage, readFromLocalStorage } from '../../../Src/Logic/LocalStorage/LocalStorage';

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