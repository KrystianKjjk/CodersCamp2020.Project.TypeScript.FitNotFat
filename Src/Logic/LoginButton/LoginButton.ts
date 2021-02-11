import {readFromLocalStorage} from '../LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
import showModalWindow from '../../../Src/UIComponents/ModalWindow/ModalWindow';
function loginButton(username: string, userDashboard: (user: User) => HTMLElement): void {
    const user = readFromLocalStorage(username) as User;
    const loginBtn = this as HTMLButtonElement;
    if(user) {
        Array.from(document.body.children).forEach(element => {
            element.remove();
        });
        document.body.append(userDashboard(user));
    } else {
        showModalWindow('User with given nickname does not exist.');
    }
}

export default loginButton;