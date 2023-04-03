import { DataConnection, Peer } from "peerjs";

export interface ConnectionStateType {
    isConnectionOn: boolean;
    connection: DataConnection | undefined;
    peer: Peer | null;
    myId: string;
    mySideChar: "X" | "O" | null;
}

export interface GameStateType {
    isX: boolean;
    isMyTurn: boolean;
    gameResult: null | "DRAW" | "WIN" | "LOSS";
    moveStatus: "Waiting..." | "Moving...";
    gameStatusOn: boolean;
    myGameState: number[];
    opponentGameState: number[];
    currentGameState: string[];
}

export interface FormPageType {
    connectionState: ConnectionStateType;
    connectionDispatch: React.Dispatch<{ type: string; payload: any }>;
    gameState: GameStateType;
    gameDispatch: React.Dispatch<{ type: string; payload: any }>;
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
