import overviewComponent from "../../../Src/UIComponents/Overview/Overview";
import { readFromLocalStorage } from "../../../Src/Logic/LocalStorage/LocalStorage";
import { createElement, getLoggedInUser } from "../../../Src/UIComponents/utils/utils";
import { ViewProfileInfo } from "../../../Src/UIComponents/ViewProfileInfo/ViewProfileInfo";
import { ViewAPIKey } from "../../../Src/UIComponents/ViewAPIKey/ViewAPIKey";
import { ViewMyWeights } from "../../../Src/UIComponents/ViewMyWeights/ViewMyWeights";
import { ViewMyGoals } from "../../../Src/UIComponents/ViewMyGoals/ViewMyGoals";
import { ViewOverview } from "../../../Src/UIComponents/ViewOverview/ViewOverview";


const viewProfileInfo = ViewProfileInfo();
const viewApiKey = ViewAPIKey();
const viewMyWeights = ViewMyWeights();
const viewMyGoals = ViewMyGoals();
const { viewOverview, viewOverviewContainerName } = ViewOverview();

const username = getLoggedInUser();
const userObject = readFromLocalStorage(username);

//-------- to replace when finished --------------------------------------------
import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard'
import dashboardView from '../../../Src/UIComponents/DashboardView/DashboardView'


const myDiaryFood = dashboardView('Food', createElement('div', [], 'food content') as HTMLDivElement);
const myDiaryExercises = dashboardView('Exercises', createElement('div', [], 'exercises content') as HTMLDivElement);
const logOut = dashboardView('Log Out', createElement('div', [], 'log out content') as HTMLDivElement);
//------------------------------------------------------------------------------

const el = createElement('div');
  document.body.appendChild(dashboard(username, {
    'overview': viewOverview,
    'diary-food': myDiaryFood,
    'diary-exercises': myDiaryExercises,
    'goals': viewMyGoals,
    'weights': viewMyWeights,
    'apiKey': viewApiKey,
    'logOut': logOut,
    'profile': viewProfileInfo}));

  overviewComponent(userObject, viewOverviewContainerName);


