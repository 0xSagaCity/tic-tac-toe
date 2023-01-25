import { GameStateType } from "../utils/types";

export default function gameReducer(
  state: GameStateType,
  action: { type: string; payload: any }
): GameStateType {
  let newState = state;
  switch (action.type) {
    case "GAME_ON":
      newState = { ...newState, gameStatusOn: action.payload };
      break;
    case "SET_ASX":
      newState = { ...newState, isX: action.payload };
      break;
    case "SET_TURN":
      newState = { ...newState, isMyTurn: action.payload };
      break;
    case "ADD_MY_MOVE":
      const newMyCurrentGameState = newState.currentGameState;
      newMyCurrentGameState[action.payload] = newState.isX ? "X" : "O";
      newState = {
        ...newState,
        currentGameState: newMyCurrentGameState,
      };
      break;
    case "ADD_OP_MOVE":
      const newOpCurrentGameState = newState.currentGameState;
      newOpCurrentGameState[action.payload] = newState.isX ? "O" : "X";
      newState = {
        ...newState,
        currentGameState: newOpCurrentGameState,
      };
      break;
    case "GAME_ADD_MY":
      newState = {
        ...newState,
        myGameState: newState.myGameState.concat(action.payload),
      };
      break;
    case "GAME_ADD_OP":
      newState = {
        ...newState,
        opponentGameState: newState.opponentGameState.concat(action.payload),
      };
      break;
    case "SET_RESULT":
      newState = { ...newState, gameResult: action.payload };
      break;
  }

  return newState;
}
