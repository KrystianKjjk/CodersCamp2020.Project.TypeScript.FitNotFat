
export default function generateTileComponent(tileContent:HTMLElement, className: string = 'tile'):HTMLDivElement{
    const tile = document.createElement('div');
    tile.className = className;
    tile.appendChild(tileContent);
    
    return tile;
}