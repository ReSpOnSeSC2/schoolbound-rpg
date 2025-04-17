import { mainMenu } from './mainMenu';
import { overworld } from './overworld';
import { battle } from './battle';

export function initScenes(k) {
  mainMenu(k);
  overworld(k);
  battle(k);
}