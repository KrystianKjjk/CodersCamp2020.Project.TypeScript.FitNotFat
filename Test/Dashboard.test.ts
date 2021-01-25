import dashboard from '../Src/UIComponents/Dashboard/Dashboard';

describe('Dashboard test', () => {
    test('returns div', () => {
       expect(dashboard()).toBeInstanceOf(HTMLDivElement);
    })
})