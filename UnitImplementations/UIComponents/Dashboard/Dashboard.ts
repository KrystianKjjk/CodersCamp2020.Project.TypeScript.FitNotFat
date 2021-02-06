import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard'
const username = 'User';
const overview = document.createElement('div');
overview.innerHTML = "Overview";
const myDiaryFood = document.createElement('div');
myDiaryFood.innerHTML = "Food";
const myDiaryExercises = document.createElement('div');
myDiaryExercises.innerHTML = "Exercises";
const myGoals = document.createElement('div');
myGoals.innerHTML = "Goals";
const myWeights = document.createElement('div');
myWeights.innerHTML = "Weights";
const myProfile = document.createElement('div');
myProfile.innerHTML = "Profile";
document.body.appendChild(dashboard(username, {
    'overview': overview, 
    'diary-food': myDiaryFood, 
    'diary-exercises': myDiaryExercises, 
    'goals': myGoals, 
    'weights': myWeights, 
    'profile': myProfile}));