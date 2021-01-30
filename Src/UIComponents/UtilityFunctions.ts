function generateElementWithClassNameAndId(typeOfElement:string, className:string, id?:string):HTMLElement{
    const element = document.createElement(typeOfElement);
    element.className = className;
    if(id){
        element.id = id;
    }
    return element;
}

export {generateElementWithClassNameAndId};