import { Link } from "react-router-dom";

function FaceList(props) {
  const { faces } = props;

  console.log(faces);

  const createLists = () => {
    if (!faces) return null;

    return faces.map((face, index) => {
      return (
        <div>
          <ul key={index + 1} style={{ listStyleType: "none" }}>
            <li>Scan Type: {face.scan_type}</li>
            <li>Face Id: {face.id}</li>
            <li>Face URL: {face.face_url}</li>
            <li>Face Name: {face.face_name}</li>
            <li>Face Gender: {face.face_gender}</li>
            <li>Face Age: {face.face_age}</li>
            <li>
              Face Hair Color: {face.face_hair_color1}, {face.face_hair_color2}
            </li>
            <li>Face Anger: {face.face_anger}</li>
            <li>Face Contempt: {face.face_contempt}</li>
            <li>Face Disgust: {face.face_disgust}</li>
            <li>Face Fear: {face.face_fear}</li>
            <li>Face Happiness: {face.face_happiness}</li>
            <li>Face Neutral: {face.face_neutral}</li>
            <li>Face Sadness: {face.face_sadness}</li>
            <li>Face Surprise: {face.face_surprise}</li>
            <li>Face Notes: {face.face_notes}</li>
          </ul>

          {/* <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={ face.face_url }
              alt="Card image cap"
            ></img>
            <div className="card-body">
              <h5 className="card-title">{ face.face_name }</h5>
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
          </div> */}
        </div>
      );
    });
  };

  return <div>{createLists()}</div>;
}

export default FaceList;
