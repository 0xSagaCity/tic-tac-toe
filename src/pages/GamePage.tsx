import { MouseEventHandler, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectionStateType, GameStateType } from "../utils/types";

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
}: {
  value: string;
  onClick: MouseEventHandler;
}): JSX.Element {
  return (
    <div className="GameCell" onClick={onClick}>
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
          <GameCell key={`GameCell-${key}`} onClick={onClick} value={val} />
        );
      })}
    </div>
  );
}

function GameResult({ result }: { result: "DRAW" | "WIN" | "LOSS" }) {
  return (
    <div className="GameResult">
      {result === "DRAW" && "GAME DRAWN"}
      {result === "WIN" && "GAME WIN"}
      {result === "LOSS" && "GAME LOSS"}
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
  );
}
