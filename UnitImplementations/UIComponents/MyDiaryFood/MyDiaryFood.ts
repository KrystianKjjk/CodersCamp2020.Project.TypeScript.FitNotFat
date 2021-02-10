import createMealDiary from '../../../Src/UIComponents/MyDiaryFood/MyDiaryFood';

const container = document.createElement('div');
container.style.display = 'flex';
container.style.height = '700px';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.justifyContent = 'space-around';


const main = createMealDiary('Kondzio', 'lunch', new Date());


document.body.appendChild(container);
container.appendChild(main);