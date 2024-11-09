import { Injectable } from '@angular/core';
import { GameManagerService } from './game-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CommandInterpreterService {
  constructor(private gameManager: GameManagerService) {}

  private commands: string[] = [];
  private currentCommandIndex: number = 0;

  parseCode(code: string): void {
    this.commands = code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    this.currentCommandIndex = 0;
  }

  executeNextCommand(): boolean {
    if (this.currentCommandIndex >= this.commands.length) {
      return false;
    }

    const command = this.commands[this.currentCommandIndex];
    this.executeCommand(command);
    this.currentCommandIndex++;
    return true;
  }

  private executeCommand(command: string): void {
    if (command.includes('left()')) {
      this.gameManager.moveCraneLeft();
    } else if (command.includes('right()')) {
      this.gameManager.moveCraneRight();
    } else if (command.includes('pick()')) {
      this.gameManager.pickBlock();
    } else if (command.includes('lower()')) {
      this.gameManager.lowerCrane();
    } else if (command.includes('flip()')) {
      this.gameManager.flipBlock();
    }
  }
}