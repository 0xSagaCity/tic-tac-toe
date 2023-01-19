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
      <div className="GameCell GradientText"></div>
      <div className="GameCell GradientText"></div>
      <div className="GameCell GradientText"></div>
      <div className="GameCell GradientText"></div>
      <div className="GameCell GradientText">X</div>
      <div className="GameCell GradientText">O</div>
      <div className="GameCell GradientText">X</div>
      <div className="GameCell GradientText">O</div>
      <div className="GameCell GradientText">X</div>
    </div>
  );
}

export default function GamePage() {
  return (
    <div className="GamePage">
      <InfoContainer />
      <GameBoard />
      <InfoContainer />
    </div>
  );
}
