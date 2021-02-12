import JustGage from "justgage";

//you need to first create an element with some ID and then provide this ID as an argument 
//gauge will be inserted within this element

function createGauge(elementID:string, value:number, min:number, max:number, isReversed:boolean){
        new JustGage({
            id: elementID, // the id of the html element
            value: Math.round(value),   //value of the element
            min: Math.round(min),   //min value of the gauge
            max: Math.round(max),    //max vlue of the gauge
            gaugeWidthScale: 0.4,
            levelColors: ['#DA1B36'],
            relativeGaugeSize: true,
            displayRemaining: true,
            reverse: isReversed
        }); 
}

export default createGauge;