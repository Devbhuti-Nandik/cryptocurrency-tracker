import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AlertCustom from "./components/AlertCustom";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter basename="/cryptocurrency-tracker">
      <div className="main">
        <Header></Header>
        <Routes>
          <Route path="/"  element={<Homepage/>} exact></Route>
          <Route path="/coins/:id"  element={<CoinPage/>} exact></Route>
        </Routes>
      </div>
      <AlertCustom/>
    </BrowserRouter>
  );
}

export default App;
