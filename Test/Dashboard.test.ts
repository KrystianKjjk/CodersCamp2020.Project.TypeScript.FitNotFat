import dashboard from '../Src/UIComponents/Dashboard/Dashboard';

describe('Dashboard test', () => {
    test('returns div', () => {
        let overview = document.createElement('div');
        overview.innerHTML = "Overview";
        let myDiaryFood = document.createElement('div');
        myDiaryFood.innerHTML = "Food";
        let myDiaryExercises = document.createElement('div');
        myDiaryExercises.innerHTML = "Exercises";
        let myGoals = document.createElement('div');
        myGoals.innerHTML = "Goals";
        let myWeights = document.createElement('div');
        myWeights.innerHTML = "Weights";
        let myProfile = document.createElement('div');
        myProfile.innerHTML = "Profile";
        expect(dashboard({
            'overview': overview, 
            'diary-food': myDiaryFood, 
            'diary-exercises': myDiaryExercises, 
            'goals': myGoals, 
            'weights': myWeights, 
            'profile': myProfile})).toBeInstanceOf(HTMLDivElement);
    })
})