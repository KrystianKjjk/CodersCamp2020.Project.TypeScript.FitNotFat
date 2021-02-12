import { saveInLocalStorage } from '../../../Src/Logic/LocalStorage/LocalStorage';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';
import { User } from '../../../Models/User.model';
import createExercisesDiary  from '../../../Src/UIComponents/Exercises/Exercises'

//to test - put your apikey and api id in the object below
let dummyobject: User = {
    name: "kotek",
    gender: 'Male',
    dateOfBirth: new Date('3 August 1994'),
    height: 180,
    goalWeight: 60,
    activityLevel: ActivityLevel.Low,
    detailsAPI: {
        key: "", // <-- here key
        id: "" // <-- here id
    },
    weights:[
        {date: new Date(2021, 1, 2), weight: 70}
    ],
};

saveInLocalStorage('kot', dummyobject);

const container = document.createElement('div');
container.style.display = 'flex';
container.style.height = '700px';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.justifyContent = 'space-around';


const main = createExercisesDiary('kot', 'exercise', new Date());


document.body.appendChild(container);
container.appendChild(main);