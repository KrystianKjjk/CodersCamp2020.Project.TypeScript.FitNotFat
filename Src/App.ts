import { unauthorizedUserLogic } from '../Src/Logic/RegistrationLoginTransition/RegistrationLoginTransition';
import { getLoggedInUser } from '../Src/UIComponents/utils/utils';
import { viewDashboard } from '../Src/UIComponents/ViewDashboard/ViewDashboard';

const userName = getLoggedInUser();

function showView(){
    if (userName) {
        return viewDashboard();
    } else {
        return unauthorizedUserLogic();
    }
};

document.body.appendChild(showView());