import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import connectionReducer from "./reducers/connectionReducer";
import "./styles/App.scss";
import { initialConnection } from "./utils/data";

function App(): JSX.Element {
  const [connectionState, connectionDispatch] = useReducer(
    connectionReducer,
    initialConnection
  );

  useEffect(() => {
    //Receive for connection
    if (connectionState.peer) {
      connectionState.peer.on("connection", (dataCon) => {
        connectionDispatch({ type: "SET_CONN", payload: dataCon });
      });
    }
  }, [connectionState.peer]);

  useEffect(() => {
    if (connectionState.connection) {
      connectionDispatch({ type: "SET_STATUS", payload: true });
    }
    //Receive moves from opponent here.
    connectionState.connection !== undefined &&
      connectionState.connection.on("data", (move) => {
        console.log(move);
      });
  }, [connectionState.connection]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/connection"
          element={
            <FormPage
              connectionState={connectionState}
              connectionDispatch={connectionDispatch}
            />
          }
        />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
