import { getLoggedInUser, setLoggedInUser, clearLoggedInUser } from "../Src/UIComponents/utils/utils";
import { KEY_LOGGED_USER } from "../Constants/consts";

describe('LoggedInUser functions', () => {

  test('getLoggedInUser if no user', () => {
    expect(getLoggedInUser()).toBe('');
  })
  test('getLoggedInUser if user is set', () => {
    localStorage[KEY_LOGGED_USER] = 'testUser'
    expect(getLoggedInUser()).toBe('testUser');
  })
  test('setLoggedInUser if user exists in local storage', () => {
    expect(setLoggedInUser('user123')).toBe(false);
  })
  test('setLoggedInUser if user does not exists in local storage', () => {
    localStorage[KEY_LOGGED_USER] = ''
    expect(setLoggedInUser('user123')).toBe(true);
  })
  test('clearLoggedInUser', () => {
    localStorage[KEY_LOGGED_USER] = 'testUser';
    clearLoggedInUser();
    expect(getLoggedInUser()).toBe('');
  })
})
