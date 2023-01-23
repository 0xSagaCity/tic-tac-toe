import { DataConnection, Peer } from "peerjs";

export interface ConnectionStateType {
  isConnectionOn: boolean;
  connection: DataConnection | undefined;
  peer: Peer;
  myId: string;
  mySideChar: string;
}

export interface GameStateType {
  isMyTurn: boolean;
  isX: boolean;
  gameResult: null | "DRAW" | "WIN" | "LOSS";
  moveStatus: "Waiting..." | "Moving...";
  myGameState: number[];
  opponentGameState: number[];
  currentGameState: string[];
}

export interface FormPageType {
  connectionState: ConnectionStateType;
  connectionDispatch: React.Dispatch<{ type: string; payload: any }>;
}

export interface FormDialogType {
  connectionState: ConnectionStateType;
  connectionDispatch: React.Dispatch<{ type: string; payload: any }>;
}

export interface SideFormType {
  setFormStepOne: React.Dispatch<React.SetStateAction<boolean>>;
  connectionState: ConnectionStateType;
  connectionDispatch: React.Dispatch<{ type: string; payload: any }>;
}
