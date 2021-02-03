export interface FoodItemData {
    food_name: string;
    serving_qty: number;
    serving_unit: string;
    nf_calories: number;
}

export interface FoodDataFromResponse {
    foods: FoodItemData[];
}

async function fetchFoodData(food: string): Promise<FoodDataFromResponse> {
    const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const requestJSON = {"query": food}
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestJSON),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'x-app-id': 'X',
            'x-app-key': 'C'
          },
    });
    
    return response.json();
}

async function foodData(food: string, callback: (data: string[]) => void) {
    const apiFood = await fetchFoodData(food);
    console.log(apiFood);
    return apiFood.foods.forEach(foodItem => callback([
        foodItem.food_name, 
        ''+foodItem.serving_qty, 
        foodItem.serving_unit, 
        foodItem.nf_calories+' kcal'
    ]));
}

export { fetchFoodData, foodData };