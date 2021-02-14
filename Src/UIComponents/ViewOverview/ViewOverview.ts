import { overviewComponent, OVERVIEW_CONTAINER_CLASS_NAME } from "../Overview/Overview";
import dashboardView from "../DashboardView/DashboardView";
import { createElement, getLoggedInUser } from "../utils/utils";
import { readFromLocalStorage } from "../../Logic/LocalStorage/LocalStorage";
import { VIEW_NAME } from '../../../Constants/consts';

export function ViewOverview() {

  const userName = getLoggedInUser();
  const userObject = readFromLocalStorage(userName);
  let overviewView: HTMLElement;

  if(userName && userObject) {
    const welcomeHeader = `Hi <span>${userObject.name}</span>, welcome back!`;
    const overviewComponentContainer = createElement('div', OVERVIEW_CONTAINER_CLASS_NAME) as HTMLDivElement;
    overviewView = dashboardView(VIEW_NAME.Overview, overviewComponentContainer, welcomeHeader);
  }
  else {
    overviewView = dashboardView(VIEW_NAME.Overview, (createElement('div', 'error-view', 'Something went wrong') as HTMLDivElement));
  }

  return overviewView;
}
