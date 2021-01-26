import {FoodDetails} from "./FoodDetails.model";

export interface DiaryFood {
    date: Date,
    recommendedKcal: number,
    providedKcal: number,
    breakfast?: FoodDetails [],
    lunch?: FoodDetails [],
    dinner?: FoodDetails [],
    snacks?: FoodDetails []
}
