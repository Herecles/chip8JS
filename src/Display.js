import { CHAR_SET_WIDTH } from './constants/charset-constats';
import {
  BG_COLOR,
  COLOR,
  DISPLAY_HEIGHT,
  DISPLAY_MULTIPLY,
  DISPLAY_WIDTH,
} from './constants/display-constants';

export class Display {
  constructor(memory) {
    console.log('Create a new Display');
    this.memory = memory;
    this.screen = document.querySelector('canvas');
    this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLY;
    this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLY;

    this.context = this.screen.getContext('2d');
    this.context.fillStyle = BG_COLOR;
    this.frameBuffer = [];
    this.context.fillRect(0, 0, this.screen.width, this.screen.height);
    this.reset();
  }

  reset() {
    for (let h = 0; h < DISPLAY_HEIGHT; h++) {
      this.frameBuffer.push([]);
      for (let w = 0; w < DISPLAY_WIDTH; w++) {
        this.frameBuffer[h].push(0);
      }
    }

    this.context.fillRect(0, 0, this.screen.width, this.screen.height);
    this.drawBuffer();
  }

  drawBuffer() {
    for (let h = 0; h < DISPLAY_HEIGHT; h++) {
      for (let w = 0; w < DISPLAY_WIDTH; w++) {
        this.drawPixel(h, w, this.frameBuffer[h][w]);
      }
    }
  }

  drawPixel(h, w, value) {
    if (value) {
      this.context.fillStyle = COLOR;
    } else {
      this.context.fillStyle = BG_COLOR;
    }

    this.context.fillRect(
      w * DISPLAY_MULTIPLY,
      h * DISPLAY_MULTIPLY,
      DISPLAY_MULTIPLY,
      DISPLAY_MULTIPLY
    );
  }

  // drawSprite(h, w, spriteAddress, num) {
  //   let pixelColision = 0;
  //   for (let lh = 0; lh < num; lh++) {
  //     const line = this.memory.memory[spriteAddress + lh];
  //     for (let lw = 0; lw < CHAR_SET_WIDTH; lw++) {
  //       const bitToCheck = 0b10000000 >> lw;
  //       const value = line & bitToCheck;
  //       const ph = (h + lh) % DISPLAY_HEIGHT;
  //       const pw = (w + lw) % DISPLAY_WIDTH;
  //       if (value === 0) {
  //         continue;
  //       }
  //       if (this.frameBuffer[ph][pw] === 1) {
  //         pixelColision = 1;
  //       }
  //       this.frameBuffer[ph][pw] ^= 1;
  //     }
  //   }
  //   this.drawBuffer();
  //   return pixelColision;
  // }

  drawSprite(x, y, spriteAddress, size) {
    let pixelColision = 0;
    for (let line = 0; line < size; line++) {
      const lineValue = this.memory.memory[spriteAddress + line];
      for (let col = 0; col < CHAR_SET_WIDTH; col++) {
        const bitToCheck = 0b10000000 >> col;
        const colValue = lineValue & bitToCheck;
        const px = (x + col) % DISPLAY_WIDTH;;
        const py = (y + line) % DISPLAY_HEIGHT;
        if (colValue === 0) {
          continue;
        }
        if (this.frameBuffer[py][px] === 1) {
          pixelColision = 1;
        }
        this.frameBuffer[py][px] ^= 1;
      }
    }
    this.drawBuffer();
    return pixelColision;
  }
}
