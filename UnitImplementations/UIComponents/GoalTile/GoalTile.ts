import generateGoalTile from '../../../Src/UIComponents/GoalTile/GoalTile'
import generateTileComponent from '../../../Src/UIComponents/TileComponent/TileComponent'



const goaltile = document.createElement('div');
goaltile.style.width = "500px";
goaltile.style.height = "500px";
goaltile.id = "test";
const tile = generateTileComponent(goaltile);
document.body.appendChild(tile);
generateGoalTile("test", "test", 201, 0, 250, "kg");



