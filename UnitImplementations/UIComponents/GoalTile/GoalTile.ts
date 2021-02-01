import generateGoalTile from '../../../Src/UIComponents/GoalTile/GoalTile'
import generateTileComponent from '../../../Src/UIComponents/TileComponent/TileComponent'


const goaltile = document.createElement('div');
goaltile.id = "test";
const tile = generateTileComponent(goaltile);
goaltile.style.height = "100%";
tile.style.width = "25%";
//tile.style.height = "400px";

document.body.appendChild(tile);
generateGoalTile("Weekly Goal", "test", 112, 0, 250, "kg");



