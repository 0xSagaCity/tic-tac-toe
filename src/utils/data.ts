import Peer from "peerjs";
import { ConnectionStateType, GameStateType } from "./types";

export const WINNING_STATES = [
  //Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

export const initialConnection: ConnectionStateType = {
  isConnectionOn: false,
  connection: undefined,
  peer: new Peer(),
  myId: "",
  mySideChar: null,
};

export const initialGame: GameStateType = {
  isX: false,
  isMyTurn: false,
  gameResult: null,
  moveStatus: "Waiting...",
  gameStatusOn: false,
  myGameState: [],
  opponentGameState: [],
  currentGameState: [],
};
