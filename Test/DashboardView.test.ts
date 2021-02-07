import dashboardView from '../Src/UIComponents/DashboardView/DashboardView';
import {createElement} from '../Src/UIComponents/utils/utils';

describe('test dashboardView ', () => {
    test('render correctly with second header', () => {
        const content = createElement('div', [], 'Content') as HTMLDivElement;
        const view = dashboardView('View', content, 'Second header!');
        expect(view).toMatchSnapshot('dashboardViewWith2ndHeader');
    })
    test('render correctly without second header', () => {
        const content = createElement('div', [], 'Content') as HTMLDivElement;
        const view = dashboardView('View', content);
        expect(view).toMatchSnapshot('dashboardViewWithout2ndHeader');
    })
})