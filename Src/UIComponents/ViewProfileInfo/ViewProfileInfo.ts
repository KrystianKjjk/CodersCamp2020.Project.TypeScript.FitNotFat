import dashboardView from "../DashboardView/DashboardView";
import { SetProfileInfo } from "../../Logic/SetProfileInfo/SetProfileInfo";
import { readFromLocalStorage } from "../../Logic/LocalStorage/LocalStorage";
import { getLoggedInUser } from "../utils/utils";
import { createElement } from "../../UIComponents/utils/utils";
import { VIEW_NAME } from '../../../Constants/consts';

export function ViewProfileInfo(): HTMLElement {

  const userName = getLoggedInUser();
  const userObject = readFromLocalStorage(userName);
  let profileInfoView;
  let profileInfoComponent;

  if(userName && userObject) {
    profileInfoComponent = SetProfileInfo(userObject);
    profileInfoView = dashboardView(VIEW_NAME.MyProfile, profileInfoComponent);
  }
  else {
    profileInfoView = dashboardView(VIEW_NAME.MyProfile, (createElement('div', 'error-view', 'Something went wrong') as HTMLDivElement));
  }

  return profileInfoView;
}

