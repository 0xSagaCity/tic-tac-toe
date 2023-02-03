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
        opacity: 1,
        scale: 0.5,
      },
      {
        opacity: 0,
        scale: 1,
        duration: 1.6,
        repeat: -1,
        ease: "expo.easIneOut",
      }
    );
  }, []);

  return (
    <div className="ReceiveChallengeContainer">
      <div className="Indicator__Component">
        <div className="Sphere__LayerOne Sphere__Layer"></div>
        <div className="Sphere__LayerTwo Sphere__Layer"></div>
        <div className="Sphere__LayerFinal">WAITING</div>
      </div>
      <YourIdComponent
        connectionState={connectionState}
        connectionDispatch={connectionDispatch}
      />
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
      connectionState.connection.send({ HEAD: "GAME", PAYLOAD: "0" });
    }
  }, [connectionState, gameDispatch]);

  useLayoutEffect(() => {
    gsap.to(".App", { visibility: "visible" });
  }, []);

  return (
    <div className="Page">
      <div className="ExitTransition__Overlay Overlay__One"></div>
      <div className="ExitTransition__Overlay Overlay__Two"></div>
      <div className="ExitTransition__Overlay Overlay__Three"></div>
      <div className="ExitTransition__Overlay Overlay__Four"></div>
      <div className="EntryTransition__Overlay Overlay__Five"></div>
      <div ref={formRoot} className="FormPage">
        <div className="FormPageTop">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
