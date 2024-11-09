import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { GameBoardComponent } from './app/components/game-board/game-board.component';
import { CodeEditorComponent } from './app/components/code-editor/code-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameBoardComponent, CodeEditorComponent],
  template: `
    <div class="game-layout">
      <h1>Crane Sorting Game</h1>
      <div class="game-content">
        <app-game-board></app-game-board>
        <app-code-editor></app-code-editor>
      </div>
    </div>
  `,
  styles: [`
    .game-layout {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
    .game-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
  `]
})
export class App {
  name = 'Crane Sorting Game';
}

bootstrapApplication(App);