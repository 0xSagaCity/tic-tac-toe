import { ConnectionStateType } from "../utils/types";

export default function connectionReducer(
  state: ConnectionStateType,
  action: { type: string; payload: any }
): ConnectionStateType {
  let newState = state;
  switch (action.type) {
    case "SET_CONN":
      newState = { ...state, connection: action.payload };
      break;
    case "SET_MID":
      newState = { ...state, myId: action.payload };
      break;
    case "SET_SIDE":
      newState = { ...state, mySideChar: action.payload };
      break;
    case "SET_STATUS":
      newState = { ...state, isConnectionOn: action.payload };
      break;
    case "SEND_CHAR":
      newState.connection?.send({ HEAD: "SIDE", PAYLOAD: action.payload });
      break;
  }
  return newState;
}
