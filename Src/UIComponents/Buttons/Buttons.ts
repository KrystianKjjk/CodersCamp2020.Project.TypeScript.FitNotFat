function generateButton(label:string, onClick:Function, infill:boolean) :HTMLButtonElement {
   
    const button:HTMLButtonElement = document.createElement('button');
    button.className = 'button';
    button.innerText = label;

    button.style.backgroundColor = infill ? "#DA1B36" : "white";       
    button.style.color = infill ? "white": "#DA1B36";  

    button.addEventListener('click', (e) => {
        onClick();
    }); 

    return button;
  }


  function generateRedButton(label:string , onClick:Function):HTMLButtonElement {
    return generateButton(label , onClick, true);
  }

  function generateWhiteButton(label:string , onClick:Function):HTMLButtonElement {
    return generateButton(label , onClick, false);
  }

  export {generateWhiteButton, generateRedButton};