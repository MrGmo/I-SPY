import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import ObjectPage from "./pages/ObjectPage.js";
import AdultPage from "./pages/AdultPage.js";
import FaceRecognitionPage from "./pages/FaceRecognitionPage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/object' element={<ObjectPage/>}/>
          <Route exact path='/adult' element={<AdultPage/>}/>
          <Route exact path='/face-recognition' element={<FaceRecognitionPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
