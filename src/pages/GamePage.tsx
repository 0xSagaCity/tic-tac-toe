function InfoContainer() {
  return (
    <div className="InfoContainer">
      <span className="SideChar GradientText">X</span>
      <div className="SideStatus">
        <div className="SideStatus__Indicator"></div>
        <span className="SideStatus__Move SmallText">Waiting...</span>
      </div>
    </div>
  );
}

function GameBoard() {
  return (
    <div className="GameBoard">
      <div className="GameCell">
        <span></span>
      </div>
      <div className="GameCell">
        <span></span>
      </div>
      <div className="GameCell">
        <span></span>
      </div>
      <div className="GameCell">
        <span></span>
      </div>
      <div className="GameCell">
        <span>X</span>
      </div>
      <div className="GameCell">
        <span>O</span>
      </div>
      <div className="GameCell">
        <span>X</span>
      </div>
      <div className="GameCell">
        <span>O</span>
      </div>
      <div className="GameCell">
        <span>X</span>
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <div className="GamePage">
      <div className="InfoWrapper">
        <InfoContainer />
        <InfoContainer />
      </div>
      <GameBoard />
    </div>
  );
}
