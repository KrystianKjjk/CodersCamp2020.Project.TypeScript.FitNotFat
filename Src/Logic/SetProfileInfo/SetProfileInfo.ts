import { profileInfo } from "../../UIComponents/ProfileInfo/ProfileInfo";
import {readFromLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import {ActivityLevel} from "../../../Models/ActivityLevel.model";
import {WeeklyGoal} from "../../../Models/WeeklyGoal.model";
import { User } from '../../../Models/User.model';

interface SubUser {
    username: string,
    gender: 'Male' | 'Female',
    dateOfBirth: Date,
    height: number, // cm
    weight: number, // kg
    activityLevel: ActivityLevel,
    weeklyGoal: WeeklyGoal,
    goalWeight: number, // kg
}

export function SetProfileInfo(user: User) {

    let subUser: SubUser;

    try {
        subUser = {
            username: user.name,
            gender: user.gender,
            dateOfBirth: user?.dateOfBirth,
            height: user.height,
            weight: user.weights[0].weight,
            activityLevel: user.activityLevel,
            weeklyGoal: user.goals[0].weeklyGoal,
            goalWeight: user.goalWeight
        }
    }
    catch { return; }

    return profileInfo(subUser);
}
