import { unauthorizedUserLogic } from '../Src/Logic/RegistrationLoginTransition/RegistrationLoginTransition';
import { getLoggedInUser } from '../Src/UIComponents/utils/utils';
import { viewDashboard } from '../Src/UIComponents/ViewDashboard/ViewDashboard';
import { readFromLocalStorage } from './Logic/LocalStorage/LocalStorage';
import { overviewComponent, OVERVIEW_CONTAINER_CLASS_NAME } from './UIComponents/Overview/Overview';

const userName = getLoggedInUser();
const userObject = readFromLocalStorage(userName);

function showView(){
    if (userName) {
        return viewDashboard();
    } else {
        return unauthorizedUserLogic();
    }
};

document.body.appendChild(showView());

//generate the gauges for the overview if user is logged in
if(userName) overviewComponent(userObject, OVERVIEW_CONTAINER_CLASS_NAME);
