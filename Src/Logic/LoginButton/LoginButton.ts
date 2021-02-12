import {readFromLocalStorage} from '../LocalStorage/LocalStorage';
import {User} from '../../../Models/User.model';
import {setLoggedInUser} from '../../UIComponents/utils/utils';
import {USER_INPUT_EMPTY} from '../../../Constants/consts';
import showModalWindow from '../../../Src/UIComponents/ModalWindow/ModalWindow';
function loginButton(username: string, userDashboard: (user: string) => HTMLElement): void {
     
    const user=readFromLocalStorage(username) as User|null;
    if (!username){
        showModalWindow(USER_INPUT_EMPTY);  
    }
    else if(user) {
        setLoggedInUser(user.name);
        Array.from(document.body.children).forEach(element => {
            element.remove();
        });
        document.body.append(userDashboard(user.name));
        return;
    }else{
    showModalWindow('User with given nickname does not exist.');
    }
    
}

export default loginButton;