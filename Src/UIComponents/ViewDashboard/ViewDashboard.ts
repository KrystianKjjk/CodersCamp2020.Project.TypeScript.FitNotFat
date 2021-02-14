import { ViewProfileInfo } from "../../UIComponents/ViewProfileInfo/ViewProfileInfo";
import { ViewAPIKey } from "../../UIComponents/ViewAPIKey/ViewAPIKey";
import { ViewMyWeights } from "../../UIComponents/ViewMyWeights/ViewMyWeights";
import { ViewMyGoals } from "../../UIComponents/ViewMyGoals/ViewMyGoals";
import { ViewOverview } from "../../UIComponents/ViewOverview/ViewOverview";
import { ViewMyFood } from "../../UIComponents/ViewMyFood/ViewMyFood";
import { ViewExercises } from "../../UIComponents/ViewExercises/ViewExercises";
import dashboard from "../../UIComponents/Dashboard/Dashboard";
import { getLoggedInUser } from "../../UIComponents/utils/utils";

export function viewDashboard():HTMLDivElement{ 
    const username = getLoggedInUser()
    
    const myDiaryExercises = ViewExercises();
    const viewProfileInfo = ViewProfileInfo();
    const viewApiKey = ViewAPIKey();
    const viewMyWeights = ViewMyWeights();
    const viewMyGoals = ViewMyGoals();
    const viewMyFood = ViewMyFood();
    const viewOverview = ViewOverview();
      
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
  