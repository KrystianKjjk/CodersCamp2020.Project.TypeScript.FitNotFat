import {saveInLocalStorage, readFromLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';

let dummyobject = {
    name: 'pies',
    race: 'kot',
    smile: 'pretty'
}

let name = 'kotek';

saveInLocalStorage(name, dummyobject);

console.log('Data saved...');
console.log('Data gathered:');
console.log(readFromLocalStorage(name));