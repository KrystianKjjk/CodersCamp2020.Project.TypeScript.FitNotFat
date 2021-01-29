export const createElement = (type: string, className: string = '') => {
    const createdElement = document.createElement(type);
    className && (createdElement.className = className);

    return createdElement;
}