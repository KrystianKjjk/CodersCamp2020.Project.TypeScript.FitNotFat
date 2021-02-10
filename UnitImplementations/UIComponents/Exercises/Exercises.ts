import { saveInLocalStorage } from '../../../Src/Logic/LocalStorage/LocalStorage';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';
import { User } from '../../../Models/User.model';
import createExercisesDiary  from '../../../Src/UIComponents/Exercises/Exercises'

let dummyobject: User = {
    name: "kotek",
    gender: 'Male',
    dateOfBirth: new Date,
    height: 180,
    goalWeight: 60,
    activityLevel: ActivityLevel.Low,
    detailsAPI: {
        key: "171b07c6a5a9039aae68a1d3b5e5055d",
        id: "d3c7316a"
    }
};

saveInLocalStorage('kot', dummyobject);

const container = document.createElement('div');
container.style.display = 'flex';
container.style.height = '700px';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.justifyContent = 'space-around';


const main = createExercisesDiary('Kondzio', 'lunch', new Date());


document.body.appendChild(container);
container.appendChild(main);