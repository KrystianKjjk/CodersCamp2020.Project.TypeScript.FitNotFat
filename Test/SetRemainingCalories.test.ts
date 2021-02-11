import { SetRemainingCalories } from "../Src/Logic/SetRemainingCalories/SetRemainingCalories";
import { User } from "../Models/User.model";
import { ActivityLevel } from "../Models/ActivityLevel.model";
import { MyDiaryFood } from "../Models/DiaryFood.model";
import { KEY_LOGGED_USER } from "../Constants/consts";
import { calculateCalories, setLoggedInUser } from '../Src/UIComponents/utils/utils';
import { getAge } from "../Src/UIComponents/Overview/Overview";
import { saveInLocalStorage } from '../Src/Logic/LocalStorage/LocalStorage';

const loggedInUser = 'testUser';
let testUser: User = {
  name: 'testUser',
  gender: 'Male',
  dateOfBirth: new Date(1995, 1, 22),
  height: 177,
  goalWeight: 75,
  activityLevel: ActivityLevel.Regular,

  diaryFood: [
    new MyDiaryFood({
      date: new Date(2021, 1, 11),
      providedKcal: 1000,
      recommendedKcal: 2500,
      meals: {}
    })],
  diaryExercises: [
    {
      date: new Date(),
      totalCalories: 2000,
      exercises: [
        {
          name: 'running',
          met: 9.8,
          duration: 60,
          calories: 686
        }]
    } ],
  weights: [
    {
      date: new Date(2021, 1, 4),
      weight: 68
    } ]
};

const spareDiaryExercises = [
  { date: new Date(2020,10,10),
    totalCalories: 2000,
    exercises: [
      {
        name: 'running',
        met: 9.8,
        duration: 60,
        calories: 686
      }]
  } ];

const userAge = getAge(testUser.dateOfBirth);
const goalCalories = Math.floor(calculateCalories(testUser.gender, testUser.weights[0].weight, testUser.height, userAge, testUser.activityLevel));

describe('set remaining calories component test', () => {

  test('no logged user in local storage',()=>{
    expect(SetRemainingCalories()).toBe(undefined);
  });
  test('logged user - no user object in ls',()=>{
    setLoggedInUser(loggedInUser);
    expect(SetRemainingCalories()).toBe(undefined);
  });
  test('logged user and set correct user object in ls',()=>{
    saveInLocalStorage(loggedInUser,testUser);
    expect(SetRemainingCalories()).toBeInstanceOf(HTMLElement);
  });
  test('diaryExercises correct date and provided kcal',()=>{
    const component = SetRemainingCalories();
    const nodeListRows = component.querySelectorAll('.remaining-calories-tile__section-details--table tr td');
    expect(nodeListRows[2].textContent).toEqual(`${testUser.diaryExercises[0].totalCalories}`);
  });
  test('no diaryExercises field (diaryFood works the same)',()=>{
    delete testUser.diaryExercises;
    saveInLocalStorage(loggedInUser,testUser);
    const component = SetRemainingCalories();
    const nodeListRows = component.querySelectorAll('.remaining-calories-tile__section-details--table tr td');
    expect(nodeListRows[2].textContent).toEqual("0");
  });
  test('no diaryExercises.date field (diaryFood works the same)',()=>{
    testUser.diaryExercises = [];
    saveInLocalStorage(loggedInUser,testUser);
    const component = SetRemainingCalories();
    const nodeListRows = component.querySelectorAll('.remaining-calories-tile__section-details--table tr td');
    expect(nodeListRows[2].textContent).toEqual("0");
  });
  test('diaryExercises not today date',()=>{
    testUser.diaryExercises = spareDiaryExercises;
    saveInLocalStorage(loggedInUser,testUser);
    const component = SetRemainingCalories();
    const nodeListRows = component.querySelectorAll('.remaining-calories-tile__section-details--table tr td');
    expect(nodeListRows[2].textContent).toEqual("0");
  });
  test('all values correctly set',()=>{
    //set today date
    testUser.diaryExercises[0].date = new Date();
    saveInLocalStorage(loggedInUser,testUser);

    const totalNeededCalories = goalCalories + testUser.diaryExercises[0].totalCalories;
    const remainingCalories = totalNeededCalories - testUser.diaryFood[0].providedKcal;

    const component = SetRemainingCalories();
    const nodeListRows = component.querySelectorAll('.remaining-calories-tile__section-details--table tr td');
    expect(component.querySelector('.remaining-calories-tile__number').innerHTML).toBe(`${remainingCalories} <span>kcal</span>`)
    expect(nodeListRows[0].textContent).toEqual(`${goalCalories}`);
    expect(nodeListRows[2].textContent).toEqual(`${testUser.diaryExercises[0].totalCalories}`);
    expect(nodeListRows[4].textContent).toEqual(`${testUser.diaryFood[0].providedKcal}`);
  });
})
