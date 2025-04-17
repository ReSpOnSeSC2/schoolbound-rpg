import kaboom from "kaboom";

// Initialize Kaboom
const k = kaboom({
  width: 800,
  height: 600,
  canvas: document.querySelector("#game"),
  background: [0, 0, 0],
  scale: 2,
  debug: true,
});

// Create a simple scene
k.scene("main", () => {
  k.add([
    k.text("Quirky Schoolbound RPG", 32),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
  ]);
});

// Start with the main scene
k.start("main");