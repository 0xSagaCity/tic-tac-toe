import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FormDialog from "../component/FormDialog";
import YourIdComponent from "../component/YourIdComponent";
import { FormDialogType, FormPageType } from "../utils/types";

export function SendChallenge({
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

export function ReceiveChallenge({
  connectionState,
  connectionDispatch,
}: FormDialogType) {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".Sphere__Layer",
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "expo.easeInOut",
      }
    );
  }, []);

  return (
    <div className="ReceiveChallengeContainer">
      <div className="Sphere__LayerOne Sphere__Layer"></div>
      <div className="Sphere__LayerTwo Sphere__Layer"></div>
      <div className="Sphere__LayerFinal">WAITING</div>
      <YourIdComponent
        connectionState={connectionState}
        connectionDispatch={connectionDispatch}
      />
    </div>
  );
}

export function ChallengeOptions({}) {
  const navigate = useNavigate();
  const optionsRoot = useRef(null);
  const ctx = gsap.context(() => {});

  useLayoutEffect(() => {
    ctx.add((context: any) => {
      context.add("hoverExpand", () => {
        gsap.to(".SendButton .Button__Layer", {
          scale: 2,
          stagger: -0.4,
          repeat: -1,
          yoyo: true,
          ease: "expo.easeInOut",
        });
      });
    }, optionsRoot);
    return () => ctx.revert();
  }, []);

  function onMouseEnter() {
    ctx.hoverExpand();
  }

  function onMouseLeave() {
    ctx.revert();
  }

  return (
    <div className="ChallengeOptions__Container" ref={optionsRoot}>
      <div className="SendButton ChallengeButton__Container">
        <div className="Button__Layer Layer__One"></div>
        <div className="Button__Layer Layer__Two"></div>
        <button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => navigate("/connection/send")}
          className="ChallengeButton"
        >
          SEND
        </button>
      </div>
      <div className="ReceiveButton ChallengeButton__Container">
        <div className="Button__Layer Layer__One"></div>
        <div className="Button__Layer Layer__Two"></div>
        <button
          onClick={() => navigate("/connection/receive")}
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
  const navigate = useNavigate();
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
  }, []);

  return (
    <div className="Page">
      <div className="PageTransition__Overlay Overlay__One"></div>
      <div className="PageTransition__Overlay Overlay__Two"></div>
      <div className="PageTransition__Overlay Overlay__Three"></div>
      <div className="PageTransition__Overlay Overlay__Four"></div>
      <div ref={formRoot} className="FormPage">
        <div className="FormPageTop">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
