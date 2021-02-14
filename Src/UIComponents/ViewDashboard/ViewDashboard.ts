import { ViewProfileInfo } from "../../../Src/UIComponents/ViewProfileInfo/ViewProfileInfo";
import { ViewAPIKey } from "../../../Src/UIComponents/ViewAPIKey/ViewAPIKey";
import { ViewMyWeights } from "../../../Src/UIComponents/ViewMyWeights/ViewMyWeights";
import { ViewMyGoals } from "../../../Src/UIComponents/ViewMyGoals/ViewMyGoals";
import { ViewOverview } from "../../../Src/UIComponents/ViewOverview/ViewOverview";
import { ViewMyFood } from "../../../Src/UIComponents/ViewMyFood/ViewMyFood";
import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard';
import dashboardView from '../../../Src/UIComponents/DashboardView/DashboardView';
import { createElement } from '../../UIComponents/utils/utils';
import {getLoggedInUser} from '../../UIComponents/utils/utils';

export function viewDashboard():HTMLDivElement{ 
    const username = getLoggedInUser()
    const myDiaryExercises = dashboardView('Exercises', createElement('div', [], 'exercises content') as HTMLDivElement);
    const viewProfileInfo = ViewProfileInfo();
    const viewApiKey = ViewAPIKey();
    const viewMyWeights = ViewMyWeights();
    const viewMyGoals = ViewMyGoals();
    const viewMyFood = ViewMyFood();
    const { viewOverview, viewOverviewContainerName } = ViewOverview();
      
    const dashboardComponents = {
        'overview': viewOverview,
        'diary-food': viewMyFood,
        'diary-exercises': myDiaryExercises,
        'goals': viewMyGoals,
        'weights': viewMyWeights,
        'apiKey': viewApiKey,
        'profile': viewProfileInfo };
  
 return dashboard(username, dashboardComponents);

} 
  