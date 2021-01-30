import {saveInLocalStorage, readFromLocalStorage} from '../Src/Logic/LocalStorage/LocalStorage';
import {User} from '../Models/User.model';
import { ActivityLevel } from '../Models/ActivityLevel.model';

let dummyobject: User = {
    name: "kotek",
    gender: 'Male',
    dateOfBirth: new Date,
    height: 180,
    goalWeight: 90,
    activityLevel: ActivityLevel.Low
};

//mocked LocalStorage
class LocalStorageMock {
    store: object;
    length: number;
    key: (index:number) => string;
    
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key];
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  };
  
  global.localStorage = new LocalStorageMock;

describe('Local Storage test', () => {
    test('saves object in Local Storage', () => {
        saveInLocalStorage("test", dummyobject);
        expect(localStorage.getItem("test")).toBeTruthy;
    })

    test('restores object from Local Storage', () => {
        const retrievedObject = readFromLocalStorage("test");
        expect(retrievedObject).toBeTruthy;
    })
});