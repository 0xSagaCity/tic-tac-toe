import YourIdComponent from "../component/YourIdComponent";
import FormDialog from "../component/FormDialog";
import { FormPageType } from "../utils/types";
import { useEffect } from "react";

export default function FormPage({
  connectionState,
  connectionDispatch,
}: FormPageType): JSX.Element {
  useEffect(() => {
    connectionState.peer.on("open", function (id: string) {
      connectionDispatch({ type: "SET_MID", payload: id });
    });
  }, [connectionState.peer]);

  return (
    <div className="FormPage">
      <div className="FormPageTop">
        <h2 className="FormPageTop__Title GradientText">Send challenge</h2>
        <YourIdComponent connectionState={connectionState} />
        <FormDialog
          connectionState={connectionState}
          connectionDispatch={connectionDispatch}
        />
      </div>
    </div>
  );
}
