import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDialog from "../component/FormDialog";
import YourIdComponent from "../component/YourIdComponent";
import { FormDialogType, FormPageType } from "../utils/types";

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
      <div className="Sphere__LayerOne"></div>
      <div className="Sphere__LayerTwo"></div>
      <div className="Sphere__LayerFinal">WAITING</div>
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
    <div className="ChallengeOptions__Container">
      <div className="ChallengeButton__Container">
        <div className="Button__Layer Layer__One"></div>
        <div className="Button__Layer Layer__Two"></div>
        <button
          onClick={() => setChallengeOptions("SEND")}
          className="ChallengeButton"
        >
          SEND
        </button>
      </div>
      <div className="ChallengeButton__Container">
        <div className="Button__Layer Layer__One"></div>
        <div className="Button__Layer Layer__Two"></div>
        <button
          onClick={() => setChallengeOptions("RECEIVE")}
          className="ChallengeButton"
        >
          RECEIVE
        </button>
      </div>
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
  const ctx = gsap.context(() => {});
  const formRoot = useRef(null);

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
  }, [gameState.gameStatusOn, navigate]);

  useEffect(() => {
    if (
      connectionState.connection &&
      connectionState.isConnectionOn &&
      connectionState.mySideChar !== null
    ) {
      gameDispatch({ type: "GAME_ON", payload: true });
    }
  }, [connectionState, gameDispatch]);

  useLayoutEffect(() => {
    gsap.to(".App", { visibility: "visible" });
    ctx.add(() => {
      gsap.from(".ChallengeButton__Container", {
        yPercent: 20,
        stagger: 0.4,
        ease: "slow (0.4, 0.4, false)",
      });
    }, formRoot);
    return () => ctx.revert();
  }, []);

  return (
    <div className="Page">
      <div className="PageTransition__Overlay Overlay__One"></div>
      <div className="PageTransition__Overlay Overlay__Two"></div>
      <div className="PageTransition__Overlay Overlay__Three"></div>
      <div ref={formRoot} className="FormPage">
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
    </div>
  );
}
