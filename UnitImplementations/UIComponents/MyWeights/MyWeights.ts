import { myWeightsComponent } from '../../../Src/UIComponents/MyWeights/MyWeights'
import { User } from '../../../Models/User.model';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';

let dummyobject: User = {
    name: "kotek",
    gender: 'Male',
    dateOfBirth: new Date,
    height: 180,
    goalWeight: 90,
    activityLevel: ActivityLevel.Low,
    weights:[
        {date: new Date(2021, 1, 2), weight: 70},
        {date: new Date(2021, 1, 3), weight: 75},
        {date: new Date(2021, 1, 4), weight: 80},
        {date: new Date(2021, 1, 5), weight: 85},
        {date: new Date(2021, 1, 6), weight: 90},
        {date: new Date(2021, 1, 7), weight: 95},
        {date: new Date(2021, 1, 8), weight: 100},
        {date: new Date(2021, 3, 9), weight: 110},
        {date: new Date(2021, 7, 12), weight: 150},
        {date: new Date(2021, 1, 3), weight: 75},
        {date: new Date(2021, 1, 4), weight: 80},
        {date: new Date(2021, 1, 5), weight: 85},
        {date: new Date(2021, 1, 6), weight: 90},
        {date: new Date(2021, 1, 7), weight: 95},
        {date: new Date(2021, 1, 8), weight: 100},
        {date: new Date(2021, 3, 9), weight: 110}
    ]
};

document.body.appendChild(myWeightsComponent(dummyobject));
