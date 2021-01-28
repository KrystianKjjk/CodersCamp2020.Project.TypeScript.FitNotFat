import JustGage from "justgage";

//you need to first create an element with some ID and then provide this ID as an argument 
//gauge will be inserted within this element

function createGauge(elementID:string, value:number, min:number, max:number){
        new JustGage({
            id: elementID, // the id of the html element
            value: value,   //value of the element
            min: min,   //min value of the gauge
            max: max    //max vlue of the gauge
        }); 
}

export default createGauge;