import { loadMap } from "../loaders/map";
import { audioManager } from "../audio";

export function overworld(k) {
  k.scene("overworld", async () => {
    // Play overworld music
    audioManager.playMusic("overworld");

export function overworld(k) {
  k.scene("overworld", async () => {
    // Load map
    const mapObjects = await loadMap(k, "testMap");
    
    // Player character
    const player = k.add([
      k.sprite("player"),
      k.pos(k.width() / 2, k.height() / 2),
      k.area(),
      k.body(),
      "player"
    ]);
    
    // Camera follows player
    k.camScale(1);
    k.camPos(player.pos);
    player.onUpdate(() => {
      k.camPos(player.pos);
    });
    
    // Movement controls
    const SPEED = 200;
    
    k.onKeyDown("left", () => {
      player.move(-SPEED, 0);
    });
    
    k.onKeyDown("right", () => {
      player.move(SPEED, 0);
    });
    
    k.onKeyDown("up", () => {
      player.move(0, -SPEED);
    });
    
    k.onKeyDown("down", () => {
      player.move(0, SPEED);
    });
    
    // Collision with solid objects
    player.onCollide("solid", (obj) => {
      player.pos = player.pos.sub(player.delta);
    });
    
    // NPC interaction
    player.onCollide("npc", (npc) => {
      k.debug.log("Press E to talk");
      
      k.onKeyPress("e", () => {
        // Show dialogue (placeholder)
        k.debug.log("Hello traveler!");
      });
    });
    
    // Random battle encounters (simplified)
    let stepCount = 0;
    player.onUpdate(() => {
      if (player.isMoving && player.pos.x % 16 === 0 && player.pos.y % 16 === 0) {
        stepCount++;
        
        if (stepCount > 20) {
          const battleChance = Math.random();
          if (battleChance < 0.1) {
            k.go("battle");
            stepCount = 0;
          }
        }
      }
    });
  });
}