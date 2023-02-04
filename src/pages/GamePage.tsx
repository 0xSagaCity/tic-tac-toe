import { MouseEventHandler, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectionStateType, GameStateType } from "../utils/types";
import gsap from "gsap";
import { onClick, onMouseEnter, onMouseLeave } from "../utils/animations";

function InfoContainer({ gameState }: { gameState: GameStateType }) {
  return (
    <div className="InfoContainer">
      {gameState.isMyTurn ? (
        <span className="GradientText">Your move</span>
      ) : (
        <span className="InfoText">Waiting...</span>
      )}
    </div>
  );
}

function GameCell({
  value,
  onClick,
  turn,
}: {
  value: string;
  onClick: MouseEventHandler;
  turn: boolean;
}): JSX.Element {
  const cellRef = useRef(null);
  function cellClick() {
    if (turn) {
      gsap.to(cellRef.current, {
        rotateY: 180,
        duration: 0.4,
        ease: "expo.easIneOut",
        onStart: onClick,
      });
    }
  }
  return (
    <div className="GameCell" ref={cellRef} onClick={cellClick}>
      <span>{value}</span>
    </div>
  );
}

function GameBoard({
  gameState,
  gameDispatch,
  connectionState,
}: {
  gameState: GameStateType;
  gameDispatch: React.Dispatch<{ type: string; payload: any }>;
  connectionState: ConnectionStateType;
}): JSX.Element {
  return (
    <div className="GameBoard">
      {gameState.currentGameState.map((val, key) => {
        const onClick = () => {
          if (
            gameState.isMyTurn &&
            gameState.currentGameState[key] === null &&
            gameState.gameResult === null
          ) {
            //If your turn update state with gameValue
            gameDispatch({ type: "ADD_MY_MOVE", payload: key });
            gameDispatch({ type: "GAME_ADD_MY", payload: key });
            gameDispatch({ type: "SET_TURN", payload: false });
            //Check if connection is on and then send move if it is.
            if (connectionState.connection) {
              connectionState.connection.send({ HEAD: "MOVE", PAYLOAD: key });
            }
          }
        };
        return (
          <GameCell
            key={`GameCell-${key}`}
            turn={gameState.isMyTurn}
            onClick={onClick}
            value={val}
          />
        );
      })}
    </div>
  );
}

function GameResult({
  connectionState,
  connectionDipatch,
  gameDispatch,
  result,
}: {
  connectionState: ConnectionStateType;
  connectionDipatch: React.Dispatch<{ type: string; payload: any }>;
  gameDispatch: React.Dispatch<{ type: string; payload: any }>;
  result: "DRAW" | "WIN" | "LOSS";
}) {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".GameResult",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "expo.easIneOut",
      }
    );
  }, []);

  function callback() {
    connectionState.connection?.close();
    connectionDipatch({ type: "RESET", payload: "" });
    gameDispatch({ type: "RESET", payload: "" });
  }

  return (
    <div className="GameResult">
      {result === "DRAW" && <h2 className="GradientText"> GAME DRAW</h2>}
      {result === "WIN" && <h2 className="GradientText">GAME WON</h2>}
      {result === "LOSS" && <h2 className="GradientText"> GAME LOST</h2>}
      <div className="ResultButton__Container">
        <button
          onClick={() => {
            onClick(".ResetButton", callback);
          }}
          onMouseEnter={() => onMouseEnter(".ResetButton")}
          onMouseLeave={() => onMouseLeave(".ResetButton")}
          className="ResetButton"
        >
          ⚔ Another game
        </button>
      </div>
    </div>
  );
}

export default function GamePage({
  gameState,
  gameDispatch,
  connectionState,
  connectionDipatch,
}: {
  gameState: GameStateType;
  gameDispatch: React.Dispatch<{ type: string; payload: any }>;
  connectionState: ConnectionStateType;
  connectionDipatch: React.Dispatch<{ type: string; payload: any }>;
}) {
  const navigate = useNavigate();
  const gameRoot = useRef(null);

  useEffect(() => {
    if (!gameState.gameStatusOn && gameState.gameResult === null) {
      navigate("/");
    }
  }, [gameState.gameStatusOn, gameState.gameResult, navigate]);

  return (
    <div className="Page">
      <div className="ExitTransition__Overlay Overlay__One"></div>
      <div className="ExitTransition__Overlay Overlay__Two"></div>
      <div className="ExitTransition__Overlay Overlay__Three"></div>
      <div className="ExitTransition__Overlay Overlay__Four"></div>
      <div className="EntryTransition__Overlay Overlay__Five"></div>
      <div ref={gameRoot} className="GamePage">
        <div className="Game__Wrapper">
          <div className="InfoWrapper">
            <InfoContainer gameState={gameState} />
          </div>
          <GameBoard
            gameState={gameState}
            gameDispatch={gameDispatch}
            connectionState={connectionState}
          />
        </div>
        {gameState.gameStatusOn && gameState.gameResult !== null && (
          <GameResult
            connectionState={connectionState}
            connectionDipatch={connectionDipatch}
            gameDispatch={gameDispatch}
            result={gameState.gameResult}
          />
        )}
      </div>
    </div>
  );
}
