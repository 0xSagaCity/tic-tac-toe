import CopyId from "../svg/CopyId";
import { FormDialogType } from "../utils/types";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import CycleArrow from "../svg/CycleArrow";
import Tick from "../svg/Tick";
import gsap from "gsap";

export default function YourIdComponent({
    connectionState,
    connectionDispatch,
}: FormDialogType): JSX.Element {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        //Why don't know but many times the initial id is not generated properly.
        connectionDispatch({ type: "SET_MID", payload: "" });
        connectionDispatch({ type: "SET_PEER", payload: new Peer() });
    }, [connectionDispatch]);

    function rotateIcon() {
        gsap.fromTo(
            ".NewId",
            {
                rotate: 0,
                transformOrigin: "center",
            },
            {
                rotate: -360,
                duration: 0.4,
            }
        );
    }

    return (
        <div className="YourId">
            <span>Your Id</span>
            <div className="YourIdInner__Wrapper">
                <span className="YourId__Text">
                    {connectionState.myId === ""
                        ? "Generating id..."
                        : connectionState.myId}
                </span>
                <div className="YourId__ButtonContainer">
                    <button
                        onClick={() =>
                            navigator.clipboard
                                .writeText(connectionState.myId)
                                .then(() => setCopied(true))
                        }
                        className="YourId__Button"
                    >
                        {copied ? <Tick /> : <CopyId />}
                    </button>
                    <button
                        className="YourId__Button NewId"
                        onClick={() => {
                            rotateIcon();
                            setCopied(false);
                            connectionDispatch({
                                type: "SET_PEER",
                                payload: new Peer(),
                            });
                        }}
                    >
                        <CycleArrow />
                    </button>
                </div>
            </div>
        </div>
    );
}
