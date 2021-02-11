import { generateMyGoals } from "../../Logic/MyGoals/MyGoals";
import { getLoggedInUser } from "../utils/utils";
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

  return myGoalsView;
}
