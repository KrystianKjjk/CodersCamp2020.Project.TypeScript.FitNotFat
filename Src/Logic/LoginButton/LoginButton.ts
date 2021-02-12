import {readFromLocalStorage} from '../LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
import {setLoggedInUser, getLoggedInUser} from '../../UIComponents/utils/utils';
import {USER_INPUT_EMPTY} from '../../../Constants/consts';
import showModalWindow from '../../../Src/UIComponents/ModalWindow/ModalWindow';
function loginButton(username: string, userDashboard: (user: User) => HTMLElement): void {
     
    const loggedIn = getLoggedInUser();
    const user = readFromLocalStorage(loggedIn ? loggedIn : username) as User | null;
    const loginBtn = this as HTMLButtonElement;
    if (!username){
        showModalWindow(USER_INPUT_EMPTY);  
    }
    else if(user) {
        setLoggedInUser(user.name);
        Array.from(document.body.children).forEach(element => {
            element.remove();
        });
        document.body.append(userDashboard(user));
        return;
    }else{
    showModalWindow('User with given nickname does not exist.');
    }
    
}

export default loginButton;