import {readFromLocalStorage} from '../LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
import {setLoggedInUser, getLoggedInUser} from '../../UIComponents/utils/utils';
function loginButton(username: string, userDashboard: (user: User) => HTMLElement, failComp: HTMLParagraphElement): void {
    const loggedIn = getLoggedInUser();
    const user = readFromLocalStorage(loggedIn ? loggedIn : username) as User | null;
    const loginBtn = this as HTMLButtonElement;
    if(user) {
        setLoggedInUser(user.name);
        Array.from(document.body.children).forEach(element => {
            element.remove();
        });
        document.body.append(userDashboard(user));
        return;
    }
    loginBtn.parentElement.querySelectorAll('p').forEach((elem => {
        elem.remove();
    }))
    loginBtn.parentElement.append(failComp);
}

export default loginButton;