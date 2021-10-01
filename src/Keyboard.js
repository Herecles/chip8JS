import { keyMap, NUMBER_OF_KEYS } from './constants/keyboard-constants';

export class Keyboard {
  constructor() {
    this.keys = new Array(NUMBER_OF_KEYS).fill(false);
    document.addEventListener('keydown', (event) => this.keydown(event.key));
    document.addEventListener('keyup', (event) => this.keyup(event.key));
  }

  keydown(key) {
    const keyIndex = keyMap.findIndex((mapKey) => mapKey === key.toLowerCase());
    if (keyIndex > -1) {
      this.keys[keyIndex] = true;
    }
  }

  keyup(key) {
    const keyIndex = keyMap.findIndex((mapKey) => mapKey === key.toLowerCase());
    if (keyIndex > -1) {
      this.keys[keyIndex] = false;
    }
  }

  isKeyDown(keyIndex) {
    return this.keys[keyIndex];
  }

  hasKeyDown() {
    return this.keys.findIndex((key) => key);
  }
}
