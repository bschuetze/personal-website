class TSTGame {
    board: TSTBoard;
    players: Player[];
    currentPlayerIndex: number = 0;

    constructor(size: number = 4, depth: number = 4, players: string[] = ["Player 1", "Player 2"]) {
        this.board = new TSTBoard(size, depth);

        // Calculate the number of sets to have
        const numSets = Math.ceil((size * size) / depth) - 1;

        // Create the players
        this.players = Array(players.length);
        for (const player of players) {
            const pieces: TSTPiece[] = [];
            for (let i = 0; i < numSets; i++) {
                for (let j = 0; j < depth; j++) {
                    pieces.push({
                        player: player,
                        colour: "",
                        size: j
                    })
                }
            }
            this.players.push({
                name: player,
                moves: 0,
                availablePieces: pieces
            });
        }
    }

    // Function for selecting a piece
    selectPiece() {

    }

    currentTurn(): Player {
        return this.players[this.currentPlayerIndex];
    }

    nextTurn(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
}