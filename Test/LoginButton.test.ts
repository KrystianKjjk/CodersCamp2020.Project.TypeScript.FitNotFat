import loginButton from '../Src/Logic/LoginButton/LoginButton';
import {saveInLocalStorage} from '../Src/Logic/LocalStorage/LocalStorage';
import {User} from '../Models/User.model';
import {ActivityLevel} from '../Models/ActivityLevel.model';
import {clearLoggedInUser, setLoggedInUser} from '../Src/UIComponents/utils/utils';
import showModalWindow from '../Src/UIComponents/ModalWindow/ModalWindow';

jest.mock('../Src/UIComponents/ModalWindow/ModalWindow');
const username = 'User';
const fakeUsername = 'UserNotFound';
const user: User = {
  name: username,
  gender: 'Male',
  dateOfBirth: new Date(),
  height: 177,
  activityLevel: ActivityLevel.Low,
  goalWeight: 70
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
    userDashboard.mockClear();
    clearLoggedInUser();
    document.body.innerHTML = "";
    document.body.appendChild(loginView);
  });
 
  test('should render dashboard if user exists', () => {
    loginButton.call(loginBtn, username, userDashboard);
    expect(document.body.children[0]).toBeInstanceOf(HTMLDivElement);
    expect(document.body.children).toHaveLength(1);
    expect(userDashboard).toHaveBeenCalledTimes(1);
    expect(userDashboard).toHaveBeenCalledWith(user.name);
  });
  test('if user does not exist', () => {
    loginButton.call(loginBtn, fakeUsername, userDashboard, failComp);
    expect(loginBtn.parentElement.children).toContainEqual(failComp);
  });
  test('if user input is empty', () => {
    loginButton.call(loginBtn, '', userDashboard);
    expect(showModalWindow).toBeCalled();
  
  });
});
