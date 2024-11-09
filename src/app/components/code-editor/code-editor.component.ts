import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandInterpreterService } from '../../services/command-interpreter.service';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="editor-container">
      <div class="instructions">
        <h3>Available Commands:</h3>
        <ul>
          <li><code>left()</code> - Move crane left</li>
          <li><code>right()</code> - Move crane right</li>
          <li><code>pick()</code> - Pick up block</li>
          <li><code>lower()</code> - Lower block</li>
          <li><code>flip()</code> - Reveal block type</li>
        </ul>
      </div>
      <textarea
        [(ngModel)]="code"
        class="code-editor"
        placeholder="Enter commands here... (e.g., right())"
        rows="10"
      ></textarea>
      <div class="controls">
        <button (click)="runCode()" [disabled]="isRunning">Run</button>
        <button (click)="stepCode()" [disabled]="isRunning">Step</button>
        <button (click)="resetCode()">Reset</button>
      </div>
    </div>
  `,
  styles: [`
    .editor-container {
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .instructions {
      margin-bottom: 15px;
      padding: 10px;
      background: #fff;
      border-radius: 4px;
      h3 {
        margin-bottom: 8px;
        color: #333;
      }
      ul {
        list-style-type: none;
        padding-left: 0;
      }
      li {
        margin: 4px 0;
      }
      code {
        background: #f0f0f0;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: monospace;
      }
    }
    .code-editor {
      width: 100%;
      font-family: monospace;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
      resize: vertical;
    }
    .controls {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: #2196f3;
      color: white;
      cursor: pointer;
      &:hover:not([disabled]) {
        background: #1976d2;
      }
      &[disabled] {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  `]
})
export class CodeEditorComponent {
  code: string = '';
  isRunning: boolean = false;

  constructor(
    private commandInterpreter: CommandInterpreterService,
    private gameManager: GameManagerService
  ) {}

  runCode(): void {
    this.commandInterpreter.parseCode(this.code);
    this.executeCommands();
  }

  stepCode(): void {
    if (!this.isRunning) {
      this.commandInterpreter.parseCode(this.code);
    }
    this.executeNextStep();
  }

  resetCode(): void {
    this.code = '';
    this.isRunning = false;
    this.gameManager.resetGame();
  }

  private executeCommands(): void {
    this.isRunning = true;
    const interval = setInterval(() => {
      if (!this.commandInterpreter.executeNextCommand()) {
        clearInterval(interval);
        this.isRunning = false;
      }
    }, 500);
  }

  private executeNextStep(): void {
    this.isRunning = true;
    if (!this.commandInterpreter.executeNextCommand()) {
      this.isRunning = false;
    }
  }
}