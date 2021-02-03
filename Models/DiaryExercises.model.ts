import {ExercisesDetails} from "./ExercisesDetails.model";

export interface DiaryExercises {
    date: Date,
    totalCalories: number,
    exercises: ExercisesDetails []
}
