import {FoodDetails} from "./FoodDetails.model";

type MealMap = {
    [key: string]: FoodDetails[];
}

export interface DiaryFoodModel {
    date: Date,
    recommendedKcal: number,
    providedKcal: number,
    meals?: MealMap
}

export class DiaryFood implements DiaryFoodModel {
    date: Date;
    recommendedKcal: number;
    providedKcal: number;
    meals: MealMap;

    constructor(data: DiaryFoodModel) {
        Object.assign(this, data);
        this.meals = data.meals || {};
    }

    addMeal(key: string, item: FoodDetails) {
        this.meals[key] = [ ...(this.meals[key] ?? []), item];
        return this;
    }
}
