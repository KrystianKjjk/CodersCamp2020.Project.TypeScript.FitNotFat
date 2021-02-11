import myWeightsComponent from "../MyWeights/MyWeights";
import dashboardView from "../DashboardView/DashboardView";
import { getLoggedInUser } from "../utils/utils";
import { readFromLocalStorage } from "../../Logic/LocalStorage/LocalStorage";

const myWeights = 'My weights';

export function ViewMyWeights(): HTMLElement {
  const userName = getLoggedInUser();
  const userObject = readFromLocalStorage(userName);
  let weightsComponent;
  let myWeightsView;

  if(userName && userObject) {
    for(let key in userObject.weights) {
      userObject.weights[key].date = new Date(userObject.weights[key].date);
    }
    weightsComponent = myWeightsComponent(userObject);
    myWeightsView = dashboardView(myWeights, weightsComponent);
  }
  else {
    //profileInfoView = dashboardView(myProfile, (createElement('div', '', 'Something went wrong') as HTMLDivElement));
  }

  return myWeightsView;
}
