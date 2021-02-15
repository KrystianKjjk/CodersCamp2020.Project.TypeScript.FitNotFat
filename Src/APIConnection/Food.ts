import showModalWindow from "../UIComponents/ModalWindow/ModalWindow";

export interface FoodItemFromAPI {
    food_name: string;
    serving_qty: number;
    serving_unit: string;
    nf_calories: number;
}

export interface FoodDataFromResponse {
    foods: FoodItemFromAPI[];
}

async function fetchFoodData(food: string, appId: string, appKey: string): Promise<FoodDataFromResponse> {
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const requestJSON = {'query': food}
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestJSON),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'x-app-id': appId,
            'x-app-key': appKey,
          },
    });

    if (response.status === 401) {
        showModalWindow('Incorrect API KEY or API ID');
    } else if (response.status === 404) {
        showModalWindow(`${food} not found in API Database`);
    }
    
    return response.json();
}

export { fetchFoodData };