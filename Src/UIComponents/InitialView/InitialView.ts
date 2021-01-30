function generateInitialView(injectedDiv:HTMLDivElement):HTMLDivElement {
    //TO BE REPLACED WITH A FUNCTION FOR ELEMENT CREATION
    const initialView = document.createElement('div');
    initialView.className = 'initial-view';

    const injectedComponent = document.createElement('div');
    injectedComponent.className = 'initial-view-injected-component';
    injectedComponent.append(injectedDiv);

    const appName = document.createElement('div');
    appName.className = "app-name";
    const fit =  document.createElement('span');
    fit.innerHTML = "Fit";
    const notFat =  document.createElement('span');
    notFat.innerHTML = "notFat";
    appName.append(fit,notFat);

    const image = document.createElement('img');
    image.className = 'initial-view-image';
    image.src = '../../../Static/initialviewimage.png';

    const shape = document.createElement('img');
    shape.className = 'initial-view-shape';
    shape.src = '../../../Static/Ellipse 13.png';

    initialView.append(injectedComponent, appName, image, shape);

    return initialView;
}

export default generateInitialView;

