import { Circle, Square } from "../component/Polygons";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ExpoScaleEase } from "gsap/EasePack";
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
      gsap.from(".PlayButton", {
        scale: 0,
        yPercent: 80,
        duration: 0.6,
        ease: "expo.easeInOut",
      });
    }, homeRoot);
    return () => ctx.revert();
  }, []);

  function onClick(next: gsap.Callback) {
    gsap
      .timeline({ paused: true })
      .to(".PlayButton", {
        duration: 0.1,
        scale: 0.8,
        ease: "expo.easeInOut",
      })
      .to(".PlayButton", {
        duration: 0.1,
        scale: 1,
        ease: "expo.easeInOut",
        onComplete: next,
      })
      .play();
  }

  return (
    <div className="Page">
      <div className="PageTransition__Overlay Overlay__One"></div>
      <div className="PageTransition__Overlay Overlay__Two"></div>
      <div className="PageTransition__Overlay Overlay__Three"></div>
      <div className="PageTransition__Overlay Overlay__Four"></div>
      <div className="HomePage" ref={homeRoot}>
        <div className="HomePageTop">
          <div className="TextContainer">
            <h1 className="HomePageTop__Title GradientText">Tic Tac Toe</h1>
            <p className="HomePageTop__Para StaggerEnter">
              Welcome to our online multiplayer Tic Tac Toe game! In this web
              app, you can play the classic game of Tic Tac Toe with friends by
              sharing a unique game link. To start, simply create a new game by
              clicking on the "Play" button. Once you have created the game, you
              can share the link with your friend and start playing Tic Tac Toe
              in real-time. The game is designed to be user-friendly, with
              simple controls and an intuitive interface. So, grab a friend and
              get ready to play Tic Tac Toe like never before!
            </p>
          </div>
          <div className="ButtonContainer">
            <button
              onClick={() => onClick(() => navigate("/connection/send"))}
              className="PlayButton SendButton"
            >
              <span className="PlayButton__Text GradientText">Send</span>
            </button>
            <button
              onClick={() => onClick(() => navigate("/connection/receive"))}
              className="PlayButton ReceiveButton"
            >
              <span className="PlayButton__Text GradientText">Receive</span>
            </button>
          </div>
        </div>
        <Circle />
        <Square />
      </div>
    </div>
  );
}
