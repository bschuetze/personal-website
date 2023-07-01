import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-piece',
  template: `
    <span 
      [ngStyle]="{
        'width': sizeStyle, 
        'height': sizeStyle,
        'color': colour
      }"></span>
  `,
  styles: [
    `
    span {
      border-radius: 50%;
    }
    `
  ]
})
export class PieceComponent {
  @Input() player!: string;
  @Input() colour!: string;
  @Input() size!: number;

  get sizeStyle(): string {
    return `${(this.size + 1) * 0.2}%`;
  }
}
