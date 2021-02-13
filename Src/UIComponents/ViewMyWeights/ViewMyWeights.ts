import { myWeightsComponent } from "../MyWeights/MyWeights";
import dashboardView from "../DashboardView/DashboardView";
import { createElement, getLoggedInUser } from '../utils/utils';
import { readFromLocalStorage } from "../../Logic/LocalStorage/LocalStorage";
import { VIEW_NAME } from '../../../Constants/consts';

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
    myWeightsView = dashboardView(VIEW_NAME.MyWeights, weightsComponent);
  }
  else {
    myWeightsView = dashboardView(VIEW_NAME.MyWeights, (createElement('div', 'error-view', 'Something went wrong') as HTMLDivElement));
  }

  return myWeightsView;
}
