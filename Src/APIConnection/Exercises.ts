async function fetchExercisesData(exercise: string, appId: string, appKey: string){
    const url = "https://trackapi.nutritionix.com/v2/natural/exercise";
    const requestJSON = {"query": exercise}
    
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
    
    return response.json();
}

export { fetchExercisesData };