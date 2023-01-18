import { useState } from "react";

function SideForm({
  setFormStepOne,
}: {
  setFormStepOne: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="FormContainer">
      <div className="FormContainer__Options">
        <div className="Option_Container--Unselected">
          <div className="OptionEle">X</div>
          <div className="SelectionBar"></div>
        </div>
        <div className="Option_Container--Selected">
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
  );
}

function IdForm() {
  return (
    <div className="FormContainer">
      <div className="FormContainer__IdForm">
        <label className="IdForm__Ele">
          Opponent Id
          <input type="text" placeholder="Enter id here" />
        </label>
      </div>
      <button className="FormContainer__Button">Connect</button>
    </div>
  );
}

export default function FormDialog() {
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
          <SideForm setFormStepOne={setFormStepOne} />
        ) : (
          <IdForm />
        )}
      </div>
    </div>
  );
}
