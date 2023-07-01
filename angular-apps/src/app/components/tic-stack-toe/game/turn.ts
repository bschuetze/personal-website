enum TurnState {
    PRE_TURN = 0,
    SELECTED_RESERVE = 1,
    SELECTED_ACTIVE = 2,
    PLACED_PIECE = 3,
    POST_TURN = 4
}

class TSTTurn {

    state!: TurnState;
    selectedPieceSquareIndex!: number | null;

    constructor() {
        this.newTurn();
    }

    selectReserve(): boolean {
        return this.state <= TurnState.SELECTED_RESERVE;
    }

    newTurn(): void {
        this.state = TurnState.PRE_TURN;
        this.selectedPieceSquareIndex = null;
    }
}