import dashboard from '../Src/UIComponents/Dashboard/Dashboard';

describe('Dashboard test', () => {
    test('returns div', () => {
        let overview = document.createElement('div');
        let myDiaryFood = document.createElement('div');
        let myDiaryExercises = document.createElement('div');
        let myGoals = document.createElement('div');
        let myWeights = document.createElement('div');
        let myProfile = document.createElement('div');
        expect(dashboard(overview, myDiaryFood, myDiaryExercises, myGoals, myWeights, myProfile)).toBeInstanceOf(HTMLDivElement);
    })
})