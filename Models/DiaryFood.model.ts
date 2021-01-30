import {FoodDetails} from "./FoodDetails.model";

type MealMap = {
    [key: string]: FoodDetails[];
}

export interface DiaryFood {
    date: Date,
    recommendedKcal: number,
    providedKcal: number,
    meals?: MealMap
}

export class MyDiaryFood implements DiaryFood {
    date: Date;
    recommendedKcal: number;
    providedKcal: number;
    meals: MealMap;

    constructor(data: DiaryFood) {
        Object.assign(this, data);
        this.meals = data.meals || {};
    }

    addMeal(key: string, item: FoodDetails) {
        this.meals[key] = [ ...(this.meals[key] ? this.meals[key] : []), item];
        return this;
    }
}
