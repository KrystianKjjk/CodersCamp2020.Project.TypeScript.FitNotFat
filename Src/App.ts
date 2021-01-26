import generateTile from './UIComponents/TileComponent/TileComponent';
console.log("hello");

const content=document.createElement('div');
content.style.width='277px';
content.style.height='236px';
content.style.background='pink';
content.style.borderRadius='20px';
document.body.appendChild(generateTile(content));
