import dashboard from '../../../Src/UIComponents/Dashboard/Dashboard'
let overview = document.createElement('div');
let myDiaryFood = document.createElement('div');
let myDiaryExercises = document.createElement('div');
let myGoals = document.createElement('div');
let myWeights = document.createElement('div');
let myProfile = document.createElement('div');
document.body.appendChild(dashboard(overview, myDiaryFood, myDiaryExercises, myGoals, myWeights, myProfile));