import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import TransitionComponent from "./component/Transition";
import FormPage from "./pages/FormPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import connectionReducer from "./reducers/connectionReducer";
import gameReducer from "./reducers/gameReducer";
import "./styles/App.scss";
import { initialConnection, initialGame, WINNING_STATES } from "./utils/data";

function App(): JSX.Element {
  const [connectionState, connectionDispatch] = useReducer(
    connectionReducer,
    initialConnection
  );
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGame);

  useEffect(() => {
    //Receive for connection
    if (connectionState.peer) {
      connectionState.peer.on("connection", (dataCon) => {
        connectionDispatch({ type: "SET_CONN", payload: dataCon });
      });
    }
  }, [connectionState.peer]);

  useEffect(() => {
    if (connectionState.mySideChar !== null) {
      connectionState.mySideChar === "X"
        ? gameDispatch({ type: "SET_ASX", payload: true })
        : gameDispatch({ type: "SET_ASX", payload: false });
      connectionState.mySideChar === "X"
        ? gameDispatch({ type: "SET_TURN", payload: true })
        : gameDispatch({ type: "SET_TURN", payload: false });
    }
  }, [connectionState.mySideChar]);

  useEffect(() => {
    if (connectionState.connection) {
      connectionDispatch({ type: "SET_STATUS", payload: true });
    }
    //Receive data from opponent here.
    connectionState.connection !== undefined &&
      connectionState.connection.on("data", (data: any) => {
        if (data.HEAD) {
          if (data.HEAD === "SIDE") {
            if (data.PAYLOAD === "X") {
              connectionDispatch({ type: "SET_SIDE", payload: "O" });
            } else {
              connectionDispatch({ type: "SET_SIDE", payload: "X" });
            }
          } else if (data.HEAD === "MOVE") {
            gameDispatch({ type: "ADD_OP_MOVE", payload: data.PAYLOAD });
            gameDispatch({ type: "GAME_ADD_OP", payload: data.PAYLOAD });
            gameDispatch({ type: "SET_TURN", payload: true });
          }
        } else {
          console.log("BAD DATA was sent!");
        }
      });
  }, [connectionState.connection]);

  useEffect(() => {
    WINNING_STATES.forEach((winningState) => {
      const iWinGame = winningState.every((state) =>
        gameState.myGameState.includes(state)
      );
      const iLooseGame = winningState.every((state) =>
        gameState.opponentGameState.includes(state)
      );
      if (iLooseGame) {
        gameDispatch({ type: "SET_RESULT", payload: "LOSS" });
      }
      if (iWinGame) {
        gameDispatch({ type: "SET_RESULT", payload: "WIN" });
      }
      if (
        gameState.currentGameState.every((move) => typeof move === "string") &&
        !iWinGame &&
        !iLooseGame
      ) {
        gameDispatch({ type: "SET_RESULT", payload: "DRAW" });
      }
    });
  }, [
    gameState.myGameState,
    gameState.opponentGameState,
    gameState.currentGameState,
  ]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <TransitionComponent>
              <HomePage />
            </TransitionComponent>
          }
        />
        <Route
          path="/connection"
          element={
            <TransitionComponent>
              <FormPage
                connectionState={connectionState}
                connectionDispatch={connectionDispatch}
                gameState={gameState}
                gameDispatch={gameDispatch}
              />
            </TransitionComponent>
          }
        />
        <Route
          path="/game"
          element={
            <TransitionComponent>
              <GamePage
                gameState={gameState}
                gameDispatch={gameDispatch}
                connectionState={connectionState}
              />
            </TransitionComponent>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
