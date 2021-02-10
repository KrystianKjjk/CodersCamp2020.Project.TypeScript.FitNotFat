import { createElement } from '../utils/utils';

type ButtonType = "button" | "submit";

function generateButton(label:string, onClick:Function, infill:boolean, type:ButtonType = "button"): HTMLButtonElement {
    const button = createElement('button', 'button') as HTMLButtonElement;
    button.innerText = label;
    button.style.backgroundColor = infill ? "#DA1B36" : "white";
    button.style.color = infill ? "white": "#DA1B36";  
    button.type = type;
    button.addEventListener('click', (e) => {
        onClick();
    }); 
    return button;
  }

  function generateRedButton(label:string , onClick:Function, type:ButtonType = "button"):HTMLButtonElement {
    return generateButton(label , onClick, true, type);
  }

  function generateWhiteButton(label:string , onClick:Function):HTMLButtonElement {
    return generateButton(label , onClick, false);
  }

  export {generateWhiteButton, generateRedButton};
