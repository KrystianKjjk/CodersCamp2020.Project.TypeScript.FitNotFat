//function to save the data in the localstorage, inputs is data itself and key name under which it should be kept
function saveInLocalStorage(name:string, object:object){
    localStorage.setItem(name, JSON.stringify(object));
}

//function to retrieve the data per specified key
function readFromLocalStorage(name:string) {
    let retrievedObject = JSON.parse(localStorage.getItem(name));
    return retrievedObject;
}

export {saveInLocalStorage, readFromLocalStorage}