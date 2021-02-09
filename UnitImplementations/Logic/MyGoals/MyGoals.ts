import { generateMyGoals } from '../../../Src/Logic/MyGoals/MyGoals';
import {saveInLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import { User } from '../../../Models/User.model';
import { ActivityLevel } from '../../../Models/ActivityLevel.model';
import { Goal } from '../../../Models/Goal.model';
import { WeeklyGoal } from '../../../Models/WeeklyGoal.model';

const firstGoal: Goal = {
  date: new Date(),
  weeklyGoal: WeeklyGoal.Gain,
};

const testUser: User = {
  name: 'TestUser',
  gender: 'Male',
  dateOfBirth: new Date(),
  height: 180,
  goalWeight: 90,
  activityLevel: ActivityLevel.Active,
  goals: [firstGoal],
};

saveInLocalStorage(testUser.name, testUser);

document.body.appendChild(generateMyGoals(testUser.name));
