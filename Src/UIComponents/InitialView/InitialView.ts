import { createElement } from '../utils/utils';

//sorry for this dirty fix for 'require' vs typescript issue in the line below - this is only to avoid compilation problems
declare let require: any;
//below is the fix for getting Parcel into using the images by importing them in the file
const imageUrl:string = require('../../../Static/davies-designs-studio-utGuen80JAg-unsplash 1.png');

function generateInitialView(injectedDiv:HTMLDivElement):HTMLDivElement {
    const initialView = createElement('div', 'initial-view') as HTMLDivElement;

    const injectedComponent = createElement('div', 'initial-view-injected-component');
    injectedComponent.append(injectedDiv);

    const appName = createElement('div', 'app-name');
    const fit =  createElement('span', [], 'Fit');
    const notFat =  createElement('span', [], 'notFat');
    appName.append(fit,notFat);

    const image = createElement('img', 'initial-view-image');
    image.setAttribute('src', imageUrl);

    initialView.append(injectedComponent, appName, image);

    return initialView;
}

export default generateInitialView;

