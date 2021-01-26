import { Weight } from './Weight.model'
import { Goal } from './Goal.model'
import { DiaryFood } from './DiaryFood.model'
import { DiaryExercises } from "./DiaryExercises.model";

export interface User {
    gender: string,
    dateOfBirth: Date,
    height: number,
    goalWeight: number,
    activityLevel: string,
    diaryFood?: DiaryFood [],
    diaryExercises?: DiaryExercises[],
    goals?: Goal[],
    weights?: Weight[]
}
