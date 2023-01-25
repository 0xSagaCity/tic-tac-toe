import YourIdComponent from "../component/YourIdComponent";
import FormDialog from "../component/FormDialog";
import {
  ConnectionStateType,
  FormDialogType,
  FormPageType,
} from "../utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type challengeOptionType = "NONE" | "RECEIVE" | "SEND";

function SendChallenge({
  connectionState,
  connectionDispatch,
}: FormDialogType) {
  return (
    <>
      <h2 className="FormPageTop__Title GradientText">Send challenge</h2>
      <FormDialog
        connectionState={connectionState}
        connectionDispatch={connectionDispatch}
      />
    </>
  );
}

function ReceiveChallenge({
  connectionState,
  connectionDispatch,
}: FormDialogType) {
  return (
    <div className="ReceiveChallengeContainer">
      <div className="ReceiveSphere__LayerOne"></div>
      <div className="ReceiveSphere__LayerTwo"></div>
      <div className="ReceiveSphere__LayerFinal">WAITING</div>
      <YourIdComponent
        connectionState={connectionState}
        connectionDispatch={connectionDispatch}
      />
    </div>
  );
}

function ChallengeOptions({
  setChallengeOptions,
}: {
  setChallengeOptions: React.Dispatch<
    React.SetStateAction<challengeOptionType>
  >;
}) {
  return (
    <div className="ChallengeOptions__Background">
      <button
        onClick={() => setChallengeOptions("SEND")}
        className="ChallengeButton"
      >
        SEND
      </button>
      <button
        onClick={() => setChallengeOptions("RECEIVE")}
        className="ChallengeButton"
      >
        RECEIVE
      </button>
    </div>
  );
}

export default function FormPage({
  connectionState,
  connectionDispatch,
  gameState,
  gameDispatch,
}: FormPageType): JSX.Element {
  const [challengeOptions, setChallengeOptions] =
    useState<challengeOptionType>("NONE");
  const navigate = useNavigate();

  useEffect(() => {
    //Get your id
    connectionState.peer?.on("open", function (id: string) {
      connectionDispatch({ type: "SET_MID", payload: id });
    });
  }, [connectionState.peer, connectionDispatch]);

  useEffect(() => {
    if (gameState.gameStatusOn) {
      navigate("/game");
    }
  }, [gameState.gameStatusOn]);

  useEffect(() => {
    if (
      connectionState.connection &&
      connectionState.isConnectionOn &&
      connectionState.mySideChar !== null
    ) {
      gameDispatch({ type: "GAME_ON", payload: true });
    }
  }, [connectionState]);

  return (
    <div className="FormPage">
      <div className="FormPageTop">
        {challengeOptions === "NONE" && (
          <ChallengeOptions setChallengeOptions={setChallengeOptions} />
        )}
        {challengeOptions === "SEND" && (
          <SendChallenge
            connectionState={connectionState}
            connectionDispatch={connectionDispatch}
          />
        )}
        {challengeOptions === "RECEIVE" && (
          <ReceiveChallenge
            connectionState={connectionState}
            connectionDispatch={connectionDispatch}
          />
        )}
      </div>
    </div>
  );
}
