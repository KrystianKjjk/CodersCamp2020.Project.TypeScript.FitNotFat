async function getFood(food: string) {
    const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const MAX_RESULTS = 3;
    const requestJSON = {"query": food}
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestJSON),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'x-app-id': 'f3324dd3',
            'x-app-key': '7fa425ed94ca1fe1a1e5541a16ef8885'
          },
    });
    
    return response.json();
}
export { getFood };