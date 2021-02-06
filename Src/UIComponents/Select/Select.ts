import { createElement } from '../utils/utils';

interface SelectOption {
  key: string;
  label: string;
}

const ArrowDownIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>`;

const createSelectBox = (
  options: SelectOption[],
  onSelect: (selected: string) => void,
  placeholder: string = '',
) => {
  const container = createElement('div', 'container');
  const select = createElement('div', 'select-box');
  const spanMainText = createElement('span');
  spanMainText.appendChild(document.createTextNode(placeholder));
  select.appendChild(spanMainText);

  const iconContainer = createElement('span');
  iconContainer.innerHTML = ArrowDownIcon;
  select.appendChild(iconContainer);

  const optionsContainer = createElement('div', 'options');

  const setCorrectOptionStyles = (chosenKey: string) => {
    Array.from(optionsContainer.children).forEach((optionComponent) => {
      if ((optionComponent as HTMLDivElement).dataset.key === chosenKey) {
        optionComponent.classList.add('selected');
      } else {
        optionComponent.classList.remove('selected');
      }
    });
  };

  options.forEach((singleOption, index) => {
    const { key, label } = singleOption;
    const option = createElement('div', 'option');
    option.appendChild(document.createTextNode(label));
    option.setAttribute('data-key', key);
    optionsContainer.appendChild(option);

    option.addEventListener('click', (e) => {
      const chosenKey = (e.target as HTMLDivElement).dataset.key;
      const chosenLabel = (e.target as HTMLDivElement).innerHTML;
      optionsContainer.style.display = 'none';
      spanMainText.innerHTML = chosenLabel;
      setCorrectOptionStyles(chosenKey);
      onSelect(chosenKey);
    });

    if (index === 0) {
      option.click();
    }
  });
  const paragraph = createElement('p');
  const textNode = document.createTextNode('What is your weekly goal:');
  paragraph.className='select-header';
  paragraph.appendChild(textNode);
  container.appendChild(paragraph);
  container.appendChild(select);
  container.appendChild(optionsContainer);

  window.addEventListener('click', () => {
    optionsContainer.style.display = 'none';
  });

  select.addEventListener('click', (e) => {
    optionsContainer.style.display = 'block';
    e.stopPropagation();
  });

  return container;
};

export default createSelectBox;
