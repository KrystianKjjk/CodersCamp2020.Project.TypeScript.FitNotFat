import { profileInfo } from "../../UIComponents/ProfileInfo/ProfileInfo";
import {readFromLocalStorage} from '../../../Src/Logic/LocalStorage/LocalStorage';
import {ActivityLevel} from "../../../Models/ActivityLevel.model";
import {WeeklyGoal} from "../../../Models/WeeklyGoal.model";

const NO_USER_ERROR = `User doesn't exist!`;

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

function setProfileInfo(username: string) {
    const user = readFromLocalStorage(username);
    let subUser: SubUser;

    if(!user) {

        subUser = {
            username: user.name,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            height: user.height,
            weight: user.weights[0].weight,
            activityLevel: user.activityLevel,
            weeklyGoal: user.goals[0].weeklyGoal,
            goalWeight: user.goalWeight
        }
    }
    else {
        alert(NO_USER_ERROR);
        return;
    }

    return profileInfo(subUser);
}
