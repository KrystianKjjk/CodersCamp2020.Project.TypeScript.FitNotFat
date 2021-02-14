import { overviewComponent } from "../../../Src/UIComponents/Overview/Overview";
import { readFromLocalStorage, saveInLocalStorage } from "../../../Src/Logic/LocalStorage/LocalStorage";
import { createElement, getLoggedInUser, setLoggedInUser, clearLoggedInUser } from "../../../Src/UIComponents/utils/utils";
import { ViewProfileInfo } from "../../../Src/UIComponents/ViewProfileInfo/ViewProfileInfo";
import { ViewAPIKey } from "../../../Src/UIComponents/ViewAPIKey/ViewAPIKey";
import { ViewMyWeights } from "../../../Src/UIComponents/ViewMyWeights/ViewMyWeights";
import { ViewMyGoals } from "../../../Src/UIComponents/ViewMyGoals/ViewMyGoals";
import { ViewOverview } from "../../../Src/UIComponents/ViewOverview/ViewOverview";
import { ViewMyFood } from "../../../Src/UIComponents/ViewMyFood/ViewMyFood";
import { ViewExercises } from "../../../Src/UIComponents/ViewExercises/ViewExercises";
import { ActivityLevel } from "../../../Models/ActivityLevel.model";
import { User } from "../../../Models/User.model";
import { WeeklyGoal } from "../../../Models/WeeklyGoal.model";



// const username = 'User3';
// const userObject: User = {
//   name: username,
//   gender: 'Male',
//   dateOfBirth: new Date(),
//   height: 177,
//   activityLevel: ActivityLevel.Low,
//   goalWeight: 70,
//   goals: [{
//     date: new Date(),
//     weeklyGoal: WeeklyGoal.Gain,
//     startWeight: 60,
//     endWeight: 71,
//     achieved: 'No'
//   }],
//   weights: [{date: new Date(), weight: 60}]
// };

// clearLoggedInUser();
// setLoggedInUser(username);
// saveInLocalStorage(username, userObject);

const username  = getLoggedInUser();
const userObject = readFromLocalStorage(username);

const viewProfileInfo = ViewProfileInfo();
const viewApiKey = ViewAPIKey();
const viewMyWeights = ViewMyWeights();
const viewMyGoals = ViewMyGoals();
const viewMyFood = ViewMyFood();
const { viewOverview, viewOverviewContainerName } = ViewOverview();
const myDiaryExercises = ViewExercises();

//-------- to replace when finished --------------------------------------------
import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard'
import dashboardView from '../../../Src/UIComponents/DashboardView/DashboardView'

const myDiaryFood = dashboardView('Food', createElement('div', [], 'food content') as HTMLDivElement);
//------------------------------------------------------------------------------

  document.body.appendChild(dashboard(username, {
    'overview': viewOverview,
    'diary-food': viewMyFood,
    'diary-exercises': myDiaryExercises,
    'goals': viewMyGoals,
    'weights': viewMyWeights,
    'apiKey': viewApiKey,
    'profile': viewProfileInfo}));

  overviewComponent(userObject, viewOverviewContainerName);


