import { createTileAPIKey } from "../TileAPIKey/TileAPIKey";
import { getAPIDetails, setAPIDetails } from "../../Logic/APIDetailsStorage/APIDetailsStorage";
import { createElement, getLoggedInUser } from "../utils/utils";
import tile from '../TileComponent/TileComponent';
import dashboardView from "../DashboardView/DashboardView";

const apiKey = 'API Key';

export function ViewAPIKey(): HTMLElement {
  const userName = getLoggedInUser();
  let APIKeyComponent;
  let APIKeyView;

  if(userName) {
    APIKeyComponent = createTileAPIKey(userName, getAPIDetails, setAPIDetails);
    APIKeyView = dashboardView(apiKey, tile(APIKeyComponent));
  }
  else {
    APIKeyView = dashboardView(apiKey, (createElement('div', '', 'Something went wrong') as HTMLDivElement));
  }

  return APIKeyView;
}
