import {readFromLocalStorage} from '../LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
import {createElement} from '../../UIComponents/utils/utils';
function loginButton(username: string, userDashboard: (user: string) => HTMLElement): void {
    const user = readFromLocalStorage(username) as User;
    const loginBtn = this as HTMLButtonElement;
    if(user) {
        Array.from(document.body.children).forEach(element => {
            element.remove();
        });
        document.body.append(userDashboard(username));
    } else {
        loginBtn.parentElement.append(document.createTextNode('Username does not exist.'));
    }
}

export default loginButton;