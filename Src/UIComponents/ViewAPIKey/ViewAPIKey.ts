import { createTileAPIKey } from "../TileAPIKey/TileAPIKey";
import { getAPIDetails, setAPIDetails } from "../../Logic/APIDetailsStorage/APIDetailsStorage";
import { createElement, getLoggedInUser } from "../utils/utils";
import { VIEW_NAME } from '../../../Constants/consts';
import tile from '../TileComponent/TileComponent';
import dashboardView from "../DashboardView/DashboardView";

export function ViewAPIKey(): HTMLElement {
  const userName = getLoggedInUser();
  let APIKeyComponent;
  let APIKeyView;

  if(userName) {
    APIKeyComponent = createTileAPIKey(userName, getAPIDetails, setAPIDetails);
    APIKeyView = dashboardView(VIEW_NAME.APIKey, tile(APIKeyComponent));
  }
  else {
    APIKeyView = dashboardView(VIEW_NAME.APIKey, (createElement('div', 'error-view', 'Something went wrong') as HTMLDivElement));
  }

  return APIKeyView;
}
