import {readFromLocalStorage} from '../LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
function loginButton(username: string, userDashboard: (user: User) => HTMLElement, failComp: HTMLParagraphElement): void {
    const user = readFromLocalStorage(username) as User;
    const loginBtn = this as HTMLButtonElement;
    if(user) {
        Array.from(document.body.children).forEach(element => {
            element.remove();
        });
        document.body.append(userDashboard(user));
    } else {
        loginBtn.parentElement.querySelectorAll('p').forEach((elem => {
            elem.remove();
        }))
        loginBtn.parentElement.append(failComp);
    }
}

export default loginButton;