export class Block {
  constructor(
    public type: 1 | 2,
    public isRevealed: boolean = false,
    public x: number = 0,
    public y: number = 0
  ) {}

  toggle(): void {
    this.isRevealed = !this.isRevealed;
  }
}