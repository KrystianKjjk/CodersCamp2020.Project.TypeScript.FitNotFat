import { createMyDiaryFoodDashboard } from '../Src/UIComponents/MyDiaryFoodDashboard/MyDiaryFoodDashboard';


describe('MyDiaryFood', () => {
    test('main container has 4 div: breakfast, dinner, lunch, snacks', () => {
        const foodDashboard = createMyDiaryFoodDashboard();
    
        expect(foodDashboard.querySelectorAll('.myfood-breakfast')).toHaveLength(1);
        expect(foodDashboard.querySelectorAll('.myfood-dinner')).toHaveLength(1);
        expect(foodDashboard.querySelectorAll('.myfood-lunch')).toHaveLength(1);
        expect(foodDashboard.querySelectorAll('.myfood-snacks')).toHaveLength(1);   

    });
    test('after clicking next or previous date main container have still 4 div: breakfast, dinner, lunch, snacks', () => {
        const foodDashboard = createMyDiaryFoodDashboard();
        document.body.appendChild(foodDashboard);
        const leftButton: HTMLElement = document.body.querySelector('.left-arrow-button');
        leftButton.click();
        expect(document.body.querySelectorAll('.myfood-breakfast')).toHaveLength(1);
        expect(document.body.querySelectorAll('.myfood-dinner')).toHaveLength(1);
        expect(document.body.querySelectorAll('.myfood-lunch')).toHaveLength(1);
        expect(document.body.querySelectorAll('.myfood-snacks')).toHaveLength(1);

        const rightButton: HTMLElement = document.body.querySelector('.right-arrow-button');
        rightButton.click();
        expect(document.body.querySelectorAll('.myfood-breakfast')).toHaveLength(1);
        expect(document.body.querySelectorAll('.myfood-dinner')).toHaveLength(1);
        expect(document.body.querySelectorAll('.myfood-lunch')).toHaveLength(1);
        expect(document.body.querySelectorAll('.myfood-snacks')).toHaveLength(1);

    });
})