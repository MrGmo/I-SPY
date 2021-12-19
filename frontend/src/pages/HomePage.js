import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";
import { Link } from "react-router-dom";
import ObjectAPI from "../api/ObjectAPI.js";
import ObjectList from "../components/ObjectList.js";
import FaceAPI from "../api/FaceAPI.js";
import FaceList from "../components/FaceList.js";
import AdultAPI from "../api/AdultAPI.js";
import AdultList from "../components/AdultList.js";
import face from "../img/face.webp";
import object from "../img/object.jpg";
import adult from "../img/adult.jpeg";
import tag from "../img/tag.jpeg";


function HomePage(props) {
  const { objects, setObjects, faces, setFaces, adults, setAdults } = props;
  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {
    const getObjects = async () => {
      const data = await ObjectAPI.fetchObjects();
      if (data) {
        setObjects(data);
      }
    };
    getObjects();
  }, []);

  useEffect(() => {
    const getFaces = async () => {
      const data = await FaceAPI.fetchFaces();
      if (data) {
        setFaces(data);
      }
    };
    getFaces();
  }, []);

  useEffect(() => {
    const getAdults = async () => {
      const data = await AdultAPI.fetchAdults();
      if (data) {
        setAdults(data);
      }
    };
    getAdults();
  }, []);



  return (
    <div>
      <div>{user && <h1 style={{ color: "white", margin: "2REM", fontWeight: "bold", paddingBottom: "1REM"}}>Welcome {user.username}...</h1>}</div>
      <div class="container d-flex text-center">
        <div class="row mx-4">
          <div className="card mx-auto" style={{ width: "18rem" }}>
            <Link
              to="/object"
              style={{ textDecoration: "none", color: "black" }}
            >
              <img className="card-img-top" src={object} alt="image"></img>
              <div className="card-body">
                <h5 className="card-title">Object</h5>
                <p className="card-text">
                  Object detection is a machine learning technique that allows us
                  to identify and locate objects in an image.
                </p>
              </div>
            </Link>
            <ul className="object list-group list-group-flush">
              <ObjectList objects={objects} />
            </ul>
          </div>
        </div>

        <div class="row mx-4">
          <div className="card mx-auto" style={{ width: "18rem" }}>
            <Link
              to="/face-detection"
              style={{ textDecoration: "none", color: "black" }}
            >
              <img className="card-img-top" src={face} alt="image"></img>
              <div className="card-body">
                <h5 className="card-title">Face Detection</h5>
                <p className="card-text">
                  Face detection is machine learning technique used to find
                  and identify human faces in digital images.
                </p>
              </div>
            </Link>
            <ul className="list-group list-group-flush">
              <FaceList faces={faces} />
            </ul>
          </div>
        </div>

        <div class="row mx-4">
          <div className="card mx-auto" style={{ width: "18rem" }}>
          <Link
              to="/tag"
              style={{ textDecoration: "none", color: "black" }}
            >
            <img className="card-img-top" src={tag} alt="image"></img>
            <div className="card-body">
              <h5 className="card-title">Tag</h5>
              <p className="card-text">
                Tag detection is a machine learning technique that forms the
                foundation for an image description on the web.
              </p>
            </div>
            </Link>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
            </ul>
          </div>
        </div>

        <div class="row mx-4">
          <div className="card mx-auto" style={{ width: "18rem" }}>
          <Link
              to="/adult"
              style={{ textDecoration: "none", color: "black" }}
            >
            <img className="card-img-top" src={adult} alt="image"></img>
            <div className="card-body">
              <h5 className="card-title">Adult Content</h5>
              <p className="card-text">
                Adult content detection is a machine learning technique that
                allows developers to restrict the display of these images in
                their software.
              </p>
            </div>
            </Link>
            <ul className="list-group list-group-flush">
              <AdultList adults={adults}/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
