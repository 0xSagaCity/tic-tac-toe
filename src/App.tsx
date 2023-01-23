import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connection" element={<FormPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
