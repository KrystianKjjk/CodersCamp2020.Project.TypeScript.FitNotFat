export const createElement = (type: string, className: string) => {
    const createdElement = document.createElement(type);
    createdElement.className = className;

    return createdElement;
}