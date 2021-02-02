import { Weight } from './Weight.model'
import { Goal } from './Goal.model'
import { DiaryFood } from './DiaryFood.model'
import { DiaryExercises } from "./DiaryExercises.model";
import { ActivityLevel } from './ActivityLevel.model';
import { DetailsAPI } from './DetailsAPI.model';

export interface User {
    name: string,
    gender: 'Male' | 'Female',
    dateOfBirth: Date,
    height: number,
    goalWeight: number,
    activityLevel: ActivityLevel,
    diaryFood?: DiaryFood[],
    diaryExercises?: DiaryExercises[],
    goals?: Goal[],
    weights?: Weight[],
    detailsAPI?: DetailsAPI
}
