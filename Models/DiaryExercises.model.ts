import {ExercisesDetails} from "./ExercisesDetails.model";

type ExercisesMap = {
    [key: string]: ExercisesDetails[];
}

export interface DiaryExercises {
    date: Date,
    totalCalories: number,
    exercises?: ExercisesMap
}

export class MyDiaryExercises implements DiaryExercises {
    date: Date;
    totalCalories: number;
    exercises: ExercisesMap;

    constructor(data: DiaryExercises) {
        Object.assign(this, data);
        this.exercises = data.exercises || {};
    }

    addMeal(key: string, item: ExercisesDetails) {
        this.exercises[key] = [ ...(this.exercises[key] ? this.exercises[key] : []), item];
        return this;
    }
}