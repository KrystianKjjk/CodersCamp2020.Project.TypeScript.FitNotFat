import {saveInLocalStorage, readFromLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';

let dummyobject: User = {
    name: "kotek",
    gender: 'Male',
    dateOfBirth: new Date,
    height: 180,
    goalWeight: 90,
    activityLevel: ActivityLevel.Low
};

let name = 'sample';

saveInLocalStorage(name, dummyobject);

console.log('Data saved...');

const retrievedData = readFromLocalStorage(name);
console.log('Data gathered:');
console.log(retrievedData);
console.log(`Sample value read from the retrieved object: ${retrievedData.gender}`);

