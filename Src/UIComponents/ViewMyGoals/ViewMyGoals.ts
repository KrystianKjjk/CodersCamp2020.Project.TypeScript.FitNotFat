import { generateMyGoals } from "../../Logic/MyGoals/MyGoals";
import { createElement, getLoggedInUser } from "../utils/utils";
import dashboardView from "../DashboardView/DashboardView";

const myGoals = 'My goals';

export function ViewMyGoals() {

  const userName = getLoggedInUser();
  let myGoalsComponent;
  let myGoalsView;

  if(userName) {
    myGoalsComponent = generateMyGoals(userName);
    myGoalsView = dashboardView(myGoals, myGoalsComponent)
  }
  else {
    myGoalsView = dashboardView(myGoals, (createElement('div', '', 'Something went wrong') as HTMLDivElement));

  }

  return myGoalsView;
}
