import { audioManager } from "../audio";

export function mainMenu(k) {
  k.scene("mainMenu", () => {
    // Play title music
    audioManager.playMusic("title");

export function mainMenu(k) {
  k.scene("mainMenu", () => {
    const title = k.add([
      k.text("Quirky Schoolbound RPG", 32),
      k.pos(k.width() / 2, k.height() / 3),
      k.origin("center"),
      k.color(255, 255, 255),
    ]);
    
    const startBtn = k.add([
      k.text("Start Game", 24),
      k.pos(k.width() / 2, k.height() / 2),
      k.origin("center"),
      k.area(),
      k.color(255, 255, 255),
      "button"
    ]);
    
    const loadBtn = k.add([
      k.text("Load Game", 24),
      k.pos(k.width() / 2, k.height() / 2 + 40),
      k.origin("center"),
      k.area(),
      k.color(200, 200, 200),
      "button"
    ]);
    
    k.onHover("button", (btn) => {
      btn.color = k.rgb(255, 255, 0);
    });
    
    k.onHoverEnd("button", (btn) => {
      btn.color = k.rgb(255, 255, 255);
    });
    
    k.onClick("button", (btn) => {
      audioManager.playSound("menuSelect");
      
      if (btn === startBtn) {
        k.go("overworld");
      } else if (btn === loadBtn) {
        // Load game logic (to be implemented)
      }
    });
  });
}