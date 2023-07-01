class TSTBoard {
    size: number;
    depth: number;
    squares: TSTPiece[][];

    constructor(size: number, depth: number) {
        this.size = size;
        this.depth = depth;
        this.squares = Array(size * size).fill(Array(depth));
    }

    /**
     * Places a piece on the board if valid to do so
     * @param index the square to attempt to place the piece on
     * @param piece the piece to place
     * @returns true if the piece is able to be placed, false otherwise
     */
    placePiece(index: number, piece: TSTPiece): boolean {
        const square = this.squares[index];

        if (square.length === this.depth) {
            // Not a valid move, no space left
            return false;
        }

        if (square.length > 0) {
            // There is at least one piece in the square, need to check 
            // if the placing piece is larger than the highest piece
            const highestPiece = square[square.length - 1];

            if (highestPiece != null && highestPiece.size >= piece.size) {
                // Not a valid move, piece with same size or larger present
                return false;
            }
        }

        // Valid move
        square.push(piece);
        return true;
    }

    /**
     * Removes a piece from the board if valid to do so
     * @param index the square to remove a piece from
     * @param player the player attempting to remove the piece
     * @returns the piece removed if valid, null otherwise
     */
    removePiece(index: number, player: Player): TSTPiece | null {
        const square = this.squares[index];

        if (square.length === 0) {
            // No pieces in the square
            return null;
        }

        if (square.at(-1)?.player !== player.name) {
            // Not this player's piece to move
            return null;
        }

        const piece = square.pop();
        return piece !== undefined ? piece : null;
    }

    /**
     * Checks if the current state of the board results in a winner
     * @returns the winning player's name if there is one, null otherwise
     */
    checkWinner(): string | null {
        // Build array of array of indices for win conditions
        const winConditions: number[][] = [];

        // Build horizontal
        for (let i = 0; i < this.size; i++) {
            const indices: number[] = Array(this.size);
            for (let j = 0; j < this.size; j++) {
                indices.push((i * this.size) + j);
            }
            winConditions.push(indices);
        }

        // Build vertical
        for (let i = 0; i < this.size; i++) {
            const indices: number[] = Array(this.size);
            for (let j = 0; j < this.size; j++) {
                indices.push(i + (j * this.size));
            }
            winConditions.push(indices);
        }

        // Build diagonal
        for (let i = 0; i < 2; i++) {
            const indices: number[] = Array(this.size);
            for (let j = 0; j < this.size; j++) {
                if (i == 0) {
                    indices.push((j * this.size) + j);
                } else {
                    indices.push(((j + 1) * this.size) - (j + 1));
                }
            }
            winConditions.push(indices);
        }

        for (const winConditionIndices of winConditions) {
            const baseIndex = winConditionIndices.shift();
            if (baseIndex == undefined || this.squares[baseIndex].length == 0) {
                // No win possible
                continue;
            }
            
            const selectedPlayer = this.squares[baseIndex].at(-1)?.player;
            if (selectedPlayer == undefined) {
                continue;
            }

            for (const index of winConditionIndices) {
                if (this.squares[index].length == 0 || this.squares[index].at(-1)?.player !== selectedPlayer) {
                    continue;
                }
            }

            // If we get here then we have a winner
            return selectedPlayer;
        }

        return null;
    }
}