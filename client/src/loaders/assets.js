export function loadAssets(k) {
  // Load sprite atlas
  k.loadSpriteAtlas("assets/sprites/tileset.png", {
    "grass": { x: 0, y: 0, width: 32, height: 32 },
    "water": { x: 32, y: 0, width: 32, height: 32 },
    "wood": { x: 64, y: 0, width: 32, height: 32 },
    "wall": { x: 64, y: 32, width: 32, height: 32 },
    // Add more sprites as needed
  });
  
  // Load a test character sprite
  k.loadSprite("player", "assets/sprites/player.png");
  
  // Load map
  k.loadJSON("testMap", "assets/maps/test_map.json");
}