import { SetProfileInfo } from "../../Logic/SetProfileInfo/SetProfileInfo";
import dashboardView from "../DashboardView/DashboardView";
import { readFromLocalStorage } from "../../Logic/LocalStorage/LocalStorage";
import { getLoggedInUser } from "../utils/utils";
import { createElement } from "../../UIComponents/utils/utils";

const myProfile = 'My profile';

export function ViewProfileInfo(): HTMLElement {

  const userName = getLoggedInUser();
  const userObject = readFromLocalStorage(userName);
  let profileInfoView;
  let profileInfoComponent;

  if(userName && userObject) {
    profileInfoComponent = SetProfileInfo(userObject);
    profileInfoView = dashboardView(myProfile, profileInfoComponent);
  }
  else {
    profileInfoView = dashboardView(myProfile, (createElement('div', '', 'Something went wrong') as HTMLDivElement));
  }

  return profileInfoView;
}

