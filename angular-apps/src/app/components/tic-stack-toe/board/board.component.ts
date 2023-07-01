import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  squares!: string[];
  turn!: string;
  winner!: string;


  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = "";
    this.xIsNext = true;
  }

  makeMove(index: number) {
    if (this.squares[index] == null) {
      // This square is currently empty (valid move)
      this.squares[index] = this.player;
      this.xIsNext = !this.xIsNext;

      this.winner = this.calculateWinner();
    }
  }

  calculateWinner(): string {
    const winConditions = [
      // Horizontals
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Verticals
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const wc of winConditions) {
      const [a, b, c] = wc;
      if (
        this.squares[a] != null &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        // We have a winner
        return this.squares[a];
      }
    }
    // No winner
    return "";
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }
}
