import { Block } from './block';

export class Grid {
  private cells: (Block | null)[][] = [];
  readonly width: number = 11;
  readonly height: number = 5;

  constructor() {
    this.initializeGrid();
    this.generateInitialBlocks();
  }

  private initializeGrid(): void {
    for (let y = 0; y < this.height; y++) {
      this.cells[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.cells[y][x] = null;
      }
    }
  }

  private generateInitialBlocks(): void {
    const blockTypes: (1 | 2)[] = Array(5).fill(1).concat(Array(5).fill(2));
    this.shuffleArray(blockTypes);

    blockTypes.forEach((type, index) => {
      this.cells[this.height - 1][index] = new Block(
        type,
        false,
        index,
        this.height - 1
      );
    });
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getBlock(x: number, y: number): Block | null {
    if (this.isValidPosition(x, y)) {
      return this.cells[y][x];
    }
    return null;
  }

  placeBlock(block: Block, x: number): boolean {
    const y = this.getLowestEmptyPosition(x);
    if (y !== -1) {
      this.cells[y][x] = block;
      block.x = x;
      block.y = y;
      return true;
    }
    return false;
  }

  removeBlock(x: number, y: number): Block | null {
    if (this.isValidPosition(x, y) && this.cells[y][x]) {
      const block = this.cells[y][x];
      this.cells[y][x] = null;
      console.debug('removing', block);
      return block;
    } else {
      console.debug('invalid', x, y);
    }
    return null;
  }

  getLowestEmptyPosition(x: number): number {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.cells[y][x]) {
        return y;
      }
    }
    return -1;
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}
