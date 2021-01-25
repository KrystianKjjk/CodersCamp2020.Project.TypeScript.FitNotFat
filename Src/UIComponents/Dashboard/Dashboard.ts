function createStyledElement(tagName: string, ...classList: string[]): HTMLElement {
    let element = document.createElement(tagName);
    element.classList.add(...classList);
    return element;
}

function dashboard(): HTMLDivElement {
    let dashboard = createStyledElement('div', 'dashboard') as HTMLDivElement;
    let ellipse1 = createStyledElement('div', 'dashboard');
    dashboard.appendChild(ellipse1);
    return dashboard;
}

export default dashboard;