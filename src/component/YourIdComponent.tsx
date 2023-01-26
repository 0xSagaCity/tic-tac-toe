import CopyId from "../svg/CopyId";
import { FormDialogType } from "../utils/types";
import Peer from "peerjs";
import { useEffect } from "react";
import CycleArrow from "../svg/CycleArrow";

export default function YourIdComponent({
  connectionState,
  connectionDispatch,
}: FormDialogType): JSX.Element {
  useEffect(() => {
    //Why don't know but many times the initial id is not generated properly.
    connectionDispatch({ type: "SET_MID", payload: "" });
    connectionDispatch({ type: "SET_PEER", payload: new Peer() });
  }, []);

  return (
    <div className="YourId">
      <span>Your Id</span>
      <div className="YourIdInner__Wrapper">
        <span className="YourId__Text">
          {connectionState.myId === ""
            ? "Generating id..."
            : connectionState.myId}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(connectionState.myId)}
          className="YourId__Button"
        >
          <CopyId />
        </button>
        <button
          className="YourId__Button"
          onClick={() =>
            connectionDispatch({ type: "SET_PEER", payload: new Peer() })
          }
        >
          <CycleArrow />
        </button>
      </div>
    </div>
  );
}
