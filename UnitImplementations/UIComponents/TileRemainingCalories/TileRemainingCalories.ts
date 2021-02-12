import { createTileRemainingCalories } from "../../../Src/UIComponents/TileRemainingCalories/TileRemainingCalories";
import generateTileComponent from "../../../Src/UIComponents/TileComponent/TileComponent";

const calories = { remaining: 2500, goal: 2500, exercises: 1000, food: 1000 }
document.body.append(generateTileComponent(createTileRemainingCalories(calories)));
