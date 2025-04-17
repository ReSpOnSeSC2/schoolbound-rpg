export function loadMap(k, mapName) {
  return new Promise(async (resolve) => {
    const mapData = k.getData(mapName);
    
    // Parse layers
    const layers = mapData.layers;
    const tilesets = mapData.tilesets;
    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;
    
    const gameObjects = [];
    
    // Process each layer
    layers.forEach(layer => {
      if (layer.type === "tilelayer") {
        // Render tile layer
        for (let y = 0; y < layer.height; y++) {
          for (let x = 0; x < layer.width; x++) {
            const index = y * layer.width + x;
            const tileId = layer.data[index];
            
            if (tileId === 0) continue; // Skip empty tiles
            
            // Map tileId to sprite name (simplified for example)
            let spriteName;
            if (tileId === 1) spriteName = "grass";
            else if (tileId === 2) spriteName = "water";
            else if (tileId === 3) spriteName = "wood";
            else if (tileId === 4) spriteName = "wall";
            // Add more mappings
            
            if (spriteName) {
              const tile = k.add([
                k.sprite(spriteName),
                k.pos(x * tileWidth, y * tileHeight),
                k.area(),
                k.solid(),
                "tile"
              ]);
              
              gameObjects.push(tile);
            }
          }
        }
      } else if (layer.type === "objectgroup") {
        // Handle object layers (NPCs, items, etc.)
        layer.objects.forEach(obj => {
          // Create game objects based on object properties
          // This is a simplified example
          if (obj.type === "npc") {
            const npc = k.add([
              k.rect(32, 32), // Placeholder
              k.color(0, 255, 0),
              k.pos(obj.x, obj.y),
              k.area(),
              "npc"
            ]);
            
            gameObjects.push(npc);
          }
        });
      }
    });
    
    resolve(gameObjects);
  });
}