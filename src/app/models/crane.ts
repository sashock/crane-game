export class Crane {
  x: number = 0;
  y: number = 0;
  holdingBlock: boolean = false;
  currentBlock: any = null;

  moveLeft(): boolean {
    if (this.x > 0) {
      this.x--;
      return true;
    }
    return false;
  }

  moveRight(maxX: number): boolean {
    if (this.x < maxX - 1) {
      this.x++;
      return true;
    }
    return false;
  }

  moveToTop(): void {
    this.y = 0;
  }

  moveToBottom(y: number = 4): void {
    this.y = y; // Grid height - 1
  }

  flip(): void {
    if (this.currentBlock) {
      this.currentBlock.toggle();
    }
  }

  pickBlock(block: any): void {
    if (!this.holdingBlock && block) {
      this.holdingBlock = true;
      this.currentBlock = block;
      this.moveToTop();
      block.x = this.x;
      block.y = this.y;
    } else {
      console.error('cant pick!');
    }
  }

  placeBlock(): any {
    if (this.holdingBlock) {
      const block = this.currentBlock;
      this.holdingBlock = false;
      this.currentBlock = null;
      return block;
    } else {
      console.error('cant place!');
    }
    return null;
  }
}
