import { createElement, getLoggedInUser } from "../utils/utils";
import { VIEW_NAME } from '../../../Constants/consts';
import { createMyDiaryFoodDashboard } from '../../../Src/UIComponents/MyDiaryFoodDashboard/MyDiaryFoodDashboard';
import dashboardView from "../DashboardView/DashboardView";

export function ViewMyFood() {

  const userName = getLoggedInUser();
  let myDiaryFoodDashboard;
  let myFoodView;

  if(userName) {
    myDiaryFoodDashboard = createMyDiaryFoodDashboard();
    myFoodView = dashboardView(VIEW_NAME.Food, myDiaryFoodDashboard)
  }
  else {
    myFoodView = dashboardView(VIEW_NAME.Food, (createElement('div', 'error-view', 'Something went wrong') as HTMLDivElement));

  }

  return myFoodView;
}
