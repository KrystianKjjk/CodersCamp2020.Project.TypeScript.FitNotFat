import { WeeklyGoals } from "./WeeklyGoals.model";

export interface Goal {
    date: Date,
    weeklyGoal: WeeklyGoals,
    startWeight: number,
    endWeight: number,
    achieved: 'Yes' | 'No';
}
