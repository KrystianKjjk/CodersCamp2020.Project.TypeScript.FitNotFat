import { profileInfo } from "../../UIComponents/ProfileInfo/ProfileInfo";
import { ActivityLevel } from "../../../Models/ActivityLevel.model";
import { WeeklyGoal } from "../../../Models/WeeklyGoal.model";
import { User } from "../../../Models/User.model";
import { myWeightsComponent } from '../../UIComponents/MyWeights/MyWeights';

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
            username: user?.name || 'error',
            gender: user?.gender || "Male",
            dateOfBirth: user?.dateOfBirth || new Date(),
            height: user?.height || 0,
            weight: user?.weights?.[0]?.weight || 0,
            activityLevel: user?.activityLevel || ActivityLevel.Regular,
            weeklyGoal: user.goals?.[0]?.weeklyGoal || WeeklyGoal.Keep,
            goalWeight: user?.goalWeight || 0
        }
    }
    catch { return; }

    return profileInfo(subUser);
}

export function RefreshProfileInfo(userObject) {
    const component = document.querySelector('.user-profile');
    if(component) {
        (component.parentNode.parentNode).replaceChild(SetProfileInfo(userObject), component.parentNode);
    }
}
