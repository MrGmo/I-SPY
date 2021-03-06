import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNav from './components/AppNav';
import LandingPage from "./pages/LandingPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import ObjectDetailPage from "./pages/ObjectDetailPage.js";
import FaceDetailPage from "./pages/FaceDetailPage.js";
import AdultDetailPage from "./pages/AdultDetailPage.js";
import TagDetailPage from "./pages/TagDetailPage.js";
import HomePage from "./pages/HomePage.js";
import ObjectPage from "./pages/ObjectPage.js";
import AdultPage from "./pages/AdultPage.js";
import EditObjectDetailPage from "./pages/EditObjectDetailPage.js";
import EditFaceDetailPage from "./pages/EditFaceDetailPage.js";
import EditAdultDetailPage from "./pages/EditAdultDetailPage.js";
import EditTagDetailPage from "./pages/EditTagDetailPage.js";
import FaceDetectionPage from "./pages/FaceDetectionPage.js";
import TagPage from "./pages/TagPage.js";
import { useState, useEffect } from 'react'
import UserContext from './contexts/UserContext';
import { getLoggedInUser, login } from './api/UserAPI';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error] = useState(null);
  const [objects, setObjects] = useState([])
  const [faces, setFaces] = useState([])
  const [adults, setAdults] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
        }
      }
    }
    if (!user) {
      getUser();
    }
  }, [user])

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    try {
      let response = await login(userObject);
      let data = await response.json();
      if (data.token) {
        localStorage.setItem("auth-user", `${data.token}`);
        setIsLoggedIn(true);
        setUser(data.user);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  }


  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user: user, setUser: handleLogin, error: error }}>
          <AppNav user={user} handleLogout={handleLogout}/>
          <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path='/home' element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout} objects={objects} setObjects={setObjects} faces={faces} setFaces={setFaces} adults={adults} setAdults={setAdults} tags={tags} setTags={setTags} />}/>
            <Route exact path='/login' element={<LoginPage handleLogin={handleLogin} isLoggedIn={isLoggedIn}/>}/>
            <Route exact path='/register' element={<RegisterPage/>}/>
            <Route exact path='/object' element={<ObjectPage objects={objects} setObjects={setObjects}/>}/>
            <Route exact path='/object/:objectID' element={<ObjectDetailPage/>}/>
            <Route exact path="object/:objectID/edit" element={<EditObjectDetailPage />} />
            <Route exact path='/face-detection' element={<FaceDetectionPage faces={faces} setFaces={setFaces}/>}/>
            <Route exact path="face-detection/:faceID/edit" element={<EditFaceDetailPage />} />
            <Route exact path='/face-detection/:faceID' element={<FaceDetailPage />}/>
            <Route exact path='/adult' element={<AdultPage adults={adults} setAdults={setAdults}/>}/>
            <Route exact path='/adult/:adultID' element={<AdultDetailPage/>}/>
            <Route exact path="adult/:adultID/edit" element={<EditAdultDetailPage />} />
            <Route exact path='/tag' element={<TagPage tags={tags} setTags={setTags}/>}/>
            <Route exact path='/tag/:tagID' element={<TagDetailPage/>}/>
            <Route exact path="tag/:tagID/edit" element={<EditTagDetailPage />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
