import { Circle, Square } from "../component/Polygons";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ExpoScaleEase } from "gsap/EasePack";
import { onClick, onMouseEnter, onMouseLeave } from "../utils/animations";
gsap.registerPlugin(ExpoScaleEase);

export default function HomePage() {
    const navigate = useNavigate();
    let ctx = gsap.context(() => {});
    const homeRoot = useRef(null);

    useLayoutEffect(() => {
        gsap.to(".App", { visibility: "visible" });
        ctx.add(() => {
            gsap.from(".HomePageTop__Para", {
                opacity: 0,
                yPercent: 40,
                duration: 0.8,
                ease: "expo.easeInOut",
            });
            gsap.from(".Polygon", {
                opacity: 0,
                scale: 0.4,
                y: "50%",
                rotate: -100,
                duration: 1.6,
                delay: 0.8,
                stagger: 0.4,
                ease: "expo.easeInOut",
            });
            gsap.to(".Polygon", {
                y: "-20%",
                duration: 2.5,
                delay: 5,
                repeat: -1,
                stagger: 0.2,
                yoyo: true,
            });
            gsap.from(".PlayButton", {
                scale: 0,
                yPercent: 80,
                duration: 0.6,
                ease: "expo.easeInOut",
            });
        }, homeRoot);
        return () => ctx.revert();
    }, []);

    return (
        <div className="Page">
            <div className="ExitTransition__Overlay Overlay__One"></div>
            <div className="ExitTransition__Overlay Overlay__Two"></div>
            <div className="ExitTransition__Overlay Overlay__Three"></div>
            <div className="ExitTransition__Overlay Overlay__Four"></div>
            <div className="EntryTransition__Overlay Overlay__Five"></div>
            <div className="HomePage" ref={homeRoot}>
                <div className="HomePageTop">
                    <div className="TextContainer">
                        <h1 className="HomePageTop__Title GradientText">
                            Tic Tac Toe
                        </h1>
                        <p className="HomePageTop__Para StaggerEnter">
                            Welcome to my online multiplayer Tic Tac Toe game!
                            In this web app, you can send the challenge if your
                            have the id of your friend by pressing "Send" or
                            share your id and wait till your friend starts the
                            challenge by pressing "Receive".
                        </p>
                        <Circle />
                        <Square />
                    </div>
                    <div className="ButtonContainer">
                        <button
                            onMouseEnter={() => onMouseEnter(".SendButton")}
                            onMouseLeave={() => onMouseLeave(".SendButton")}
                            onClick={() => {
                                onClick(".SendButton", () =>
                                    navigate("/connection/send")
                                );
                            }}
                            className="PlayButton SendButton"
                        >
                            <span className="PlayButton__Text GradientText">
                                Send
                            </span>
                        </button>
                        <button
                            onMouseEnter={() => onMouseEnter(".ReceiveButton")}
                            onMouseLeave={() => onMouseLeave(".ReceiveButton")}
                            onClick={() =>
                                onClick(".ReceiveButton", () =>
                                    navigate("/connection/receive")
                                )
                            }
                            className="PlayButton ReceiveButton"
                        >
                            <span className="PlayButton__Text GradientText">
                                Receive
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
