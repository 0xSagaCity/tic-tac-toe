import { useEffect, useState } from "react";
import {
  ConnectionStateType,
  FormDialogType,
  SideFormType,
} from "../utils/types";

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
  }, []);

  return (
    <div className="FormContainer">
      <div className="FormInner__Wrapper">
        <div className="FormContainer__Options">
          <div onClick={() => changeOption("X")} className={OptionOneClass}>
            <div className="OptionEle">X</div>
            <div className="SelectionBar"></div>
          </div>
          <div onClick={() => changeOption("O")} className={OptionTwoClass}>
            <div className="OptionEle">O</div>
            <div className="SelectionBar"></div>
          </div>
        </div>
        <button
          onClick={() => {
            setFormStepOne(false);
          }}
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
    }, 3000);
  }

  return (
    <div className="FormContainer">
      <div className="FormInner__Wrapper">
        <div className="FormContainer__IdForm">
          <label className="IdForm__Ele">
            Opponent Id
            <input
              type="text"
              value={opponentId}
              onChange={(e) => setOpponentId(e.target.value)}
              placeholder="Enter id here"
            />
          </label>
        </div>
        <button onClick={sendChallenge} className="FormContainer__Button">
          Connect
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
