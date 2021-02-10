import createGauge from './Gauges';
import { createElement } from '../utils/utils';

//elementID - element ID to append the tile to
function generateGoalTile(name: string, elementID:string, currentValue:number, minValue:number, maxValue:number, unit:string, isReversed:boolean){
        const goalTile = createElement('div', "goaltile");
        const header = createElement('span', "goalheader", name.toUpperCase());
        const gauge = createElement('div', "goalgauge");
        gauge.id = `${name}gauge`;

        goalTile.append(header, gauge);
        const parentElement = document.querySelector(`#${elementID}`);
        parentElement.appendChild(goalTile);

        //create the gauge
        createGauge(`${name}gauge`, currentValue, minValue, maxValue, isReversed);
        
        //adding an unit to the texts
        document.querySelectorAll(`#${elementID} .goalgauge > svg > text > tspan`).forEach(text =>{
                if(text.innerHTML) text.innerHTML += ` ${unit}`;              
        })

        //replacing the value with percentage
        //percentage for calories
        let percentage = Math.floor((currentValue/maxValue)*100);

        //percentage for weight        
        if (unit === "kg" && isReversed) percentage = Math.floor(((maxValue-currentValue)/(maxValue-minValue))*100);       
        if (unit === "kg" && !isReversed) percentage = Math.floor(((currentValue-minValue)/(maxValue-minValue))*100);

        let currentGaugeValue = document.querySelector(`#${elementID} .goalgauge > svg > text:nth-child(5) > tspan`);

        if(currentGaugeValue){
                currentGaugeValue.innerHTML = `${percentage}%`;
        }        
}

export default generateGoalTile;