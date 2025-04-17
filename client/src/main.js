import kaboom from "kaboom";
import { initScenes } from "./scenes";
import { loadAssets } from "./loaders/assets";
import { audioManager } from "./audio";

// Initialize Kaboom
const k = kaboom({
  width: 800,
  height: 600,
  canvas: document.querySelector("#game"),
  background: [0, 0, 0],
  scale: 2,
  debug: true,
});

// Load audio
audioManager.loadSounds();

// Load visual assets
loadAssets(k);

// Initialize all scenes
initScenes(k);

// Start with the main menu
k.start("mainMenu");