import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import ObjectAPI from "../api/ObjectAPI.js";
import ObjectList from "../components/ObjectList.js";
import FaceAPI from "../api/FaceAPI.js";
import FaceList from "../components/FaceList.js";
import face from '../img/face.webp'
import object from '../img/object.jpg'
import adult from '../img/adult.jpeg'
import tag from '../img/tag.jpeg'

function HomePage(props) {
  const { objects, setObjects, faces, setFaces } = props;
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const navigate = useNavigate();

  useEffect(() => {
    const getObjects = async () => {
      const data = await ObjectAPI.fetchObjects();
      if (data) {
        setObjects(data);
      }
    };
    getObjects();
  }, []);

  console.log(objects);

  useEffect(() => {
    const getFaces = async () => {
      const data = await FaceAPI.fetchFaces();
      if (data) {
        setFaces(data);
      }
    };
    getFaces();
  }, []);

  console.log(faces);



  return (
    <div>
      <div>{user && <h1>Welcome {user.username}!</h1>}</div>
      <div class="container d-flex text-center">
        <div class="row mx-3">
          <div className="card mx-auto" style={{ width: "18rem" }}>
            <img className="card-img-top" src={ object } alt="image"></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>

        <div class="row mx-3">
          <div className="card mx-auto" style={{ width: "18rem" }}>
            <img className="card-img-top" src={ face } alt="image"></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>

        <div class="row mx-3">
          <div className="card mx-auto" style={{ width: "18rem" }}>
            <img className="card-img-top" src={ tag } alt="image"></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>

        <div class="row mx-3">
          <div className="card mx-auto" style={{ width: "18rem" }}>
            <img className="card-img-top" src={ adult } alt="image"></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
