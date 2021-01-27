import {saveInLocalStorage, readFromLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';

let dummyobject = {
    name: 'pies',
    race: 'kot',
    smile: 'pretty'
}

let name = 'kotek';

saveInLocalStorage(name, dummyobject);

console.log('Data saved...');

const retrievedData = readFromLocalStorage(name);
console.log('Data gathered:');
console.log(retrievedData);
console.log(`Sample value read: ${retrievedData.race}`);

