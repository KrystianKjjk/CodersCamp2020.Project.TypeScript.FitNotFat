import createGauge from './Gauges';
import {generateElementWithClassNameAndId} from '../UtilityFunctions'

//elementID - element ID to append the tile to
function generateGoalTile(name: string, elementID:string, currentValue:number, minValue:number, maxValue:number, unit:string){
        const goalTile = generateElementWithClassNameAndId('div', "goaltile", "");
        const header = generateElementWithClassNameAndId('span', "goalheader", "");
        header.innerText = name.toUpperCase();
        const gauge = generateElementWithClassNameAndId('div', "goalgauge", `${name}gauge`);

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

        const percentage = Math.floor((currentValue/maxValue)*100);

        document.querySelector('.goalgauge > svg > text:nth-child(5) > tspan').innerHTML = `${percentage}%`;
}

export default generateGoalTile;