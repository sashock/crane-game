import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Crane } from '../models/crane';
import { Grid } from '../models/grid';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  private crane: Crane = new Crane();
  private grid: Grid = new Grid();

  gameState$ = new BehaviorSubject<{
    crane: Crane;
    grid: Grid;
  }>({ crane: this.crane, grid: this.grid });

  constructor() {
    this.initializeGame();
  }

  private initializeGame(): void {
    // Reset crane
    this.crane = new Crane();
    this.crane.moveToTop();

    // Reset grid
    this.grid = new Grid();

    this.updateGameState();
  }

  resetGame(): void {
    this.initializeGame();
  }

  moveCraneLeft(): void {
    if (this.crane.moveLeft()) {
      this.updateGameState();
    }
  }

  moveCraneRight(): void {
    if (this.crane.moveRight(this.grid.width)) {
      this.updateGameState();
    }
  }

  pickBlock(): void {
    // Move crane to bottom first
    this.crane.moveToBottom();
    const block = this.grid.getBlock(this.crane.x, this.crane.y);

    console.debug('pick block: ', block);
    if (block) {
      this.crane.pickBlock(block);
      
      this.grid.removeBlock(this.crane.x, this.crane.y);
      this.updateGameState();
    }
  }

  lowerCrane(): void {
    if (this.crane.holdingBlock) {
      this.crane.moveToBottom(this.grid.getLowestEmptyPosition(this.crane.x));
      if (this.grid.placeBlock(this.crane.currentBlock, this.crane.x)) {
        this.crane.placeBlock();
      }
      this.crane.moveToTop();
    } else {
      this.crane.moveToBottom();
    }
    this.updateGameState();
  }

  flipBlock(): void {
    const block = this.crane.holdingBlock
      ? this.crane.currentBlock
      : this.grid.getBlock(this.crane.x, this.grid.height - 1);

    if (block) {
      block.toggle();
      this.updateGameState();
    }
  }

  private updateGameState(): void {
    this.gameState$.next({
      crane: this.crane,
      grid: this.grid,
    });
  }
}
