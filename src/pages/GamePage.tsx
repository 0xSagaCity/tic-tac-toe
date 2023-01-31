import { MouseEventHandler, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectionStateType, GameStateType } from "../utils/types";
import gsap from "gsap";

function InfoContainer({
  gameState,
  isOpponent,
}: {
  gameState: GameStateType;
  isOpponent: boolean;
}) {
  const indicatorClass = isOpponent
    ? gameState.isMyTurn
      ? "SideStatus__Indicator Indicator__Red"
      : "SideStatus__Indicator Indicator__Green"
    : gameState.isMyTurn
    ? "SideStatus__Indicator Indicator__Green"
    : "SideStatus__Indicator Indicator__Red";

  return (
    <div className="InfoContainer">
      <span className="SideChar GradientText">
        {isOpponent ? (
          <> {gameState.isX ? "O" : "X"} </>
        ) : (
          <> {gameState.isX ? "X" : "O"} </>
        )}
      </span>
      <div className="SideStatus">
        <div className={indicatorClass}></div>
        <span className="SideStatus__Move SmallText">
          {isOpponent ? (
            <> {gameState.isMyTurn ? "Waiting..." : "Moving..."} </>
          ) : (
            <> {gameState.isMyTurn ? "Moving..." : "Waiting..."} </>
          )}
        </span>
      </div>
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

function GameResult({ result }: { result: "DRAW" | "WIN" | "LOSS" }) {
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
  return (
    <div className="GameResult">
      {result === "DRAW" && <h2 className="GradientText"> GAME DRAWN</h2>}
      {result === "WIN" && <h2 className="GradientText">GAME WIN</h2>}
      {result === "LOSS" && <h2 className="GradientText"> GAME LOSS</h2>}
    </div>
  );
}

export default function GamePage({
  gameState,
  gameDispatch,
  connectionState,
}: {
  gameState: GameStateType;
  gameDispatch: React.Dispatch<{ type: string; payload: any }>;
  connectionState: ConnectionStateType;
}) {
  const navigate = useNavigate();
  const gameRoot = useRef(null);

  useEffect(() => {
    if (!gameState.gameStatusOn && gameState.gameResult === null) {
      navigate("/");
    }
  }, [gameState.gameStatusOn, gameState.gameResult]);

  return (
    <div className="Page">
      <div className="PageTransition__Overlay Overlay__One"></div>
      <div className="PageTransition__Overlay Overlay__Two"></div>
      <div className="PageTransition__Overlay Overlay__Three"></div>
      <div className="PageTransition__Overlay Overlay__Four"></div>
      <div ref={gameRoot} className="GamePage">
        <div className="Game__Wrapper">
          <div className="InfoWrapper">
            <InfoContainer isOpponent={false} gameState={gameState} />
            <InfoContainer isOpponent={true} gameState={gameState} />
          </div>
          <GameBoard
            gameState={gameState}
            gameDispatch={gameDispatch}
            connectionState={connectionState}
          />
        </div>
        {gameState.gameStatusOn && gameState.gameResult !== null && (
          <GameResult result={gameState.gameResult} />
        )}
      </div>
    </div>
  );
}
