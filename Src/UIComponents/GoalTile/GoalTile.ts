import createGauge from './Gauges';
import { createElement } from '../utils/utils';

//elementID - element ID to append the tile to
function generateGoalTile(name: string, elementID:string, currentValue:number, minValue:number, maxValue:number, unit:string){
        const goalTile = createElement('div', "goaltile");
        const header = createElement('span', "goalheader", name.toUpperCase());
        const gauge = createElement('div', "goalgauge");
        gauge.id = `${name}gauge`;

        goalTile.append(header,gauge);
        const parentElement = document.querySelector(`#${elementID}`);
        parentElement.appendChild(goalTile);
        createGauge(`${name}gauge`, currentValue, minValue, maxValue);

        
        //adding an unit to the texts
        document.querySelectorAll('.goalgauge > svg > text > tspan').forEach(text =>{
                const unitText = document.createTextNode(` ${unit}`);
                if(text.innerHTML){
                        text.appendChild(unitText);
                }               
        })

        //replacing the value with percentage
        const percentage = Math.floor((currentValue/maxValue)*100);
        let currentGaugeValue = document.querySelector('.goalgauge > svg > text:nth-child(5) > tspan');

        if(currentGaugeValue){
                currentGaugeValue.innerHTML = `${percentage}%`;
        }        
}

export default generateGoalTile;