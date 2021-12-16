import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";
import { useNavigate } from 'react-router-dom';
import ObjectAPI from "../api/ObjectAPI.js";
import ObjectList from "../components/ObjectList.js"
import FaceAPI from "../api/FaceAPI.js";
import FaceList from "../components/FaceList.js"



function HomePage (props) {

  const { objects, setObjects, faces, setFaces } = props
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const navigate = useNavigate()


  useEffect(() => {
    const getObjects = async () => {
      const data = await ObjectAPI.fetchObjects()
      if (data) {
        setObjects(data)
      }
    }
    getObjects()
  }, [])

  console.log(objects)


  useEffect(() => {
    const getFaces = async () => {
      const data = await FaceAPI.fetchFaces()
      if (data) {
        setFaces(data)
      }
    }
    getFaces()
  }, [])

  console.log(faces)


  return (

    <div>
      <h1>Home Page</h1>
      { user && <h1>Welcome {user.username}!</h1> }
      <ObjectList objects={objects}/>
      <FaceList faces={faces}/>
    </div>

    );
  };



export default HomePage;








