import { generateHomePageContent } from '../Src/UIComponents/HomePage/HomePage';

describe('home page tests', () => {
  let onSignUpClick;
  let onLogInClick;

  beforeEach(() => {
    onSignUpClick = jest.fn();
    onLogInClick=jest.fn();
  });

  test('should render home page component', () => {
    const homePage = generateHomePageContent(onSignUpClick, onLogInClick);
    expect(homePage).toMatchSnapshot();
  });

  test('should call onSignUpClick function after sign up button clicked', () => {
    const homePage = generateHomePageContent(onSignUpClick, onLogInClick);
    const signUpButton = homePage.querySelector(
      '.sign-up-button',
    ) as HTMLButtonElement;
    signUpButton.click();
    expect(onSignUpClick).toHaveBeenCalledTimes(1);
  });

  test('should call onLogInClick function after log in button clicked', () => {
    const homePage = generateHomePageContent(onSignUpClick, onLogInClick);
    const logInButton = homePage.querySelector(
      '.log-in-button',
    ) as HTMLButtonElement;
    logInButton.click();
    expect(onLogInClick).toHaveBeenCalledTimes(1);
  });
});

