import { generateMyGoals } from "../../Logic/MyGoals/MyGoals";
import { createElement, getLoggedInUser } from "../utils/utils";
import { VIEW_NAME } from '../../../Constants/consts';
import dashboardView from "../DashboardView/DashboardView";

export function ViewMyGoals() {

  const userName = getLoggedInUser();
  let myGoalsComponent;
  let myGoalsView;

  if(userName) {
    myGoalsComponent = generateMyGoals(userName);
    myGoalsView = dashboardView(VIEW_NAME.MyGoals, myGoalsComponent)
  }
  else {
    myGoalsView = dashboardView(VIEW_NAME.MyGoals, (createElement('div', 'error-view', 'Something went wrong') as HTMLDivElement));

  }

  return myGoalsView;
}
