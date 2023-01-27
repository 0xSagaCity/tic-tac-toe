import { Circle, Square } from "../component/Polygons";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HomePage({}) {
  const navigate = useNavigate();
  let ctx = gsap.context(() => {});
  const homeRoot = useRef(null);

  useLayoutEffect(() => {
    gsap.to(".App", { visibility: "visible" });
    ctx.add(() => {
      gsap.from(".HomePageTop__Title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.4,
        ease: "slow (0.4, 0.4, false)",
      });
      gsap.from(".HomePageTop__Para", {
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: "slow (0.4, 0.4, false)",
      });
      gsap.from(".Polygon", {
        opacity: 0,
        scale: 0.4,
        y: "50%",
        rotate: -100,
        duration: 1.6,
        delay: 1.6,
        stagger: 0.4,
        ease: "slow (0.4, 0.4, false)",
      });
      gsap.from(".PlayButton", {
        scale: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "slow (0.4, 0.4, false)",
      });
      gsap.from(".PlayButton__Text", {
        opacity: 0,
        y: 30,
        delay: 1.4,
        ease: "slow (0.4, 0.4, false)",
      });
    }, homeRoot);
    return () => ctx.revert();
  }, []);

  function onClick() {
    navigate("/connection");
  }

  return (
    <div className="HomePage" ref={homeRoot}>
      <div className="HomePageTop">
        <h1 className="HomePageTop__Title GradientText">Tic Tac Toe</h1>
        <p className="HomePageTop__Para">
          Welcome to our online multiplayer Tic Tac Toe game! In this web app,
          you can play the classic game of Tic Tac Toe with friends by sharing a
          unique game link. To start, simply create a new game by clicking on
          the "Play" button. Once you have created the game, you can share the
          link with your friend and start playing Tic Tac Toe in real-time. The
          game is designed to be user-friendly, with simple controls and an
          intuitive interface. So, grab a friend and get ready to play Tic Tac
          Toe like never before!
        </p>
      </div>
      <div className="HomePageBottom">
        <button onClick={onClick} className="PlayButton">
          <span className="PlayButton__Text">Play</span>
        </button>
      </div>
      <Circle />
      <Square />
    </div>
  );
}
