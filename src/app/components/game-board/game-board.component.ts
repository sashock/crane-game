import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <div class="crane-info">
        Crane Position: ({{craneX}}, {{craneY}}) 
        {{ crane?.holdingBlock ? '- Holding Block' : '' }}
        {{ crane?.currentBlock?.isRevealed ? 
          '- Block Type: ' + crane?.currentBlock?.type : 
          '' }}
      </div>
      <div class="grid">
        <div *ngFor="let row of gridArray; let y = index" class="row">
          <div *ngFor="let cell of row; let x = index" 
               class="cell"
               [class.crane]="isCranePosition(x, y)"
               [class.crane-with-block]="isCranePosition(x, y) && crane?.holdingBlock">
            <!-- Crane block - only show at y=1 -->
            <div *ngIf="y === 1 && x === craneX && crane?.holdingBlock" 
                 class="block"
                 [class.block-1]="crane?.currentBlock?.type === 1"
                 [class.block-2]="crane?.currentBlock?.type === 2"
                 [class.revealed]="crane?.currentBlock?.isRevealed">
              <div *ngIf="crane?.currentBlock?.isRevealed" class="block-type">
                {{crane?.currentBlock?.type}}
              </div>
            </div>
            <!-- Grid block -->
            <div *ngIf="cell" 
                 class="block"
                 [class.block-1]="cell?.type === 1"
                 [class.block-2]="cell?.type === 2"
                 [class.revealed]="cell?.isRevealed">
              <div *ngIf="cell?.isRevealed" class="block-type">
                {{cell?.type}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      padding: 20px;
      background: #f0f0f0;
      border-radius: 8px;
    }
    .crane-info {
      margin-bottom: 10px;
      font-family: monospace;
      background: #fff;
      padding: 8px;
      border-radius: 4px;
    }
    .grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: #333;
      padding: 2px;
      border: 2px solid #333;
    }
    .row {
      display: flex;
      gap: 2px;
    }
    .cell {
      width: 50px;
      height: 50px;
      background: #fff;
      border: 1px solid #ccc;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .crane {
      &::after {
        content: '⊥';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: 24px;
        color: #ff9800;
        z-index: 2;
      }
    }
    .crane-with-block::after {
      content: '⊤';
    }
    .block {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ccc;
      position: relative;
      z-index: 1;
    }
    .block-1 {
      background: #4caf50;
      opacity: 0.3;
      &.revealed {
        opacity: 1;
      }
    }
    .block-2 {
      background: #2196f3;
      opacity: 0.3;
      &.revealed {
        opacity: 1;
      }
    }
    .block-type {
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
  `]
})
export class GameBoardComponent implements OnInit {
  gridArray: any[][] = [];
  craneX = 0;
  craneY = 0;
  crane: any;

  constructor(private gameManager: GameManagerService) {}

  ngOnInit() {
    this.gameManager.gameState$.subscribe(state => {
      this.gridArray = Array(state.grid.height).fill(null)
        .map((_, y) => Array(state.grid.width).fill(null)
          .map((_, x) => state.grid.getBlock(x, y)));
      this.craneX = state.crane.x;
      this.craneY = state.crane.y;
      this.crane = state.crane;
    });
  }

  isCranePosition(x: number, y: number): boolean {
    return x === this.craneX && y === this.craneY;
  }
}