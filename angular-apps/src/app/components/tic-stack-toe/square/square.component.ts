import { Component, Input, OnInit } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';

@Component({
  selector: 'app-square',
  template: `
    <span 
      *ngIf="highestPiece != null"
      [ngStyle]="{
        'width': pieceSizeStyle(highestPiece), 
        'height': pieceSizeStyle(highestPiece),
        'color': highestPiece.colour
      }"
    ></span>
  `,
  styles: [
    `
    span {
      border-radius: 50%;
    }
    `,
  ]
})
export class SquareComponent implements OnInit {
  @Input() depth!: number;
  contents!: TSTPiece[];

  constructor() {
    this.contents = [];
  }

  ngOnInit(): void {
  }

  placePiece(piece: TSTPiece): boolean {
    if (this.contents.length === this.depth) {
      // Not a valid move, no space left
      return false;
    }

    if (this.highestPiece != null && this.highestPiece.size >= piece.size) {
      // Not a valid move, piece with same size or larger present
      return false;
    }

    // Valid move
    this.contents.push(piece);
    return true;
  }

  get highestPiece(): TSTPiece | null {
    if (this.contents.length == 0) {
      // No pieces in this square
      return null;
    }
    return this.contents[this.contents.length - 1];
  }

  pieceSizeStyle(piece: TSTPiece): string {
    if (piece == null) {
      return "0%";
    }

    let calculatedSize: number = (90 / this.depth) * Number(piece.size + 1n);
    return `${calculatedSize}%`;
  }
}
