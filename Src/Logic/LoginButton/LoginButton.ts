import {readFromLocalStorage} from '../LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
import dashboard from '../../UIComponents/Dashboard/Dashboard';

function loginButton(username: string): void {
    const user = readFromLocalStorage(username) as User;
    //const loginBtn = this as HTMLButtonElement;
    if(user) {
        Array.from(document.body.children).forEach(element => {
            element.remove();
        });
        //document.body.appendChild(dashboard({}));
    }
}

export default loginButton;