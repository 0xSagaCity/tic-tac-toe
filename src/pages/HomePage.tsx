import Oval from "../svg/Oval";
import { Circle, Square } from "../component/Polygons";

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="HomePageTop">
        <h1 className="HomePageTop__Title GradientText">Tic Tac Toe</h1>
        <p className="HomePageTop__Para">
          Welcome to our online multiplayer Tic Tac Toe game! In this web app,
          you can play the classic game of Tic Tac Toe with friends by sharing a
          unique game link. To start, simply create a new game by clicking on
          the "New Game" button. Once you have created the game, you can share
          the link with your friend and start playing Tic Tac Toe in real-time.
          The game is designed to be user-friendly, with simple controls and an
          intuitive interface. So, grab a friend and get ready to play Tic Tac
          Toe like never before!
        </p>
      </div>
      <div className="HomePageBottom">
        <button className="PlayButton">
          <Oval className="PlayButton__Background" />
          <span className="PlayButton__Text">Play</span>
        </button>
      </div>
      <Circle />
      <Square />
    </div>
  );
}
