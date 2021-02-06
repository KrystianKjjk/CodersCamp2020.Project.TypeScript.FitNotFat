import loginButton from '../Src/Logic/LoginButton/LoginButton';
import {saveInLocalStorage} from '../Src/Logic/LocalStorage/LocalStorage';
import {User} from '../Models/User.model';
import {ActivityLevel} from '../Models/ActivityLevel.model';

const username = 'User';
const fakeUsername = 'UserNotFound';
const user: User = {
  name: username,
  gender: 'Male',
  dateOfBirth: new Date(),
  height: 177,
  activityLevel: ActivityLevel.Low,
  goalWeight: 70,  
};
saveInLocalStorage(username, user);

const userDashboard = jest.fn((user: User) => document.createElement('div'));
const failComp = document.createElement('p');
const loginBtn = document.createElement('button');
const loginView = document.createElement('div');
loginView.append(loginBtn, document.createElement('p'));
window.alert = (str: string) => {console.log(str)};

describe('Login Button callback test', () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.appendChild(loginView);
  });
  test('if user exists', () => {
    loginButton.call(loginBtn, username, userDashboard, failComp);
    expect(document.body.children[0]).toBeInstanceOf(HTMLDivElement);
    expect(document.body.children).toHaveLength(1);
    expect(userDashboard).toHaveBeenCalledTimes(1);
    expect(userDashboard).toHaveBeenCalledWith(user);
  });
  test('if user does not exist', () => {
    loginButton.call(loginBtn, fakeUsername, userDashboard, failComp);
    expect(loginBtn.parentElement.children).toContain(failComp);
  });
});