import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
