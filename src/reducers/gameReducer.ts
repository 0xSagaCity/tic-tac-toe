import { GameStateType } from "../utils/types";

export default function gameReducer(
    state: GameStateType,
    action: { type: string; payload: any }
): GameStateType {
    let newState = state;
    switch (action.type) {
        case "RESET":
            newState = {
                isX: false,
                isMyTurn: false,
                gameResult: null,
                moveStatus: "Waiting...",
                gameStatusOn: false,
                myGameState: [],
                opponentGameState: [],
                currentGameState: Array(9).fill(null),
            };
            return newState;
        case "GAME_ON":
            return (newState = { ...newState, gameStatusOn: action.payload });
        case "SET_ASX":
            return (newState = { ...newState, isX: action.payload });
        case "SET_TURN":
            return (newState = { ...newState, isMyTurn: action.payload });
        case "ADD_MY_MOVE":
            const newMyCurrentGameState = newState.currentGameState;
            newMyCurrentGameState[action.payload] = newState.isX ? "X" : "O";
            return (newState = {
                ...newState,
                currentGameState: newMyCurrentGameState,
            });
        case "ADD_OP_MOVE":
            const newOpCurrentGameState = newState.currentGameState;
            newOpCurrentGameState[action.payload] = newState.isX ? "O" : "X";
            return (newState = {
                ...newState,
                currentGameState: newOpCurrentGameState,
            });
        case "GAME_ADD_MY":
            return (newState = {
                ...newState,
                myGameState: newState.myGameState.concat(action.payload),
            });
        case "GAME_ADD_OP":
            return (newState = {
                ...newState,
                opponentGameState: newState.opponentGameState.concat(
                    action.payload
                ),
            });
        case "SET_RESULT":
            return (newState = { ...newState, gameResult: action.payload });
    }
    return newState;
}
