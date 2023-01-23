import { GameStateType } from "../utils/types";

export default function gameReducer(
  state: GameStateType,
  action: { type: string; payload: any }
): GameStateType {
  let newState = state;
  console.log(state, action);
  return newState;
}
