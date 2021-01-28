
export default function generateTileComponent(tileContent:HTMLElement):HTMLDivElement{
const tile=document.createElement('div');
tile.className='tile';
tile.appendChild(tileContent);
return tile;
}
