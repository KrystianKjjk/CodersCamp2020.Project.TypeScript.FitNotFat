import loginButton from '../Src/Logic/LoginButton/LoginButton';
import {saveInLocalStorage} from '../Src/Logic/LocalStorage/LocalStorage';
import {User} from '../Models/User.model';
import {ActivityLevel} from '../Models/ActivityLevel.model';
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
const user: User = {
    name: 'User',
    gender: 'Male',
    dateOfBirth: new Date(),
    height: 177,
    activityLevel: ActivityLevel.Low,
    goalWeight: 70,
    
};
saveInLocalStorage('User', user);
global.localStorage = new LocalStorageMock;

describe('Login Button callback test', () => {
    test('do not throw error', () => {
        loginButton('username');
        expect(loginButton.bind(null, 'User')).not.toThrow();
    })
});