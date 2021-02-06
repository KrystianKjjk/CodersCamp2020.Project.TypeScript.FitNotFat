import loginForm from '../Src/UIComponents/LogIn/LogIn';

const loginBtnLogic = jest.fn();
const username = 'User7';

describe(('tests for Log In Form Component'),()=>{
    
    beforeEach(() => {
        loginBtnLogic.mockClear();
    })

    test('render correctly', () => {
       const form = loginForm(loginBtnLogic);
       expect(form).toMatchSnapshot();
    })

    test("call mock function with login button and username", () => {
        const form = loginForm(loginBtnLogic);
        const nameInput = form.querySelector('input.name') as HTMLInputElement;
        const loginButton = form.querySelector('button');
        nameInput.value = username;
        loginButton.click();
        expect(loginBtnLogic).toBeCalledTimes(1);
        expect(loginBtnLogic).toBeCalledWith(loginButton, username);
    })
})