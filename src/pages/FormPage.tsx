import YourIdComponent from "../component/YourIdComponent";
import FormDialog from "../component/FormDialog";
import { ConnectionStateType, FormPageType } from "../utils/types";
import { useEffect, useState } from "react";

type challengeOptionType = "NONE" | "RECEIVE" | "SEND";

function SendChallenge({ connectionState, connectionDispatch }: FormPageType) {
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
}: {
  connectionState: ConnectionStateType;
}) {
  return (
    <div className="ReceiveChallengeContainer">
      <div className="ReceiveSphere__LayerOne"></div>
      <div className="ReceiveSphere__LayerTwo"></div>
      <div className="ReceiveSphere__LayerFinal">WAITING</div>
      <YourIdComponent connectionState={connectionState} />
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
}: FormPageType): JSX.Element {
  const [challengeOptions, setChallengeOptions] =
    useState<challengeOptionType>("NONE");

  useEffect(() => {
    //Get your id
    connectionState.peer.on("open", function (id: string) {
      connectionDispatch({ type: "SET_MID", payload: id });
    });
  }, [connectionState.peer, connectionDispatch]);

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
          <ReceiveChallenge connectionState={connectionState} />
        )}
      </div>
    </div>
  );
}
