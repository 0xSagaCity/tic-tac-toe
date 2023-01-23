import CopyId from "../svg/CopyId";
import { ConnectionStateType } from "../utils/types";

export default function YourIdComponent({
  connectionState,
}: {
  connectionState: ConnectionStateType;
}): JSX.Element {
  return (
    <div className="YourId">
      <span>Your Id</span>
      <div className="YourIdInner__Wrapper">
        <span className="YourId__Text">
          {connectionState.myId === ""
            ? "Generating id..."
            : connectionState.myId}
        </span>
        <button className="YourId__Button">
          <CopyId />
        </button>
      </div>
    </div>
  );
}
