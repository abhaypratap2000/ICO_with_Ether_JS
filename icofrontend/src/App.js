// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has enabled", "Success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has enabled", "Success");
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              {" "}
              <Navbar
                title="Initial Coin Offering"
                mode={mode}
                toggleMode={toggleMode}
              />
              <Alert alert={alert} />
              <div className="container form-group">
                <TextForm
                  showAlert={showAlert}
                  heading="Enter Ammount In ETH to Buy Token "
                  mode={mode}
                />
              </div>{" "}
            </>
          }
        />

        <Route exact path="/link" element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;
