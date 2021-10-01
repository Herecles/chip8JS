import { Chip8 } from './chip8';
import { LOAD_PROGRAM_ADDRESS } from './constants/memory-constants';
import { TIMER_60_HZ } from './constants/registers-constants';


async function runChip8() {
  const rom = await fetch('./roms/Soccer.ch8');
  const arrayBuffer = await rom.arrayBuffer();
  const romBuffer = new Uint8Array(arrayBuffer);
  const chip8 = new Chip8(romBuffer);


  console.log(chip8.memory.getOpcode(chip8.registers.PC).toString(16));
  
  while (1) {
    await chip8.sleep();
    chip8.execute(chip8.memory.getOpcode(chip8.registers.PC));
    console.log(chip8.memory.getOpcode(chip8.registers.PC).toString(16));
    // chip8.display.drawBuffer();

    if (chip8.registers.DT > 0) {
      await chip8.sleep();
      chip8.registers.DT--;
    }

    if (chip8.registers.ST > 0) {
      chip8.soundCard.enableSound();
      await chip8.sleep();
      chip8.registers.ST--;
    }

    if (chip8.registers.ST === 0) {
      chip8.soundCard.disableSound();
    }
  }
}

runChip8();
