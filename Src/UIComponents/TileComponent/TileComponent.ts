
export default function generateTileComponent(tileContent:HTMLElement):HTMLDivElement{
const tile=document.createElement('div');
tile.className='tile-white';
tile.appendChild(tileContent);
return tile;
}
