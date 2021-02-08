import {createElement} from '../utils/utils';

export default function dashboardView(mainHeader: string, content: HTMLDivElement, header?: string): HTMLDivElement {
    const view = createElement('div', 'dashboard-view') as HTMLDivElement;
    const h1 = createElement('h1', [], mainHeader);
    if(header) view.append(h1, createElement('h2', [], header), content);
    else view.append(h1, content);
    return view;
}