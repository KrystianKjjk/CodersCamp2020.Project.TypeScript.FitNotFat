import overviewComponent from "../Overview/Overview";
import dashboardView from "../DashboardView/DashboardView";
import { createElement, getLoggedInUser } from "../utils/utils";
import { readFromLocalStorage } from "../../Logic/LocalStorage/LocalStorage";

const overview = 'Overview'

export function ViewOverview() {

  const userName = getLoggedInUser();
  const userObject = readFromLocalStorage(userName);
  let overviewView: HTMLElement;
  const componentsClassName = 'overview-components-container';

  if(userName && userObject) {
    const welcomeHeader = `Hi <span>${userObject.name}</span>, welcome back!`;
    const overviewComponent = createElement('div', componentsClassName)
    overviewView = dashboardView(overview, (overviewComponent as HTMLDivElement), welcomeHeader);
  }
  else {
    overviewView = dashboardView(overview, (createElement('div', '', 'Something went wrong') as HTMLDivElement));
  }

  return { viewOverview: overviewView, viewOverviewContainerName: componentsClassName };
}
