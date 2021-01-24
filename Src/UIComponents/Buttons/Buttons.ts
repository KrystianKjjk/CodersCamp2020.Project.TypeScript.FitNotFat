function generateButton(label:string , onClick:Function, infill:boolean) {
    
    if (typeof label !== 'string') {
      throw Error('Label should be a string.');
    }

    if (typeof onClick !== 'function'){
      throw Error('OnClick should be a function.');
    }

    if (typeof infill !== 'boolean'){
        throw Error('Infill should be a boolean');
      }
    
    const button:HTMLButtonElement = document.createElement('button');
    button.className = 'button';
    button.innerText = label;

    if(infill){
        button.style.backgroundColor = "#DA1B36";
        button.style.color = "white";
    } else {
        button.style.backgroundColor = "white";
        button.style.color = "#DA1B36";
    }
    
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