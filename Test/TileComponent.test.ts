import generateTileComponent from '../Src/UIComponents/TileComponent/TileComponent';

describe('Tile component tests', () => {
    let content;
  beforeEach(() => {
    content=document.createElement('div');
  });

  test('returns HTMLDivElement', () => {
    content.className = 'test-div';

    expect(generateTileComponent(content)).toBeInstanceOf(HTMLDivElement);
  });

  test('has correct class name applied', () => {
    const testingDiv = generateTileComponent(content);

    expect(testingDiv.className).toEqual('tile-white');
  });

  test('has child', () => {
    const testingDiv = generateTileComponent(content);

    expect(testingDiv.hasChildNodes()).toBe(true);
  });
});
