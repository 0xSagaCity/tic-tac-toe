import { ConnectionStateType } from "../utils/types";
import Peer from "peerjs";

export default function connectionReducer(
    state: ConnectionStateType,
    action: { type: string; payload: any }
): ConnectionStateType {
    let newState = state;
    switch (action.type) {
        case "RESET":
            newState = {
                isConnectionOn: false,
                connection: undefined,
                peer: new Peer(),
                myId: "",
                mySideChar: null,
            };
            return newState;
        case "SET_PEER":
            return (newState = { ...state, peer: action.payload });
        case "SET_CONN":
            return (newState = { ...state, connection: action.payload });
        case "SET_MID":
            return (newState = { ...state, myId: action.payload });
        case "SET_SIDE":
            return (newState = { ...state, mySideChar: action.payload });
        case "SET_STATUS":
            return (newState = { ...state, isConnectionOn: action.payload });
        case "SEND_CHAR":
            newState.connection?.send({
                HEAD: "SIDE",
                PAYLOAD: action.payload,
            });
            break;
    }
    return newState;
}
