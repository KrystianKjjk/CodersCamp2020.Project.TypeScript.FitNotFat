import generateGoalTile from '../Src/UIComponents/GoalTile/GoalTile'
jest.mock('../Src/UIComponents/GoalTile/Gauges');


const goaltile = document.createElement('div');
goaltile.id = "test";
document.body.appendChild(goaltile);
generateGoalTile("test", "test", 112, 0, 250, "kg");

//just simple tests as the external library handles the displaying
describe('Goal Tile test', () => {
    test('Goal Tile created', () => {
        expect(document.querySelector('.goaltile')).toBeTruthy;
    }) 

    test('Goal Tile contains header', () => {
        expect(document.querySelector('.goalheader')).toBeTruthy;
    }) 

    test('Goal Tile contains gauge', () => {
        expect(document.querySelector('.goalgauge')).toBeTruthy;
    }) 
});
