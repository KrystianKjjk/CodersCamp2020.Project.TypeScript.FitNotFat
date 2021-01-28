import createGauge from '../../../Src/UIComponents/Gauges/Gauges'


const gauge = document.createElement('div');
gauge.id = "test";
gauge.style.height = "500px";
document.body.appendChild(gauge);
createGauge("test", 100, 0, 250);


