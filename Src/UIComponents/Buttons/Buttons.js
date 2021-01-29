"use strict";
exports.__esModule = true;
exports.generateRedButton = exports.generateWhiteButton = void 0;
function generateButton(label, onClick, infill) {
    var button = document.createElement('button');
    button.className = 'button';
    button.innerText = label;
    button.style.backgroundColor = infill ? "#DA1B36" : "white";
    button.style.color = infill ? "white" : "#DA1B36";
    button.addEventListener('click', function (e) {
        onClick();
    });
    return button;
}
function generateRedButton(label, onClick) {
    return generateButton(label, onClick, true);
}
exports.generateRedButton = generateRedButton;
function generateWhiteButton(label, onClick) {
    return generateButton(label, onClick, false);
}
exports.generateWhiteButton = generateWhiteButton;
