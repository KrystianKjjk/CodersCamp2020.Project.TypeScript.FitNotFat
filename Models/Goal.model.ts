import { WeeklyGoal } from "./WeeklyGoal.model";

export interface Goal {
    date: Date,
    weeklyGoal: WeeklyGoal,
    startWeight?: number,
    endWeight?: number,
    achieved?: boolean;
}
