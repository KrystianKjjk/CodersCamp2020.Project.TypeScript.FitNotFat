import { ViewAPIKey } from '../Src/UIComponents/ViewAPIKey/ViewAPIKey';
import { ViewOverview } from '../Src/UIComponents/ViewOverview/ViewOverview';
import { ViewMyGoals } from '../Src/UIComponents/ViewMyGoals/ViewMyGoals';
import { ViewMyWeights } from '../Src/UIComponents/ViewMyWeights/ViewMyWeights';
import { clearLoggedInUser, setLoggedInUser } from '../Src/UIComponents/utils/utils';
import { saveInLocalStorage } from '../Src/Logic/LocalStorage/LocalStorage';
import { ViewProfileInfo } from '../Src/UIComponents/ViewProfileInfo/ViewProfileInfo';
import { User } from '../Models/User.model';
import { ActivityLevel } from '../Models/ActivityLevel.model';
import { WeeklyGoal } from '../Models/WeeklyGoal.model';

const username = 'User3';
const userObject: User = {
  name: username,
  gender: 'Male',
  dateOfBirth: new Date(),
  height: 177,
  activityLevel: ActivityLevel.Low,
  goalWeight: 70,
  goals: [{
    date: new Date(),
    weeklyGoal: WeeklyGoal.Gain,
    startWeight: 60,
    endWeight: 71,
    achieved: 'No'
  }],
  weights: [{date: new Date(), weight: 60}]
};

setLoggedInUser(username);
saveInLocalStorage(username, userObject);

describe('Views are created correctly', () => {

  test('overview view is created properly', () => {
    const viewOverview  = ViewOverview();
    expect(viewOverview.querySelector('.overview-components-container')).not.toBeNull();
  })
  test('myGoals view is created properly',()=>{
    const myGoals = ViewMyGoals();
    expect(myGoals.querySelector('.my-goals-container')).not.toBeNull();
  })
  test('myWeights view is created properly',()=>{
    const myWeights = ViewMyWeights();
    expect(myWeights.querySelector('.my-weights-container')).not.toBeNull();
  })
  test('apiKey view is created properly', () => {
    const apiKey = ViewAPIKey();
    expect(apiKey.querySelector('.api-key-tile')).not.toBeNull();
  })
  test('myProfile view is created properly', () => {
    const myProfile = ViewProfileInfo();
    expect(myProfile.querySelector('.user-profile')).not.toBeNull();
  })
  test('views something went wrong', () => {
    clearLoggedInUser();
    const viewOverview = ViewOverview();
    const myGoals = ViewMyGoals();
    const myWeights = ViewMyWeights();
    const apiKey = ViewAPIKey();
    const myProfile = ViewProfileInfo();
    expect(viewOverview.querySelector('.error-view')).not.toBeNull();
    expect(myGoals.querySelector('.error-view')).not.toBeNull();
    expect(myWeights.querySelector('.error-view')).not.toBeNull();
    expect(apiKey.querySelector('.error-view')).not.toBeNull();
    expect(myProfile.querySelector('.error-view')).not.toBeNull();
  })
})
