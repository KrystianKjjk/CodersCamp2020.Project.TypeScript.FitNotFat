import { createTileMyWeight } from '../../../Src/UIComponents/TileMyWeight/TileMyWeight';
import  generateTileComponent  from '../../../Src/UIComponents/TileComponent/TileComponent'

const tileMyWeight = generateTileComponent(createTileMyWeight(71, new Date(2020,11, 26), (newWeight: number, newDate: Date) => {}))

document.body.appendChild(tileMyWeight);
