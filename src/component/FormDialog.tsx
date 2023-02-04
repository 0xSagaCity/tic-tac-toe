import { useEffect, useLayoutEffect, useState } from "react";
import {
  ConnectionStateType,
  FormDialogType,
  SideFormType,
} from "../utils/types";
import gsap from "gsap";

function SideForm({
  setFormStepOne,
  connectionState,
  connectionDispatch,
}: SideFormType) {
  const OptionOneClass =
    connectionState.mySideChar === "X"
      ? "Option_Container--Selected"
      : "Option_Container--Unselected";
  const OptionTwoClass =
    connectionState.mySideChar === "O"
      ? "Option_Container--Selected"
      : "Option_Container--Unselected";

  function changeOption(option: string) {
    connectionDispatch({ type: "SET_SIDE", payload: option });
  }

  useEffect(() => {
    connectionDispatch({ type: "SET_SIDE", payload: "O" });
  }, [connectionDispatch]);

  function stepExit() {
    gsap
      .timeline()
      .to(".Option_Container--Selected .SelectionBar", {
        opacity: 0,
        duration: 0.4,
        ease: "expo.easeInOut",
      })
      .to(
        ".Option_Container--Unselected .SelectionBar",
        {
          opacity: 1,
          duration: 0.4,
          ease: "expo.easeInOut",
        },
        0
      )
      .to(
        ".Option_Container--Selected .OptionEle",
        {
          background: "#d2d6fb",
          duration: 0.4,
          ease: "expo.easeInOut",
        },
        0
      )
      .to(
        ".Option_Container--Unselected .OptionEle",
        {
          background: "linear-gradient(296deg, #0026ff 13%, #7e00cc 74%)",
          duration: 0.4,
          ease: "expo.easeInOut",
          onComplete:
            connectionState.mySideChar === "O"
              ? () => changeOption("X")
              : () => changeOption("O"),
        },
        0
      );
  }

  return (
    <div className="FormContainer">
      <div className="FormInner__Wrapper">
        <div className="FormContainer__Options">
          <div onClick={stepExit} className={OptionOneClass}>
            <div className="OptionEle">X</div>
            <div className="SelectionBar"></div>
          </div>
          <div onClick={stepExit} className={OptionTwoClass}>
            <div className="OptionEle">O</div>
            <div className="SelectionBar"></div>
          </div>
        </div>
        <button
          onClick={() => setFormStepOne(false)}
          className="FormContainer__Button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function IdForm({
  connectionState,
  connectionDispatch,
}: {
  connectionState: ConnectionStateType;
  connectionDispatch: React.Dispatch<{ type: string; payload: any }>;
}) {
  const [opponentId, setOpponentId] = useState("");
  const [buttonText, setButtonText] = useState("Connect");

  function sendChallenge() {
    const connection = connectionState.peer?.connect(opponentId);
    connectionDispatch({
      type: "SET_CONN",
      payload: connection,
    });
    setTimeout(() => {
      connectionDispatch({
        type: "SEND_CHAR",
        payload: connectionState.mySideChar,
      });
    }, 1000);
    setButtonText("Connecting");
    setTimeout(() => {
      setButtonText("Connect");
    }, 2000);
  }

  return (
    <div className="FormContainer">
      <div className="FormInner__Wrapper">
        <div className="FormContainer__IdForm">
          <label className="IdForm__Ele">
            <span>Opponent Id</span>
            <input
              type="text"
              value={opponentId}
              onChange={(e) => setOpponentId(e.target.value)}
              placeholder="Enter id here"
            />
          </label>
        </div>
        <button onClick={sendChallenge} className="FormContainer__Button">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default function FormDialog({
  connectionState,
  connectionDispatch,
}: FormDialogType) {
  const [formStepOne, setFormStepOne] = useState(true);
  const StepOneClass = formStepOne
    ? "Step Step--Active"
    : "Step Step--Inactive";
  const StepTwoClass = formStepOne
    ? "Step Step--Inactive"
    : "Step Step--Active";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".Step__Background",
        {
          xPercent: -200,
        },
        {
          duration: 0.8,
          ease: "expo.easeInOut",
          xPercent: 0,
        }
      );
    });
    return () => ctx.revert();
  }, [formStepOne]);

  return (
    <div className="FormDialog">
      <ul className="FormDialog__Steps">
        <li className={StepOneClass}>
          <div className="Step__Background"></div>
          <span className="Step__Number">01</span>
          <span className="Step__Text">Choose side</span>
        </li>
        <li className={StepTwoClass}>
          <div className="Step__Background"></div>
          <span className="Step__Number">02</span>
          <span className="Step__Text">Enter id</span>
        </li>
      </ul>
      <div className="FormDialog__FormEle">
        {formStepOne ? (
          <SideForm
            setFormStepOne={setFormStepOne}
            connectionState={connectionState}
            connectionDispatch={connectionDispatch}
          />
        ) : (
          <IdForm
            connectionState={connectionState}
            connectionDispatch={connectionDispatch}
          />
        )}
      </div>
    </div>
  );
}
